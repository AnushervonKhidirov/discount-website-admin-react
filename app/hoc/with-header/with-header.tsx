import type { FC, PropsWithChildren } from 'react';

import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { UserService } from '~service/user/user.service';
import { CookieService } from '~service/cookie/cookie.service';
import { useUserStore } from '~store/user.store';
import { Page } from '~constant/link.constant';

import Header from '~component/common/header/header';
import Content from '~component/common/content/content';
import { requestWithRefresh } from '~helper/request.helper';

const WithHeader: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();

  const cookieService = new CookieService();
  const userService = new UserService();

  const { setUser } = useUserStore();

  const { accessToken } = cookieService.getCookie<{ accessToken: string }>(['accessToken']);
  if (!accessToken) navigate(Page.Login);

  async function getUserInfo() {
    const [user, err] = await requestWithRefresh(() => userService.getMyInfo());
    if (err) return navigate(Page.Login);
    setUser(user);
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Content>{children}</Content>
      </main>
    </>
  );
};

export default WithHeader;
