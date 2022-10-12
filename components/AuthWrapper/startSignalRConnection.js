import {
  HttpTransportType,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from '@microsoft/signalr';
import axios from 'axios';
import { GATEWAY_URL } from '../../api/utils/consts';

const startSignalRConnection = (gatewayUrl, accessToken, tid, setConnectionStatus) => {
  global.connection = null;
  const connection = new HubConnectionBuilder()
    .configureLogging(LogLevel.Critical)
    .withUrl(gatewayUrl + "&tid=" + tid, {
      accessTokenFactory: () => accessToken,
      skipNegotiation: true,
      transport: HttpTransportType.WebSockets,
    })
    .build();

  var certSerialNumber = 'CERTSN143212FEWFWIUTHRIH8757678JOIJOOIH987';
  var certUrl = `https://csmsdevstorage.blob.core.windows.net/clientcertificates/${certSerialNumber}`;

  axios.get(certUrl).then((response) => {
    global.cert = response.data;
  });

  async function start() {
    try {
      if (connection.state != HubConnectionState.Connected) {
        console.log('Connection is not started');
        setConnectionStatus(false);

        global.connection = connection;
        await connection.start();
        console.log('SignalR Connected.');
        setConnectionStatus(true);
      }

      // await appConected();
    } catch (err) {
      console.log('GatewayConnection error:', err);
      setConnectionStatus(false);

      setTimeout(start, 5000);
    }
  }

  connection.onclose(async () => {
    await start();
  });

  start();
};

export default startSignalRConnection;
