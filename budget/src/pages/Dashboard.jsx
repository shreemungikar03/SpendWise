// helper functions
import { Link, useLoaderData } from "react-router-dom";
import { calculateSpentByBudget, createBudget, createExpense, deleteItem, fetchData } from "../helpers"
import { wait } from "../helpers";

import { toast } from "react-toastify";

// components
import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";
import Chart from "../components/Chart";
import LineGraph from "../components/LineGraph";
import BarGraph from "../components/BarGraph";
import ChatB from "../components/ChatB";
import ChatbotEmbed from "../components/ChatbotEmbed";
import SendOTP from "../components/SendOtp";


// loader
export function dashboardLoader () {
    const userName = fetchData("userName");
    const budgets = fetchData("budgets");
    const expenses = fetchData("expenses");
    return {
        userName,
        budgets,
        expenses
    }
}

// action
export async function dashboardAction({request}){
    await wait()

    const data = await request.formData();
    const {_action, ...values} = Object.fromEntries(data)
    if(_action==="newUser")
    {
        try{
            localStorage.setItem("userName",JSON.stringify(values.userName))
            return toast.success(`Welcome, ${values.userName}`)
        }catch(e){
            throw new Error("There was a problem in creating your account!")
        }
    }

    if(_action==="createBudget")
    {
        try{
            // create budget
            createBudget({
                name : values.newBudget,
                amount : values.newBudgetAmount
            })

            return toast.success("Budget created!")
        }catch(e){
            throw new Error("There was an error in creating your budget.")
        }
    }
    if(_action==="createExpense")
    {
        // const spent = calculateSpentByBudget(values.newExpenseAmount);
        try{
            // create expense
            createExpense({
                name : values.newExpense,
                amount : values.newExpenseAmount,
                budgetID : values.newExpenseBudget
            })
            // console.log(`${values.newExpenseBudget}`)
            // // console.log(spent)
            // if(spent > values.newExpenseAmount) 
            // {
            //     return toast.success(`You overspent in ${values.newExpense} expense!`)
            // }
            // else 
            // {
                return toast.success(`Expense ${values.newExpense} created!`)

            // }
        }catch(e){
            // console.error(e);
            throw new Error("There was an error in creating your expense.")
        }
    }
    if(_action==="deleteExpense")
    {
        try{
            // delete expense
            deleteItem({
                key : "expenses",
                id : values.expenseID   
            });
            
            return toast.success(`Expense deleted!`)
        }catch(e){
            throw new Error("There was an error in deleting your expense.")
        }
    }
}

const Dashboard = () => {
    const { userName, budgets, expenses } = useLoaderData();

    // const chartData = budgets.map(budget => ({
    //     name: budget.name,   // Use the name of the budget
    //     amountBudget: parseFloat(budget.amount), // Use the amount of the budget
    //     color: budget.color
    // }));
    // const chartExpenseData = expenses.map(expense => ({
    //     // name: expense.name,   // Use the name of the expense
    //     amountExpense: parseFloat(expense.amount), // Use the amount of the expense
    //     // color: expense.color
    // }));

    
    // Calculate the total expense amount per budget
  const combinedChartData = budgets.map(budget => {
    // Filter and sum up all expenses related to this budget
    const totalExpensesForBudget = expenses
      .filter(expense => expense.budgetID === budget.id)
      .reduce((total, expense) => total + parseFloat(expense.amount), 0); // Sum expenses

    return {
      name: budget.name,  // Budget name for X-axis
      budgetAmount: parseFloat(budget.amount),  // Budgeted amount
      expenseAmount: totalExpensesForBudget,  // Total expenses for this budget
      totalSpent: parseFloat(budget.amount) + totalExpensesForBudget, // Total spent (budget + expenses)
      color: budget.color // Use the budget's color for the chart
    };
  });

  const chartColors = combinedChartData.map(data => data.color);

    // const chartColors = chartData.map(budget => budget.color);

    // console.log('Colors:', chartData.map(budget => budget.color)); 

    
    return (
        <>
            {
                userName ? (
                    <div className="dashboard">
                        <h1>Welcome Back, <span className="accent">{userName}</span></h1>
                        {/* <ChatB /> */}
                        <ChatbotEmbed />
                        {/* <SendOTP /> */}
                        <div className="grid-sm">
                            {
                                budgets && budgets.length > 0 ?
                                (
                                <div className="grid-lg">
                                    <div className="flex-lg">
                                        <AddBudgetForm />
                                        <AddExpenseForm budgets = {budgets}/>
                                    </div>
                                    <h2>Existing Budgets</h2>
                                    <div className="budgets">
                                        {
                                            budgets.map((budget) => (
                                                <BudgetItem 
                                                  key={budget.id} 
                                                  budget={budget}
                                                  
                                                />
                                            ))
                                        }
                                    </div>
                                    {
                                        expenses && expenses.length > 0 
                                        && (
                                            <div className="grid-md">
                                                <h2>Recent Expenses</h2>
                                                <Table
                                                  expenses={expenses.sort((a,b)=> 
                                                    b.createdAt - a.createdAt
                                                  )
                                                  .slice(0,8)
                                                }
                                                />
                                                {
                                                    expenses.length > 8 && (
                                                        <Link
                                                          to="expenses"
                                                          className="btn btn--dark"
                                                        >
                                                        View all expenses
                                                        </Link>
                                                    )
                                                }
                                            </div>
                                        )
                                        
                                    }
                                </div>
                                ) 
                                : (
                                    <div className="grid-sm">
                                        {/* <p>Personal budgeting is the secret to financial freedom.</p> */}
                                        <p>Create a Budget to get started!</p>
                                        <AddBudgetForm />
                                    </div>
                                )
                            }
                        </div>
                        {/* <h2>Real-Time Analytics</h2> */}
                        <div className="chart-container">
                        <Chart data={combinedChartData} colors={chartColors}/>
                        <BarGraph data={combinedChartData} colors={chartColors}/>
                        </div >
                        <LineGraph />
                    </div>
                ) 
                : <Intro />
            }
        </>
    )
}

export default Dashboard