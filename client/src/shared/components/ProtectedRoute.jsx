import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../store/AuthContext';

/**
 * Protects routes by requiring authentication and optional role.
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to render when access is allowed
 * @param {string[]} props.allowedRoles - Roles that can access. e.g. ['admin'], ['vendor', 'admin'], ['customer', 'vendor', 'admin']
 */
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const { user, role, loading } = useAuth();
    const location = useLocation();
    const currentPath = location.pathname + location.search;

    if (loading) {
        return (
            <div className="min-h-screen bg-[#121212] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
            </div>
        );
    }

    if (!user) {
        return <Navigate to={`/auth?redirect=${encodeURIComponent(currentPath)}`} replace state={{ from: location }} />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
        if (role === 'admin') return <Navigate to="/admin/dashboard" replace />;
        if (role === 'vendor') return <Navigate to="/vendor/dashboard" replace />;
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default ProtectedRoute;
