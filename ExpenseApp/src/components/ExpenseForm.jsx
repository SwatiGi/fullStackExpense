import React, { useEffect, useRef, useState } from 'react'
import './ExpenseForm.css' 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"
const ExpenseForm = () => {
    let moneyInputRef = useRef();
    let descInputRef = useRef();
    let categoryRef = useRef()
    let [showData,setShowData] = useState([])
    let handleSubmit = async(e) => {
        e.preventDefault();
        let expenseData = {
            money: moneyInputRef.current.value,
            description: descInputRef.current.value,
            category:categoryRef.current.value
        }
        try {
            let res = await axios.post("https://expenseapp-796d0-default-rtdb.firebaseio.com/expense.json", expenseData)
            
            let data = await res.data
           toast.success("Expense added successfully")
            console.log(data)
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
        console.log(data)
        setShowData(loadedData)
        console.log(loadedData)
        
    } catch (error) {
        console.log("Error while getting",error)
    }
    }
    useEffect(()=>{
getData()
    },[])
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
        <button type="submit">Add Expense</button>
          </form>
         {showData.length > 0 && showData.map((item, i) => (
  <div key={i} className="expense-card">
    <h1>{item.category}</h1>
    <p><b>Money:</b> {item.money}</p>
                 <p>Description: {item.description}</p>
                 <div className="btn-container">
                 {/* <button>Delete</button>
                 <button>Edit</button> */}
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