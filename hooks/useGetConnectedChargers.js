import React, { useEffect, useState, useMemo } from "react";
import { HubConnectionState } from "@microsoft/signalr";
import getUnixTime from "date-fns/getUnixTime";

export function useGetConnectedChargers() {
  const [chargers, setChargers] = useState(null);

  const timeStamp = getUnixTime(Date.now());

  const connection = global.connection;

  chargers && registerListener();

  function registerListener() {
    //register for events
    connection.on("ChargerDetailsChanged", (charger) => {
      const timeStamp2 = getUnixTime(Date.now());
      if (timeStamp2 - timeStamp > 5) {
        const newArr = chargers.map((object) => {
          if (object.id === charger.id) {
            return charger;
          }
          return object;
        });

        setChargers(newArr);
      }
    });
  }

  useEffect(() => {
    if (connection.state == HubConnectionState.Connected) {
      const getConnectedChargers = async () => {
        await connection
          .invoke("GetConnectedCharges", false, null)
          .then((chargerList) => {
            setChargers(chargerList);
          })
          .catch((err) => {
            console.log("THE ERROR IS", err);
          });
      };

      getConnectedChargers();
    }
  }, [connection]);

  // const memoChargers = useMemo(() => chargers, [chargers]);

  return [
    {
      data: chargers || [],
    },
    // handler,
  ];
}
