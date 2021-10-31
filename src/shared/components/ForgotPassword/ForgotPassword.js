import React, { useState } from 'react';
import {useHttpClient} from '../../hooks/http-hook';

const ForgotPassword = props => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [email, setEmail] = useState();

    const emailSubmitHandler = async event => {
        event.preventDefault();

        try{
            const responseData = await sendRequest(
                process.env.REACT_APP_BACKEND_URL+"/api/user/verifyforgotpassword",
                "PATCH",
                JSON.stringify({
                    email: email,
                }),
                {
                    "Content-Type": "application/json",
                }
            );
        } catch (err) {
            console.log(err);
        }
    }

    return(
        <form onSubmit={emailSubmitHandler}>
            <input name="email" type="email" placeholder="Enter E-Mail" onChange={e => setEmail(e.target.value)}></input>
            <button type="submit">Submit</button>
        </form>
    );
}

export default ForgotPassword;