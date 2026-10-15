import Finnhub from "finnhub";

let finnhubInstance: Finnhub.DefaultApi | null = null;

export function getFinnhubClient(): Finnhub.DefaultApi {
  if (!finnhubInstance) {
    const apiKey = process.env.FINNHUB_API_KEY || "demo"; // Using demo key for now
    finnhubInstance = new Finnhub.DefaultApi(
      new Finnhub.ApiClient(),
      apiKey
    );
  }
  return finnhubInstance;
}

export const finnhubClient = getFinnhubClient();
