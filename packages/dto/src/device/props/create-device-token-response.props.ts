import { DeviceTypeTagType } from '../type/device-type-tag.type';

export interface CreateDeviceTokenResponseProps {
  deviceModel: string;
  deviceTypeTag: DeviceTypeTagType;
  deviceNickname: string;
}
