import type { AppProps } from "next/app";
import usePool from "../contexts/usePools";
import { PoolContextApp } from "../contexts/usePools";
import "../styles/globals.css";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <PoolContextApp>
      <Component {...pageProps} />
    </PoolContextApp>
  );
};
export default MyApp;
