import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

function Login(){

    const emailRef = useRef();
    const passRef = useRef();

    const {setUser, setToken} = useStateContext();
    const [errors, setErrors] = useState(null)


    const onSubmit = (ev) => {
        ev.preventDefault()
        setErrors(null)

        const payload = {
            email : emailRef.current.value,
            password : passRef.current.value,
        }
        axiosClient.post('/api/login', payload)
        .then(({data})=>{
            setToken(data.token);
            setUser(data.user);
        })
        .catch(err => {
            const response = err.response;
            console.log(response.data);
            if(response && response.status === 422){
                setErrors(response.data.errors);
            } else if(response && response.status === 401) {                
                setErrors({
                    email: [response.data.message]
                });
            } else {
                setErrors(response.data.errors);
            }
        });
    }


    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">
                        Login into your account
                    </h1>
                    {errors && <div className="alert">
                        {Object.keys(errors).map(key=>(
                            <p key={key}>{errors[key][0]}</p>
                        ))}    
                    </div>}
                    <input ref={emailRef} type="email" placeholder="Email" />
                    <input ref={passRef} type="password" placeholder="Password" />
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Not Registered? <Link to="/register">Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login;