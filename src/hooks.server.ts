import { handle as authHandle } from '$lib/server/auth';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

// Add security headers
const securityHeaders: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

	return response;
};

export const handle = sequence(authHandle, securityHeaders);
