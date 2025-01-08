import { Form } from "react-router-dom"

import illustration from "../assets/illustration.jpg"

import { UserPlusIcon } from '@heroicons/react/24/solid'

const Intro = () => {
    return (
        <div className="intro">
            <div>
                <h1>
                    Take control of <span className="accent">Your Money</span>
                </h1>
                <p>Start spending wise today!</p>
                <Form 
                  method="post"
                >
                    <input 
                        type="text" 
                        name="userName" 
                        required
                        placeholder="What is your name?"
                        aria-label="Your Name"
                        autoComplete="given-name"
                    />
                    <input 
                        type="hidden" 
                        name="_action" 
                        value="newUser" 
                    />
                    <button type="submit" className="btn btn--dark">
                        <span>Create Account</span>
                        <UserPlusIcon width={20} />
                    </button>
                </Form>
            </div>
            <img src={illustration} alt="" width="600" />
        </div>
    )
}

export default Intro