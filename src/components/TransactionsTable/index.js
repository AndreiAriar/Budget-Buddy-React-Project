import React, { useState } from "react";
import "./styles.css";
import { Radio, Select, Table, Button, Input } from "antd";
import { parse, unparse } from "papaparse";
import { toast } from "react-toastify";
import EditEditDeleteModal from "../EditDelete";
import { updateTransactionOnFirebase } from "../../hooks/updateTransaction";
import { deleteTransactionOnFirebase } from "../../hooks/deleteTransactionOnFirebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { AiOutlineSearch } from "react-icons/ai";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const TransactionsTable = ({
  transactions,
  addTransaction,
  fetchTransactions,
  onResetBalance,
}) => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [user] = useAuthState(auth);

  const predefinedCurrencies = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    INR: "₹",
  };

  const predefinedTags = ["Food", "Rent", "Salary", "Shopping", "Utilities"];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text, record) => {
        const currencySymbol =
          predefinedCurrencies[record.currency] || record.currency || "";
        const amount = parseFloat(record.amount);

        // Check if amount is a valid number
        if (isNaN(amount)) {
          return "Invalid Amount";
        }

        return `${currencySymbol} ${amount.toFixed(2)}`;
      },
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (tags) => {
        if (!tags || tags.length === 0) return "";
        return tags
          .map((tag) =>
            predefinedTags.includes(tag)
              ? tag
              : `Custom: ${tag}` // Display custom tags with a "Custom:" prefix
          )
          .join(", ");
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            className="action-btn"
            style={{ marginRight: "8px" }}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
            className="action-btn"
            danger
          />
        </span>
      ),
    },
  ];

  const filterTransactionsArray = transactions.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      item.type.includes(typeFilter)
  );

  const sortedTransactions = filterTransactionsArray.sort((a, b) => {
    if (sortKey === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortKey === "amount") {
      return a.amount - b.amount;
    } else {
      return 0;
    }
  });

  const exportCSV = () => {
    const csv = unparse({
      fields: ["name", "type", "tags", "date", "amount", "currency"],
      data: transactions,
    });
    const data = new Blob([csv], { type: "text/csv:charset=utf-8;" });
    const csvURL = window.URL.createObjectURL(data);
    const tempLink = document.createElement("a");
    tempLink.href = csvURL;
    tempLink.download = "transactions.csv";
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  };

  const importCSV = (event) => {
    event.preventDefault();
    try {
      parse(event.target.files[0], {
        header: true,
        complete: async function (results) {
          for (const transaction of results.data) {
            if (isNaN(transaction.amount)) {
              continue;
            }
            const newTransaction = {
              ...transaction,
              amount: parseFloat(transaction.amount),
            };
            await addTransaction(newTransaction, true);
          }
          toast.success("All transactions added");
          fetchTransactions();
          event.target.value = null;
        },
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleEdit = (transaction) => {
    setSelectedTransaction(transaction);
    setShowEditModal(true);
  };

  const handleEditSave = async (editedTransaction) => {
    await updateTransactionOnFirebase(user.uid, editedTransaction);
    setShowEditModal(false);
    fetchTransactions();
  };

  const handleDelete = (transaction) => {
    setSelectedTransaction(transaction);
    handleDeleteSave(transaction);
  };

  const handleDeleteSave = async (transaction) => {
    await deleteTransactionOnFirebase(user.uid, transaction);
    fetchTransactions();
  };

  const handleEditCancel = () => {
    setShowEditModal(false);
  };

  const handleResetBalanceClick = () => {
    if (onResetBalance) {
      onResetBalance();
    }
  };

  return (
    <div className="table-box container">
      <h2>My Transactions</h2>
      <div className="search-and-filter container">
        <AiOutlineSearch className="search-icon" />
        <input
          className="search-bar"
          type="search"
          value={search}
          onChangeCapture={(e) => setSearch(e.target.value)}
          placeholder="Search by name"
        />
        <Select
          className="search-bar select-filter"
          onChange={(value) => setTypeFilter(value)}
          value={typeFilter}
          placeholder="Filter"
          allowClear
        >
          <Select.Option value="">All</Select.Option>
          <Select.Option value="income">Income</Select.Option>
          <Select.Option value="expense">Expense</Select.Option>
        </Select>
      </div>
      <div className="import-export-sort container">
        <Radio.Group
          className="input-radio"
          onChange={(e) => setSortKey(e.target.value)}
          value={sortKey}
        >
          <Radio.Button value="">No Sort</Radio.Button>
          <Radio.Button value="date">Sort by Date</Radio.Button>
          <Radio.Button value="amount">Sort by Amount</Radio.Button>
        </Radio.Group>
        <div className="ix-button">
          <button className="btn btn-purple" onClick={exportCSV}>
            Export CSV
          </button>
          <label htmlFor="file-csv" className="btn">
            Import CSV
          </label>
          <input
            type="file"
            id="file-csv"
            accept=".csv"
            required
            onChange={importCSV}
            style={{ display: "none" }}
          />
        </div>
        <Button onClick={handleResetBalanceClick} className="btn btn-red">
          Reset Balance
        </Button>
      </div>
      <div className="table-container">
        <Table
          dataSource={sortedTransactions}
          columns={columns}
          className="table"
          onRow={(record) => ({
            onClick: () => handleEdit(record),
          })}
        />
        {showEditModal && (
          <EditEditDeleteModal
            show={showEditModal}
            onClose={handleEditCancel}
            transaction={selectedTransaction}
            onSave={handleEditSave}
            onDelete={handleDeleteSave}
          />
        )}
      </div>
    </div>
  );
};

export default TransactionsTable;
