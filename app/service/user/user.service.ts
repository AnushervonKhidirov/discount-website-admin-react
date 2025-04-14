import type { User } from '~type/user.type';
import type { Token } from '~type/auth.type';
import type { ReturnPromiseWithErr } from '~type/return-with-error.type';

import axios from 'axios';
import { Endpoint } from '~constant/endpoint.constant';
import { HttpError } from '~error/http.error';
import { isError, returnError } from '~helper/response.helper';
import { CookieService } from '~service/cookie/cookie.service';

export class UserService {
  private readonly cookieService = new CookieService();

  async getMyInfo(): ReturnPromiseWithErr<User> {
    try {
      const { accessToken } = this.cookieService.get<Token>(['accessToken']);

      const { data } = await axios.get<User | HttpError>(Endpoint.GetMyInfo, {
        headers: { Authorization: `Bearer ${accessToken}` },
        validateStatus: () => true,
      });

      if (isError(data)) throw new HttpError(data.status, data.error, data.message);

      const user = {
        ...data,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      };

      return [user, null];
    } catch (err) {
      return returnError(err);
    }
  }

  async get(id: number): ReturnPromiseWithErr<User> {
    try {
      const { accessToken } = this.cookieService.get<Token>(['accessToken']);

      const { data } = await axios.get<User | HttpError>(
        Endpoint.GetUser.replace(':id', id.toString()),
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          validateStatus: () => true,
        },
      );

      if (isError(data)) throw new HttpError(data.status, data.error, data.message);

      const user = {
        ...data,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      };

      return [user, null];
    } catch (err) {
      return returnError(err);
    }
  }

  async getAll(): ReturnPromiseWithErr<User[]> {
    try {
      const { accessToken } = this.cookieService.get<Token>(['accessToken']);

      const { data } = await axios.get<User[] | HttpError>(Endpoint.GetAllUsers, {
        headers: { Authorization: `Bearer ${accessToken}` },
        validateStatus: () => true,
      });

      if (isError(data)) throw new HttpError(data.status, data.error, data.message);

      const users = data.map(user => ({
        ...user,
        createdAt: new Date(user.createdAt),
        updatedAt: new Date(user.updatedAt),
      }));

      return [users, null];
    } catch (err) {
      return returnError(err);
    }
  }
}
