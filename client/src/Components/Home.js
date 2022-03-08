import React, {useState} from "react"
import {Container, Button,  Row, Stack} from "react-bootstrap"
import styled from "styled-components"
import ExpenseCard from "./ExpenseCard"
import CreateExpense from "./CreateExpense";


import useFetch from "./useFetch";
import { useHistory} from "react-router-dom";

function Home({setUser, user}){


    const history = useHistory()
    const [show, setShow] = useState(false);
    const[month, setMonth] = useState("2022-03")
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    
    const {data: expenses, setData: setExpenses, isPending, error} = useFetch(`/users/${user.id}/expenses`)



    function handleMonthClick(e){
    setMonth(e.target.value) 
    }


    function onCreateExpense(newExpense){
     const newExpensesArray = [...expenses, newExpense]
     setExpenses(newExpensesArray)
    }

    function onAddExpense(updatedExpense){
    const updatedExpensesArray = expenses.map((expense)=>{
       if(expense.id === updatedExpense.id){
        return updatedExpense 
       }
        else {return expense} 
    })
    setExpenses(updatedExpensesArray)
    }

    function onDelete(id){
    const notDeletedExpenses = expenses.filter((expense)=> expense.id !== id)
    setExpenses(notDeletedExpenses)
    }
    

    const handleLogout = () =>{
    fetch("/logout", {
        method: "DELETE"
    })  
    .then(res => {
        if (res.ok) {
          setUser(null)
        }
      })  
    history.push("/login")
    }


   let oneExpense = expenses.filter((expense)=>{
     if (expense.date == month){
        return expense
     }
   }).map((expense)=>{
       return(<ExpenseCard key={expense.id} expense={expense} onAddExpense={onAddExpense} user={user} onDelete={onDelete}/>)
   })


   const total = expenses.filter((expense)=>{
    if (expense.date == month){
        return expense
     }
   }
   ).reduce((totalExpense, expense)=>{
    return totalExpense + expense.amount
   }, 0)


    return(
        <Container className="my-3">
            <Button variant="info" onClick={handleShow}> Create Expense</Button>
            <Button variant="info" onClick={handleLogout} className="float-end">Log Out</Button>
             <CreateExpense show={show} setShow={setShow} handleClose={handleClose} user={user} onCreateExpense={onCreateExpense}/>
            <Row className="mt-5">
            <Stack direction="horizontal" gap={3} className="mb-4">
             <Button variant="secondary" value ="2022-01" onClick = {handleMonthClick}>Jan</Button>
             <Button variant="secondary" value ="2022-02" onClick = {handleMonthClick}>Feb</Button>
             <Button variant="secondary" value ="2022-03" onClick = {handleMonthClick}>March</Button>
             <Button variant="secondary" value ="2022-04" onClick = {handleMonthClick}> Apr</Button>
             <Button variant="secondary" value ="2022-05" onClick = {handleMonthClick}>May</Button>
             <Button variant="secondary" value ="2022-06" onClick = {handleMonthClick}>Jun</Button>
             <Button variant="secondary" value ="2022-07" onClick = {handleMonthClick}> Jul</Button>
             <Button variant="secondary" value ="2022-08" onClick = {handleMonthClick}>Aug</Button>
             <Button variant="secondary" value ="2022-09" onClick = {handleMonthClick}>Sep</Button>
             <Button variant="secondary" value ="2022-10" onClick = {handleMonthClick}> Oct</Button>
             <Button variant="secondary" value ="2022-11" onClick = {handleMonthClick}>Nov</Button>
             <Button variant="secondary" value ="2022-12" onClick = {handleMonthClick}>Dec</Button>
             </Stack>
             {error && <div>{error}</div>} 
             {isPending && <div>Loading...</div> }  
             {oneExpense}
            </Row>
            <StyledTotal>Total: ${total} </StyledTotal>
        </Container>
    )
}

export default Home

const StyledTotal = styled.h3 `
padding-top: 3rem;
`