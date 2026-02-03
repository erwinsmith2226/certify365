<script lang="ts">
	import { page } from '$app/stores';
	import { GraduationCap, AlertTriangle } from 'lucide-svelte';

	const errorMessages: Record<string, string> = {
		Configuration: 'There is a problem with the server configuration.',
		AccessDenied: 'You do not have access to this resource.',
		Verification: 'The verification link has expired or has already been used.',
		Default: 'An authentication error occurred. Please try again.'
	};

	let errorType = $derived($page.url.searchParams.get('error') || 'Default');
	let errorMessage = $derived(errorMessages[errorType] || errorMessages.Default);
</script>

<svelte:head>
	<title>Authentication Error - Certify365</title>
</svelte:head>

<div class="min-h-screen bg-[#0a0e1a] flex items-center justify-center p-4">
	<div class="w-full max-w-md text-center">
		<!-- Logo -->
		<div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#00d4ff] to-[#10b981] rounded-2xl mb-6">
			<GraduationCap class="w-8 h-8 text-[#0a0e1a]" />
		</div>

		<div class="bg-[#141b2d]/80 backdrop-blur-sm rounded-2xl border border-red-500/30 p-8">
			<div class="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
				<AlertTriangle class="w-8 h-8 text-red-400" />
			</div>

			<h1 class="text-2xl font-bold text-white mb-2">Authentication Error</h1>
			<p class="text-slate-400 mb-6">{errorMessage}</p>

			<div class="space-y-3">
				<a
					href="/auth/signin"
					class="block w-full bg-[#00d4ff] text-[#0a0e1a] font-semibold py-3 rounded-lg hover:bg-[#00d4ff]/90 transition-colors"
				>
					Try Again
				</a>

				<a
					href="/"
					class="block w-full bg-white/5 text-white font-medium py-3 rounded-lg hover:bg-white/10 transition-colors"
				>
					Go to Homepage
				</a>
			</div>

			{#if errorType !== 'Default'}
				<p class="mt-6 text-slate-500 text-sm">
					Error code: <code class="text-slate-400">{errorType}</code>
				</p>
			{/if}
		</div>
	</div>
</div>
