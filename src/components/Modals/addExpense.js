import React, { useState } from "react";
import { Button, Modal, Form, Input, DatePicker, Select } from "antd";

// Predefined currencies with symbols
const predefinedCurrencies = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "CHF", symbol: "CHF", name: "Swiss Franc" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
  { code: "SEK", symbol: "kr", name: "Swedish Krona" },
  // Add more currencies as needed
];

const AddExpense = ({ isExpenseModalVisible, handleExpenseCancel, onFinish }) => {
  const [form] = Form.useForm();
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("");

  // Predefined tags for expenses
  const expenseTags = ["Food", "Rent", "Utilities", "Entertainment", "Transport"];

  const handleTagChange = (value) => {
    setSelectedTags(value);
  };

  const handleCurrencyChange = (value) => {
    setSelectedCurrency(value);
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
          onFinish({ ...values, tags: selectedTags, currency: selectedCurrency }, "expense");
          form.resetFields();
          setSelectedTags([]);
          setSelectedCurrency("");
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
          label="Currency"
          name="currency"
          rules={[{ required: true, message: "Please select or input a currency" }]}
        >
          <Select
            mode="tags"
            placeholder="Select or input currency"
            value={selectedCurrency}
            onChange={handleCurrencyChange}
            className="custome-input"
            tokenSeparators={[","]}
          >
            {predefinedCurrencies.map(({ code, symbol, name }) => (
              <Select.Option key={code} value={`${code} (${symbol})`}>
                {`${code} (${symbol}) - ${name}`}
              </Select.Option>
            ))}
          </Select>
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
            tokenSeparators={[","]}
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
