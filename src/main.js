import "./app.pcss";
import App from "./App.svelte";
import { appStarted } from "./model";

appStarted();

const app = new App({
  target: document.getElementById("app"),
});

export default app;
