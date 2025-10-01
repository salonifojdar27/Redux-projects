import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Fetchusers } from "../Features/UserSlice"

export default function Home() {
    const dispatch = useDispatch();
    const { users, currentUsers } = useSelector((state) => state.users);

    const handleFetchUsers = () => {
        dispatch(Fetchusers())
    }

    useEffect(() => {
        handleFetchUsers();
    }, []);

    console.log(currentUsers);
    return (
        <div>
            <h1>Home Page</h1>
            <h2>{currentUsers.email}</h2>
            <div>
                {
                    users.map((user, index) => <p key={index}>{user.email}</p>)
                }
            </div>
        </div>
    );
}