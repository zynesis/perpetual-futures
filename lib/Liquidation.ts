import { BigDenary, BDNumberInput } from "https://deno.land/x/bigdenary/mod.ts";
import { Position } from "./enum.ts";

interface LiquidationInputs {
  position: Position;
  entry: BDNumberInput; // USD
  quantity: BDNumberInput; // BTC
  wallet: BDNumberInput; // USD
  minMaintainMargin: BDNumberInput; // Minimum maintenance margin percentage, range: 0 - 1
}

export class Liquidation {
  position: Position;
  entry: BigDenary; // USD
  quantity: BigDenary; // BTC
  wallet: BigDenary; // USD
  minMaintainMargin: BigDenary; // Minimum maintenance margin percentage, range: 0 - 1

  constructor(options: LiquidationInputs) {
    this.position = options.position;
    this.entry = new BigDenary(options.entry);
    this.quantity = new BigDenary(options.quantity);
    this.wallet = new BigDenary(options.wallet);
    this.minMaintainMargin = new BigDenary(options.minMaintainMargin);
    if (this.minMaintainMargin.lt(0) || this.minMaintainMargin.gte(1)) {
      throw new Error("minMaintainMargin should be between 0 and 1");
    }
  }

  get result(): BigDenary {
    const diff = this.wallet.mul(new BigDenary(1).sub(this.minMaintainMargin))
      .div(this.quantity);
    if (this.position === Position.Long) {
      return this.entry.sub(diff);
    }
    return this.entry.add(diff);
  }
}
