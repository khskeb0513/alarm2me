import { HeaderContents } from '../Header';
import downloadButtonImage from '../../image/download-button.svg';
import miniDownloadButtonImage from '../../image/download-mini.svg';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FindAllByUserIdResponseDto } from './find-all-by-user-id-response.dto';
import androidLogo from '../../image/android-logo.png';
import appleLogo from '../../image/apple-logo.svg';
import { useAuth } from '../../service/auth.service';
const Header1 = styled.span`
  font-size: 2em;
  font-weight: bold;
`;

const LogoImage = styled.img`
  margin-right: 8px;
`;

const Device = () => {
  const auth = useAuth();
  useEffect(() => {
    fetch('/v1/device').then((r) => {
      if (r.status < 400) {
        r.json().then((r) => setDevices(r));
      }
    });
  }, [auth.user]);
  const [devices, setDevices] = useState<FindAllByUserIdResponseDto[] | null>();
  const testMessage = () => {
    const promptDeviceNickname = prompt('Enter device nickname.');
    return fetch('/v1/message/test/' + promptDeviceNickname);
  };
  return (
    <>
      <HeaderContents>
        <div style={{ display: 'inline-block' }}>
          <Header1>Devices</Header1>
        </div>
        <div style={{ display: 'inline-block', float: 'right' }}>
          <picture>
            <source
              media={'(min-width: 768px)'}
              srcSet={downloadButtonImage}
              width={156}
            />
            <img src={miniDownloadButtonImage} alt="logo" width={32} />
          </picture>
        </div>
      </HeaderContents>
      <hr />
      <div>
        <table>
          {!devices
            ? null
            : devices.map((device) => (
                <tr
                  onClick={() => {
                    navigator.clipboard.writeText(device.deviceNickname);
                    alert(
                      `Device Nickname copied.\nLast Used: ${device.lastUsed} GMT\nCreated At: ${device.createdAt} GMT`,
                    );
                  }}
                >
                  <td style={{ textAlign: 'center' }}>
                    {device.deviceTypeTag === 'android' ? (
                      <LogoImage
                        src={androidLogo}
                        alt="android-logo"
                        width={24}
                      />
                    ) : null}
                    {device.deviceTypeTag === 'ios' ? (
                      <LogoImage src={appleLogo} alt="apple-logo" width={21} />
                    ) : null}
                  </td>
                  <td>{device.deviceNickname}</td>
                </tr>
              ))}
          <tr onClick={testMessage}>
            <td>🛠️</td>
            <td>
              <small>Test Message</small>
            </td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default Device;
