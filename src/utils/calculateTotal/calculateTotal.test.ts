import { describe, it, expect } from "vitest";
import { calculateTotal } from "./calculateTotal";

describe("calculateTotal", () => {
  it("returns 0 for empty string", () => {
    expect(calculateTotal("")).toBe(0);
  });

  it("sums comma-separated values", () => {
    expect(calculateTotal("100,200,300")).toBe(600);
  });

  it("sums newline-separated values", () => {
    expect(calculateTotal("100\n200\n300")).toBe(600);
  });

  it("sums mixed comma and newline-separated values", () => {
    expect(calculateTotal("100,200\n300")).toBe(600);
  });

  it("ignores invalid numbers", () => {
    expect(calculateTotal("100,abc,200")).toBe(300);
  });

  it("trims spaces and ignores empty values", () => {
    expect(calculateTotal(" 100 , 200 ,   , 300 ")).toBe(600);
  });
});
