import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  padding: 12px 0 8px 0;
  background: whitesmoke;
  border-top: 1px #e0e0e0 solid;
  font-size: 1em;
`;

const Link = styled.a`
  color: #23292d;
  font-size: 0.9em;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

function Footer() {
  return (
    <StyledFooter>
      <Link href="https://alarm2me.page.link/footerSourceLink">@alarm2me</Link>
    </StyledFooter>
  );
}

export default Footer;
