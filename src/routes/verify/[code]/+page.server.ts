import type { PageServerLoad } from './$types';
// import { db } from '$lib/server/db';
// import { certificates, courses, organizations, users } from '$lib/server/db/schema';
// import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ params }) => {
	const { code } = params;

	// TODO: Implement actual database lookup when DB is connected
	// const certificate = await db.query.certificates.findFirst({
	//   where: eq(certificates.verificationCode, code),
	//   with: {
	//     course: true,
	//     user: true
	//   }
	// });

	// For demo purposes, return a mock valid certificate for specific codes
	if (code === 'DEMO-CERT-2024') {
		return {
			valid: true,
			certificate: {
				recipientName: 'John Smith',
				courseName: 'Workplace Safety Fundamentals',
				issuedAt: '2024-01-15T10:00:00Z',
				expiresAt: '2025-01-15T10:00:00Z',
				organizationName: 'Acme Corporation',
				score: 92
			}
		};
	}

	if (code === 'DEMO-CERT-PERMANENT') {
		return {
			valid: true,
			certificate: {
				recipientName: 'Jane Doe',
				courseName: 'Leadership Excellence Program',
				issuedAt: '2024-02-20T14:30:00Z',
				organizationName: 'TechCorp Inc.',
				score: 98
			}
		};
	}

	// Invalid certificate
	return {
		valid: false,
		error: 'No certificate found with this verification code.'
	};
};
