<script lang="ts">
	import { signIn } from '@auth/sveltekit/client';
	import { GraduationCap, Mail, Lock, Chrome } from 'lucide-svelte';

	let email = $state('');
	let password = $state('');
	let loading = $state(false);
	let error = $state('');

	async function handleCredentialsLogin(e: Event) {
		e.preventDefault();
		loading = true;
		error = '';

		try {
			await signIn('credentials', { email, password, callbackUrl: '/dashboard' });
		} catch {
			error = 'Invalid email or password';
		} finally {
			loading = false;
		}
	}

	function handleOAuthLogin(provider: string) {
		signIn(provider, { callbackUrl: '/dashboard' });
	}
</script>

<svelte:head>
	<title>Sign In - Certify365</title>
</svelte:head>

<div class="min-h-screen bg-[#0a0e1a] flex items-center justify-center p-4">
	<div class="w-full max-w-md">
		<!-- Logo -->
		<div class="text-center mb-8">
			<div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#00d4ff] to-[#10b981] rounded-2xl mb-4">
				<GraduationCap class="w-8 h-8 text-[#0a0e1a]" />
			</div>
			<h1 class="text-2xl font-bold text-white">Welcome back</h1>
			<p class="text-slate-400 mt-1">Sign in to your Certify365 account</p>
		</div>

		<!-- Sign In Card -->
		<div class="bg-[#141b2d]/80 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
			<!-- OAuth Buttons -->
			<div class="space-y-3 mb-6">
				<button
					onclick={() => handleOAuthLogin('google')}
					class="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors"
				>
					<svg class="w-5 h-5" viewBox="0 0 24 24">
						<path
							fill="currentColor"
							d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
						/>
						<path
							fill="#34A853"
							d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
						/>
						<path
							fill="#FBBC05"
							d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
						/>
						<path
							fill="#EA4335"
							d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
						/>
					</svg>
					Continue with Google
				</button>

				<button
					onclick={() => handleOAuthLogin('microsoft-entra-id')}
					class="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#2f2f2f] text-white font-medium rounded-lg hover:bg-[#3f3f3f] transition-colors"
				>
					<svg class="w-5 h-5" viewBox="0 0 21 21">
						<rect x="1" y="1" width="9" height="9" fill="#f25022" />
						<rect x="11" y="1" width="9" height="9" fill="#7fba00" />
						<rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
						<rect x="11" y="11" width="9" height="9" fill="#ffb900" />
					</svg>
					Continue with Microsoft
				</button>
			</div>

			<!-- Divider -->
			<div class="relative my-6">
				<div class="absolute inset-0 flex items-center">
					<div class="w-full border-t border-white/10"></div>
				</div>
				<div class="relative flex justify-center text-sm">
					<span class="px-4 bg-[#141b2d] text-slate-400">or continue with email</span>
				</div>
			</div>

			<!-- Email Form -->
			<form onsubmit={handleCredentialsLogin} class="space-y-4">
				{#if error}
					<div class="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
						{error}
					</div>
				{/if}

				<div>
					<label for="email" class="block text-sm font-medium text-slate-300 mb-2">Email</label>
					<div class="relative">
						<Mail class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
						<input
							type="email"
							id="email"
							bind:value={email}
							required
							class="w-full bg-[#0a0e1a] border border-white/10 rounded-lg pl-11 pr-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00d4ff]/50 focus:border-[#00d4ff]"
							placeholder="you@company.com"
						/>
					</div>
				</div>

				<div>
					<label for="password" class="block text-sm font-medium text-slate-300 mb-2">Password</label>
					<div class="relative">
						<Lock class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
						<input
							type="password"
							id="password"
							bind:value={password}
							required
							class="w-full bg-[#0a0e1a] border border-white/10 rounded-lg pl-11 pr-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00d4ff]/50 focus:border-[#00d4ff]"
							placeholder="••••••••"
						/>
					</div>
				</div>

				<div class="flex items-center justify-between text-sm">
					<label class="flex items-center gap-2 text-slate-300">
						<input type="checkbox" class="rounded bg-[#0a0e1a] border-white/20 text-[#00d4ff] focus:ring-[#00d4ff]/50" />
						Remember me
					</label>
					<a href="/auth/forgot-password" class="text-[#00d4ff] hover:underline">Forgot password?</a>
				</div>

				<button
					type="submit"
					disabled={loading}
					class="w-full bg-gradient-to-r from-[#00d4ff] to-[#10b981] text-[#0a0e1a] font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
				>
					{loading ? 'Signing in...' : 'Sign In'}
				</button>
			</form>
		</div>

		<!-- Sign Up Link -->
		<p class="text-center mt-6 text-slate-400">
			Don't have an account?
			<a href="/auth/signup" class="text-[#00d4ff] hover:underline font-medium">Sign up</a>
		</p>
	</div>
</div>
