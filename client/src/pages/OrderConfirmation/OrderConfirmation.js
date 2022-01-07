import React from 'react';
import {useParams } from 'react-router-dom';
import StoreView from '../../components/StoreView/StoreView';

const OrderConfirmation = () => {

    const {orderNumber} = useParams();

    return (
        <div className='layout-flat__body'>
            <StoreView />
            <div className='heading-1__bold'>Order Confirmation</div>
            <div className='heading-3'>We have received your purchase request!  Your order number is <span className='bold'>#{orderNumber}</span>.</div>
        </div>
    )
};

export default OrderConfirmation;

