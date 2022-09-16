import {
  HttpTransportType,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from '@microsoft/signalr';
import axios from 'axios';

const startSignalRConnection = () => {
  const connection = new HubConnectionBuilder()
    .configureLogging(LogLevel.Critical)
    .withUrl('http://192.168.1.102:8099/csmsgateway', {
      // accessTokenFactory: () => access_info.accessToken,
      skipNegotiation: true,
      transport: HttpTransportType.WebSockets,
    })
    .build();

  var certSerialNumber = 'CERTSN143212FEWFWIUTHRIH8757678JOIJOOIH987';
  var certUrl = `https://csmsdevstorage.blob.core.windows.net/clientcertificates/${certSerialNumber}`;

  axios.get(certUrl).then((response) => {
    global.cert = response.data;
  });

  global.connection = connection;

  async function start() {
    try {
      if (connection.state != HubConnectionState.Connected) {
        console.log('We are in the try if block');
        await connection.start();
        console.log('SignalR Connected.');
      }

      // await appConected();
    } catch (err) {
      console.log('The error is:', err);

      setTimeout(start, 5000);
    }
  }

  connection.onclose(async () => {
    await start();
  });

  start();
};

export default startSignalRConnection;
