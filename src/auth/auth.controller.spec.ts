import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

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
        UserModule,
        JwtModule.register({
          global: true,
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '1d' },
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should login', async () => {
    const result = await controller.signIn({
      email: 'kubrasuheylabilgin@gmail.com',
      password: 'kubra12345',
    });
    expect(result).toHaveProperty('access_token');
  });
});
