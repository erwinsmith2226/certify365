import {
	pgTable,
	text,
	timestamp,
	boolean,
	integer,
	uuid,
	primaryKey,
	jsonb
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// ===========================================
// Auth.js Tables (required for @auth/drizzle-adapter)
// ===========================================

export const users = pgTable('user', {
	id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
	name: text('name'),
	email: text('email').notNull().unique(),
	emailVerified: timestamp('emailVerified', { mode: 'date' }),
	image: text('image'),
	role: text('role', { enum: ['user', 'admin', 'instructor', 'superadmin'] }).default('user'),
	organizationId: uuid('organization_id').references(() => organizations.id),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow()
});

export const accounts = pgTable(
	'account',
	{
		userId: text('userId')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		type: text('type').notNull(),
		provider: text('provider').notNull(),
		providerAccountId: text('providerAccountId').notNull(),
		refresh_token: text('refresh_token'),
		access_token: text('access_token'),
		expires_at: integer('expires_at'),
		token_type: text('token_type'),
		scope: text('scope'),
		id_token: text('id_token'),
		session_state: text('session_state')
	},
	(account) => ({
		compoundKey: primaryKey({ columns: [account.provider, account.providerAccountId] })
	})
);

export const sessions = pgTable('session', {
	sessionToken: text('sessionToken').primaryKey(),
	userId: text('userId')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	expires: timestamp('expires', { mode: 'date' }).notNull()
});

export const verificationTokens = pgTable(
	'verificationToken',
	{
		identifier: text('identifier').notNull(),
		token: text('token').notNull(),
		expires: timestamp('expires', { mode: 'date' }).notNull()
	},
	(vt) => ({
		compoundKey: primaryKey({ columns: [vt.identifier, vt.token] })
	})
);

// ===========================================
// Organizations
// ===========================================

export const organizations = pgTable('organization', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: text('name').notNull(),
	slug: text('slug').notNull().unique(),
	logo: text('logo'),
	settings: jsonb('settings').$type<{
		branding?: { primaryColor?: string; logo?: string };
		features?: { aiCourseBuilder?: boolean; certificates?: boolean };
	}>(),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow()
});

// ===========================================
// Courses
// ===========================================

export const courses = pgTable('course', {
	id: uuid('id').primaryKey().defaultRandom(),
	organizationId: uuid('organization_id')
		.notNull()
		.references(() => organizations.id, { onDelete: 'cascade' }),
	title: text('title').notNull(),
	description: text('description'),
	thumbnail: text('thumbnail'),
	status: text('status', { enum: ['draft', 'published', 'archived'] }).default('draft'),
	isPublic: boolean('is_public').default(false),
	estimatedDuration: integer('estimated_duration'), // in minutes
	passingScore: integer('passing_score').default(70),
	createdById: text('created_by_id').references(() => users.id),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow()
});

export const modules = pgTable('module', {
	id: uuid('id').primaryKey().defaultRandom(),
	courseId: uuid('course_id')
		.notNull()
		.references(() => courses.id, { onDelete: 'cascade' }),
	title: text('title').notNull(),
	description: text('description'),
	order: integer('order').default(0),
	createdAt: timestamp('created_at').defaultNow()
});

export const lessons = pgTable('lesson', {
	id: uuid('id').primaryKey().defaultRandom(),
	moduleId: uuid('module_id')
		.notNull()
		.references(() => modules.id, { onDelete: 'cascade' }),
	title: text('title').notNull(),
	type: text('type', { enum: ['text', 'video', 'document', 'quiz', 'scorm'] }).notNull(),
	content: jsonb('content').$type<{
		// For text lessons
		html?: string;
		// For video lessons
		videoUrl?: string;
		videoDuration?: number;
		// For document lessons
		documentUrl?: string;
		documentType?: string;
		// For quiz lessons
		questions?: Array<{
			id: string;
			type: 'multiple_choice' | 'true_false' | 'short_answer';
			question: string;
			options?: string[];
			correctAnswer: string | number;
			points: number;
		}>;
		// For SCORM
		scormPackageUrl?: string;
		scormVersion?: '1.2' | '2004';
	}>(),
	order: integer('order').default(0),
	estimatedDuration: integer('estimated_duration'), // minutes
	createdAt: timestamp('created_at').defaultNow()
});

