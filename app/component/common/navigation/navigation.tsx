import type { FC } from 'react';
import type { MenuProps } from 'antd/es';
import type { AdditionalProps } from '~type/common.type';

import { NavLink } from 'react-router';
import { Menu } from 'antd/es';
import { Page } from '~constant/link.constant';

import classNames from 'classnames';
import classes from './navigation.module.css';

type MenuItem = Required<MenuProps>['items'][number];

const menuItems: MenuItem[] = [
  {
    label: <NavLink to={Page.Users}>Users</NavLink>,
    key: getFromUrl(Page.Users),
  },
  {
    label: <NavLink to={Page.Companies}>Companies</NavLink>,
    key: getFromUrl(Page.Companies),
  },
  {
    label: <NavLink to={Page.Banks}>Banks</NavLink>,
    key: getFromUrl(Page.Banks),
  },
  {
    label: <NavLink to={Page.Discounts}>Discounts</NavLink>,
    key: getFromUrl(Page.Discounts),
  },
  {
    label: <NavLink to={Page.Cashbacks}>Cashback</NavLink>,
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
