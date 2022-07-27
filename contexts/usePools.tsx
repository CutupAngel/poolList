import React, { useEffect, useRef, useState } from "react";
import { ReactElement } from "react";
import useSWR from "swr";
import { fetchQuery } from "../config";
import { fetcher } from "../utils";
import { IPool, TPoolContext } from "../interfaces";

const PoolContext = React.createContext<TPoolContext>({} as TPoolContext);

export const PoolContextApp = ({
  children,
}: {
  children: ReactElement;
}): ReactElement => {
  const { data } = useSWR(
    ["https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3", fetchQuery],
    fetcher
  );
  const [pools, setPools] = useState<IPool[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPool, setCurrentPool] = useState<IPool>();
  const [storedPools, setStoredPools] = useState<IPool[]>([]);

  const setLocalStorage = (data: IPool[]) => {
    localStorage.setItem("watchLists", JSON.stringify([...data]));
    setStoredPools(data);
  };

  useEffect(() => {
    if (data) {
      setPools(data.pools);
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    if (!storedPools || storedPools.length === 0) {
      const storedPools: IPool[] = JSON.parse(
        localStorage.getItem("watchLists")
      );
      setStoredPools(storedPools);
    }
  });

  return (
    <PoolContext.Provider
      value={{
        pools,
        loading,
        currentPool,
        setCurrentPool,
        storedPools,
        setStoredPools,
        setLocalStorage,
      }}
    >
      {children}
    </PoolContext.Provider>
  );
};

export const usePool = (): TPoolContext => React.useContext(PoolContext);
export default usePool;
