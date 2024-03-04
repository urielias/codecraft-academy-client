import styling from "./routing.module.css";
import { useAuth } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";

const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? (
        <div className={styling.mainContent}>
            <Sidebar />
            <div className={styling.secondaryContent}>
                <SearchBar />
                <div className={styling.pageContent}>
                    <Outlet />
                </div>
            </div>
        </div>
    ) : (
        <Navigate to="/login" replace />
    );
};

export default ProtectedRoute;
