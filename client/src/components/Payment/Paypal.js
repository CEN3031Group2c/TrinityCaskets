import React from 'react';
import {PayPalButton} from "react-paypal-button-v2";

export default ({amount, clientId}) => {
    return (
        <div style={{textAlign: "center"}}>
            <PayPalButton
            amount = {amount}
            currency = 'USD'
            onSuccess = {
                (details, data) => {
                    alert('Payment Successful');
                    console.log(details);
                    console.log(data);
                }
            }
            catchError = {
                (err) => {
                    console.err(err);
                }
            }
            createOrder = {
                function(data, actions) {
                    return actions.order.create({
                    purchase_units: [{
                        amount: {
                        value: amount
                        }
                    }]
                    });
                }
            }
            options={{
                clientId: clientId
            }}
            />
        </div>
    );
}