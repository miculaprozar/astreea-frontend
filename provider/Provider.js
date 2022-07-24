import React, { useState, useEffect } from "react";

const Context = React.createContext();

const Provider = (props) => {
  const [boolean, setBoolean] = useState(false);
  const [chargers2, setChargers2] = useState(null);

  return (
    <Context.Provider
      value={{
        boolean,
        setBoolean,
        chargers2,
        setChargers2,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export { Provider, Context };
