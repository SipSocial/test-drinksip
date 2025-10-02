// Simplified search types for DrinkSip
export interface PredictiveSearchReturn {
  result?: {
    products?: any[];
    collections?: any[];
    pages?: any[];
    articles?: any[];
    queries?: any[];
  };
  term?: string;
}

export interface RegularSearchReturn {
  products?: any[];
  collections?: any[];
  pages?: any[];
  articles?: any[];
}
