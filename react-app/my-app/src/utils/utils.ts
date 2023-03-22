import { DEVICE_APi_URL, ENDPOINTS } from "../endpoints/endpoints";

export const fetchAllDevices = () =>
  fetch(`${DEVICE_APi_URL}/${ENDPOINTS.DEVICE_ENDPOINT}`);
