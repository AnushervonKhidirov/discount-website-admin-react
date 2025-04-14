import type { FC } from 'react';
import type { MenuProps } from 'antd/es';
import type { AdditionalProps } from '~type/common.type';

import { Menu } from 'antd/es';
import { Page } from '~constant/link.constant';

import classNames from 'classnames';
import classes from './navigation.module.css';

type MenuItem = Required<MenuProps>['items'][number];

const menuItems: MenuItem[] = [
  {
    label: <a href={Page.Users}>Users</a>,
    key: getFromUrl(Page.Users),
  },
  {
    label: <a href={Page.Companies}>Companies</a>,
    key: getFromUrl(Page.Companies),
  },
  {
    label: <a href={Page.Banks}>Banks</a>,
    key: getFromUrl(Page.Banks),
  },
  {
    label: <a href={Page.Discounts}>Discounts</a>,
    key: getFromUrl(Page.Discounts),
  },
  {
    label: <a href={Page.Cashbacks}>Cashback</a>,
    key: getFromUrl(Page.Cashbacks),
  },
];

function getFromUrl(url: string) {
  return url.replaceAll('/', ' ').trim().split(' ')[0];
}

const Navigation: FC<AdditionalProps> = ({ className }) => {
  return (
    <Menu
      className={classNames(classes.navigation, className)}
      items={menuItems}
      selectedKeys={[getFromUrl('pathname')]}
    />
  );
};

export default Navigation;
