import { api } from "encore.dev/api";
import { LinqService } from "../service/linqService"; 

export const getWhere = api(
  { expose: true, method: "GET", path: "/linq/where/:data/:predicate" },
  async ({ data, predicate }: { data: string; predicate: string }): Promise<{ result: any[] }> => {
    // Parse the data string into an array of objects
    const sampleData = JSON.parse(decodeURIComponent(data));
    const service = LinqService.from(sampleData);
    
    const filterFunction = new Function('item', `return ${predicate}`) as (item: any) => boolean;
    
    const result = service.where(filterFunction).toArray();
    return { result };
  }
);

