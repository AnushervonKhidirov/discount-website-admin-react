import type { User } from '~type/user.type';

import { useEffect, useState } from 'react';
import { notification, Table, Form } from 'antd/es';
import { UserService } from '~service/user/user.service';
import { requestWithRefresh } from '~helper/request.helper';

import { columns } from './coldef';

const UsersPage = () => {
  const [api, context] = notification.useNotification();
  const userService = new UserService();

  const [form] = Form.useForm<User>();
  const [users, setUsers] = useState<User[]>([]);
  const [editingKey, setEditingKey] = useState<number | null>(null);

  async function getUsers() {
    const [users, err] = await requestWithRefresh(() => userService.getAll());

    if (err) {
      api.error({ message: err.error, description: err.message });
    } else {
      setUsers(users);
    }
  }

  async function saveUserData(id: number) {
    const formData = form.getFieldsValue();
    if (typeof formData.archived === 'boolean') formData.archived = !formData.archived;
    setEditingKey(null);

    const [updateUser, err] = await requestWithRefresh(() => userService.update(id, formData));

    if (err) {
      api.error({ message: err.error, description: err.message });
    } else {
      api.success({ message: 'Success', description: `${updateUser.username} updated` });
      setUsers(users => {
        return users.map(user => (user.id === updateUser.id ? updateUser : user));
      });
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      {context}
      <Form form={form}>
        <Table<User>
          dataSource={users}
          columns={columns(form, editingKey, setEditingKey, saveUserData)}
          rowKey={({ id }) => id}
        />
      </Form>
    </>
  );
};

export default UsersPage;
