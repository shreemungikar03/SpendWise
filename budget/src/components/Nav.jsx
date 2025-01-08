import { Form, NavLink, Link } from "react-router-dom";
// import { Link, useLoaderData } from "react-router-dom";


import logomark from "../assets/logomark.svg"

import { TrashIcon,MoonIcon } from '@heroicons/react/24/solid'
import ToggleTheme from "./ToggleTheme";
import URLClassifier from "./URLClassifier";
import BudgetEntry from "./BudgetEntry";
// import { toggle } from "../helpers";

const Nav = ({userName}) => {
    return (
        <nav>
            <NavLink
              to="/"
              aria-label="Go to Home"
        >

                <img src={logomark} alt="" height={30} />
                <p>SpendWise</p>
                
            </NavLink>
            {/* <button className="moon" onClick={toggle()}>
            <MoonIcon width={20}/>
                
            </button> */}
            <ToggleTheme />
            {/* <BudgetEntry /> */}
            <Link
                to="fraud"
                className="btn btn--dark"
            >
            Payment Safety
            </Link>
            <URLClassifier />
            {
                userName && (
                    <Form
                    method="post"
                    action="/logout"
                    onSubmit={(event)=>{
                        if(!confirm("Log out and delete all user data ?"))
                            event.preventDefault()
                    }}
                    >
                        <button type="submit" className="btn btn--warning">
                            <span>Log Out</span>
                            <TrashIcon width={20} />
                        </button>
                        
                        
                    </Form>
                    
                )
            }

        </nav>
    )
}

export default Nav;