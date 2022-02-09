import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../../service/auth.service';

const CautionSpan = styled.span`
  color: firebrick;
`;

const UserAuthToken = () => {
  const auth = useAuth();
  const onClickAuthTokenButton = () => {
    navigator.clipboard.writeText(auth.user.sub);
    prompt('Auth Token copied.', auth.user.sub);
  };
  return (
    <div style={{ display: 'inline-block' }}>
      <h2>My Auth Token</h2>
      <p>
        <CautionSpan>
          <b>Caution!</b> This token used for login and device registration.
          Keep carefully.
        </CautionSpan>
        <br />
        Scan code with your device to connect user.
        <br />
        Press code in mobile, token will send to app immediately.{' '}
        <button onClick={onClickAuthTokenButton}>
          <strong>Show</strong>
        </button>
      </p>
      <a href="/v1/user/token/create">
        <img
          src={
            'https://chart.googleapis.com/chart?cht=qr&chs=100x100&chld=M|0&chl=' +
            auth.user.sub
          }
          alt="auth token qr code"
        />
      </a>
    </div>
  );
};

export default UserAuthToken;
