import React, { useEffect, useState } from 'react';

import {useHttpClient} from '../../hooks/http-hook';
import { useParams } from "react-router";


const ConfirmForgotPassword = props => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [newPassword, setNewPassword] = useState();

    const TOKEN = useParams().key;

    useEffect(() => {
        const confirmForgotPassword = async () => {
            try {
                const responseData = await sendRequest(
                    process.env.REACT_APP_BACKEND_URL+`/api/user/confirmforgotpassword/${TOKEN}`,
                    "GET"
                )
            } catch (err) {
                console.log(err);
            }
        }
        confirmForgotPassword();
    }, [sendRequest, TOKEN]);

    const submitPasswordHandler = async event => {
            event.preventDefault();
    
            try{
                const responseData = await sendRequest(
                    process.env.REACT_APP_BACKEND_URL+`/api/user/changeforgotpassword/${TOKEN}`,
                    "PATCH",
                    JSON.stringify({
                        newPass: newPassword,
                    }),
                    {
                        "Content-Type": "application/json",
                    }
                );
                // console.log(responseData);
            } catch (err) {
                console.log(err);
            }
        }

    return (<>
            <form onSubmit={submitPasswordHandler}>
                <input type="password" placeholder="Enter New Password" onChange={e=>setNewPassword(e.target.value)}></input>
                <button type="submit">Submit</button>
            </form>
        </>
    );
}

export default ConfirmForgotPassword;