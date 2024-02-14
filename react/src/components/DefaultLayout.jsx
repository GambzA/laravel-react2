import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
import { useEffect } from "react";

function DefaultLayout() {
    const{user, token, setUser, setToken} = useStateContext()

    if(!token){
        return <Navigate to="/login" />
    }

    const onLogout = (ev) => {
        ev.preventDefault();
        axiosClient.post('/api/logout', user)
        .then(() => {
            setUser({})
            setToken(null)
        })
    }

    useEffect(()=>{
        axiosClient.get('/api/user')
        .then(({data}) => {
            setUser(data)
        })
    }, [])

    return ( 
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
            </aside>
            <div className="content">
                <header>
                    <div>
                        Header
                    </div>
                    <div>
                       {user.name}
                       <a href="#" onClick={onLogout} className="btn-logout">Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet></Outlet>
                </main>
            </div>
        </div>
     );
}

export default DefaultLayout;