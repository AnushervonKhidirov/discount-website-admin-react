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

  function saveUserData() {
    const formData = form.getFieldsValue();
    form.setFieldValue('archived', !formData.archived);
    console.log(form.getFieldsValue());
    setEditingKey(null);
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
          columns={columns(editingKey, setEditingKey, form, saveUserData)}
          rowKey={({ id }) => id}
        />
      </Form>
    </>
  );
};

export default UsersPage;
