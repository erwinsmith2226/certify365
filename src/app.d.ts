// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { Session, User } from '@auth/core/types';

declare global {
	namespace App {
		interface Locals {
			auth(): Promise<Session | null>;
		}

		interface PageData {
			session: Session | null;
		}

		// interface Error {}
		// interface Platform {}
	}
}

// Extend the Auth.js types
declare module '@auth/core/types' {
	interface Session {
		user: {
			id: string;
			name?: string | null;
			email?: string | null;
			image?: string | null;
			role?: 'user' | 'admin' | 'instructor' | 'superadmin';
			organizationId?: string;
		};
	}

	interface User {
		role?: 'user' | 'admin' | 'instructor' | 'superadmin';
		organizationId?: string;
	}
}

export {};
