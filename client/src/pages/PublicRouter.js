import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {

    const currentToken = localStorage.getItem('token');
    if (currentToken) {
        return <Navigate to='/' />
    } else {
        return children;
    }
};

export default PublicRoute;