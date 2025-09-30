import React, { useEffect, useRef, useState } from "react";
import "./ExpenseForm.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {CSVLink} from "react-csv"
const ExpenseForm = () => {
  let moneyInputRef = useRef();
  let descInputRef = useRef();
  let categoryRef = useRef();
  let [editId, setEditId] = useState(null);
  let [showData, setShowData] = useState([]);
  let [total, setTotal] = useState(0);
  const userId = localStorage.getItem("userUID"); // login ke time save kiya hua UID

  let handleEdit = (item) => {
    moneyInputRef.current.value = item.money;
    descInputRef.current.value = item.description;
    categoryRef.current.value = item.category;
    setEditId(item.id);
  };

  // console.log(total)
  let getData = async () => {
    try {
      let res = await axios.get(
        `https://expenseapp-796d0-default-rtdb.firebaseio.com/expense/${userId}.json`
      );
      let data = res.data;
      if (data) {
        let loadedData = Object.entries(data).map(([key, item]) => ({
          id: key,
          ...item,
        }));
        let sum = loadedData.reduce((acc, item) => acc + Number(item.money), 0);
        setTotal(sum)
        setShowData(loadedData);
      } else {
        setShowData([]);
      }
    } catch (error) {
      console.log("Error while getting", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  let handleSubmit = async (e) => {
    e.preventDefault();
    let expenseData = {
      money: moneyInputRef.current.value,
      description: descInputRef.current.value,
      category: categoryRef.current.value,
    };

    try {
      if (editId) {
        await axios.put(
          `https://expenseapp-796d0-default-rtdb.firebaseio.com/expense/${userId}/${editId}.json`,
          expenseData
        );
        toast.success("Expense updated successfully");
        setEditId(null);
      } else {
        await axios.post(
          `https://expenseapp-796d0-default-rtdb.firebaseio.com/expense/${userId}.json`,
          expenseData
        );
        toast.success("Expense added successfully");
      }
      getData();
    } catch (error) {
      toast.error("Error in saving data");
    }

    moneyInputRef.current.value = "";
    descInputRef.current.value = "";
    categoryRef.current.value = "";
  };

  let handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://expenseapp-796d0-default-rtdb.firebaseio.com/expense/${userId}/${id}.json`
      );
      toast.error("Item deleted successfully");
      getData();
    } catch (error) {
      toast.error("Error in deleting");
    }
  };

 const headers = [
  { label: "Id", key: "id" },
  { label: "Money", key: "money" },
  { label: "Description", key: "description" },
  { label: "Category", key: "category" },
];
  return (
    <div className="form-container">
       <CSVLink
  data={showData}
  headers={headers}
  filename="expensedata.csv"
  style={{
    display: "inline-block",
    marginTop: "15px",
    padding: "10px 20px",
    border: "2px solid #4CAF50",
    borderRadius: "8px",
    backgroundColor: "#4CAF50",
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    cursor: "pointer",
  }}
>
  Download CSV
</CSVLink>
      <form className="expense-form" onSubmit={handleSubmit}>
        <h1>Expense form</h1>
        <input type="text" ref={moneyInputRef} placeholder="Money" required />
        <input type="text" ref={descInputRef} placeholder="Description" required />
        <select ref={categoryRef} required>
          <option value="">Category</option>
          <option value="Food">Food</option>
          <option value="Petrol">Petrol</option>
          <option value="Salary">Salary</option>
        </select>
        <button type="submit">{editId ? "Update Expense" : "Add Expense"}</button>
      </form>
      <h2 style={{ marginTop: "20px" }}>Total Expense: {total}</h2>
 


      {showData.length > 0 &&
        showData.map((item, i) => (
          <div key={i} className="expense-card">
            <h1>{item.category}</h1>
            <p>
              <b>Money:</b> {item.money}
            </p>
            <p>Description: {item.description}</p>
            <div className="btn-container">
              <button onClick={() => handleDelete(item.id)}>Delete</button>
              <button onClick={() => handleEdit(item)}>Edit</button>
            </div>
          </div>
        ))}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
  );
};

export default ExpenseForm;
