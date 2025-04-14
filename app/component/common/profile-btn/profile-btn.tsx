import type { FC } from 'react';
import type { AdditionalProps } from '~type/common.type';

import { NavLink } from 'react-router';
import { Button, Avatar } from 'antd/es';
import { UserOutlined } from '@ant-design/icons';
import { Page } from '~constant/link.constant';

import classNames from 'classnames';
import classes from './profile-btn.module.css';

const ProfileBtn: FC<AdditionalProps> = async ({ className }) => {
  return (
    <Button className={classNames(classes.profile_btn, className)}>
      <NavLink to={Page.Profile}>
        <Avatar className={classes.avatar} icon={<UserOutlined />} shape="square" />
        <div className={classes.username}>Name</div>
        <div className={classes.role}>Role</div>
      </NavLink>
    </Button>
  );
};

export default ProfileBtn;
