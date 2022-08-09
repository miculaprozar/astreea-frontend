import React from "react";

const LoadingWrapper = ({ children, isLoading }) => {
  console.log(isLoading);
  return (
    <>
      {isLoading ? (
        <View>
          <ActivityIndicator size={"large"} color={"#ffffff"} />
        </View>
      ) : (
        // children
        <></>
      )}
    </>
  );
};

export default LoadingWrapper;
