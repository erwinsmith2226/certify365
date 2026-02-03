<script lang="ts">
	import { Award, Download, Share2, ExternalLink, Calendar, Clock, CheckCircle, AlertTriangle, Search } from 'lucide-svelte';
	import AppNav from '$lib/components/AppNav.svelte';

	let searchQuery = $state('');
	let filterStatus = $state<'all' | 'valid' | 'expiring' | 'expired'>('all');

	const certificates = [
		{ id: 'CERT-2024-001', courseName: 'Workplace Safety Fundamentals', issuedAt: '2024-01-15', expiresAt: '2025-01-15', status: 'valid', score: 92, verificationUrl: '/verify/DEMO-CERT-2024' },
		{ id: 'CERT-2024-002', courseName: 'Leadership Excellence Program', issuedAt: '2024-02-20', expiresAt: null, status: 'valid', score: 98, verificationUrl: '/verify/DEMO-CERT-PERMANENT' },
		{ id: 'CERT-2023-045', courseName: 'GDPR Compliance Training', issuedAt: '2023-06-10', expiresAt: '2024-06-10', status: 'expiring', score: 85, verificationUrl: '/verify/CERT-2023-045' },
		{ id: 'CERT-2023-012', courseName: 'Cybersecurity Awareness 2023', issuedAt: '2023-01-20', expiresAt: '2024-01-20', status: 'expired', score: 88, verificationUrl: '/verify/CERT-2023-012' }
	];

	let filteredCertificates = $derived(
		certificates.filter(cert => {
			const matchesSearch = cert.courseName.toLowerCase().includes(searchQuery.toLowerCase()) || cert.id.toLowerCase().includes(searchQuery.toLowerCase());
			const matchesFilter = filterStatus === 'all' || cert.status === filterStatus;
			return matchesSearch && matchesFilter;
		})
	);

	function getStatusBadge(status: string) {
		switch (status) {
			case 'valid': return { class: 'bg-green-50 text-green-700', icon: CheckCircle, label: 'Valid' };
			case 'expiring': return { class: 'bg-amber-50 text-amber-700', icon: Clock, label: 'Expiring Soon' };
			case 'expired': return { class: 'bg-red-50 text-red-700', icon: AlertTriangle, label: 'Expired' };
			default: return { class: 'bg-stone-100 text-stone-600', icon: CheckCircle, label: status };
		}
	}

	function formatDate(dateStr: string) {
		return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
	}
</script>

<svelte:head>
	<title>My Certificates - Certify365</title>
	<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet" />
</svelte:head>

