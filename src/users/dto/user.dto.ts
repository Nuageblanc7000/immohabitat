import { Exclude } from 'class-transformer';

export class UserDTO {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  // @Exclude()
  // password: string;
  // @Exclude()
  // createdAt: Date;
  // @Exclude()
  // updatedAt: Date;
  // @Exclude()
  // deletedAt: Date | null;
}
