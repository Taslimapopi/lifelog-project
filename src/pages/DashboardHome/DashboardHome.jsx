import React from 'react';
import useRole from '../../hooks/useRole';
import AdminProfile from '../AdminDashboard/AdminProfile';
import Profile from '../Auth/Profile';
import AdminDashboard from '../AdminDashboard/AdminHome';
import LoadingSpinner from '../LoadingSpinner';

const DashboardHome = () => {
    const { role, roleLoading } = useRole();
    if (roleLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    if (role === 'admin') {
        return <AdminDashboard></AdminDashboard>
    }
    if (role === 'user') {
        return <Profile></Profile>
    }
    
};

export default DashboardHome;