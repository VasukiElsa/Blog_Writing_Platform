import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const Authentication = () => {

    const [auth, setAuth] = useState({username : "", password : ""});

    const navigate = useNavigate();

    const handleFormInput = (event) => {
        const {name, value} = event.target;
        setAuth(
            (prevFormData) => {
                return(
                    {...prevFormData, [name] : value}
                );
            }

        );
    }

    const performAuthentication = (e) =>{

        e.preventDefault();

        if((auth.username === "Elsa") && (auth.password === "1023")){
            navigate('/write');
        }
        else{
            navigate('/home');
        }
    }

    return(
        <>

        <h1 className="auth-header">Admin Authentication!</h1>

        <form className="auth-form" onSubmit={performAuthentication}>
            <input className="auth-field" type="text" name = "username" value = {auth.username} onChange={handleFormInput} placeholder='Enter your username'/>
            
            <input className="auth-field" type="password" name = "password" value = {auth.password} onChange={handleFormInput} placeholder='Enter your password'/>
        </form>

        <button className="auth-btn" onClick={performAuthentication}>Authenticate</button>
        </>

    );


}

export default Authentication;