import React from 'react';
import Device from '../device/Device';
import UserAuthToken from './UserAuthToken';
import Spacer from '../Spacer';

const User = () => {
  return (
    <>
      <Device />
      <Spacer />
      <UserAuthToken />
    </>
  );
};

export default User;
