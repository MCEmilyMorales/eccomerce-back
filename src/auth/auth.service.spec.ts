import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from 'src/users/users.repository';
import { User } from 'src/users/user.entity';
import * as bycript from 'bcrypt'
import * as jwt from 'jsonWebtoken';



describe('authService', () => {
  let service: AuthService;
  let mockUserService: Partial<UsersRepository>;
  const mockUser: Omit<User,'id'>={
    name: 'Emily',
    password: '123456',
    email: 'emily@gmail.com',
    address: 'calle 123',
    phone: 123456,
    isAdmin: false
  }
  const mockJwtService = {
    sign: (paylod) => jwt.sign(paylod, 'testScret'),
  };
  beforeEach(async () => {
      mockUserService = {
        findByEmail: () => Promise.resolve(undefined),
        postUserCreate: (user): Promise<User> =>
          Promise.resolve({
            ...user,
            isAdmin: false,
            id: '1234fs-234sd-24csfd-34sdfg',
          }),
      };
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, {provide: JwtService, useValue: mockJwtService}, {provide: UsersRepository,useValue:mockUserService} ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('Creando una instancia de AuthService', async () => {
    expect(service).toBeDefined();
  });
  it('signUp() creando un nuevo usuario con un pasword encriptado', async()=>{
    const user= await service.signUp(mockUser)
    expect(user).toBeDefined()
    expect(user.password).not.toEqual(mockUser.password)
  })
  it('signUp() arroja un error si el email ya ha sido usado.', async ()=>{
    mockUserService.findByEmail = (email: string)=> Promise.resolve(mockUser as User)
    try {
      await service.signUp(mockUser as User)
    } catch (error) {
      expect(error.message).toEqual('Email usado.')
    }
  })
  it('signIn() retorna un error si el password es incorrecto.', async () => {
    mockUserService.findByEmail = (email: string) =>
      Promise.resolve(mockUser as User);
    try {
      await service.signIn(mockUser.email, 'password incorrecto!!!');
    } catch (error) {
      expect(error.message).toEqual('password incorrecto.');
    }
  });
  it('signIn() retorna un error si el usuario no fue encontrado.', async () => {
    try {
      await service.signIn(mockUser.email, mockUser.password);
    } catch (error) {
      expect(error.message).toEqual('Usuario no encontrado.');
    }
  });
  it('signIn() retorna un objeto como mensaje y un token si el usuario es encontrado y el password es valido.', async () => {
    const mockUserVariant ={
      ...mockUser,
      password: await bycript.hash(mockUser.password, 10)
    }
    mockUserService.findByEmail = (email: string)=>
    Promise.resolve(mockUserVariant as User)
    const response = await service.signIn(
      mockUser.email,
      mockUser.password,
    )
      expect(response).toBeDefined()
      expect(response.token).toBeDefined();
      expect(response.success).toEqual(' User logueado ');  
  });
});
