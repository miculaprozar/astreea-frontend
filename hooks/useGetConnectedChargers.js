import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { HubConnectionState } from '@microsoft/signalr';
import getUnixTime from 'date-fns/getUnixTime';
import produce from 'immer';

export function useGetConnectedChargers() {
  const [chargers, setChargers] = useState(null);

  const timeStamp = getUnixTime(Date.now());

  const connection = global.connection;

  chargers && registerListener();

  function registerListener() {
    //register for events

    connection.on('ChargingHistoryChanged', (charger) => {
      // console.log(util.inspect(charger, false, null, true))
    });
    connection.on('ChargerDetailsChanged', (charger) => {
      console.log('charger', charger);
      // const timeStamp2 = getUnixTime(Date.now());
      // if (timeStamp2 - timeStamp > 5) {
      //   const newArr = chargers.map((object) => {
      //     if (object.id === charger.id) {
      //       return charger;
      //     }
      //     return object;
      //   });
      //   setChargers(newArr);
      // }
      // console.log("Timestamp1", timeStamp);
      // console.log("TImestamp222222", timeStamp2);
      // handleChangeCharger(charger);
    });
  }
  const handleChangeCharger = useCallback((changedCharger) => {
    setChargers(
      produce((draft) => {
        const indexCharger = draft.findIndex(
          (charger) => charger.id === changedCharger.id
        );
        draft[indexCharger] = { ...draft[indexCharger], ...changedCharger };
      })
    );
  }, []);

  useEffect(() => {
    if (connection.state == HubConnectionState.Connected) {
      const getConnectedChargers = async () => {
        await connection
          .invoke('GetConnectedCharges', false, null)
          .then((chargerList) => {
            setChargers(chargerList);
          })
          .catch((err) => {
            console.log('THE ERROR IS', err);
          });
      };

      getConnectedChargers();
    }
  }, [connection]);

  const memoChargers = useMemo(() => chargers, [chargers]);

  return [
    {
      data: memoChargers || [],
    },
    // handler,
  ];
}
