import React from "react";
import { Accordion } from "react-bootstrap";

export type DeviceTreeCustomProps = {
  devices: Array<{
    _id: string;
    idVendor: string;
    idProduct: string;
    deviceType: string;
    connected: boolean;
    parentId?: string;
    __v: number;
  }>;
};

const DeviceTree = ({ devices }: DeviceTreeCustomProps) => {
  const hubTypeDevices = devices.filter(
    (device) => device.deviceType === "Hub"
  );

  const deviceTypeDevices = devices.filter(
    (device) => device.deviceType === "Device"
  );

  return (
    <>
      {hubTypeDevices.map((hubTypeDevice, idx: number) => {
        return (
          <Accordion>
            <Accordion.Item eventKey="1">
              <Accordion.Header>{`Device id ${hubTypeDevice.idProduct} - Vendor id ${hubTypeDevice.idVendor} - Device type ${hubTypeDevice.deviceType} - Is device connected ${hubTypeDevice.connected}`}</Accordion.Header>
              <Accordion.Body>
                <span className={"d-block mb-3"}>
                  {deviceTypeDevices.filter(
                    (deviceTypeDevice) =>
                      deviceTypeDevice.parentId === hubTypeDevice.idProduct
                  ).length === 0
                    ? `No devices found`
                    : `Devices connected ${deviceTypeDevices.length}`}
                </span>

                {deviceTypeDevices.map((deviceTypeDevice, idx: number) => {
                  return deviceTypeDevice.parentId ===
                    hubTypeDevice.idProduct ? (
                    <Accordion>
                      <Accordion.Item className={"mb-3"} eventKey="0">
                        <Accordion.Header>{`Device ${
                          idx + 1
                        }`}</Accordion.Header>
                        <Accordion.Body>
                          <div>{`Device id ${deviceTypeDevice.idProduct}`}</div>
                          <div>{`Vendor id ${deviceTypeDevice.idVendor}`}</div>
                          <div>{`Device type ${deviceTypeDevice.deviceType}`}</div>
                          <div>{`Is device connected ${deviceTypeDevice.connected}`}</div>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  ) : (
                    <></>
                  );
                })}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        );
      })}
    </>
  );
};

export default DeviceTree;
