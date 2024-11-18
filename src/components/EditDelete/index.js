
import React, { useState, useEffect } from "react";
import "./styles.css";

const EditDelete = ({ transaction, onSave, onCancel, onDelete, show }) => {
  const [editedTransaction, setEditedTransaction] = useState(transaction);

  useEffect(() => {
    setEditedTransaction(transaction);
  }, [transaction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTransaction((prevTransaction) => ({
      ...prevTransaction,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(editedTransaction);
  };

  const handleDelete = () => {
    onDelete(editedTransaction);
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
      <button className="icon-btn close-btn" onClick={handleSave}>
        ✖
      </button>
        <h3>Edit or Delete Transaction</h3>
        <div className="modal-content">
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              className="custome-input"
              value={editedTransaction.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              className="custome-input"
              value={editedTransaction.amount}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Type</label>
            <input
              type="text"
              name="type"
              className="custome-input"
              value={editedTransaction.type}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Date</label>
            <input
              type="date"
              name="date"
              className="custome-input"
              value={editedTransaction.date}
              onChange={handleChange}
            />
          </div>
          <div className="modal-buttons">
            <button className="icon-btn save-btn" onClick={handleSave}>
              💾
            </button>
            <button className="icon-btn delete-btn" onClick={handleDelete}>
              🗑
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDelete;