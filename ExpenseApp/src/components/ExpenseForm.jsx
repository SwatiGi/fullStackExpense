import React, { useRef, useState } from 'react'
import './ExpenseForm.css' 

const ExpenseForm = () => {
    let moneyInputRef = useRef();
    let descInputRef = useRef();
    let categoryRef = useRef()
    let [showData,setShowData] = useState([])
    let handleSubmit = (e) => {
        e.preventDefault();
        let expenseData = {
            money: moneyInputRef.current.value,
            description: descInputRef.current.value,
            category:categoryRef.current.value
        }
        setShowData((pre)=>[...pre,expenseData])
        moneyInputRef.current.value = "";
        descInputRef.current.value = "";
        categoryRef.current.value = "";
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
        <button type="submit">Add Expense</button>
          </form>
          {showData.length > 0 && showData.map((item,i) => (
              <div key={i}>
                  <h1>{item.category}</h1>
                  <p><b>Money:</b>{item.money}</p>
                  <p>Description :{item.description}</p>
              </div>

))}
          {/* <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="colored"
      /> */}
    </div>
  )
}

export default ExpenseForm