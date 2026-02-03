<script lang="ts">
	import { signOut } from '@auth/sveltekit/client';
	import { GraduationCap, LogOut } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let countdown = $state(3);

	onMount(() => {
		const timer = setInterval(() => {
			countdown -= 1;
			if (countdown <= 0) {
				clearInterval(timer);
				signOut({ callbackUrl: '/' });
			}
		}, 1000);

		return () => clearInterval(timer);
	});

	function handleSignOut() {
		signOut({ callbackUrl: '/' });
	}
</script>

<svelte:head>
	<title>Sign Out - Certify365</title>
</svelte:head>

<div class="min-h-screen bg-[#0a0e1a] flex items-center justify-center p-4">
	<div class="w-full max-w-md text-center">
		<!-- Logo -->
		<div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#00d4ff] to-[#10b981] rounded-2xl mb-6">
			<GraduationCap class="w-8 h-8 text-[#0a0e1a]" />
		</div>

		<div class="bg-[#141b2d]/80 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
			<div class="w-16 h-16 bg-[#00d4ff]/10 rounded-full flex items-center justify-center mx-auto mb-6">
				<LogOut class="w-8 h-8 text-[#00d4ff]" />
			</div>

			<h1 class="text-2xl font-bold text-white mb-2">Signing you out...</h1>
			<p class="text-slate-400 mb-6">
				You'll be redirected in <span class="text-[#00d4ff] font-bold">{countdown}</span> seconds
			</p>

			<button
				onclick={handleSignOut}
				class="w-full bg-[#00d4ff] text-[#0a0e1a] font-semibold py-3 rounded-lg hover:bg-[#00d4ff]/90 transition-colors"
			>
				Sign Out Now
			</button>

			<a href="/dashboard" class="block mt-4 text-slate-400 hover:text-white transition-colors">
				Cancel and go back
			</a>
		</div>
	</div>
</div>
