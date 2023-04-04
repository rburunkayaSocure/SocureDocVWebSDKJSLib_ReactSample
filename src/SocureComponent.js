import React, { useEffect } from 'react';

const SocureComponent = ({
  step = 1,
  inputData = {},
  processConfig = {},
  sdkKey,
  onSuccessCallback,
  onErrorCallback,
}) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://websdk.socure.com/bundle.js';
    script.type = 'text/javascript';
    document.head.appendChild(script);

    let sdkInitiated = false;
    let changesDone = false;

    const onProgress = (progress) => {
      console.log(progress);
      console.log('progress');
    };

    const onSuccess = (response) => {
      console.log(response);
      console.log('success');
      if (typeof onSuccessCallback === 'function') {
        onSuccessCallback(response);
      }
    };

    const onError = (error) => {
      console.log(error);
      console.log('error');
      if (typeof onErrorCallback === 'function') {
        onErrorCallback(error);
      }
    };

    const config = {
      onProgress: onProgress,
      onSuccess: onSuccess,
      onError: onError,
      qrCodeNeeded: true,
    };

    const clearSession = () => {
      window.Socure.cleanup();
      window.Socure.reset();
      sessionStorage.removeItem('documentVerificationToken');
      sessionStorage.removeItem('publicApiKey');
      localStorage.removeItem('devicer_id');
      console.log('Socure DocV Session cleaned!');
    };

    const start = () => {
      if (sdkInitiated) {
        clearSession();
        console.log('cleaned');
        sdkInitiated = false;
      }

      if (!sdkKey) {
        console.error('SDK key is required');
        return;
      }

      window.SocureInitializer.init(sdkKey).then((lib) => {
        lib.init(sdkKey, '#websdk', config).then(() => {
          lib.start(step, inputData, processConfig).then(
            (response) => {
              console.log(response);
              sdkInitiated = true;
            },
            (error) => {
              console.log(error);
            }
          );
        });
      });
    };

    window.start = start;
  }, []);

  const start = () => {
    window.start();
  };

  return (
    <>
      <button onClick={start}>Start</button>
      <div id="websdk"></div>
    </>
  );
};

export default SocureComponent;
