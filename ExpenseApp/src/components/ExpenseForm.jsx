import React, { useEffect, useRef, useState } from 'react'
import './ExpenseForm.css' 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"
const ExpenseForm = () => {
    let moneyInputRef = useRef();
    let descInputRef = useRef();
    let categoryRef = useRef()
    let [editId, setEditId] = useState(null);
    let [showData, setShowData] = useState([])
    
    let handleEdit = (item) => {
        moneyInputRef.current.value = item.money;
        descInputRef.current.value = item.description;
        categoryRef.current.value = item.category;
        setEditId(item.id)
    }
    let handleSubmit = async(e) => {
        e.preventDefault();
        let expenseData = {
            money: moneyInputRef.current.value,
            description: descInputRef.current.value,
            category:categoryRef.current.value
        }
        try {
            if (editId) {
                await axios.put(`https://expenseapp-796d0-default-rtdb.firebaseio.com/expense/${editId}.json`,expenseData)
                toast.success("Expense edit successfully")
                setEditId(null)
            } else {
            
            let res = await axios.post("https://expenseapp-796d0-default-rtdb.firebaseio.com/expense.json", expenseData)
            
            let data = await res.data
           toast.success("Expense added successfully")
            console.log(data)
            }
            getData()
        } catch (error) {
            toast.success("Error in Posting",error)
        }
        // setShowData((pre)=>[...pre,expenseData])
        moneyInputRef.current.value = "";
        descInputRef.current.value = "";
        categoryRef.current.value = "";
    }
    let getData = async() => {
    try {
        let res = await axios.get("https://expenseapp-796d0-default-rtdb.firebaseio.com/expense.json")
        let data = await res.data;
        let loadedData = Object.entries(data).map(([key, item]) => ( {id: key,
            ...item}))
        setShowData(loadedData)
        
    } catch (error) {
        console.log("Error while getting",error)
    }
    }
    useEffect(()=>{
getData()
    }, [])
    let handleDelete = async (id) => {
        try {
            let res = await axios.delete(`https://expenseapp-796d0-default-rtdb.firebaseio.com/expense/${id}.json`)
            let data = await res.data;
            toast.error("iTem Deleted successful")
            // console.log(data)
            getData()
        } catch (error) {
            toast.error("Error in Deleting")
        }
    }
  return (
    <div className="form-container">
          <form className="expense-form" onSubmit={handleSubmit}>
              <h1>Expense form</h1>
        <input type="text" ref={moneyInputRef} placeholder="Money" required/>
        <input type="text" ref={descInputRef} placeholder="Description" required/>
        <select ref={categoryRef} required>
          <option value="">Category</option>
          <option value="Food">Food</option>
          <option value="Petrol">Petrol</option>
          <option value="Salary">Salary</option>
        </select>
        <button type="submit">{editId?"Update Expense":"Add Expense"}</button>
          </form>
         {showData.length > 0 && showData.map((item, i) => (
  <div key={i} className="expense-card">
    <h1>{item.category}</h1>
    <p><b>Money:</b> {item.money}</p>
                 <p>Description: {item.description}</p>
                 <div className="btn-container">
                 <button onClick={()=>handleDelete(item.id)}>Delete</button>
                 <button onClick={()=>handleEdit(item)}>Edit</button>
                 </div>
                 
                 
  </div>
))}
          <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="colored"
      />
    </div>
  )
}

export default ExpenseForm