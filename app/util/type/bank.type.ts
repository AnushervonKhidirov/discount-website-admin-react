export type Bank = {
  readonly id: number;
  name: string;
  logoUrl: string | null;
  archived: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
};

export type CreateBankData = Pick<Bank, 'name'>;
export type UpdateBankData = Pick<Bank, 'name' | 'archived'>;
