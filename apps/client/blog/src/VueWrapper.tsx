import { useEffect } from "react";
import { createApp } from "vue";

// @ts-expect-error
import RemoteComponent from 'remoteApp/Button'

const VueWrapper = () => {
  useEffect(() => {
    const vueApp = createApp(RemoteComponent);
    vueApp.mount("#vue-container");
  }, []);

  return <div id="vue-container"></div>;
};

export default VueWrapper;
