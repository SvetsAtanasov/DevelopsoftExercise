import { usb, getDeviceList } from "usb";
import {
  updateDeviceConnection,
  insertDevice,
  findAllDevices,
} from "./deviceService.js";

export const listAllDevices = () => {
  return getDeviceList();
};

export const onConnectDevice = (ws) => {
  usb.on("attach", async (device) => {
    const {
      deviceDescriptor: { idProduct },
    } = device;
    const update = {};

    if (device.parent) {
      const {
        deviceDescriptor: { idProduct },
      } = device.parent;

      update.parent = idProduct;
    }

    await updateDeviceConnection(idProduct, { connected: true });
    insertDevice(device, idProduct);

    console.log("Device has been attached, sending updated data!");

    const devices = await findAllDevices();
    ws.send(`${JSON.stringify(devices)}\n`);
  });
};

export const onDisconnectDevice = (ws) => {
  usb.on("detach", async (device) => {
    const {
      deviceDescriptor: { idProduct },
    } = device;

    await updateDeviceConnection(idProduct, { connected: false });

    console.log("Device has been detached, sending updated data!");

    const devices = await findAllDevices();
    ws.send(`${JSON.stringify(devices)}\n`);
  });
};
