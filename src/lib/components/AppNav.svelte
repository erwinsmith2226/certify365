<script lang="ts">
	import { Award } from 'lucide-svelte';

	interface Props {
		currentPath?: string;
		isAdmin?: boolean;
		userName?: string;
	}

	let { currentPath = '', isAdmin = false, userName = '' }: Props = $props();

	const learnerLinks = [
		{ href: '/dashboard', label: 'Dashboard' },
		{ href: '/courses', label: 'Courses' },
		{ href: '/certificates', label: 'Certificates' },
		{ href: '/learning-paths', label: 'Learning Paths' }
	];

	const adminLinks = [
		{ href: '/admin', label: 'Dashboard' },
		{ href: '/admin/courses', label: 'Courses' },
		{ href: '/admin/users', label: 'Users' },
		{ href: '/admin/certificates', label: 'Certificates' },
		{ href: '/admin/reports', label: 'Reports' }
	];

	let links = $derived(isAdmin ? adminLinks : learnerLinks);
</script>

<nav class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200/50">
	<div class="max-w-6xl mx-auto px-4 sm:px-6">
		<div class="flex items-center justify-between h-16">
			<div class="flex items-center gap-8">
				<a href="/" class="flex items-center gap-2">
					<div class="w-8 h-8 rounded-lg bg-teal-700 flex items-center justify-center">
						<Award class="w-5 h-5 text-white" />
					</div>
					<span class="text-lg font-semibold text-stone-900" style="font-family: var(--font-display)">Certify365</span>
				</a>

				<div class="hidden md:flex items-center gap-6">
					{#each links as link}
						<a
							href={link.href}
							class="text-sm transition-colors {currentPath === link.href || currentPath.startsWith(link.href + '/') ? 'text-teal-700 font-medium' : 'text-stone-500 hover:text-stone-900'}"
						>
							{link.label}
						</a>
					{/each}
				</div>
			</div>

			<div class="flex items-center gap-4">
				{#if isAdmin}
					<a href="/dashboard" class="text-sm text-stone-500 hover:text-stone-900 transition-colors">
						Switch to Learner
					</a>
				{:else}
					<a href="/admin" class="text-sm text-stone-500 hover:text-stone-900 transition-colors">
						Admin
					</a>
				{/if}

				<div class="flex items-center gap-3">
					<div class="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-medium text-sm">
						{userName?.charAt(0) || 'U'}
					</div>
					<a href="/auth/signout" class="text-sm text-stone-500 hover:text-stone-900 transition-colors">
						Sign out
					</a>
				</div>
			</div>
		</div>
	</div>
</nav>
