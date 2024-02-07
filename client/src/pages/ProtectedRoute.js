import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getUser } from "../redux/Slices/userSlice";

function ProtectedRoute({ children }) {
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const currentToken = localStorage.getItem('token');

    const getUserInfo = async () => {
        try {
            const res = await axios.post('/get_user_info', {
                token: localStorage.getItem('token')
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (res.data.success) {
                dispatch(getUser(res.data.data));
                console.log(res.data.data);
            } else {
                localStorage.clear();
                <Navigate to='/login' />
            }
        } catch (error) {
            localStorage.clear();
            console.log(error);
        }
    }

    useEffect(() => {
        if (!user) {
            getUserInfo();
        }
    }, [getUserInfo]);

    if (currentToken) {
        return children;
    } else {
        return <Navigate to='/login' />
    }
};

export default ProtectedRoute;