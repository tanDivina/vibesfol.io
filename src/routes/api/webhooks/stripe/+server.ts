import { PRIVATE_STRIPE_API_KEY, PRIVATE_SUPABASE_SERVICE_ROLE } from '$env/static/private';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { error, json, type RequestEvent } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';
import type { Database } from '../../../lib/DatabaseDefinitions';

const stripe = new Stripe(PRIVATE_STRIPE_API_KEY, { apiVersion: '2023-08-16' });
const supabase = createClient<Database>(PUBLIC_SUPABASE_URL, PRIVATE_SUPABASE_SERVICE_ROLE);

export async function POST({ request }: RequestEvent) {
	const sig = request.headers.get('stripe-signature');
	const body = await request.text();

	let event: Stripe.Event;

	try {
		event = stripe.webhooks.constructEvent(body, sig!, process.env.STRIPE_WEBHOOK_SECRET!);
	} catch (err: any) {
		console.error('Error constructing Stripe webhook event:', err.message);
		throw error(400, `Webhook Error: ${err.message}`);
	}

	if (event.type === 'checkout.session.completed') {
		const session = event.data.object as Stripe.Checkout.Session;
		const customerId = session.customer as string;
		const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 1 });
		const priceId = lineItems.data[0].price?.id;

		const { data: customer, error: customerError } = await supabase
			.from('stripe_customers')
			.select('user_id')
			.eq('stripe_customer_id', customerId)
			.single();

		if (customerError || !customer) {
			console.error('Error getting user from customer ID:', customerError);
			throw error(500, 'Error getting user from customer ID');
		}

		const userId = customer.user_id;
		let planId = 'free';

		if (priceId === 'price_1Rsq6aCl8zxGQFLZR8a54voV') {
			planId = 'starter_ltd';
		} else if (priceId === 'price_1RsqwPCl8zxGQFLZ1sAg7nT6') {
			planId = 'unlimited_ltd';
		}

		const { data: profile, error: profileError } = await supabase
			.from('profiles')
			.select('*')
			.eq('id', userId)
			.single();

		if (profileError || !profile) {
			console.error('Error getting user profile:', profileError);
			throw error(500, 'Error getting user profile');
		}

		const { error: updateError } = await supabase
			.from('profiles')
			.update({ ...profile, planId: planId })
			.eq('id', userId);

		if (updateError) {
			console.error('Error updating user plan:', updateError);
			throw error(500, 'Error updating user plan');
		}
	}

	return json({ received: true });
}
