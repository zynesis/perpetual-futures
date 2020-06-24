import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Position, PnL, TargetPrice, Liquidation } from "./mod.ts";

Deno.test("PnL", () => {
  const pnl = new PnL({
    position: Position.Short,
    leverage: 1,
    entry: "9500",
    exit: "9602.58",
    quantity: "5.12",
  });
  assertEquals(pnl.result.initialMargin.valueOf(), 48640);
  assertEquals(pnl.result.profit.valueOf(), -525.2096);
  assertEquals(pnl.result.returnOnEquity.mul(100).toFixed(4), "-1.0798"); // %
});

Deno.test("TargetPrice", () => {
  assertEquals(
    new TargetPrice({
      position: Position.Short,
      leverage: 92,
      entry: "9500",
      returnOnEquity: "0.25",
    }).result.toFixed(2),
    "9474.18",
  );
});

Deno.test("Liquidation", () => {
  assertEquals(
    new Liquidation({
      position: Position.Long,
      entry: "9500",
      quantity: "5.12",
      wallet: "2000",
      minMaintainMargin: "0.005", // 0.5%
    }).result.toFixed(2),
    "9111.33",
  );
});
