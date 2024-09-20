import { describe, expect, test } from "vitest";
import { getWhere } from "./linqApi";

describe("getWhere", () => {
  test("filtering by age should return correct results", async () => {
    const sampleData = JSON.stringify([
      { name: "Alice", age: 20 },
      { name: "Bob", age: 22 },
      { name: "Charlie", age: 25 }
    ]);

    const predicate = "item.age > 21";

    // Act: Call the getWhere function with sample data and predicate
    const response = await getWhere({ data: encodeURIComponent(sampleData), predicate });

    // Assert: Check that the response contains the correct filtered results
    expect(response.result).toEqual([
      { name: "Bob", age: 22 },
      { name: "Charlie", age: 25 }
    ]);
  });

  test("filtering by a non-matching predicate should return an empty array", async () => {
    const sampleData = JSON.stringify([
      { name: "Alice", age: 20 },
      { name: "Bob", age: 22 }
    ]);

    const predicate = "item.age > 30";

    // Act: Call the getWhere function with sample data and predicate
    const response = await getWhere({ data: encodeURIComponent(sampleData), predicate });

    // Assert: Check that the response contains an empty array
    expect(response.result).toEqual([]);
  });
});