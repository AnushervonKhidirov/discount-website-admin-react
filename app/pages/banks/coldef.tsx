import type { TableColumnsType } from 'antd/es';
import type { Bank } from '~type/bank.type';

import { Flex, Tag } from 'antd/es';
import { Page } from '~constant/link.constant';
import { NavLink } from 'react-router';

export const columns: TableColumnsType<Bank> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Logo',
    dataIndex: 'logoUrl',
    key: 'logo',
    render: (logo: Bank['logoUrl'], bank: Bank) => (
      <img src={`http://localhost:4000/${logo}`} alt={bank.name} height={25} />
    ),
  },
  {
    title: 'Created at',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (date: Bank['createdAt']) => `${date.toDateString()}, ${date.toLocaleTimeString()}`,
  },
  {
    title: 'Updated at',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    render: (date: Bank['updatedAt']) => `${date.toDateString()}, ${date.toLocaleTimeString()}`,
  },
  {
    title: 'Archived',
    dataIndex: 'archived',
    key: 'archived',
    render: (archived: Bank['archived']) => {
      if (archived) return <Tag color="error">Archived</Tag>;
      return <Tag color="success">Active</Tag>;
    },
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (_, bank: Bank) => {
      return (
        <Flex gap={10}>
          <NavLink type="link" to={`${Page.Banks}/${bank.id}`}>
            View Bank
          </NavLink>
        </Flex>
      );
    },
  },
];
