import type { Bank } from '~type/bank.type';

import { useEffect, useState } from 'react';
import { notification, Table, Button, Form, Input } from 'antd/es';
import { Form as MyForm } from '~component/common/form/form';
import { BankService } from '~service/bank/bank.service';
import { requestWithRefresh } from '~helper/request.helper';

import { columns } from './coldef';

const CreateBank = () => {
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);

  return showCreateForm ? (
    <MyForm>
      <Form.Item name="name" rules={[{ required: true, message: 'Bank name is required' }]}>
        <Input placeholder="Bank name" />
      </Form.Item>
    </MyForm>
  ) : (
    <Button type="primary" onClick={() => setShowCreateForm(true)}>
      Create new bank
    </Button>
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
          footer={CreateBank}
          rowKey={({ id }) => id}
        />
      </Form>
    </>
  );
};

export default BanksPage;
