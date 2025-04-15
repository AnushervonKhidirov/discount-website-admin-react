import type { Bank } from '~type/bank.type';

import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { notification, Table, Button, Form } from 'antd/es';
import { BankService } from '~service/bank/bank.service';
import { requestWithRefresh } from '~helper/request.helper';

import { Page } from '~constant/link.constant';
import { columns } from './coldef';

const CreateBankBtn = () => {
  return (
    <NavLink to={Page.BankCreate}>
      <Button type="primary">Create new bank</Button>
    </NavLink>
  );
};

const BanksPage = () => {
  const [api, context] = notification.useNotification();
  const bankService = new BankService();

  const [form] = Form.useForm<Bank>();
  const [banks, setBanks] = useState<Bank[]>([]);
  const [editingKey, setEditingKey] = useState<number | null>(null);

  async function getBanks() {
    const [banks, err] = await requestWithRefresh(() => bankService.getAll());

    if (err) {
      api.error({ message: err.error, description: err.message });
    } else {
      setBanks(banks);
    }
  }

  function saveBankData() {
    const formData = form.getFieldsValue();
    form.setFieldValue('archived', !formData.archived);
    console.log(form.getFieldsValue());
    setEditingKey(null);
  }

  useEffect(() => {
    getBanks();
  }, []);

  return (
    <>
      {context}
      <Form form={form}>
        <Table<Bank>
          dataSource={banks}
          columns={columns(editingKey, setEditingKey, form, saveBankData)}
          footer={CreateBankBtn}
          rowKey={({ id }) => id}
        />
      </Form>
    </>
  );
};

export default BanksPage;
