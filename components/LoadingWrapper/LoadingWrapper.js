import React from 'react';

const LoadingWrapper = ({ children, isLoading }) => {
  return (
    <>
      {isLoading
        ? () => <ActivityIndicator size={'large'} color={'#ff6400'} />
        : children}
    </>
  );
};

export default LoadingWrapper;
