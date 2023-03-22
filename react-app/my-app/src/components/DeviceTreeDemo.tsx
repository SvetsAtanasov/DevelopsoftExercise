import { Suspense, useEffect, useState } from "react";
import { fetchAllDevices } from "../utils/utils";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import DeviceTree from "./DeviceTree";
import { Await } from "react-router-dom";

const client = new W3CWebSocket("ws://localhost:7777");

const DeviceTreeDemo = () => {
  const [devices, setDevices] = useState<
    Array<{
      _id: string;
      idVendor: string;
      idProduct: string;
      deviceType: string;
      connected: boolean;
      parentId?: string;
      __v: number;
    }>
  >([]);

  useEffect(() => {
    fetchAllDevices()
      .then((response) => response.json())
      .then((data) => {
        setDevices(data);
      })
      .catch((err) => {
        console.error(err);
      });

    client.onopen = () => {
      console.log("connected to ws");
      client.send("Connected");
    };

    client.onmessage = (message: any) => {
      const devices = JSON.parse(message.data);

      setDevices(devices);
    };
  }, []);

  return (
    <>
      <Suspense fallback={<div>Loading</div>}>
        <Await
          resolve={devices}
          errorElement={<div>Error</div>}
          children={(resolvedDevices) => (
            <DeviceTree devices={resolvedDevices} />
          )}
        />
      </Suspense>
    </>
  );
};

export default DeviceTreeDemo;
