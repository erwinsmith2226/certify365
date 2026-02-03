import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { isAIConfigured } from '$lib/server/ai';
import { isEmailConfigured } from '$lib/server/email';
import { isStorageConfigured } from '$lib/server/storage';

/**
 * GET /api/status - Check service configuration status
 * Useful for admin dashboard and debugging
 */
export const GET: RequestHandler = async ({ locals }) => {
	const session = await locals.auth();

	// Public status (limited info)
	const publicStatus = {
		healthy: true,
		version: '0.0.1'
	};

	// If not authenticated, return limited status
	if (!session?.user) {
		return json(publicStatus);
	}

	// Full status for authenticated users
	const aiStatus = isAIConfigured();

	return json({
		...publicStatus,
		services: {
			database: true, // If we got here, DB is working
			auth: true,
			ai: {
				configured: aiStatus.anthropic || aiStatus.openai,
				anthropic: aiStatus.anthropic,
				openai: aiStatus.openai
			},
			email: isEmailConfigured(),
			storage: isStorageConfigured()
		},
		user: {
			id: session.user.id,
			email: session.user.email
		}
	});
};
