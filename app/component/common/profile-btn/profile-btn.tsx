import type { FC } from 'react';
import type { AdditionalProps } from '~type/common.type';

// import '@ant-design/v5-patch-for-react-19';
import { Button, Avatar } from 'antd/es';
import { UserOutlined } from '@ant-design/icons';
import { Page } from '~constant/link.constant';

import classNames from 'classnames';
import classes from './profile-btn.module.css';

const ProfileBtn: FC<AdditionalProps> = async ({ className }) => {
  return (
    <Button className={classNames(classes.profile_btn, className)} href={Page.Profile}>
      <Avatar className={classes.avatar} icon={<UserOutlined />} shape="square" />
      <div className={classes.username}>Name</div>
      <div className={classes.role}>Role</div>
    </Button>
  );
};

export default ProfileBtn;
