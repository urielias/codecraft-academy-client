import { Login, Register } from "./pages/auth";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./routing/ProtectedRoute";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Unauthenticated routes */}
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />

                    {/* Protected routes */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="home" element={<>Hello World!</>} />
                    </Route>

                    {/* Redirect all unknown routes to login page */}
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
