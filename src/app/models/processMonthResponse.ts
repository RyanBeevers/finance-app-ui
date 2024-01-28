import { PaycheckResponse } from "./paycheckResponse";
import { StoreResponse } from "./storeResponse";

export interface ProcessMonthResponse {
  day: number,
  month: number,
  year: number,
  income?: PaycheckResponse[] | undefined;
  listOfBills?: StoreResponse[];
}