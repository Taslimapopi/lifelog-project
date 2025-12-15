import React from 'react';

import LoadingSpinner from '../pages/LoadingSpinner';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';

const AdminRoute = ({ children }) => {
    const { loading } = useAuth();
    const { role, roleLoading } = useRole()

    if (loading || roleLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    if (role !== 'admin') {
        return <p>forbidden page</p>
    }

    return children;
};

export default AdminRoute;