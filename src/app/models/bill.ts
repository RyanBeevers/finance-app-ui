export interface bill {
    billName: string;
    billAmount: number;
    dayOfTheMonthDue: number;
    billVariableFlag: boolean;
    billAverage?: number;
    dueDateModifiableFlag: boolean;
    recurringFlag: boolean;
    lateFeeFlag: boolean;
    daysUntilLateFee?: number
    lateFeeAmount?: number;
    continuousFlag?: boolean;
    endDate?: Date;
    autopayFlag: boolean;
    weekly: boolean;
    dayOfTheWeek?: string;
    category: number
}