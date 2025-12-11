import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import useAxios from '../hooks/useAxious';
import useAxiosSecure from '../hooks/useAxiosSecure';

const Payment = () => {
    const axiosInstance = useAxios()
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id')
    console.log(sessionId)
    const axiosSecure = useAxiosSecure()

    useEffect(()=>{
        if(sessionId){
            axiosInstance.patch(`/payment?session_id=${sessionId}`)
            .then(res=>console.log(res.data))

        }
    },[sessionId,axiosInstance])


    return (
        <div>
            <h2 className='text-4xl text-center'>Payment Successful</h2>
        </div>
    );
};

export default Payment;