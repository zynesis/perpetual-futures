import { BigDenary, BDNumberInput } from "https://deno.land/x/bigdenary/mod.ts";
import { Position } from "./enum.ts";

export interface TargetPriceInputs {
  position: Position;
  leverage: number;
  entry: BDNumberInput;
  returnOnEquity: BDNumberInput // 1 for 100%, 0.5 for 50%
  ;
}

export class TargetPrice {
  position: Position;
  leverage: number;
  entry: BigDenary;
  returnOnEquity: BigDenary; // 1 for 100%, 0.5 for 50%

  constructor(options: TargetPriceInputs) {
    this.position = options.position;
    this.leverage = options.leverage;
    this.entry = new BigDenary(options.entry);
    this.returnOnEquity = new BigDenary(options.returnOnEquity);
  }

  get result(): BigDenary {
    const diff = this.returnOnEquity.div(this.leverage);
    let fromEntry: BigDenary;
    if (this.position === Position.Long) {
      fromEntry = diff.plus(1);
    } else {
      fromEntry = new BigDenary(1).sub(diff);
    }
    return fromEntry.mul(this.entry);
  }
}
