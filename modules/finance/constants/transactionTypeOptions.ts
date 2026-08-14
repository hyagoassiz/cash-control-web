import { TransactionType } from "@/modules/finance/enums/transactionType";

export const transactionTypeOptions = [
  {
    label: "Entrada",
    value: TransactionType.INCOME,
  },
  {
    label: "Saída",
    value: TransactionType.EXPENSE,
  },
];
