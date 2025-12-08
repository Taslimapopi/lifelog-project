import React from 'react';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../hooks/useAxious';

const MyLessons = () => {
    const {user} = useAuth();
    const axios = useAxios();
    const {data:myLessons = []} = useQuery({
        queryKey: ['myLessons', user.email],
        queryFn:async() =>{
            const res = await axios.get(`/lessons?email=${user.email}`)
            return res.data

        }
    })
    return (
        <div>
            my lessons : {myLessons.length}
        </div>
    );
};

export default MyLessons;

