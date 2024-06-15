import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from '../entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          // TypeORM configuration options here
          // For testing, you might want to use SQLite in-memory database
          // For example:
          type: 'sqlite',
          database: 'database.sqlite',
          entities: [User],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([User]),
      ],
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new user', async () => {
    // Mock user data
    const newUser = new User();
    newUser.firstName = 'John';
    newUser.lastName = 'Doe';
    newUser.eMail = 'john.doe@example.com';
    newUser.password = '123456';
    newUser.balance = 100;

    // Mock the userService.create method to return the newUser
    jest.spyOn(userService, 'create').mockResolvedValue(newUser);

    // Call the UserController create method
    const createdUser = await controller.create(newUser);

    // Assert that the createdUser matches the newUser we provided
    expect(createdUser).toEqual(newUser);
  });
});
