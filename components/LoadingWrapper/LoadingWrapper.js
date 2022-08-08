import React from 'react';

const LoadingWrapper = ({ children, isLoading }) => {
  console.log(isLoading);
  return (
    <>
      {isLoading ? (
        <View>
          <ActivityIndicator size={'large'} color={'#ff6400'} />
        </View>
      ) : (
        // children
        <></>
      )}
    </>
  );
};

export default LoadingWrapper;
