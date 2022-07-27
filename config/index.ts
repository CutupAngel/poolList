export const fetchQuery = `
{
  pools {
    id
    token0 {
      id
      name
      symbol
      totalValueLocked
    }
    token1 {
      id
      name
      symbol
      totalValueLocked
    }
    totalValueLockedUSD
    volumeUSD
    totalValueLockedETH
    txCount
    swaps {
      id
      amountUSD
      transaction {
        id
        timestamp
        gasPrice
      }
    }
    burns {
      id
      amountUSD
      transaction{
        id
        timestamp
        gasPrice
      }
    }
    mints {
      id
      amountUSD
      transaction{
        id
        timestamp
        gasPrice
      }
    }
  }
}`;
