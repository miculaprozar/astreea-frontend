import React, { useState, useEffect } from "react";

const Context = React.createContext();

const Provider = (props) => {
  const [boolean, setBoolean] = useState(false);

  return (
    <Context.Provider
      value={{
        boolean,
        setBoolean,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export { Provider, Context };
