import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Liquidation } from "./Liquidation.ts";
import { Position } from "./enum.ts";

Deno.test("Liquidation (Long)", () => {
  let liq: Liquidation;
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

  assertEquals(
    new Liquidation({
      position: Position.Long,
      entry: "9500",
      quantity: "5.12",
      wallet: "2000",
      minMaintainMargin: "0.1", // 10%
    }).result.toFixed(2),
    "9148.44",
  );

  assertEquals(
    new Liquidation({
      position: Position.Long,
      entry: "9500",
      quantity: "5.12",
      wallet: "2000",
      minMaintainMargin: "0.99", // 99%
    }).result.toFixed(2),
    "9496.09",
  );
});

Deno.test("Liquidation (Short)", () => {
  let liq: Liquidation;
  assertEquals(
    new Liquidation({
      position: Position.Short,
      entry: "9500",
      quantity: "5.12",
      wallet: "2000",
      minMaintainMargin: "0.005", // 0.5%
    }).result.toFixed(2),
    "9888.67",
  );

  assertEquals(
    new Liquidation({
      position: Position.Short,
      entry: "9500",
      quantity: "5.12",
      wallet: "2000",
      minMaintainMargin: "0.1", // 10%
    }).result.toFixed(2),
    "9851.56",
  );

  assertEquals(
    new Liquidation({
      position: Position.Short,
      entry: "9500",
      quantity: "5.12",
      wallet: "2000",
      minMaintainMargin: "0.99", // 99%
    }).result.toFixed(2),
    "9503.91",
  );
});
