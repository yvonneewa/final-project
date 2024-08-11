// // PaymentComponent.jsx
// import React, { useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// const stripePromise = loadStripe('your_public_key_from_stripe');

// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!stripe || !elements) return;

//     setLoading(true);

//     const { clientSecret } = await fetch('/create-payment-intent', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ amount: 50 }), // Example amount in dollars
//     }).then((res) => res.json());

//     const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: elements.getElement(CardElement),
//       },
//     });

//     if (error) {
//       console.error('Payment failed', error);
//       setLoading(false);
//     } else if (paymentIntent.status === 'succeeded') {
//       console.log('Payment successful');
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement />
//       <button type="submit" disabled={!stripe || loading}>
//         {loading ? 'Processing...' : 'Pay'}
//       </button>
//     </form>
//   );
// };

// const Payment = () => (
//   <Elements stripe={stripePromise}>
//     <CheckoutForm />
//   </Elements>
// );

// export default Payment;
