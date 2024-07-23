import { NextUIProvider } from "@nextui-org/react";
import "../styles/globals.css"; // Убедитесь, что путь к глобальным стилям правильный

function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}

export default MyApp;
