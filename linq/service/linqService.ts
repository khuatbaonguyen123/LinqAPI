export class LinqService<T> {
  private data: T[];

  constructor(data: T[]) {
    this.data = data;
  }

  public static from<T>(data: T[]): LinqService<T> {
    return new LinqService<T>(data);
  }

  public where(predicate: (item: T) => boolean): T[] {
    return this.data.filter(predicate);
  }

  public select<TResult>(selector: (item: T) => TResult): TResult[] {
    return this.data.map(selector);
  }

  public orderBy<TKey>(keySelector: (item: T) => TKey): T[] {
    return [...this.data].sort((a, b) => {
      const keyA = keySelector(a);
      const keyB = keySelector(b);

      return keyA > keyB ? 1 : keyA < keyB ? -1 : 0;
    });
  }

  public orderByDescending<TKey>(keySelector: (item: T) => TKey): T[] {
    return [...this.data].sort((a, b) => {
      const keyA = keySelector(a);
      const keyB = keySelector(b);
      return keyA < keyB ? 1 : keyA > keyB ? -1 : 0;
    });
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

  public distinct(): T[] {
    return [...new Set(this.data)];
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

    return map;
  }

  public average(selector: (item: T) => number): number {
    if (this.data.length == 0) {
      throw new Error("InvalidOperationException");
    }

    const values = this.select(selector);
    const sum = values.reduce((a, b) => a + b, 0);

    return sum / values.length;
  }

  public max(selector: (item: T) => number): number {
    if (this.data.length == 0) {
      throw new Error("InvalidOperationException");
    }

    return Math.max(...this.select(selector));
  }

  public min(selector: (item: T) => number): number {
    if (this.data.length == 0) {
      throw new Error("InvalidOperationException");
    }

    return Math.min(...this.select(selector));
  }

  public sum(selector: (item: T) => number): number {
    const values = this.select(selector);

    return values.length == 0 ? 0 : values.reduce((a, b) => a + b, 0);
  }
}
