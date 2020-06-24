import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { TargetPrice } from "./TargetPrice.ts";
import { Position } from "./enum.ts";

Deno.test("TargetPrice (Long)", () => {
  assertEquals(
    new TargetPrice({
      position: Position.Long,
      leverage: 20,
      entry: "9500",
      returnOnEquity: "0.25",
    }).result.toFixed(2),
    "9618.75",
  );

  assertEquals(
    new TargetPrice({
      position: Position.Long,
      leverage: 92,
      entry: "9500",
      returnOnEquity: "0.25",
    }).result.toFixed(2),
    "9525.82",
  );

  assertEquals(
    new TargetPrice({
      position: Position.Long,
      leverage: 100,
      entry: "9500",
      returnOnEquity: "1", // 100%
    }).result.toFixed(2),
    "9595.00",
  );
});

Deno.test("TargetPrice (Short)", () => {
  assertEquals(
    new TargetPrice({
      position: Position.Short,
      leverage: 20,
      entry: "9500",
      returnOnEquity: "0.25",
    }).result.toFixed(2),
    "9381.25",
  );

  assertEquals(
    new TargetPrice({
      position: Position.Short,
      leverage: 92,
      entry: "9500",
      returnOnEquity: "0.25",
    }).result.toFixed(2),
    "9474.18",
  );

  assertEquals(
    new TargetPrice({
      position: Position.Short,
      leverage: 100,
      entry: "9500",
      returnOnEquity: "1", // 100%
    }).result.toFixed(2),
    "9405.00",
  );
});
