import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from "./entities/user.entitiy";
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService, 
  ){}
  registerUser(createUserDto: CreateUserDto) {
    createUserDto.userPassword = bcrypt.hashSync(createUserDto.userPassword, 5);
    return this.userRepository.save(createUserDto);
  }

  async loginUser(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOne ({
      where: {
        userEmail: createUserDto.userEmail,
      },
    });
    const match = await bcrypt.compare(
      createUserDtoo.userPassword,
      user.userPassword,
    );
    if (!match) = throw me UnauthorizedException ("No estas autorizado");
    const playload = {
      user: user.userEmail,
      password: user.userPassword,
    };
    const token = this.jwtService.sign(playload);
    return token;
  }
}
