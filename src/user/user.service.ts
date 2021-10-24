import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entitiy';
import { UserRepository } from '../repository/user.repository';
import { CreateUserDto } from './dto/CreateUserDto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private static readonly SALT_ROUNDS = 10;

  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
  ) {}

  async create({ userForm }: { userForm: CreateUserDto }): Promise<User> {
    const passwordHash = await this.getPasswordHash(userForm.password);

    const newUser = new User({
      email: userForm.email,
      password: passwordHash,
    });

    await this.userRepository.save(newUser);
    return newUser;
  }

  async validatePassword({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<boolean> {
    const user = this.userRepository.findByEmail(email);
    const isValid = await this.validateHash(password, (await user).password);
    return isValid;
  }

  private async getPasswordHash(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(UserService.SALT_ROUNDS, (err, salt) => {
        if (err) {
          return reject(err);
        }
        bcrypt.hash(password, salt, function (err, hash) {
          if (err) {
            return reject(err);
          }
          resolve(hash);
        });
      });
    });
  }

  private async validateHash(password: string, hash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hash, function (err, result) {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }
}
