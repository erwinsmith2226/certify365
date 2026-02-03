import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { uploadFromFile, getUploadUrl, isStorageConfigured, type StorageFolder } from '$lib/server/storage';

const ALLOWED_FOLDERS: StorageFolder[] = ['courses', 'documents', 'avatars', 'certificates'];
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

const ALLOWED_TYPES: Record<StorageFolder, string[]> = {
	courses: ['image/*', 'video/*', 'application/pdf'],
	documents: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.*', 'text/*'],
	avatars: ['image/*'],
	certificates: ['image/*'],
	organizations: ['image/*'],
	scorm: ['application/zip', 'application/x-zip-compressed']
};

/**
 * POST /api/upload - Direct file upload
 */
export const POST: RequestHandler = async ({ request, locals }) => {
	const session = await locals.auth();
	if (!session?.user) {
		throw error(401, 'Unauthorized');
	}

	if (!isStorageConfigured()) {
		throw error(503, 'Storage service not configured');
	}

	const formData = await request.formData();
	const file = formData.get('file') as File | null;
	const folder = formData.get('folder') as StorageFolder | null;
	const organizationId = formData.get('organizationId') as string | null;

	if (!file) {
		throw error(400, 'No file provided');
	}

	if (!folder || !ALLOWED_FOLDERS.includes(folder)) {
		throw error(400, `Invalid folder. Allowed: ${ALLOWED_FOLDERS.join(', ')}`);
	}

	if (file.size > MAX_FILE_SIZE) {
		throw error(400, `File too large. Maximum size: ${MAX_FILE_SIZE / 1024 / 1024}MB`);
	}

	// Validate file type
	const allowedTypes = ALLOWED_TYPES[folder];
	const isTypeAllowed = allowedTypes.some((pattern) => {
		if (pattern.endsWith('*')) {
			return file.type.startsWith(pattern.slice(0, -1));
		}
		return file.type === pattern;
	});

	if (!isTypeAllowed) {
		throw error(400, `File type ${file.type} not allowed for ${folder}`);
	}

	try {
		const result = await uploadFromFile(file, folder, organizationId || undefined);

		return json({
			success: true,
			key: result.key,
			url: result.url
		});
	} catch (err) {
		console.error('Upload error:', err);
		throw error(500, err instanceof Error ? err.message : 'Upload failed');
	}
};

/**
 * GET /api/upload?folder=...&filename=...&contentType=...
 * Returns a presigned URL for direct browser-to-S3 upload
 */
export const GET: RequestHandler = async ({ url, locals }) => {
	const session = await locals.auth();
	if (!session?.user) {
		throw error(401, 'Unauthorized');
	}

	if (!isStorageConfigured()) {
		throw error(503, 'Storage service not configured');
	}

	const folder = url.searchParams.get('folder') as StorageFolder | null;
	const filename = url.searchParams.get('filename');
	const contentType = url.searchParams.get('contentType');
	const organizationId = url.searchParams.get('organizationId');

	if (!folder || !ALLOWED_FOLDERS.includes(folder)) {
		throw error(400, 'Invalid folder');
	}

	if (!filename || !contentType) {
		throw error(400, 'filename and contentType are required');
	}

	try {
		const result = await getUploadUrl(folder, filename, contentType, organizationId || undefined);

		return json({
			uploadUrl: result.uploadUrl,
			key: result.key
		});
	} catch (err) {
		console.error('Presign error:', err);
		throw error(500, err instanceof Error ? err.message : 'Failed to generate upload URL');
	}
};
