import { ConflictException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../infra/entity/user.entity';
import { Repository } from 'typeorm';
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async validateUser({ username, password }: AuthDto) {
    const user = await this.findUser(username);
    if (user && (await compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async createUser({ username, password }: AuthDto) {
    if (await this.findUser(username)) throw new ConflictException();
    const hashedPasswd = await hash(password, 12);
    const user = this.repository.save({
      username,
      password: hashedPasswd,
    });
    return user;
  }

  private async findUser(username: string) {
    return await this.repository.findOneBy({ username });
  }
}
