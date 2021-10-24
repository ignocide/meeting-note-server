import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

export interface UserState {
  id: number;
  email: string;
  password: string;
}

@Entity()
export class User {
  static fromUserId(userId: number) {
    const user = new User();
    user.id = userId;
    return user;
  }

  constructor(user?: Omit<UserState, 'id'>) {
    if (user) {
      this.email = user.email;
      this.password = user.password;
    }
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ unique: true })
  email: string;

  @Column()
  password: string;
}
