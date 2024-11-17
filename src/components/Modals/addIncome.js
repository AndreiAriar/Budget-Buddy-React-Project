import React, { useState } from "react";
import { Button, Modal, Form, Input, DatePicker, Select } from "antd";

const AddIncome = ({ isIncomeModalVisible, handleIncomeCancel, onFinish }) => {
  const [form] = Form.useForm();
  const [selectedTags, setSelectedTags] = useState([]);

  // Predefined tags for income
  const incomeTags = ["Salary", "Business", "Freelance", "Investment"];

  // Handle multiple tag selection or custom input
  const handleTagChange = (value) => {
    setSelectedTags(value);
  };

  return (
    <div>
      <Modal
        title="Add Income"
        open={isIncomeModalVisible}
        onCancel={handleIncomeCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            onFinish({ ...values, tags: selectedTags }, "income");
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
            rules={[{ required: true, message: "Please enter the income amount" }]}
          >
            <Input type="number" className="custome-input" />
          </Form.Item>

          <Form.Item
            style={{ fontWeight: 600 }}
            label="Date"
            name="date"
            rules={[{ required: true, message: "Please select the income date!" }]}
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
              placeholder="Select or input income tags"
              value={selectedTags}
              onChange={handleTagChange}
              className="custome-input"
              tokenSeparators={[","]} // Allows comma as separator for multiple tags
            >
              {incomeTags.map((tag) => (
                <Select.Option key={tag} value={tag}>
                  {tag}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" className="btn reset-balance-btn">
              Add Income
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddIncome;
