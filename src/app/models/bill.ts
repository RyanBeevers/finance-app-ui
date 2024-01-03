export interface Bill {
    id?: string;
    name: string;
    amount: number;
    dueDay: number;
    billVariableFlag: boolean;
    billAverage?: number;
    dueDateModifiableFlag: boolean;
    recurringFlag: boolean;
    lateFeeFlag: boolean;
    daysUntilLateFee?: number
    lateFeeAmount?: number;
    continuousFlag?: boolean;
    endDateFlag: boolean;
    endDate?: Date;
    autopayFlag: boolean;
    weeklyFlag: boolean;
    dayOfTheWeek?: string;
    category: string;
    subCategory?: string;
    trackSpendingFlag: boolean;
    spent?: number;
    frequency?: number;
    user?: string;
}