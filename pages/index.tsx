import { useEffect, useState } from "react";
import useSWR from "swr";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import WatchList from "../components/WatchList";
import PoolLists from "../components/PoolLists";
import { fetchQuery } from "../config";
import { fetcher } from "../utils";
import usePool from "../contexts/usePools";
import { IPool } from "../interfaces";

const IndexPage: NextPage = () => {
  const { pools, loading, setCurrentPool, storedPools } = usePool();
  const router = useRouter();

  const handleClickPool = (item: IPool) => {
    setCurrentPool(item);
    router.push(`pools/${item.id}`);
  };

  return (
    <div className="md:max-w-[90%] max-w-full m-auto md:p-8 p-2">
      {!loading ? (
        <>
          <WatchList watchLists={storedPools} handleClick={handleClickPool} />
          <PoolLists poolLists={pools} handleClick={handleClickPool} />
        </>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
};

export default IndexPage;
