import React, { useEffect, useState } from "react";
import { IPool } from "../interfaces";
import Pagination from "./Pagination";

type IWatchListProps = {
  watchLists?: Array<IPool>;
  handleClick: Function;
};

const WatchList = ({ watchLists, handleClick }: IWatchListProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);

  useEffect(() => {
    setTotalPage(
      Math.floor(watchLists.length / 3) + (watchLists.length % 3 !== 0 ? 1 : 0)
    );
  }, [watchLists]);

  return (
    <div className="py-4">
      <p className="text-4xl pb-2">Pool Watchlist</p>
      <div className="grid gap-2 border-black border-2 rounded-lg p-2">
        <div className="grid grid-cols-12 gap-1 p-2 border-b-2 border-black text-left">
          <div className="md:col-span-8 sm:col-span-3 col-span-6">Pool</div>
          <div className="md:col-span-1 col-span-3 sm:block hidden">
            TX Count
          </div>
          <div className="md:col-span-1 col-span-3 sm:block hidden">
            TVL (USD)
          </div>
          <div className="md:col-span-2 sm:col-span-3 col-span-6">
            Volume (USD)
          </div>
        </div>
        {watchLists && watchLists.length > 0 ? (
          <Pagination
            currentPage={currentPage}
            totalPage={totalPage}
            setCurrentPage={setCurrentPage}
          >
            <>
              {watchLists
                .slice((currentPage - 1) * 3, currentPage * 3)
                .map((item) => (
                  <div
                    className="grid grid-cols-12 gap-1 p-2 text-sm cursor-pointer"
                    key={item.id}
                    onClick={() => handleClick(item)}
                  >
                    <div className="md:col-span-8 sm:col-span-3 col-span-6 text-left">
                      {item.token0.name === "NFT" ? "NFT" : item.token0.symbol}/
                      {item.token0.name === "NFT" ? "NFT" : item.token1.symbol}
                    </div>
                    <div className="md:col-span-1 col-span-3 sm:block hidden text-center">
                      {item.txCount.toString()}
                    </div>
                    <div className="md:col-span-1 col-span-3 sm:block hidden text-center">
                      ${(+item.totalValueLockedUSD.toString()).toFixed(2)}
                    </div>
                    <div className="md:col-span-2 sm:col-span-3 col-span-6 text-center">
                      ${(+item.volumeUSD.toString()).toFixed(2)}
                    </div>
                  </div>
                ))}
            </>
          </Pagination>
        ) : (
          <div className="text-center">Add Watchlist</div>
        )}
      </div>
    </div>
  );
};

export default WatchList;
