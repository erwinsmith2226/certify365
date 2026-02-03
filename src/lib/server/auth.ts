import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/sveltekit/providers/google';
import MicrosoftEntraId from '@auth/sveltekit/providers/microsoft-entra-id';
import Credentials from '@auth/sveltekit/providers/credentials';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from './db';
import { env } from '$env/dynamic/private';

export const { handle, signIn, signOut } = SvelteKitAuth({
	adapter: db ? DrizzleAdapter(db) : undefined,
	secret: env.AUTH_SECRET,
	trustHost: true,
	providers: [
		// Google OAuth
		...(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET
			? [
					Google({
						clientId: env.GOOGLE_CLIENT_ID,
						clientSecret: env.GOOGLE_CLIENT_SECRET
					})
				]
			: []),

		// Microsoft Entra ID (Azure AD)
		...(env.MICROSOFT_CLIENT_ID && env.MICROSOFT_CLIENT_SECRET
			? [
					MicrosoftEntraId({
						clientId: env.MICROSOFT_CLIENT_ID,
						clientSecret: env.MICROSOFT_CLIENT_SECRET,
						issuer: `https://login.microsoftonline.com/common/v2.0`
					})
				]
			: []),

		// Email/Password (for development and users who prefer it)
		Credentials({
			name: 'credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' }
			},
			async authorize(credentials) {
				// TODO: Implement proper password verification with bcrypt
				// This is a placeholder - in production, hash passwords properly
				if (!credentials?.email || !credentials?.password) {
					return null;
				}

				// For now, return null - implement proper auth later
				// const user = await db.query.users.findFirst({
				//   where: eq(users.email, credentials.email)
				// });
				// if (user && await bcrypt.compare(credentials.password, user.passwordHash)) {
				//   return user;
				// }
				return null;
			}
		})
	],
	callbacks: {
		async session({ session, user }) {
			if (session.user && user) {
				session.user.id = user.id;
				// Extend with custom fields
				if ('role' in user) {
					(session.user as { role?: string }).role = user.role as string;
				}
				if ('organizationId' in user) {
					(session.user as { organizationId?: string }).organizationId = user.organizationId as string;
				}
			}
			return session;
		}
	},
	pages: {
		signIn: '/auth/signin',
		signOut: '/auth/signout',
		error: '/auth/error',
		verifyRequest: '/auth/verify'
	}
});
