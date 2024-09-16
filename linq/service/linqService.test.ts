import { describe, it, expect } from "vitest";
import { LinqService } from "./linqService";

describe("LinqService", () => {
  describe("Where", () => {
    it("should filter the sequence based on the predicate", () => {
      const numbers = [1, 2, 3, 4, 5];
      const predicate = (n: number) => n > 2;

      const result = LinqService.from(numbers).where(predicate);

      expect(result).toEqual([3, 4, 5]);
    });
  });

  describe("Select", () => {
    it("should map the sequence based on the selector function", () => {
      const numbers = [1, 2, 3];
      const selector = (n: number) => n * 2;

      const result = LinqService.from(numbers).select(selector);

      expect(result).toEqual([2, 4, 6]);
    });
  });

  describe("OrderBy", () => {
    it("should sort the sequence in ascending order by the key selector", () => {
      const items = [{ age: 30 }, { age: 20 }, { age: 25 }];
      const keySelector = (item: { age: number }) => item.age;

      const result = LinqService.from(items).orderBy(keySelector);

      expect(result).toEqual([{ age: 20 }, { age: 25 }, { age: 30 }]);
    });
  });

  describe("OrderByDescending", () => {
    it("should sort the sequence in descending order by the key selector", () => {
      const items = [{ age: 30 }, { age: 20 }, { age: 25 }];

      const keySelector = (item: { age: number }) => item.age;
      const result = LinqService.from(items).orderByDescending(keySelector);

      expect(result).toEqual([{ age: 30 }, { age: 25 }, { age: 20 }]);
    });
  });

  describe("First", () => {
    it("should return the first element of a non-empty sequence", () => {
      const numbers = [1, 2, 3];

      const result = LinqService.from(numbers).first();

      expect(result).toBe(1);
    });

    it("should throw an error if the sequence is empty", () => {
      const numbers: number[] = [];
      expect(() => LinqService.from(numbers).first()).toThrowError(
        "InvalidOperationException"
      );
    });
  });

  describe("FirstOrDefault", () => {
    it("should return the first element of a non-empty sequence", () => {
      const numbers = [1, 2, 3];

      const result = LinqService.from(numbers).firstOrDefault(0);

      expect(result).toBe(1);
    });

    it("should return the default value if the sequence is empty", () => {
      const numbers: number[] = [];

      const result = LinqService.from(numbers).firstOrDefault(0);

      expect(result).toBe(0);
    });
  });

  describe("Count", () => {
    it("should return the number of elements in the sequence", () => {
      const numbers = [1, 2, 3];

      const result = LinqService.from(numbers).count();

      expect(result).toBe(3);
    });
  });

  describe("Any", () => {
    it("should return true if any element satisfies the condition", () => {
      const numbers = [1, 2, 3];
      const predicate = (n: number) => n > 2;

      const result = LinqService.from(numbers).any(predicate);

      expect(result).toBe(true);
    });

    it("should return false if no element satisfies the condition", () => {
      const numbers = [1, 2, 3];
      const predicate = (n: number) => n > 3;

      const result = LinqService.from(numbers).any(predicate);

      expect(result).toBe(false);
    });
  });

  describe("All", () => {
    it("should return true if all elements satisfy the condition", () => {
      const numbers = [2, 4, 6];
      const predicate = (n: number) => n % 2 === 0;

      const result = LinqService.from(numbers).all(predicate);

      expect(result).toBe(true);
    });

    it("should return false if any element does not satisfy the condition", () => {
      const numbers = [1, 2, 3];
      const predicate = (n: number) => n % 2 === 0;

      const result = LinqService.from(numbers).all(predicate);

      expect(result).toBe(false);
    });
  });

  describe("Distinct", () => {
    it("should return only distinct elements", () => {
      const numbers = [1, 2, 2, 3, 3, 3];

      const result = LinqService.from(numbers).distinct();

      expect(result).toEqual([1, 2, 3]);
    });
  
    it("should return an empty array if there are no elements", () => {
      const numbers: number[] = [];

      const result = LinqService.from(numbers).distinct();
      
      expect(result).toEqual([]);
    });
  });
  

  describe("GroupBy", () => {
    it("should group elements by the key selector", () => {
      const items = [{ age: 30 }, { age: 20 }, { age: 30 }];
      const keySelector = (item: { age: number }) => item.age;

      const result = LinqService.from(items).groupBy(keySelector);

      expect(result.get(30)).toEqual([{ age: 30 }, { age: 30 }]);
      expect(result.get(20)).toEqual([{ age: 20 }]);
    });
  });

  describe("Average", () => {
    it("should return the average of the selected values", () => {
      const numbers = [1, 2, 3, 4, 5];
      const selector = (n: number) => n;

      const result = LinqService.from(numbers).average(selector);

      expect(result).toBe(3);
    });

    it("should throw an error if there are no elements", () => {
      const numbers: number[] = [];
      const selector = (n: number) => n;

      expect(() => LinqService.from(numbers).average(selector)).toThrowError("InvalidOperationException");
    });
  });

  describe("Max", () => {
    it("should return the maximum value from the selected values", () => {
      const numbers = [1, 2, 3, 4, 5];
      const selector = (n: number) => n;

      const result = LinqService.from(numbers).max(selector);

      expect(result).toBe(5);
    });

    it("should throw an error if there are no elements", () => {
      const numbers: number[] = [];
      const selector = (n: number) => n;

      expect(() => LinqService.from(numbers).max(selector)).toThrowError("InvalidOperationException");
    });
  });

  describe("Min", () => {
    it("should return the minimum value from the selected values", () => {
      const numbers = [1, 2, 3, 4, 5];
      const selector = (n: number) => n;

      const result = LinqService.from(numbers).min(selector);

      expect(result).toBe(1);
    });

    it("should throw an error if there are no elements", () => {
      const numbers: number[] = [];
      const selector = (n: number) => n;

      expect(() => LinqService.from(numbers).min(selector)).toThrowError("InvalidOperationException");
    });
  });

  describe("Sum", () => {
    it("should return the sum of the selected values", () => {
      const numbers = [1, 2, 3, 4, 5];
      const selector = (n: number) => n;

      const result = LinqService.from(numbers).sum(selector);

      expect(result).toBe(15);
    });

    it("should return 0 if there are no elements", () => {
      const numbers: number[] = [];
      const selector = (n: number) => n;

      const result = LinqService.from(numbers).sum(selector);

      expect(result).toBe(0);
    });
  });

});
