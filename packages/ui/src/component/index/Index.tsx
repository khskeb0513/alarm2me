import React from 'react';
import styled from 'styled-components';
import miniLogo from '../../image/alarm2me-mini.svg';
import signInGithub from '../../image/sign-in-with-github.svg';
import downloadClients from '../../image/download-button.svg';
import { useAuth } from '../../service/auth.service';
import User from '../user/User';

const Div = styled.div`
  text-align: center;
  vertical-align: center;
  margin-top: 64px;
  margin-bottom: 64px;
`;

const Image = styled.img`
  margin: 16px;
`;

function Index() {
  const auth = useAuth();
  const indexPage = (
    <Div>
      <Image src={miniLogo} alt="logo" width={96} />
      <h1>Alarm2.me</h1>
      <h3>Simple Solution for Notification</h3>
      <p style={{ fontStyle: 'italic' }}>
        Just Call REST API and we handle rest of it.
      </p>
      <a href="/v1/auth/github">
        <Image src={signInGithub} alt="sign in" width={196} />
      </a>
      <a href="https://alarm2me.page.link/download-client">
        <Image src={downloadClients} alt="download clients" width={196} />
      </a>
    </Div>
  );
  return !auth.user ? indexPage : <User />;
}

export default Index;
