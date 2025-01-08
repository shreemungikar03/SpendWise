// import { useLoaderData } from "react-router-dom";
// import { deleteItem, fetchData } from "../helpers";
// import Table from "../components/Table";
// import { toast } from "react-toastify";
import BudgetEntry from "../components/BudgetEntry";
// import URLClassifier from "../components/URLClassifier";

// loader
// export async function expensesLoader () {
//     const expenses = fetchData("expenses");
//     return {
//         expenses
//     }
// }

// // action
// export async function expensesAction({request}) {
//     const data = await request.formData();
//     const {_action, ...values} = Object.fromEntries(data);

//     if(_action==="deleteExpense")
//         {
//             try{
//                 // delete expense
//                 deleteItem({
//                     key : "expenses",
//                     id : values.expenseID   
//                 });
                
//                 return toast.success(`Expense deleted!`)
//             }catch(e){
//                 throw new Error("There was an error in deleting your expense.")
//             }
//         }
// }

const FraudPage = () => {
    // const {expenses} = useLoaderData()

    return (
        <div>
            <h2>Detect anomalies in your payments!</h2>
            <div className="form-wrapper" style={{width : '75%', marginTop : '10px' }}>
                <BudgetEntry />
            </div>
            {/* <URLClassifier /> */}
        </div>
    )
}

export default FraudPage;