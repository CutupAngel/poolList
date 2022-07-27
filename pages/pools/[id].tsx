import { useEffect, useState } from "react";
import useSWR from "swr";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import usePool from "../../contexts/usePools";
import Link from "next/link";
import { IActionType, IPool } from "../../interfaces";
import Pagination from "../../components/Pagination";

const TransactionTypes = ["Swap", "Mint", "Burn"];

const DetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const {
    pools,
    currentPool,
    setCurrentPool,
    storedPools,
    setStoredPools,
    setLocalStorage,
  } = usePool();
  const [txsList, setTxsList] = useState<IActionType[]>([]);
  const [selectedTxType, setSelectedTxType] = useState<string>("0");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [indexOfCurPool, setIndexOfCurPool] = useState<number>(-1);

  const handleSelect = (e: any) => {
    const selTxType = e.target.value;
    setSelectedTxType(selTxType);
  };

  const calcBtwDays = (timestamp: string) => {
    const now = new Date().getTime();
    const diffMilliSecs = now / 1000 - +timestamp;
    const diffDays = Math.floor(diffMilliSecs / (3600 * 24));
    const diffHours = Math.floor(diffMilliSecs / 3600);
    return diffDays ? diffDays + "D ago" : diffHours + "H ago";
  };

  const handleAddWatchList = () => {
    if (indexOfCurPool !== -1) {
      storedPools.splice(indexOfCurPool, 1);
    } else {
      storedPools.push(currentPool);
    }
    setLocalStorage(storedPools);
    const indexCurPool = storedPools.findIndex(
      (item) => item.id === currentPool.id
    );
    setIndexOfCurPool(indexCurPool);
  };

  useEffect(() => {
    if (!currentPool) return;
    if (+selectedTxType === 0) {
      setTxsList(currentPool.swaps);
    } else if (+selectedTxType === 1) {
      setTxsList(currentPool.mints);
    } else if (+selectedTxType === 2) {
      setTxsList(currentPool.burns);
    }
  }, [selectedTxType, currentPool]);

  useEffect(() => {
    setTotalPage(
      Math.floor(txsList.length / 6) + (txsList.length % 6 !== 0 ? 1 : 0)
    );
    setCurrentPage(1);
  }, [txsList]);

  useEffect(() => {
    let cPool = currentPool;
    if (!cPool) {
      cPool = pools.find((item) => item.id === id);
      setCurrentPool(cPool);
    }
    const indexOfCurPool =
      cPool && storedPools.findIndex((item) => item.id === cPool.id);
    setIndexOfCurPool(indexOfCurPool);
  });

  return (
    <>
      {currentPool ? (
        <div className="md:max-w-[90%] max-w-full m-auto md:p-8 p-2">
          <Link href="/" className="py-2">
            &larr; Back to Pools
          </Link>
          <div className="py-2 flex justify-between flex-col md:flex-row">
            <div className="text-3xl">
              {currentPool.token0.name === "NFT"
                ? "NFT"
                : currentPool.token0.symbol}
              /
              {currentPool.token0.name === "NFT"
                ? "NFT"
                : currentPool.token1.symbol}
            </div>
            <button
              className={`border ${
                indexOfCurPool !== -1 ? "bg-yellow-400" : "bg-blue-400"
              } rounded-md text-white p-1`}
              onClick={handleAddWatchList}
            >
              {indexOfCurPool !== -1 ? <>&#9733;</> : <>&#9734;</>} Add to
              Watchlist
            </button>
          </div>
          <div className="grid grid-cols-12 py-6">
            <div className="md:col-span-4 col-span-12 px-2 pt-2 pb-8 border border-black rounded-md">
              <div className="grid grid-cols-4">
                <div className="md:col-span-3 col-span-2 text-left">
                  <p className="font-bold">Tokens value (USD)</p>
                </div>
                <div className="md:col-span-1 col-span-2">
                  <p className="font-bold">TX Count</p>
                </div>
              </div>
              <div className="grid grid-cols-4">
                <div className="md:col-span-3 col-span-2 text-left">
                  <div>{currentPool.token0.symbol}</div>
                  <div>{currentPool.token1.symbol}</div>
                </div>
                <div className="md:col-span-1 col-span-2">
                  <div>{currentPool.txCount}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="py-6">
            <div className="flex justify-start py-4">
              <p className="text-3xl mr-2">Transactions</p>
              <select
                className="border border-black rounded-sm px-4"
                name="transactions"
                id="transactions"
                onChange={(e) => handleSelect(e)}
                value={selectedTxType}
              >
                {TransactionTypes.map((item, index) => (
                  <option value={index} key={index}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-2 border-black border-2 rounded-lg p-2">
              <div className="grid grid-cols-12 gap-1 p-2 border-b-2 border-black">
                <div className="md:col-span-7 col-span-9 text-left">
                  Link to Etherscan
                </div>
                <div className="md:col-span-1 md:block hidden text-center">
                  TX Type
                </div>
                <div className="md:col-span-2 md:block hidden text-center">
                  Token Amount (USD)
                </div>
                <div className="md:col-span-2 col-span-3 text-center">
                  Timestamp
                </div>
              </div>
              {txsList && txsList.length > 0 ? (
                <Pagination
                  currentPage={currentPage}
                  totalPage={totalPage}
                  setCurrentPage={setCurrentPage}
                >
                  <>
                    {txsList
                      .slice((currentPage - 1) * 6, currentPage * 6)
                      .map((item) => (
                        <div
                          className="grid grid-cols-12 gap-1 p-2 text-sm"
                          key={item.id}
                        >
                          <div className="md:col-span-7 col-span-9 text-left md:block hidden cursor-pointer">
                            <a
                              href={`https://etherscan.io/tx/${item.transaction.id}`}
                            >
                              https://etherscan.io/tx/
                              {item.transaction.id.substring(0, 12) + "..."}
                            </a>
                          </div>
                          <div className="md:col-span-7 col-span-9 text-left md:hidden block cursor-pointer">
                            <a
                              href={`https://etherscan.io/tx/${item.transaction.id}`}
                            >
                              https://etherscan.io/tx/
                              {item.transaction.id.substring(0, 4) + "..."}
                            </a>
                          </div>
                          <div className="md:col-span-1 md:block hidden text-center">
                            {TransactionTypes[+selectedTxType]}
                          </div>
                          <div className="md:col-span-2 md:block hidden text-center">
                            ${(+item.amountUSD.toString()).toFixed(2)}
                          </div>
                          <div className="md:col-span-2 col-span-3 text-center">
                            {calcBtwDays(item.transaction.timestamp)}
                          </div>
                        </div>
                      ))}
                  </>
                </Pagination>
              ) : (
                <div className="text-center">No Lits</div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">Loading....</div>
      )}
    </>
  );
};

export default DetailPage;
