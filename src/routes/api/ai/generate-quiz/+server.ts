import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { generateQuiz, isAIConfigured } from '$lib/server/ai';

export const POST: RequestHandler = async ({ request, locals }) => {
	const session = await locals.auth();
	if (!session?.user) {
		throw error(401, 'Unauthorized');
	}

	const aiStatus = isAIConfigured();
	if (!aiStatus.anthropic && !aiStatus.openai) {
		throw error(503, 'AI service not configured');
	}

	const body = await request.json();
	const { topic, content, questionCount, difficulty, provider } = body;

	if (!topic) {
		throw error(400, 'Topic is required');
	}

	try {
		const quiz = await generateQuiz(
			{
				topic,
				content,
				questionCount: questionCount || 5,
				difficulty: difficulty || 'intermediate'
			},
			provider || (aiStatus.anthropic ? 'anthropic' : 'openai')
		);

		return json({
			success: true,
			quiz
		});
	} catch (err) {
		console.error('AI quiz generation error:', err);
		throw error(500, err instanceof Error ? err.message : 'Failed to generate quiz');
	}
};
