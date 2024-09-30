import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import federation from '@originjs/vite-plugin-federation';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "host",
      remotes: {
        // 원격 애플리케이션의 설정 (remoteApp)
        remoteApp: "http://localhost:5174/dist/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom"], // 공유할 모듈
    }),
  ],
  build: {
    target: 'esnext',
  },
});
