import { useRef, useState } from "react";
import { Link, UNSAFE_DataRouterStateContext } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

function Register(){
    const nameRef = useRef();
    const emailRef = useRef();
    const passRef = useRef();
    const passConfRef = useRef();
    
    const [errors, setErrors] = useState(null)

    const {setUser, setToken} = useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault()
        const payload = {
            name : nameRef.current.value,
            email : emailRef.current.value,
            password : passRef.current.value,
            password_confirmation : passConfRef.current.value,
        }

        axiosClient.post('/api/register', payload)
        .then(({data})=>{
            setToken(data.token);
            setUser(data.user);
        })
        .catch(err => {
            const response = err.response;
            if(response && response.status === 422){
                // console.log(response.data.errors);
                setErrors(response.data.errors)
            }
        });
        console.table(payload);
    }

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">
                        Register a new account
                    </h1>
                    {errors && <div className="alert">
                        {Object.keys(errors).map(key=>(
                            <p key={key}>{errors[key][0]}</p>
                        ))}    
                    </div>}
                    <input ref={nameRef} type="text" placeholder="Full Name" />
                    <input ref={emailRef} type="email" placeholder="Email" />
                    <input ref={passRef} type="password" placeholder="Password" />
                    <input ref={passConfRef} type="password" placeholder="Confirm Password" />
                    <button className="btn btn-block">Register</button>
                    <p className="message">
                        Already Registered? <Link to="/login">Sign in instead!</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Register;