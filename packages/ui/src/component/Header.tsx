import React from 'react';
import logo from '../image/alarm2me-transparent.svg';
import miniLogo from '../image/notifications_active_white_48dp.svg';
import styled from 'styled-components';
import { useAuth } from '../service/auth.service';

const StyledHeader = styled.header`
  background: linear-gradient(to right, #ffcf01, #ffa801, #ff7d00);
  color: white;
  width: 100%;
`;

export const HeaderContents = styled.div`
  &:after {
    content: '';
    display: block;
    clear: both;
  }
`;

const Header1 = styled.span`
  font-size: 1.2em;
  font-weight: bold;
`;

const Header2 = styled.span`
  font-size: 1em;
`;

const Header = () => {
  const auth = useAuth();
  return (
    <StyledHeader>
      <HeaderContents>
        <div style={{ padding: '8px 16px 8px 16px' }}>
          <div style={{ float: 'left' }}>
            <a href="/">
              {!auth ? (
                <img src={logo} alt="logo" width={156} />
              ) : (
                <picture>
                  <source
                    media={'(min-width: 768px)'}
                    srcSet={logo}
                    width={156}
                  />
                  <img src={miniLogo} alt="logo" width={42} />
                </picture>
              )}
            </a>
          </div>
          <div
            style={{
              float: 'right',
              textAlign: 'right',
            }}
          >
            {!auth ? null : (
              <div onClick={auth.logout}>
                <Header1>{!auth.user ? null : auth.user.name}</Header1>
                <br />
                <Header2>{!auth.user ? null : auth.user.email}</Header2>
              </div>
            )}
          </div>
        </div>
      </HeaderContents>
    </StyledHeader>
  );
};

export default Header;
