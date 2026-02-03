import {
	S3Client,
	PutObjectCommand,
	GetObjectCommand,
	DeleteObjectCommand,
	ListObjectsV2Command
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { env } from '$env/dynamic/private';

// Initialize S3 client (works with AWS S3, Cloudflare R2, MinIO, etc.)
const s3 = env.S3_ACCESS_KEY_ID && env.S3_SECRET_ACCESS_KEY
	? new S3Client({
			endpoint: env.S3_ENDPOINT || undefined,
			region: env.S3_REGION || 'auto',
			credentials: {
				accessKeyId: env.S3_ACCESS_KEY_ID,
				secretAccessKey: env.S3_SECRET_ACCESS_KEY
			}
		})
	: null;

const BUCKET = env.S3_BUCKET || 'certify365';

export type StorageFolder =
	| 'courses'
	| 'certificates'
	| 'documents'
	| 'avatars'
	| 'organizations'
	| 'scorm';

interface UploadOptions {
	folder: StorageFolder;
	filename: string;
	contentType: string;
	data: Buffer | Uint8Array | string;
	organizationId?: string;
}

interface UploadResult {
	key: string;
	url: string;
}

/**
 * Generate a storage key path
 */
function generateKey(folder: StorageFolder, filename: string, organizationId?: string): string {
	const timestamp = Date.now();
	const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');

	if (organizationId) {
		return `${folder}/${organizationId}/${timestamp}-${sanitizedFilename}`;
	}
	return `${folder}/${timestamp}-${sanitizedFilename}`;
}

/**
 * Upload a file to storage
 */
export async function uploadFile(options: UploadOptions): Promise<UploadResult> {
	if (!s3) {
		throw new Error('Storage not configured - S3 credentials missing');
	}

	const key = generateKey(options.folder, options.filename, options.organizationId);

	await s3.send(
		new PutObjectCommand({
			Bucket: BUCKET,
			Key: key,
			Body: options.data,
			ContentType: options.contentType
		})
	);

	return {
		key,
		url: await getPublicUrl(key)
	};
}

/**
 * Upload from a File/Blob (web form uploads)
 */
export async function uploadFromFile(
	file: File,
	folder: StorageFolder,
	organizationId?: string
): Promise<UploadResult> {
	const buffer = Buffer.from(await file.arrayBuffer());

	return uploadFile({
		folder,
		filename: file.name,
		contentType: file.type || 'application/octet-stream',
		data: buffer,
		organizationId
	});
}

/**
 * Generate a presigned URL for direct browser uploads
 */
export async function getUploadUrl(
	folder: StorageFolder,
	filename: string,
	contentType: string,
	organizationId?: string,
	expiresIn = 3600
): Promise<{ uploadUrl: string; key: string }> {
	if (!s3) {
		throw new Error('Storage not configured');
	}

	const key = generateKey(folder, filename, organizationId);

	const uploadUrl = await getSignedUrl(
		s3,
		new PutObjectCommand({
			Bucket: BUCKET,
			Key: key,
			ContentType: contentType
		}),
		{ expiresIn }
	);

	return { uploadUrl, key };
}

/**
 * Generate a presigned URL for downloading
 */
export async function getDownloadUrl(key: string, expiresIn = 3600): Promise<string> {
	if (!s3) {
		throw new Error('Storage not configured');
	}

	return getSignedUrl(
		s3,
		new GetObjectCommand({
			Bucket: BUCKET,
			Key: key
		}),
		{ expiresIn }
	);
}

/**
 * Get a public URL (for public buckets or CDN)
 */
export async function getPublicUrl(key: string): Promise<string> {
	// If using Cloudflare R2 with a custom domain or public bucket
	if (env.S3_ENDPOINT?.includes('r2.cloudflarestorage.com')) {
		// R2 public URL pattern (requires public bucket or custom domain)
		const accountId = env.S3_ENDPOINT.match(/([a-f0-9]+)\.r2/)?.[1];
		if (accountId) {
			return `https://${BUCKET}.${accountId}.r2.dev/${key}`;
		}
	}

	// For now, return a signed URL with long expiry
	return getDownloadUrl(key, 86400 * 7); // 7 days
}

/**
 * Delete a file
 */
export async function deleteFile(key: string): Promise<void> {
	if (!s3) {
		throw new Error('Storage not configured');
	}

	await s3.send(
		new DeleteObjectCommand({
			Bucket: BUCKET,
			Key: key
		})
	);
}

/**
 * List files in a folder
 */
export async function listFiles(
	folder: StorageFolder,
	organizationId?: string,
	maxKeys = 100
): Promise<Array<{ key: string; size: number; lastModified: Date }>> {
	if (!s3) {
		throw new Error('Storage not configured');
	}

	const prefix = organizationId ? `${folder}/${organizationId}/` : `${folder}/`;

	const response = await s3.send(
		new ListObjectsV2Command({
			Bucket: BUCKET,
			Prefix: prefix,
			MaxKeys: maxKeys
		})
	);

	return (
		response.Contents?.map((item) => ({
			key: item.Key!,
			size: item.Size!,
			lastModified: item.LastModified!
		})) || []
	);
}

/**
 * Get file metadata
 */
export async function getFileStream(key: string): Promise<ReadableStream | null> {
	if (!s3) {
		throw new Error('Storage not configured');
	}

	const response = await s3.send(
		new GetObjectCommand({
			Bucket: BUCKET,
			Key: key
		})
	);

	return response.Body?.transformToWebStream() || null;
}

export function isStorageConfigured(): boolean {
	return !!s3;
}

// ===========================================
// SCORM Package Handling
// ===========================================

export async function uploadScormPackage(
	file: File,
	organizationId: string
): Promise<{ manifestUrl: string; packageKey: string }> {
	// Upload the zip file
	const result = await uploadFromFile(file, 'scorm', organizationId);

	// In a full implementation, we would:
	// 1. Extract the ZIP
	// 2. Parse imsmanifest.xml
	// 3. Upload extracted files
	// 4. Return the manifest URL for the SCORM player

	return {
		manifestUrl: result.url,
		packageKey: result.key
	};
}
