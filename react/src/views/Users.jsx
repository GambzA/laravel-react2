import { useEffect, useState } from "react";
import axiosClient from "../axios-client";

function Users(){
    const [users, setUser] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        getUsers()
    },[])

    const getUsers = () => {
        axiosClient.get('/api/users')
            .then(({data})=>{
                setLoading(false)
                console.log(data)
            })
            .catch(()=>{
                setLoading(false)
            })
    }

    return (
        <div>
            Users
        </div>
    )
}

export default Users;