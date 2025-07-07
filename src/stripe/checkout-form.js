// CheckoutForm.js
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";

export default function CheckoutForm({ amount }) {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // 1. Fetch client secret from backend
        const res = await fetch("http://localhost:4242/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount }),
        });
        const { clientSecret } = await res.json();

        // 2. Confirm payment
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });

        if (result.error) {
            setMessage(result.error.message);
        } else if (result.paymentIntent.status === "succeeded") {
            setMessage("Payment successful! 🎉");
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button disabled={!stripe || loading}>
                {loading ? "Processing..." : "Pay"}
            </button>
            {message && <div>{message}</div>}
        </form>
    );
}
