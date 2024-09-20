import { describe, it, expect } from "vitest";
import { LinqService } from "./linqService";
import { Student } from "./student";

// prototype - extension of type
describe("LinqService", () => {
  describe("Where", () => {
    it("should filter a collection of number based on the predicate", () => {
      const numbers = [1, 2, 3, 4, 5];
      const predicate = (n: number) => n > 2;

      const result = LinqService.from(numbers).where(predicate).toArray();

      expect(result).toEqual([3, 4, 5]);
    });

    it("should filter a collection of students based on the predicate", () => {
      const students = [
        new Student(1, "John", 16, "A"),
        new Student(2, "Alice", 17, "B"),
        new Student(3, "Bob", 16, "A"),
      ];
      const predicate = (student: Student) => student.grade === "A";
  
      const result = LinqService.from(students).where(predicate).toArray();
  
      expect(result).toEqual([
        students[0], // John, grade A
        students[2], // Bob, grade A
      ]);
    });
  });

  describe("Select", () => {
    it("should map a collection of numbers based on selector function", () => {
        const numbers = [1, 2, 3, 4, 5];
        const selector = (n: number) => n * n;

        const result = LinqService.from(numbers).select(selector).toArray();

        expect(result).toEqual([1, 4, 9, 16, 25]);
    });

    it("should map a collection of students based on selector function", () => {
        const students = [
            new Student(1, "John", 16, "A"),
            new Student(2, "Alice", 17, "B"),
            new Student(3, "Bob", 16, "A"),
        ];
        const selector = (student: Student) => student.name;

        const result = LinqService.from(students).select(selector).toArray();

        expect(result).toEqual(["John", "Alice", "Bob"]);
    });
  });

  describe("OrderBy", () => {
    it("should order numbers in ascending order", () => {
        const numbers = [5, 3, 1, 4, 2];
        const keySelector = (n: number) => n;

        const result = LinqService.from(numbers).orderBy(keySelector).toArray();

        expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it("should order students by age in ascending order", () => {
        const students = [
            new Student(1, "John", 16, "A"),
            new Student(2, "Alice", 17, "B"),
            new Student(3, "Bob", 15, "A"),
        ];
        const keySelector = (student: Student) => student.age;

        const result = LinqService.from(students).orderBy(keySelector).toArray();

        expect(result).toEqual([students[2], students[0], students[1]]);
    });
  });

  describe("OrderByDescending", () => {
    it("should order numbers in descending order", () => {
        const numbers = [5, 3, 1, 4, 2];
        const keySelector = (n: number) => n;

        const result = LinqService.from(numbers).orderByDescending(keySelector).toArray();

        expect(result).toEqual([5, 4, 3, 2, 1]);
    });

    it("should order students by age in descending order", () => {
        const students = [
            new Student(1, "John", 16, "A"),
            new Student(2, "Alice", 17, "B"),
            new Student(3, "Bob", 15, "A"),
        ];
        const keySelector = (student: Student) => student.age;

        const result = LinqService.from(students).orderByDescending(keySelector).toArray();

        expect(result).toEqual([students[1], students[0], students[2]]);
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
    it("should return true if any number in the array satisfies the predicate", () => {
      const numbers = [1, 2, 3];
      const predicate = (n: number) => n > 2;

      const result = LinqService.from(numbers).any(predicate);

      expect(result).toBe(true);
    });

    it("should return true if any student satisfies the predicate", () => {
      const students = [
        new Student(1, "John", 16, "A"),
        new Student(2, "Alice", 17, "B"),
        new Student(3, "Bob", 15, "A"),
      ];
      const predicate = (student: Student) => student.grade === "A";

      const result = LinqService.from(students).any(predicate);

      expect(result).toBe(true);
    });

    it("should return false if no number in the array satisfies the condition", () => {
      const numbers = [1, 2, 3];
      const predicate = (n: number) => n > 3;

      const result = LinqService.from(numbers).any(predicate);

      expect(result).toBe(false);
    });

    it("should return false if no student satisfies the predicate", () => {
      const students = [
        new Student(1, "John", 16, "A"),
        new Student(2, "Alice", 17, "B"),
        new Student(3, "Bob", 15, "A"),
      ];
      const predicate = (student: Student) => student.grade === "C";

      const result = LinqService.from(students).any(predicate);

      expect(result).toBe(false);
    });
  });

  describe("All", () => {
    it("should return true if all numbers in the array satisfy the predicate", () => {
      // Arrange
      const numbers = [1, 2, 3];
      const predicate = (n: number) => n > 0;

      // Act
      const result = LinqService.from(numbers).all(predicate);

      // Assert
      expect(result).toBe(true);
    });

    it("should return true if all students satisfy the predicate", () => {
      // Arrange
      const students = [
        new Student(1, "John", 16, "A"),
        new Student(2, "Alice", 17, "A"),
        new Student(3, "Bob", 15, "A"),
      ];
      const predicate = (student: Student) => student.grade === "A";

      // Act
      const result = LinqService.from(students).all(predicate);

      // Assert
      expect(result).toBe(true);
    });

    it("should return false if any number in the array does not satisfy the predicate", () => {
      // Arrange
      const numbers = [1, 2, 3];
      const predicate = (n: number) => n > 1;

      // Act
      const result = LinqService.from(numbers).all(predicate);

      // Assert
      expect(result).toBe(false);
    });

    it("should return false if any student does not satisfy the predicate", () => {
      // Arrange
      const students = [
        new Student(1, "John", 16, "A"),
        new Student(2, "Alice", 17, "B"),
        new Student(3, "Bob", 15, "A"),
      ];
      const predicate = (student: Student) => student.grade === "A";

      // Act
      const result = LinqService.from(students).all(predicate);

      // Assert
      expect(result).toBe(false);
    });
  });

  describe("Distinct", () => {
    it("should return only distinct elements", () => {
      const numbers = [1, 2, 2, 3, 3, 3];

      const result = LinqService.from(numbers).distinct().toArray();

      expect(result).toEqual([1, 2, 3]);
    });
  
    it("should return an empty array if there are no elements", () => {
      const numbers: number[] = [];

      const result = LinqService.from(numbers).distinct().toArray();
      
      expect(result).toEqual([]);
    });
  });
  
  describe("GroupBy", () => {
    it("should group numbers by their value", () => {
      const numbers = [1, 2, 2, 3, 1, 4];
      const keySelector = (n: number) => n;

      const result = LinqService.from(numbers).groupBy(keySelector);

      // Convert the Map to an object for easier comparison
      const expected = new Map<number, number[]>([
          [1, [1, 1]],
          [2, [2, 2]],
          [3, [3]],
          [4, [4]],
      ]);

      expect(result).toEqual(expected);
    });

    it("should group students by grade", () => {
        const students = [
            new Student(1, "John", 16, "A"),
            new Student(2, "Alice", 17, "B"),
            new Student(3, "Bob", 15, "A"),
            new Student(4, "Eve", 16, "B"),
        ];
        const keySelector = (student: Student) => student.grade;

        const result = LinqService.from(students).groupBy(keySelector);

        // Convert the expected result to a Map
        const expected = new Map<string, Student[]>([
          ["A", [students[0], students[2]]],
          ["B", [students[1], students[3]]],
        ]);

        expect(result).toEqual(expected);
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