<div class="min-h-screen bg-stone-25">
	<AppNav currentPath="/certificates" />

	<main class="max-w-6xl mx-auto px-4 sm:px-6 py-8">
		<div class="mb-8">
			<h1 class="text-2xl font-semibold text-stone-900" style="font-family: var(--font-display)">My Certificates</h1>
			<p class="text-stone-500 mt-1">View and manage your earned certificates</p>
		</div>

		<!-- Stats -->
		<div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
			<div class="card">
				<div class="flex items-center gap-3">
					<div class="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
						<Award class="w-5 h-5 text-green-600" />
					</div>
					<div>
						<p class="text-2xl font-semibold text-stone-900" style="font-family: var(--font-display)">{certificates.filter(c => c.status === 'valid').length}</p>
						<p class="text-sm text-stone-500">Valid</p>
					</div>
				</div>
			</div>
			<div class="card">
				<div class="flex items-center gap-3">
					<div class="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
						<Clock class="w-5 h-5 text-amber-600" />
					</div>
					<div>
						<p class="text-2xl font-semibold text-stone-900" style="font-family: var(--font-display)">{certificates.filter(c => c.status === 'expiring').length}</p>
						<p class="text-sm text-stone-500">Expiring</p>
					</div>
				</div>
			</div>
			<div class="card">
				<div class="flex items-center gap-3">
					<div class="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
						<AlertTriangle class="w-5 h-5 text-red-600" />
					</div>
					<div>
						<p class="text-2xl font-semibold text-stone-900" style="font-family: var(--font-display)">{certificates.filter(c => c.status === 'expired').length}</p>
						<p class="text-sm text-stone-500">Expired</p>
					</div>
				</div>
			</div>
			<div class="card">
				<div class="flex items-center gap-3">
					<div class="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center">
						<Award class="w-5 h-5 text-teal-600" />
					</div>
					<div>
						<p class="text-2xl font-semibold text-stone-900" style="font-family: var(--font-display)">{certificates.length}</p>
						<p class="text-sm text-stone-500">Total</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Search and Filters -->
		<div class="flex flex-col sm:flex-row gap-4 mb-6">
			<div class="relative flex-1">
				<Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
				<input type="text" bind:value={searchQuery} placeholder="Search certificates..." class="w-full border border-stone-200 rounded-lg pl-11 pr-4 py-3 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500" />
			</div>
			<div class="flex gap-2">
				{#each [{ id: 'all', label: 'All' }, { id: 'valid', label: 'Valid' }, { id: 'expiring', label: 'Expiring' }, { id: 'expired', label: 'Expired' }] as filter}
					<button onclick={() => filterStatus = filter.id} class="px-4 py-2 rounded-full text-sm font-medium transition-colors {filterStatus === filter.id ? 'bg-teal-700 text-white' : 'bg-white border border-stone-200 text-stone-600 hover:border-stone-300'}">
						{filter.label}
					</button>
				{/each}
			</div>
		</div>

		<!-- Certificates List -->
		<div class="space-y-4">
			{#each filteredCertificates as cert}
				{@const statusBadge = getStatusBadge(cert.status)}
				<div class="card hover:border-teal-200">
					<div class="flex items-start gap-6">
						<div class="w-32 h-24 bg-gradient-to-br from-teal-50 to-stone-100 rounded-lg flex items-center justify-center flex-shrink-0 border border-stone-200">
							<Award class="w-8 h-8 text-teal-600" />
						</div>

						<div class="flex-1 min-w-0">
							<div class="flex items-start justify-between gap-4">
								<div>
									<h3 class="text-lg font-semibold text-stone-900">{cert.courseName}</h3>
									<p class="text-sm text-stone-400 font-mono mt-1">{cert.id}</p>
								</div>
								<span class="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium {statusBadge.class}">
									<statusBadge.icon class="w-3.5 h-3.5" />
									{statusBadge.label}
								</span>
							</div>

							<div class="flex items-center gap-6 mt-4 text-sm">
								<div class="flex items-center gap-2 text-stone-500">
									<Calendar class="w-4 h-4" />
									<span>Issued: {formatDate(cert.issuedAt)}</span>
								</div>
								{#if cert.expiresAt}
									<div class="flex items-center gap-2 text-stone-500">
										<Clock class="w-4 h-4" />
										<span>Expires: {formatDate(cert.expiresAt)}</span>
									</div>
								{:else}
									<div class="flex items-center gap-2 text-green-600">
										<CheckCircle class="w-4 h-4" />
										<span>Never Expires</span>
									</div>
								{/if}
								<div class="text-stone-500">
									Score: <span class="text-stone-900 font-medium">{cert.score}%</span>
								</div>
							</div>
						</div>

						<div class="flex items-center gap-2">
							<button class="p-2 hover:bg-stone-100 rounded-lg transition-colors" title="Download">
								<Download class="w-5 h-5 text-stone-500 hover:text-stone-700" />
							</button>
							<button class="p-2 hover:bg-stone-100 rounded-lg transition-colors" title="Share">
								<Share2 class="w-5 h-5 text-stone-500 hover:text-stone-700" />
							</button>
							<a href={cert.verificationUrl} class="p-2 hover:bg-stone-100 rounded-lg transition-colors" title="Verify" target="_blank">
								<ExternalLink class="w-5 h-5 text-stone-500 hover:text-stone-700" />
							</a>
						</div>
					</div>
				</div>
			{/each}

			{#if filteredCertificates.length === 0}
				<div class="text-center py-16">
					<Award class="w-12 h-12 text-stone-300 mx-auto mb-4" />
					<h3 class="text-lg font-medium text-stone-900 mb-2">No certificates found</h3>
					<p class="text-stone-500">Complete courses to earn certificates</p>
				</div>
			{/if}
		</div>
	</main>
</div>

<style>
	.bg-stone-25 { background-color: #FDFCFB; }
</style>
