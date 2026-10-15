// Simple declaration for finnhub module
declare module "finnhub" {
  export class DefaultApi {
    constructor(apiClient: any, apiKey?: string);
    generalNews(category: string, opts?: any): Promise<any>;
    companyNews(ticker: string, opts?: any): Promise<any>;
  }
  
  export class ApiClient {}
}
