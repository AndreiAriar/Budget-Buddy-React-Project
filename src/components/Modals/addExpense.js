import React, { useState } from "react";
import { Button, Modal, Form, Input, DatePicker, Select } from "antd";

const AddExpense = ({
  isExpenseModalVisible,
  handleExpenseCancel,
  onFinish,
}) => {
  const [form] = Form.useForm();
  const [selectedTags, setSelectedTags] = useState([]);

  // Predefined tags for expenses
  const expenseTags = ["Food", "Rent", "Utilities", "Entertainment", "Transport"];

  // Handle multiple tag selection or input
  const handleTagChange = (value) => {
    setSelectedTags(value);
  };

  return (
    <Modal
      style={{ fontWeight: 600 }}
      title="Add Expense"
      open={isExpenseModalVisible}
      onCancel={handleExpenseCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          onFinish({ ...values, tags: selectedTags }, "expense");
          form.resetFields();
          setSelectedTags([]); // Reset tags after form submission
        }}
      >
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter the name of the transaction" }]}
        >
          <Input type="text" className="custome-input" />
        </Form.Item>

        <Form.Item
          style={{ fontWeight: 600 }}
          label="Amount"
          name="amount"
          rules={[{ required: true, message: "Please enter the expense amount" }]}
        >
          <Input type="number" className="custome-input" />
        </Form.Item>

        <Form.Item
          style={{ fontWeight: 600 }}
          label="Date"
          name="date"
          rules={[{ required: true, message: "Please select the expense date" }]}
        >
          <DatePicker className="custome-input" format="DD-MM-YYYY" />
        </Form.Item>

        <Form.Item
          style={{ fontWeight: 600 }}
          label="Tags"
          name="tags"
          rules={[{ required: true, message: "Please select or add at least one tag!" }]}
        >
          <Select
            mode="tags"
            placeholder="Select or input expense tags"
            value={selectedTags}
            onChange={handleTagChange}
            className="custome-input"
            tokenSeparators={[","]} // Allows comma as a separator for multiple tags
          >
            {expenseTags.map((tag) => (
              <Select.Option key={tag} value={tag}>
                {tag}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" className="btn reset-balance-btn">
            Add Expense
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddExpense;
