# perpetual-futures
Calculator for perpetual swaps/futures.

Primarily a [Deno](https://deno.land) module. To be released as ES module and CommonJS module.

Calculates:
- Profit & loss
- Target price
- Liquidation price

<img src="https://i.imgur.com/j8I04jK.png" width="564" alt="Perpetual future calculator from Binance">

## Usage

```ts
import { Position, PnL, TargetPrice, Liquidation } from "https://raw.githubusercontent.com/zynesis/perpetual-futures/master/mod.ts";

/**
 * Profit & loss
 */

const pnl = new PnL({
  position: Position.Short,
  leverage: 25, // 25x
  entry: "9500", // USDT
  exit: "9402.58", // USDT
  quantity: "5.12", // BTC
});

console.log(pnl.result.initialMargin.toFixed(2)); // 1945.60 USDT
console.log(pnl.result.profit.toFixed(2)); // 498.79 USDT
console.log(pnl.result.returnOnEquity.mul(100).toFixed(2)); // 25.64%

/**
 * Target price
 */

const targetPrice = new TargetPrice({
  position: Position.Long,
  leverage: 100, // 100x
  entry: "9500", // USDT
  returnOnEquity: "0.25", // 25%
});

console.log(targetPrice.result.toFixed(2)); // 9523.75 USDT

/**
 * Liquidation price
 */

const liquidation = new Liquidation({
  position: Position.Long,
  entry: "9500", // USDT
  quantity: "5.12", // BTC
  wallet: "5000", // USDT
  minMaintainMargin: "0.005", // 0.5%
});

console.log(liquidation.result.toFixed(2)); // 8528.32 USDT
```

## Develop and running of tests

1. Install [Deno](http://deno.land)

2. Run unit tests

  ```bash
  deno test
  ```

## License

MIT &middot; [Zynesis](https://zynesis.com)

Contributions are welcomed.
