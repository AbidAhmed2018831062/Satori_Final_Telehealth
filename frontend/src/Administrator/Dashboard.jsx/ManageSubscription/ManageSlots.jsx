import React, { useEffect, useState } from 'react';
import logo from "../../../assets/images/logo.png"
import { Box } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import {useStripe, useElements, CardElement, Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { NavLink } from 'react-router-dom';
import ManageSlotsWithPayment from './ManageSlotsWithPayment';
const stripePromise = loadStripe('pk_test_51NW200FWCeACHFzeNmRLaay10RsG9IEwlqP8VnEAsc5anhkITMoaLQYnsm4QWA5WhTcLih5JzkIObVSNia11hp1d00xj8iCGKH'
);
function ManageSlots()
{

   
return(
    <Elements stripe={stripePromise}>
     <ManageSlotsWithPayment/>
    </Elements>
)
}

export default ManageSlots;