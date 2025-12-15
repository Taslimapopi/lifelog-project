import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';


const useRole = () => {
    const { user,loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { isLoading: roleLoading, data: role } = useQuery({
        enabled: !loading && !!user?.email,
        
        queryKey: ['role', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/role/${user.email}`);
            console.log(res)
            
            return res.data?.result || 'user';
        }
    })

    return { role, roleLoading };
};

export default useRole;