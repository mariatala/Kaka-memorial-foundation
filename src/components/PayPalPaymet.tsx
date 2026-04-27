import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

export default function PayPalPayment( { amount = 10 }: { amount?: number }) {
	return (
		<>
			<PayPalScriptProvider
				options={{ clientId: String(process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID) }}
			>
				<PayPalButtons
					style={{
						layout: 'vertical',
						color: 'blue',
						shape: 'rect',
						label: 'paypal',
					}}
					createOrder={(data, actions) => {
						// You can replace '10.00' with a prop or state value if needed
						return actions.order.create({
							intent: 'CAPTURE',
							purchase_units: [
								{
									amount: {
										currency_code: 'USD',
										value: amount.toFixed(2), // Default to $10
									},
								},
							],
						});
					}}
					onApprove={(data, actions) => {
						if (actions.order) {
							return actions.order.capture().then((details) => {
								alert(
									'Transaction completed by ' + details.payer?.name?.given_name
								);
							});
						}
						// Optionally handle the case where actions.order is undefined
						return Promise.reject(new Error('Order actions are undefined.'));
					}}
				/>
			</PayPalScriptProvider>
		</>
	);
}
