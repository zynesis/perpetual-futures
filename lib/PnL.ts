import { BigDenary, BDNumberInput } from "https://deno.land/x/bigdenary/mod.ts";
import { Position } from "./enum.ts";

export interface ConstructorOptions {
  position: Position;
  leverage: number;
  entry: BDNumberInput;
  exit: BDNumberInput;
  quantity: BDNumberInput;
}

export interface Result {
  initialMargin: BigDenary;
  profit: BigDenary;
  returnOnEquity: BigDenary;
}

export class PnL {
  position: Position;
  leverage: number;
  entry: BigDenary;
  exit: BigDenary;
  quantity: BigDenary;

  constructor(options: ConstructorOptions) {
    this.position = options.position;
    this.leverage = options.leverage;
    this.entry = new BigDenary(options.entry);
    this.exit = new BigDenary(options.exit);
    this.quantity = new BigDenary(options.quantity);
  }

  get result(): Result {
    const initialMargin = this.entry.mul(this.quantity).div(this.leverage);
    const profit = this.exit.sub(this.entry).mul(this.quantity).mul(
      this.position,
    );
    const returnOnEquity = profit.div(initialMargin);
    return {
      initialMargin,
      profit,
      returnOnEquity,
    };
  }
}
