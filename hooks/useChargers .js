import React, { useEffect, useState } from "react";

export function useChargers() {
  const connection = global.connection;

  const [chargers, setChargers] = useState(null);

  useEffect(() => {
    connection.on("echo", (data1, data2) => {
      console.log(data1 + ":" + data2);
    });
  }, []);

  const memoChargers = useMemo(() => chargers, [chargers]);

  return [
    {
      data: memoChargers || [],
    },
    // handler,
  ];
}
