export type User = {
  readonly id: number;
  readonly username: string;
  readonly role: Role;
  archived: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
};

export type UpdateUserData = Pick<User, 'username' | 'role' | 'archived'>;

export enum Role {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  USER = 'USER',
}
