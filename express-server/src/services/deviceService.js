import { Device } from "../models/device.js";
import { listAllDevices } from "./usbService.js";

export const updateDeviceConnection = (idProduct, update) => {
  return Device.findOneAndUpdate({ idProduct }, update);
};

export const findAllDevices = () => {
  return Device.find();
};

export const findOne = (idProduct) => {
  return Device.findOne({ idProduct });
};

export const createDevice = (device) => {
  return Device.create({ ...device });
};

export const insertAllDevices = async (devices = listAllDevices()) => {
  if (devices.length === 0) return;

  const storedDevices = await findAllDevices();

  if (storedDevices.length === 0) {
    const newDevicesArray = [];

    devices.forEach((device) => {
      const {
        deviceDescriptor: { idVendor, idProduct },
      } = device;
      const temp = {
        idVendor: idVendor,
        idProduct: idProduct,
      };

      if (device.parent !== null) {
        temp.deviceType = "Device";
        temp.parentId = device.parent.deviceDescriptor.idProduct;
      } else {
        temp.deviceType = "Hub";
      }

      temp.connected = true;

      newDevicesArray.push(temp);
    });

    await Device.insertMany(newDevicesArray);
  }
};

export const insertDevice = async (device, prodId) => {
  const connectingDevice = await findOne(prodId).lean();

  if (connectingDevice) return;

  const {
    deviceDescriptor: { idVendor, idProduct },
  } = device;
  const temp = {
    idVendor: idVendor,
    idProduct: idProduct,
  };

  if (device.parent !== null) {
    temp.deviceType = "Device";
    temp.parentId = device.parent.deviceDescriptor.idProduct;
  } else {
    temp.deviceType = "Hub";
  }

  temp.connected = true;

  await createDevice(temp);
};
