export class LinqService<T> {
  private data: T[];

  constructor(data: T[]) {
    this.data = data;
  }

  public static from<T>(data: T[]): LinqService<T> {
    return new LinqService<T>(data);
  }

  public where(predicate: (item: T) => boolean): LinqService<T> {
    this.data = this.data.filter(predicate);
    return this; //builder design pattern - tim hieu them ve implementation
  }

  public select<TResult>(selector: (item: T) => TResult): LinqService<TResult> {
    const result = this.data.map(selector);
    return new LinqService<TResult>(result); 
  }

  public orderBy<TKey>(keySelector: (item: T) => TKey): LinqService<T> {
    this.data = [...this.data].sort((a, b) => {
      const keyA = keySelector(a);
      const keyB = keySelector(b);

      return keyA > keyB ? 1 : keyA < keyB ? -1 : 0;
    });
    return this; 
  }

  public orderByDescending<TKey>(keySelector: (item: T) => TKey): LinqService<T> {
    this.data = [...this.data].sort((a, b) => {
      const keyA = keySelector(a);
      const keyB = keySelector(b);
      return keyA < keyB ? 1 : keyA > keyB ? -1 : 0;
    });
    return this; 
  }

  public first(): T {
    if (this.data.length === 0) {
      throw new Error("InvalidOperationException");
    }
    return this.data[0];
  }

  public firstOrDefault(defaultValue: T): T {
    return this.data.length > 0 ? this.data[0] : defaultValue;
  }

  public count(): number {
    return this.data.length;
  }

  public any(predicate: (item: T) => boolean): boolean {
    return this.data.some(predicate);
  }

  public all(predicate: (item: T) => boolean): boolean {
    return this.data.every(predicate);
  }

  public distinct(): LinqService<T> {
    this.data = [...new Set(this.data)];
    return this; // Return the current instance for chaining
  }

  public groupBy<TKey>(keySelector: (item: T) => TKey): Map<TKey, T[]> {
    const map = new Map<TKey, T[]>();
    for (const item of this.data) {
      const key = keySelector(item);

      if (!map.has(key)) {
        map.set(key, []);
      }

      map.get(key)!.push(item);
    }

    return map; // Return the group by result
  }

  // Update aggregate functions like average, max, min, sum to return a number, no chaining needed
  public average(selector: (item: T) => number): number {
    if (this.data.length == 0) {
      throw new Error("InvalidOperationException");
    }

    const values = this.select(selector).data;
    const sum = values.reduce((a, b) => a + b, 0);

    return sum / values.length;
  }

  public max(selector: (item: T) => number): number {
    if (this.data.length == 0) {
      throw new Error("InvalidOperationException");
    }

    return Math.max(...this.select(selector).data);
  }

  public min(selector: (item: T) => number): number {
    if (this.data.length == 0) {
      throw new Error("InvalidOperationException");
    }

    return Math.min(...this.select(selector).data);
  }

  public sum(selector: (item: T) => number): number {
    const values = this.select(selector).data;

    return values.length == 0 ? 0 : values.reduce((a, b) => a + b, 0);
  }

  // Finally, add a toArray method to return the processed data
  public toArray(): T[] {
    return this.data;
  }
}
