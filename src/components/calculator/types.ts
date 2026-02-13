export interface CalculatorInputs {
    insurancePayout: number;
    baseCoatAmount: number;
    baseCoatCost: number;
    clearCoatAmount: number;
    clearCoatCost: number;
    consumablesAmount: number;
    consumablesCost: number;
}

export interface CalculationResult {
    actualMaterialCost: number;
    materialShortfall: number;
    deficitPercentage: number;
    isLoss: boolean;
}

export interface LeadFormData {
    name: string;
    email: string;
    agreedToTerms: boolean;
}
