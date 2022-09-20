import { ConsoleLogger } from '@microsoft/signalr/dist/esm/Utils';
import React, { useContext } from 'react';
import Loader from '../../general_components/Loader/Loader';
import { AuthContext } from './AuthProvider';

export const RouteGuard = (props) => {
  const { token, connectionStatus } = useContext(AuthContext);
  console.log(connectionStatus);

  return (
    <>
      {!token && !connectionStatus ? (
        <Loader isLoading={true} />
      ) : (
        <>{props.children}</>
      )}
    </>
  );
};
