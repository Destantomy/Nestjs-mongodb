import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  HttpException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import mongoose from 'mongoose';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() createUserDto: CreateUserDto) {
    // console.log(createUserDto);
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  getUsers() {
    return this.usersService.getsUsers();
  }

  // users/:id
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const findUser = await this.usersService.getUserById(id);
    if (!findUser) throw new HttpException('user not found', 404);
    return findUser;
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('invalid id', 400);
    const updatedUser = await this.usersService.updateUser(id, updateUserDto);
    // console.log(updatedUser);
    if (!updatedUser) throw new HttpException('user not found', 404);
    return updatedUser;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('invalid id', 400);
    const deletedUser = await this.usersService.deleteUser(id);
    // console.log(deletedUser);
    if (!deletedUser) throw new HttpException('user not found', 404);
    return;
  }
}
