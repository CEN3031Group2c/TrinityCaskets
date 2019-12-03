import React from 'react';
import {PayPalButton} from "react-paypal-button-v2";

export default ({amount}) => {
    var clientId = 'AS9DUdmW5oG-UgzuL9zS7887kPUxyenboXnyPydt9Ludfk6EOcSdguA_Iz-bim-5QCcJlw6zhuMWx9ot'
    return (
        <div style={{textAlign: "center"}}>
            <PayPalButton
            amount = {amount}
            currency = 'USD'
            shippingPreference="GET_FROM_FILE" // TODO: change this?
            onSuccess = {
                (details, data) => {
                    alert('Payment Successful');
                    console.log(details);
                    console.log(data);

                    // OPTIONAL: Call your server to save the transaction
                    //   return fetch("/paypal-transaction-complete", {
                    //     method: "post",
                    //     body: JSON.stringify({
                    //       orderID: data.orderID
                    //     })
                    //   });
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