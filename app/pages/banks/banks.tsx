import type { FC, Dispatch, SetStateAction } from 'react';
import type { Bank } from '~type/bank.type';

import { useEffect, useState } from 'react';
import { notification, Table, Button, Form, Modal, Input } from 'antd/es';
import { Form as MyForm } from '~component/common/form/form';
import { BankService } from '~service/bank/bank.service';
import { requestWithRefresh } from '~helper/request.helper';

import { columns } from './coldef';

const CreateBank: FC<{ openCreateBankForm: Dispatch<SetStateAction<boolean>> }> = ({
  openCreateBankForm,
}) => {
  return (
    <Button type="primary" onClick={() => openCreateBankForm(true)}>
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
  const [openCreateBankForm, setOpenCreateBankForm] = useState<boolean>(false);

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

  async function createBank(value: { name: string }) {
    const [bank, err] = await requestWithRefresh(() => bankService.create(value));

    if (err) {
      api.error({ message: err.error, description: err.message });
    } else {
      setBanks(banks => [bank, ...banks]);
    }
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
          footer={() => <CreateBank openCreateBankForm={setOpenCreateBankForm} />}
          rowKey={({ id }) => id}
        />
      </Form>

      <Modal
        open={openCreateBankForm}
        footer={null}
        onCancel={() => setOpenCreateBankForm(false)}
        centered
      >
        <MyForm onSubmit={createBank} submitBtnText="Add bank" title="Create new bank">
          <Form.Item name="name" rules={[{ required: true, message: 'Bank name is required!' }]}>
            <Input placeholder="Bank name"></Input>
          </Form.Item>
        </MyForm>
      </Modal>
    </>
  );
};

export default BanksPage;
