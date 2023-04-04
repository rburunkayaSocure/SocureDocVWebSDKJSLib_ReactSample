import React from 'react';
import SocureComponent from './SocureComponent';

function App() {
  const inputData = {
    customerUserId: 'customIDFromTheCustomer',
  };

  const processConfig = {
    language: 'en',
    documentType: 'license',
  };

  const sdkKey = 'your-sdk-key';

  const handleSuccess = (response) => {
    console.log('Parent received success:', response);
  };

  const handleError = (error) => {
    console.log('Parent received error:', error);
  };

  return (
    <div className="App">
      <SocureComponent
        step={1}
        inputData={inputData}
        processConfig={processConfig}
        sdkKey={sdkKey}
        onSuccessCallback={handleSuccess}
        onErrorCallback={handleError}
      />
    </div>
  );
}

export default App;
