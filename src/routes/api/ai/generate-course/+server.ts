import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { generateCourse, generateCourseFromDocument, isAIConfigured } from '$lib/server/ai';

export const POST: RequestHandler = async ({ request, locals }) => {
	// Check authentication
	const session = await locals.auth();
	if (!session?.user) {
		throw error(401, 'Unauthorized');
	}

	// Check AI configuration
	const aiStatus = isAIConfigured();
	if (!aiStatus.anthropic && !aiStatus.openai) {
		throw error(503, 'AI service not configured');
	}

	const body = await request.json();
	const { type, topic, documentText, options, provider } = body;

	try {
		let course;

		if (type === 'from_document' && documentText) {
			// Generate from uploaded document text
			course = await generateCourseFromDocument(
				documentText,
				{
					targetAudience: options?.targetAudience,
					difficulty: options?.difficulty,
					includeQuizzes: options?.includeQuizzes ?? true
				},
				provider || (aiStatus.anthropic ? 'anthropic' : 'openai')
			);
		} else if (topic) {
			// Generate from topic prompt
			course = await generateCourse(
				{
					topic,
					targetAudience: options?.targetAudience,
					difficulty: options?.difficulty || 'intermediate',
					estimatedDuration: options?.estimatedDuration || 60,
					includeQuizzes: options?.includeQuizzes ?? true,
					moduleCount: options?.moduleCount || 4
				},
				provider || (aiStatus.anthropic ? 'anthropic' : 'openai')
			);
		} else {
			throw error(400, 'Either topic or documentText is required');
		}

		return json({
			success: true,
			course
		});
	} catch (err) {
		console.error('AI course generation error:', err);
		throw error(500, err instanceof Error ? err.message : 'Failed to generate course');
	}
};

export const GET: RequestHandler = async ({ locals }) => {
	const session = await locals.auth();
	if (!session?.user) {
		throw error(401, 'Unauthorized');
	}

	const status = isAIConfigured();

	return json({
		configured: status.anthropic || status.openai,
		providers: {
			anthropic: status.anthropic,
			openai: status.openai
		}
	});
};
