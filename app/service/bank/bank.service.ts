import type { Bank, CreateBankData } from '~type/bank.type';
import type { Token } from '~type/auth.type';
import type { ReturnPromiseWithErr } from '~type/return-with-error.type';

import axios from 'axios';
import { Endpoint } from '~constant/endpoint.constant';
import { HttpError } from '~error/http.error';
import { isError, returnError } from '~helper/response.helper';
import { CookieService } from '~service/cookie/cookie.service';

export class BankService {
  async getBank(id: number): ReturnPromiseWithErr<Bank> {
    try {
      const cookieService = new CookieService();

      const { accessToken } = cookieService.getCookie<Token>(['accessToken']);

      const { data } = await axios.get<Bank | HttpError>(
        Endpoint.GetBank.replace(':id', id.toString()),
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          validateStatus: () => true,
        },
      );

      if (isError(data)) throw new HttpError(data.status, data.error, data.message);

      const bank = {
        ...data,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      };

      return [bank, null];
    } catch (err) {
      return returnError(err);
    }
  }

  async getAllBanks(): ReturnPromiseWithErr<Bank[]> {
    try {
      const cookieService = new CookieService();

      const { accessToken } = cookieService.getCookie<Token>(['accessToken']);

      const { data } = await axios.get<Bank[] | HttpError>(Endpoint.GetAllBanks, {
        headers: { Authorization: `Bearer ${accessToken}` },
        validateStatus: () => true,
      });

      if (isError(data)) throw new HttpError(data.status, data.error, data.message);

      const banks = data.map(bank => ({
        ...bank,
        createdAt: new Date(bank.createdAt),
        updatedAt: new Date(bank.updatedAt),
      }));

      return [banks, null];
    } catch (err) {
      return returnError(err);
    }
  }

  async create(bankDto: CreateBankData): ReturnPromiseWithErr<Bank> {
    try {
      const cookieService = new CookieService();

      const { accessToken } = cookieService.getCookie<Token>(['accessToken']);

      const { data } = await axios.post<Bank | HttpError>(Endpoint.CreateBank, bankDto, {
        headers: { Authorization: `Bearer ${accessToken}` },
        validateStatus: () => true,
      });

      if (isError(data)) throw new HttpError(data.status, data.error, data.message);

      const bank = {
        ...data,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      };

      return [bank, null];
    } catch (err) {
      return returnError(err);
    }
  }

  async uploadLogo(id: number, file: File): ReturnPromiseWithErr<Bank> {
    try {
      const cookieService = new CookieService();

      const { accessToken } = cookieService.getCookie<Token>(['accessToken']);

      const formData = new FormData();
      formData.append('file', file);

      const { data } = await axios.post<Bank | HttpError>(
        Endpoint.UploadBankLogo.replace(':id', id.toString()),
        formData,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          validateStatus: () => true,
        },
      );

      if (isError(data)) throw new HttpError(data.status, data.error, data.message);

      const bank = {
        ...data,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      };

      return [bank, null];
    } catch (err) {
      return returnError(err);
    }
  }
}
