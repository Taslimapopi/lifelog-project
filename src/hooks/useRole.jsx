import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';


const useRole = () => {
    const { user,loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { isLoading: roleLoading, data: role = 'user' } = useQuery({
        enabled: !loading && !!user?.email,
        
        queryKey: ['user-role', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/role/${user.email}`);
            // const res = await axiosSecure.get(`/users/${user.email}/role`);
            
            return res.data?.role || 'user';
        }
    })

    return { role, roleLoading };
};

export default useRole;