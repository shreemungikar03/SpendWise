import { useLoaderData } from "react-router-dom";
import { deleteItem, fetchData } from "../helpers";
import Table from "../components/Table";
import { toast } from "react-toastify";

// loader
export async function expensesLoader () {
    const expenses = fetchData("expenses");
    return {
        expenses
    }
}

// action
export async function expensesAction({request}) {
    const data = await request.formData();
    const {_action, ...values} = Object.fromEntries(data);

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

const ExpensesPage = () => {
    const {expenses} = useLoaderData()

    return (
        <div>
            <div className="grid-lg">
                <h1>All expenses</h1>
                {
                    expenses && expenses.length > 0 ?
                    (
                        <div className="grid-md">
                            <h2>Recent Expenses <small>({expenses.length} total)</small></h2>
                            <Table expenses={expenses} />
                        </div>
                        
                    ) :
                    (
                        <p>No expenses to show!</p>
                    )
                }
            </div>
        </div>
    )
}

export default ExpensesPage;