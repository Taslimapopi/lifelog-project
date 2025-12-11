import React from 'react';
import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
        <div>
            <h2>Payment is Cancelled. pls try again</h2>
            <Link to='/pricing' className='btn btn-primary'>Try again</Link>
        </div>
    );
};

export default PaymentCancelled;
