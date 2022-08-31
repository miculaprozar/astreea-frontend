import {
  HttpTransportType,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from "@microsoft/signalr";

const startSignalRConnection = () => {
  const connection = new HubConnectionBuilder()
    .configureLogging(LogLevel.Critical)
    .withUrl("http://10.0.2.2:8099/csmsgateway", {
      // accessTokenFactory: () => access_info.accessToken,
      skipNegotiation: true,
      transport: HttpTransportType.WebSockets,
    })
    .build();

  global.connection = connection;

  async function start() {
    try {
      if (connection.state != HubConnectionState.Connected) {
        console.log("We are in the try if block");
        await connection.start();
        console.log("SignalR Connected.");
      }

      // await appConected();
    } catch (err) {
      console.log("The error is:", err);

      setTimeout(start, 5000);
    }
  }

  connection.onclose(async () => {
    console.log("WE ARE IN THE ONCLOSe");
    await start();
  });

  start();
};

export default startSignalRConnection;
