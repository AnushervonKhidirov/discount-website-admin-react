import type { FC, PropsWithChildren } from 'react';

import Header from '~component/common/header/header';

const WithHeader: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default WithHeader;
