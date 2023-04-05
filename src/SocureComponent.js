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
    let eventId = "";

    const onProgress = (progress) => {
      // console.log(progress);
      // console.log('progress');
    };

    const onSuccess = (response) => {
      if (eventId != "") {
        //console.log(response);
        // console.log('success');
        if (typeof onSuccessCallback === 'function') {
          onSuccessCallback(response);
          eventId = ""
          document.getElementById("results").innerHTML = "Document Verification Process succesfully completed!";
          document.getElementById("websdk").style.display = "none"
        }
      }
    };

    const onError = (error) => {
      if (eventId != "") {
        // console.log(error);
        // console.log('error');
        if (typeof onErrorCallback === 'function') {
          onErrorCallback(error);
          eventId = ""
          document.getElementById("results").innerHTML = "Document Verification Process failed!";
          document.getElementById("websdk").style.display = "none"
        }
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
              eventId = response.eventId;
              document.getElementById("websdk").style.display = "block"    
              document.getElementById("results").style.display = "none"    
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
      <div id="results"></div>
    </>
  );
};

export default SocureComponent;
