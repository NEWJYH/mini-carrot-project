import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from '../user.service';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

class MockUserRepository {
  mydb = [{ email: 'a@a.com', password: '1234', mobileNumber: '01011111111' }];

  findOne({ where: { email } }) {
    const users = this.mydb.filter((el) => el.email === email);
    if (users.length) return { ...users[0] };

    return null;
  }

  save({ email, password, mobileNumber }) {
    this.mydb.push({ email, password, mobileNumber });
    return { email, password, mobileNumber };
  }
}
//
type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('UserService', () => {
  let userService: UserService;
  let userRepository: MockRepository<User>; //

  beforeEach(async () => {
    const userModule: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: MockUserRepository,
        },
      ],
    }).compile();

    userService = userModule.get<UserService>(UserService);
    userRepository = userModule.get<MockRepository<User>>(
      getRepositoryToken(User),
    );
  });

  describe('create', () => {
    it('이미 존재하는 이메일 검증하기!!', async () => {
      // 추가된 코드
      const userRepositorySpyFindOne = jest.spyOn(userRepository, 'findOne');
      const userRepositorySpySave = jest.spyOn(userRepository, 'save');

      const myData = {
        email: 'a@a.com',
        password: '1234',
        mobileNumber: '01011111111',
      };
      try {
        await userService.create({ ...myData });
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
      }

      // 추가된 코드
      expect(userRepositorySpyFindOne).toBeCalledTimes(1);
      expect(userRepositorySpySave).toBeCalledTimes(0);
    });

    it('회원 등록 검증', async () => {
      const userRepositorySpyFindOne = jest.spyOn(userRepository, 'findOne');
      const userRepositorySpySave = jest.spyOn(userRepository, 'save');

      const myData = {
        email: 'bbb@bbb.com',
        password: '1234',
        mobileNumber: '01011111111',
      };

      const myResultData = {
        email: 'bbb@bbb.com',
        password: '1234',
        mobileNumber: '01011111111',
      };

      const result = await userService.create({ ...myData });
      expect(result).toStrictEqual(myResultData);

      expect(userRepositorySpyFindOne).toBeCalledTimes(1);
      expect(userRepositorySpySave).toBeCalledTimes(1);
    });
  });

  // describe('findOne', () => {});
});
