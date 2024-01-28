import { Bill } from "./bill";

export interface DayWithBills {
    date: number;
    bills: Bill[];
  }