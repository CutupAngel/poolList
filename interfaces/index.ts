// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

import { BigNumber } from "ethers";

export type User = {
  id: number;
  name: string;
};

export type IToken = {
  id: string;
  name: string;
  symbol: string;
  totalValueLocked: string;
};

export type ITransaction = {
  id: string;
  timestamp: string;
  gasPrice: BigNumber;
};

export type IActionType = {
  id: string;
  amountUSD: BigNumber;
  transaction: ITransaction;
};

export type IPool = {
  id: string;
  token0: IToken;
  token1: IToken;
  totalValueLockedUSD: BigNumber;
  volumeUSD: BigNumber;
  totalValueLockedETH: BigNumber;
  txCount: BigInt;
  swaps: IActionType[];
  burns: IActionType[];
  mints: IActionType[];
};

export type TPoolContext = {
  pools: IPool[];
  loading: boolean;
  currentPool: IPool;
  setCurrentPool: Function;
  storedPools: IPool[];
  setStoredPools: Function;
  setLocalStorage: Function;
};
