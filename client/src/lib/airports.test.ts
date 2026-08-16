import { describe, expect, it } from "vitest";
import { airportValue, searchAirports } from "./airports";

describe("fourtee2travel airport directory", () => {
  it("matches airport code, city, and airport name with an upper suggestion limit", () => {
    expect(searchAirports("PER")).toMatchObject([{ code: "PER", city: "Perth" }]);
    expect(searchAirports("heathrow")).toMatchObject([{ code: "LHR", city: "London" }]);
    expect(searchAirports("Tokyo")).toHaveLength(2);
    expect(searchAirports("", 3)).toHaveLength(3);
  });

  it("formats a selected airport as a clear route coordinate", () => {
    expect(airportValue({ code: "SIN", city: "Singapore", airport: "Changi", country: "Singapore" })).toBe("Singapore (SIN)");
  });
});
