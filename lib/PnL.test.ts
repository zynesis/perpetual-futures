import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std/testing/asserts.ts";
import { PnL, Position } from "./PnL.ts";

Deno.test("PnL (Long)", () => {
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
  assertEquals(pnl.result.returnOnEquity.mul(100).toFixed(4), "1.0798"); // %

  pnl = new PnL({
    position: Position.Long,
    leverage: 25,
    entry: "9500",
    exit: "9602.58",
    quantity: "5.12",
  });
  assertEquals(pnl.result.initialMargin.valueOf(), 1945.6);
  assertEquals(pnl.result.profit.valueOf(), 525.2096);
  assertEquals(pnl.result.returnOnEquity.mul(100).toFixed(2), "26.99"); // %

  pnl = new PnL({
    position: Position.Long,
    leverage: 100,
    entry: "9500",
    exit: "9602.58",
    quantity: "5.132",
  });
  assertEquals(pnl.result.initialMargin.valueOf(), 487.54);
  assertEquals(pnl.result.profit.toFixed(2), "526.44");
  assertEquals(pnl.result.returnOnEquity.mul(100).toFixed(2), "107.98"); // %

  pnl = new PnL({
    position: Position.Long,
    leverage: 100,
    entry: "9500",
    exit: "9402.58",
    quantity: "5.132",
  });
  assertEquals(pnl.result.initialMargin.valueOf(), 487.54);
  assertEquals(pnl.result.profit.toFixed(2), "-499.96");
  assertEquals(pnl.result.returnOnEquity.mul(100).toFixed(2), "-102.55"); // %
});

Deno.test("PnL (Short)", () => {
  let pnl: PnL;
  pnl = new PnL({
    position: Position.Short,
    leverage: 1,
    entry: "9500",
    exit: "9602.58",
    quantity: "5.12",
  });
  assertEquals(pnl.result.initialMargin.valueOf(), 48640);
  assertEquals(pnl.result.profit.valueOf(), -525.2096);
  assertEquals(pnl.result.returnOnEquity.mul(100).toFixed(4), "-1.0798"); // %

  pnl = new PnL({
    position: Position.Short,
    leverage: 25,
    entry: "9500",
    exit: "9602.58",
    quantity: "5.12",
  });
  assertEquals(pnl.result.initialMargin.valueOf(), 1945.6);
  assertEquals(pnl.result.profit.valueOf(), -525.2096);
  assertEquals(pnl.result.returnOnEquity.mul(100).toFixed(2), "-26.99"); // %

  pnl = new PnL({
    position: Position.Short,
    leverage: 100,
    entry: "9500",
    exit: "9602.58",
    quantity: "5.132",
  });
  assertEquals(pnl.result.initialMargin.valueOf(), 487.54);
  assertEquals(pnl.result.profit.toFixed(2), "-526.44");
  assertEquals(pnl.result.returnOnEquity.mul(100).toFixed(2), "-107.98"); // %

  pnl = new PnL({
    position: Position.Short,
    leverage: 100,
    entry: "9500",
    exit: "9402.58",
    quantity: "5.132",
  });
  assertEquals(pnl.result.initialMargin.valueOf(), 487.54);
  assertEquals(pnl.result.profit.toFixed(2), "499.96");
  assertEquals(pnl.result.returnOnEquity.mul(100).toFixed(2), "102.55"); // %
});
