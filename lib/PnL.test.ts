import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std/testing/asserts.ts";
import { PnL, Position } from "./PnL.ts";

Deno.test("PnL", () => {
  let pnl: PnL;
  pnl = new PnL({
    position: Position.Long,
    leverage: 1,
    entry: "9500",
    exit: "9602.58",
    quantity: "5.12",
  });
  assertEquals(pnl.result.initialMargin.valueOf(), 48640);
  assertEquals(pnl.result.profit.valueOf(), 525.2096);
  assertEquals(pnl.result.returnOnEquity.mul(100).toFixed(4), "1.0797"); // %

  pnl = new PnL({
    position: Position.Long,
    leverage: 25,
    entry: "9500",
    exit: "9602.58",
    quantity: "5.12",
  });
  assertEquals(pnl.result.initialMargin.valueOf(), 1945.6);
  assertEquals(pnl.result.profit.valueOf(), 525.2096);
  console.log(pnl.result.returnOnEquity);
  assertEquals(pnl.result.returnOnEquity.mul(100).toFixed(2), "26.99"); // %
});
