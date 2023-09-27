import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CardInput from './CardInput';
import CheckOutForm from './CheckOutForm';
import BookingConfirm from '../../Members/AppointmentBooking/BookingConfirm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51NW200FWCeACHFzeNmRLaay10RsG9IEwlqP8VnEAsc5anhkITMoaLQYnsm4QWA5WhTcLih5JzkIObVSNia11hp1d00xj8iCGKH'
);

export default function StripePayment({page,plan,setPage,payload,careprovider,type}) {
    console.log(plan);
    return (
      <Elements stripe={stripePromise}>
    {type==="member"?<BookingConfirm payload={payload}careprovider={careprovider}/>:   <CheckOutForm page={page} plan={plan} setPage={setPage} />}
      </Elements>
    )}  