// ===========================================
// Learning Paths
// ===========================================

export const learningPaths = pgTable('learning_path', {
	id: uuid('id').primaryKey().defaultRandom(),
	organizationId: uuid('organization_id')
		.notNull()
		.references(() => organizations.id, { onDelete: 'cascade' }),
	title: text('title').notNull(),
	description: text('description'),
	thumbnail: text('thumbnail'),
	status: text('status', { enum: ['draft', 'published', 'archived'] }).default('draft'),
	createdAt: timestamp('created_at').defaultNow()
});

export const learningPathCourses = pgTable(
	'learning_path_course',
	{
		learningPathId: uuid('learning_path_id')
			.notNull()
			.references(() => learningPaths.id, { onDelete: 'cascade' }),
		courseId: uuid('course_id')
			.notNull()
			.references(() => courses.id, { onDelete: 'cascade' }),
		order: integer('order').default(0),
		isRequired: boolean('is_required').default(true)
	},
	(table) => ({
		pk: primaryKey({ columns: [table.learningPathId, table.courseId] })
	})
);

// ===========================================
// Enrollments & Progress
// ===========================================

export const enrollments = pgTable('enrollment', {
	id: uuid('id').primaryKey().defaultRandom(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	courseId: uuid('course_id')
		.notNull()
		.references(() => courses.id, { onDelete: 'cascade' }),
	status: text('status', { enum: ['enrolled', 'in_progress', 'completed', 'expired'] }).default('enrolled'),
	enrolledAt: timestamp('enrolled_at').defaultNow(),
	startedAt: timestamp('started_at'),
	completedAt: timestamp('completed_at'),
	dueDate: timestamp('due_date'),
	score: integer('score'),
	timeSpent: integer('time_spent').default(0) // seconds
});

export const lessonProgress = pgTable(
	'lesson_progress',
	{
		userId: text('user_id')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		lessonId: uuid('lesson_id')
			.notNull()
			.references(() => lessons.id, { onDelete: 'cascade' }),
		status: text('status', { enum: ['not_started', 'in_progress', 'completed'] }).default('not_started'),
		progress: integer('progress').default(0), // percentage
		score: integer('score'),
		attempts: integer('attempts').default(0),
		timeSpent: integer('time_spent').default(0), // seconds
		completedAt: timestamp('completed_at'),
		lastAccessedAt: timestamp('last_accessed_at').defaultNow()
	},
	(table) => ({
		pk: primaryKey({ columns: [table.userId, table.lessonId] })
	})
);

// ===========================================
// Certificates
// ===========================================

export const certificateTemplates = pgTable('certificate_template', {
	id: uuid('id').primaryKey().defaultRandom(),
	organizationId: uuid('organization_id')
		.notNull()
		.references(() => organizations.id, { onDelete: 'cascade' }),
	name: text('name').notNull(),
	description: text('description'),
	design: jsonb('design').$type<{
		width: number;
		height: number;
		background?: { type: 'color' | 'image'; value: string };
		elements: Array<{
			id: string;
			type: 'text' | 'image' | 'qrcode' | 'signature' | 'logo';
			x: number;
			y: number;
			width?: number;
			height?: number;
			// Text properties
			content?: string; // Can include placeholders like {{name}}, {{course}}, {{date}}
			fontSize?: number;
			fontFamily?: string;
			fontWeight?: string;
			color?: string;
			textAlign?: 'left' | 'center' | 'right';
			// Image properties
			src?: string;
		}>;
	}>(),
	isDefault: boolean('is_default').default(false),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow()
});

export const certificates = pgTable('certificate', {
	id: uuid('id').primaryKey().defaultRandom(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	courseId: uuid('course_id')
		.notNull()
		.references(() => courses.id, { onDelete: 'cascade' }),
	templateId: uuid('template_id').references(() => certificateTemplates.id),
	verificationCode: text('verification_code').notNull().unique(),
	issuedAt: timestamp('issued_at').defaultNow(),
	expiresAt: timestamp('expires_at'),
	revokedAt: timestamp('revoked_at'),
	metadata: jsonb('metadata').$type<{
		recipientName: string;
		courseName: string;
		score?: number;
		completionDate: string;
		signedBy?: string;
	}>(),
	pdfUrl: text('pdf_url')
});

// ===========================================
// AI Course Generation
// ===========================================

export const aiGenerationJobs = pgTable('ai_generation_job', {
	id: uuid('id').primaryKey().defaultRandom(),
	organizationId: uuid('organization_id')
		.notNull()
		.references(() => organizations.id, { onDelete: 'cascade' }),
	userId: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	type: text('type', { enum: ['course_from_document', 'course_from_prompt', 'quiz_generation'] }).notNull(),
	status: text('status', { enum: ['pending', 'processing', 'completed', 'failed'] }).default('pending'),
	input: jsonb('input').$type<{
		prompt?: string;
		documentUrl?: string;
		documentText?: string;
		options?: {
			targetAudience?: string;
			difficulty?: 'beginner' | 'intermediate' | 'advanced';
			includeQuizzes?: boolean;
			estimatedDuration?: number;
		};
	}>(),
	output: jsonb('output').$type<{
		courseId?: string;
		generatedContent?: object;
		error?: string;
	}>(),
	createdAt: timestamp('created_at').defaultNow(),
	completedAt: timestamp('completed_at')
});

// ===========================================
// Auto-Enrollment Rules
// ===========================================

export const enrollmentRules = pgTable('enrollment_rule', {
	id: uuid('id').primaryKey().defaultRandom(),
	organizationId: uuid('organization_id')
		.notNull()
		.references(() => organizations.id, { onDelete: 'cascade' }),
	name: text('name').notNull(),
	courseId: uuid('course_id').references(() => courses.id, { onDelete: 'cascade' }),
	learningPathId: uuid('learning_path_id').references(() => learningPaths.id, { onDelete: 'cascade' }),
	conditions: jsonb('conditions').$type<{
		type: 'all' | 'any';
		rules: Array<{
			field: 'role' | 'department' | 'hire_date' | 'custom';
			operator: 'equals' | 'contains' | 'before' | 'after';
			value: string;
		}>;
	}>(),
	dueAfterDays: integer('due_after_days'),
	isActive: boolean('is_active').default(true),
	createdAt: timestamp('created_at').defaultNow()
});

// ===========================================
// Relations
// ===========================================

export const usersRelations = relations(users, ({ one, many }) => ({
	organization: one(organizations, {
		fields: [users.organizationId],
		references: [organizations.id]
	}),
	enrollments: many(enrollments),
	certificates: many(certificates)
}));

export const organizationsRelations = relations(organizations, ({ many }) => ({
	users: many(users),
	courses: many(courses),
	learningPaths: many(learningPaths),
	certificateTemplates: many(certificateTemplates)
}));

export const coursesRelations = relations(courses, ({ one, many }) => ({
	organization: one(organizations, {
		fields: [courses.organizationId],
		references: [organizations.id]
	}),
	modules: many(modules),
	enrollments: many(enrollments),
	certificates: many(certificates)
}));

export const modulesRelations = relations(modules, ({ one, many }) => ({
	course: one(courses, {
		fields: [modules.courseId],
		references: [courses.id]
	}),
	lessons: many(lessons)
}));

export const lessonsRelations = relations(lessons, ({ one }) => ({
	module: one(modules, {
		fields: [lessons.moduleId],
		references: [modules.id]
	})
}));
