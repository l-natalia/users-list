import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { mswServer } from "../mocks/mswServer";
import { Provider } from "react-redux";
import store from "../store";
import("../mocks").then(({ setupMocks }) => {
  setupMocks();
});
mswServer.listen();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
