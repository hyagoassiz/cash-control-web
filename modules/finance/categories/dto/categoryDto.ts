import { TransactionType } from "@/modules/finance/enums/transactionType";

export interface CategoryResponseDTO {
  id: number;
  name: string;
  description: string;
  active: boolean;
  transactionType: keyof typeof TransactionType;
}

export type CategoryRequestDTO = Pick<
  CategoryResponseDTO,
  "name" | "description" | "active" | "transactionType"
> & {
  id?: number;
};
