import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { env } from '$env/dynamic/private';

// Initialize clients (only if API keys are provided)
const openai = env.OPENAI_API_KEY ? new OpenAI({ apiKey: env.OPENAI_API_KEY }) : null;
const anthropic = env.ANTHROPIC_API_KEY ? new Anthropic({ apiKey: env.ANTHROPIC_API_KEY }) : null;

export type AIProvider = 'openai' | 'anthropic';

interface CourseGenerationOptions {
	topic: string;
	targetAudience?: string;
	difficulty?: 'beginner' | 'intermediate' | 'advanced';
	estimatedDuration?: number; // minutes
	includeQuizzes?: boolean;
	moduleCount?: number;
}

interface GeneratedCourse {
	title: string;
	description: string;
	modules: Array<{
		title: string;
		description: string;
		lessons: Array<{
			title: string;
			type: 'text' | 'video' | 'quiz';
			content: string;
			estimatedDuration: number;
			quiz?: {
				questions: Array<{
					question: string;
					type: 'multiple_choice' | 'true_false';
					options: string[];
					correctAnswer: number;
					explanation: string;
				}>;
			};
		}>;
	}>;
}

interface QuizGenerationOptions {
	topic: string;
	content?: string;
	questionCount?: number;
	difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

interface GeneratedQuiz {
	questions: Array<{
		question: string;
		type: 'multiple_choice' | 'true_false' | 'short_answer';
		options?: string[];
		correctAnswer: string | number;
		explanation: string;
		points: number;
	}>;
}

const COURSE_GENERATION_PROMPT = `You are an expert instructional designer. Generate a comprehensive course structure based on the following requirements.

Requirements:
- Topic: {{topic}}
- Target Audience: {{targetAudience}}
- Difficulty: {{difficulty}}
- Estimated Total Duration: {{estimatedDuration}} minutes
- Include Quizzes: {{includeQuizzes}}
- Number of Modules: {{moduleCount}}

Create a well-structured course with clear learning objectives. Each module should build on the previous one. Include practical examples and real-world applications.

Respond with valid JSON matching this structure:
{
  "title": "Course Title",
  "description": "Course description (2-3 sentences)",
  "modules": [
    {
      "title": "Module Title",
      "description": "Module description",
      "lessons": [
        {
          "title": "Lesson Title",
          "type": "text",
          "content": "Full lesson content in markdown format (at least 500 words for text lessons)",
          "estimatedDuration": 10
        }
      ]
    }
  ]
}

For quiz lessons, include:
{
  "title": "Knowledge Check",
  "type": "quiz",
  "content": "Test your understanding of the concepts covered.",
  "estimatedDuration": 5,
  "quiz": {
    "questions": [
      {
        "question": "Question text?",
        "type": "multiple_choice",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctAnswer": 0,
        "explanation": "Explanation of why this is correct"
      }
    ]
  }
}`;

const QUIZ_GENERATION_PROMPT = `You are an expert assessment designer. Generate quiz questions based on the following:

Topic: {{topic}}
Content Context: {{content}}
Number of Questions: {{questionCount}}
Difficulty: {{difficulty}}

Create challenging but fair questions that test understanding, not just memorization. Include a mix of question types.

Respond with valid JSON:
{
  "questions": [
    {
      "question": "Question text?",
      "type": "multiple_choice",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": 0,
      "explanation": "Why this answer is correct",
      "points": 10
    }
  ]
}`;

function fillTemplate(template: string, values: Record<string, string | number | boolean>): string {
	return Object.entries(values).reduce(
		(result, [key, value]) => result.replace(new RegExp(`{{${key}}}`, 'g'), String(value)),
		template
	);
}

export async function generateCourse(
	options: CourseGenerationOptions,
	provider: AIProvider = 'anthropic'
): Promise<GeneratedCourse> {
	const prompt = fillTemplate(COURSE_GENERATION_PROMPT, {
		topic: options.topic,
		targetAudience: options.targetAudience || 'General professionals',
		difficulty: options.difficulty || 'intermediate',
		estimatedDuration: options.estimatedDuration || 60,
		includeQuizzes: options.includeQuizzes ?? true,
		moduleCount: options.moduleCount || 4
	});

	let response: string;

	if (provider === 'anthropic' && anthropic) {
		const message = await anthropic.messages.create({
			model: 'claude-sonnet-4-20250514',
			max_tokens: 8000,
			messages: [{ role: 'user', content: prompt }]
		});
		response = message.content[0].type === 'text' ? message.content[0].text : '';
	} else if (provider === 'openai' && openai) {
		const completion = await openai.chat.completions.create({
			model: 'gpt-4o',
			messages: [{ role: 'user', content: prompt }],
			response_format: { type: 'json_object' }
		});
		response = completion.choices[0]?.message?.content || '';
	} else {
		throw new Error(`AI provider ${provider} is not configured. Please set the API key.`);
	}

	// Extract JSON from response
	const jsonMatch = response.match(/\{[\s\S]*\}/);
	if (!jsonMatch) {
		throw new Error('Failed to parse AI response as JSON');
	}

	return JSON.parse(jsonMatch[0]) as GeneratedCourse;
}

export async function generateQuiz(
	options: QuizGenerationOptions,
	provider: AIProvider = 'anthropic'
): Promise<GeneratedQuiz> {
	const prompt = fillTemplate(QUIZ_GENERATION_PROMPT, {
		topic: options.topic,
		content: options.content || 'General knowledge on the topic',
		questionCount: options.questionCount || 5,
		difficulty: options.difficulty || 'intermediate'
	});

	let response: string;

	if (provider === 'anthropic' && anthropic) {
		const message = await anthropic.messages.create({
			model: 'claude-sonnet-4-20250514',
			max_tokens: 4000,
			messages: [{ role: 'user', content: prompt }]
		});
		response = message.content[0].type === 'text' ? message.content[0].text : '';
	} else if (provider === 'openai' && openai) {
		const completion = await openai.chat.completions.create({
			model: 'gpt-4o',
			messages: [{ role: 'user', content: prompt }],
			response_format: { type: 'json_object' }
		});
		response = completion.choices[0]?.message?.content || '';
	} else {
		throw new Error(`AI provider ${provider} is not configured. Please set the API key.`);
	}

	const jsonMatch = response.match(/\{[\s\S]*\}/);
	if (!jsonMatch) {
		throw new Error('Failed to parse AI response as JSON');
	}

	return JSON.parse(jsonMatch[0]) as GeneratedQuiz;
}

export async function generateCourseFromDocument(
	documentText: string,
	options: Partial<CourseGenerationOptions> = {},
	provider: AIProvider = 'anthropic'
): Promise<GeneratedCourse> {
	const prompt = `You are an expert instructional designer. Convert the following document into a structured online course.

Document Content:
---
${documentText.slice(0, 15000)}
---

Create a well-organized course that:
1. Breaks down the content into logical modules and lessons
2. Adds learning objectives for each module
3. Includes practical exercises and examples
4. Generates quiz questions to test understanding

Target Audience: ${options.targetAudience || 'Professionals'}
Difficulty: ${options.difficulty || 'intermediate'}
Include Quizzes: ${options.includeQuizzes ?? true}

Respond with valid JSON matching the course structure format.`;

	let response: string;

	if (provider === 'anthropic' && anthropic) {
		const message = await anthropic.messages.create({
			model: 'claude-sonnet-4-20250514',
			max_tokens: 8000,
			messages: [{ role: 'user', content: prompt }]
		});
		response = message.content[0].type === 'text' ? message.content[0].text : '';
	} else if (openai) {
		const completion = await openai.chat.completions.create({
			model: 'gpt-4o',
			messages: [{ role: 'user', content: prompt }],
			response_format: { type: 'json_object' }
		});
		response = completion.choices[0]?.message?.content || '';
	} else {
		throw new Error('No AI provider configured');
	}

	const jsonMatch = response.match(/\{[\s\S]*\}/);
	if (!jsonMatch) {
		throw new Error('Failed to parse AI response');
	}

	return JSON.parse(jsonMatch[0]) as GeneratedCourse;
}

export function isAIConfigured(): { openai: boolean; anthropic: boolean } {
	return {
		openai: !!openai,
		anthropic: !!anthropic
	};
}
