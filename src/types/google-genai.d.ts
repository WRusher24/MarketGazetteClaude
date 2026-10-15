// Simple declaration for @google/genai module
declare module "@google/genai" {
  export class GoogleGenerativeAI {
    constructor(apiKey: string);
    getGenerativeModel(params: { model: string }): any;
  }
}
