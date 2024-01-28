import { Bill } from "./bill";

export interface CalendarEntry {
    month?: number;
    year?: number;
    date?: number;
    locked?: boolean;
    bill?: Bill;
    user?: string;
    paid?: boolean;
    amount?: number;
  }