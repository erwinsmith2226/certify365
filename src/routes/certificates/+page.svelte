<script lang="ts">
	import {
		Award,
		Download,
		Share2,
		ExternalLink,
		Calendar,
		Clock,
		CheckCircle,
		AlertTriangle,
		Search
	} from 'lucide-svelte';

	let searchQuery = $state('');
	let filterStatus = $state<'all' | 'valid' | 'expiring' | 'expired'>('all');

	// Mock certificates
	const certificates = [
		{
			id: 'CERT-2024-001',
			courseName: 'Workplace Safety Fundamentals',
			issuedAt: '2024-01-15',
			expiresAt: '2025-01-15',
			status: 'valid',
			score: 92,
			verificationUrl: '/verify/DEMO-CERT-2024'
		},
		{
			id: 'CERT-2024-002',
			courseName: 'Leadership Excellence Program',
			issuedAt: '2024-02-20',
			expiresAt: null,
			status: 'valid',
			score: 98,
			verificationUrl: '/verify/DEMO-CERT-PERMANENT'
		},
		{
			id: 'CERT-2023-045',
			courseName: 'GDPR Compliance Training',
			issuedAt: '2023-06-10',
			expiresAt: '2024-06-10',
			status: 'expiring',
			score: 85,
			verificationUrl: '/verify/CERT-2023-045'
		},
		{
			id: 'CERT-2023-012',
			courseName: 'Cybersecurity Awareness 2023',
			issuedAt: '2023-01-20',
			expiresAt: '2024-01-20',
			status: 'expired',
			score: 88,
			verificationUrl: '/verify/CERT-2023-012'
		}
	];

	let filteredCertificates = $derived(
		certificates.filter(cert => {
			const matchesSearch = cert.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
				cert.id.toLowerCase().includes(searchQuery.toLowerCase());
			const matchesFilter = filterStatus === 'all' || cert.status === filterStatus;
			return matchesSearch && matchesFilter;
		})
	);

	function getStatusBadge(status: string) {
		switch (status) {
			case 'valid':
				return { color: 'bg-emerald-500/10 text-emerald-400', icon: CheckCircle, label: 'Valid' };
			case 'expiring':
				return { color: 'bg-amber-500/10 text-amber-400', icon: Clock, label: 'Expiring Soon' };
			case 'expired':
				return { color: 'bg-red-500/10 text-red-400', icon: AlertTriangle, label: 'Expired' };
			default:
				return { color: 'bg-slate-500/10 text-slate-400', icon: CheckCircle, label: status };
		}
	}

	function formatDate(dateStr: string) {
		return new Date(dateStr).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>My Certificates - Certify365</title>
</svelte:head>

<div class="min-h-screen bg-[#0a0e1a]">
	<!-- Top Nav -->
	<nav class="border-b border-white/10 bg-[#141b2d]/50 backdrop-blur-sm sticky top-0 z-50">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between h-16">
				<div class="flex items-center gap-8">
					<a href="/" class="text-xl font-bold text-[#00d4ff]">Certify365</a>
					<div class="hidden md:flex items-center gap-6">
						<a href="/dashboard" class="text-slate-400 hover:text-white transition-colors">Dashboard</a>
						<a href="/courses" class="text-slate-400 hover:text-white transition-colors">Courses</a>
						<a href="/certificates" class="text-white font-medium">Certificates</a>
						<a href="/learning-paths" class="text-slate-400 hover:text-white transition-colors">Learning Paths</a>
					</div>
				</div>

				<a href="/auth/signout" class="text-slate-400 hover:text-white text-sm transition-colors">
					Sign Out
				</a>
			</div>
		</div>
	</nav>

	<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		<!-- Header -->
		<div class="mb-8">
			<h1 class="text-2xl font-bold text-white">My Certificates</h1>
			<p class="text-slate-400 mt-1">View and manage your earned certificates</p>
		</div>

		<!-- Stats -->
		<div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
			<div class="bg-[#141b2d]/80 backdrop-blur-sm rounded-xl border border-white/10 p-5">
				<div class="flex items-center gap-3">
					<div class="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
						<Award class="w-5 h-5 text-emerald-400" />
					</div>
					<div>
						<p class="text-2xl font-bold text-white">{certificates.filter(c => c.status === 'valid').length}</p>
						<p class="text-sm text-slate-400">Valid</p>
					</div>
				</div>
			</div>
			<div class="bg-[#141b2d]/80 backdrop-blur-sm rounded-xl border border-white/10 p-5">
				<div class="flex items-center gap-3">
					<div class="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center">
						<Clock class="w-5 h-5 text-amber-400" />
					</div>
					<div>
						<p class="text-2xl font-bold text-white">{certificates.filter(c => c.status === 'expiring').length}</p>
						<p class="text-sm text-slate-400">Expiring Soon</p>
					</div>
				</div>
			</div>
			<div class="bg-[#141b2d]/80 backdrop-blur-sm rounded-xl border border-white/10 p-5">
				<div class="flex items-center gap-3">
					<div class="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
						<AlertTriangle class="w-5 h-5 text-red-400" />
					</div>
					<div>
						<p class="text-2xl font-bold text-white">{certificates.filter(c => c.status === 'expired').length}</p>
						<p class="text-sm text-slate-400">Expired</p>
					</div>
				</div>
			</div>
			<div class="bg-[#141b2d]/80 backdrop-blur-sm rounded-xl border border-white/10 p-5">
				<div class="flex items-center gap-3">
					<div class="w-10 h-10 bg-[#00d4ff]/10 rounded-lg flex items-center justify-center">
						<Award class="w-5 h-5 text-[#00d4ff]" />
					</div>
					<div>
						<p class="text-2xl font-bold text-white">{certificates.length}</p>
						<p class="text-sm text-slate-400">Total Earned</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Search and Filters -->
		<div class="flex flex-col sm:flex-row gap-4 mb-6">
			<div class="relative flex-1">
				<Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="Search certificates..."
					class="w-full bg-[#141b2d] border border-white/10 rounded-lg pl-11 pr-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00d4ff]/50"
				/>
			</div>

			<div class="flex gap-2">
				{#each [{ id: 'all', label: 'All' }, { id: 'valid', label: 'Valid' }, { id: 'expiring', label: 'Expiring' }, { id: 'expired', label: 'Expired' }] as filter}
					<button
						on:click={() => filterStatus = filter.id}
						class="px-4 py-2 rounded-lg text-sm font-medium transition-colors {filterStatus === filter.id ? 'bg-[#00d4ff] text-[#0a0e1a]' : 'bg-[#141b2d] text-slate-400 hover:text-white'}"
					>
						{filter.label}
					</button>
				{/each}
			</div>
		</div>

		<!-- Certificates List -->
		<div class="space-y-4">
			{#each filteredCertificates as cert}
				{@const statusBadge = getStatusBadge(cert.status)}
				<div class="bg-[#141b2d]/80 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:border-emerald-500/30 transition-colors">
					<div class="flex items-start gap-6">
						<!-- Certificate Preview -->
						<div class="w-40 h-28 bg-gradient-to-br from-emerald-500/20 to-[#00d4ff]/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-white/10">
							<Award class="w-10 h-10 text-emerald-400" />
						</div>

						<!-- Info -->
						<div class="flex-1 min-w-0">
							<div class="flex items-start justify-between gap-4">
								<div>
									<h3 class="text-lg font-semibold text-white">{cert.courseName}</h3>
									<p class="text-sm text-slate-400 font-mono mt-1">{cert.id}</p>
								</div>
								<span class="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium {statusBadge.color}">
									<statusBadge.icon class="w-3.5 h-3.5" />
									{statusBadge.label}
								</span>
							</div>

							<div class="flex items-center gap-6 mt-4 text-sm">
								<div class="flex items-center gap-2 text-slate-400">
									<Calendar class="w-4 h-4" />
									<span>Issued: {formatDate(cert.issuedAt)}</span>
								</div>
								{#if cert.expiresAt}
									<div class="flex items-center gap-2 text-slate-400">
										<Clock class="w-4 h-4" />
										<span>Expires: {formatDate(cert.expiresAt)}</span>
									</div>
								{:else}
									<div class="flex items-center gap-2 text-emerald-400">
										<CheckCircle class="w-4 h-4" />
										<span>Never Expires</span>
									</div>
								{/if}
								<div class="text-slate-400">
									Score: <span class="text-white font-medium">{cert.score}%</span>
								</div>
							</div>
						</div>

						<!-- Actions -->
						<div class="flex items-center gap-2">
							<button class="p-2 hover:bg-white/5 rounded-lg transition-colors" title="Download">
								<Download class="w-5 h-5 text-slate-400 hover:text-white" />
							</button>
							<button class="p-2 hover:bg-white/5 rounded-lg transition-colors" title="Share">
								<Share2 class="w-5 h-5 text-slate-400 hover:text-white" />
							</button>
							<a href={cert.verificationUrl} class="p-2 hover:bg-white/5 rounded-lg transition-colors" title="Verify" target="_blank">
								<ExternalLink class="w-5 h-5 text-slate-400 hover:text-white" />
							</a>
						</div>
					</div>
				</div>
			{/each}

			{#if filteredCertificates.length === 0}
				<div class="text-center py-12">
					<Award class="w-12 h-12 text-slate-600 mx-auto mb-4" />
					<h3 class="text-lg font-medium text-white mb-2">No certificates found</h3>
					<p class="text-slate-400">Complete courses to earn certificates</p>
				</div>
			{/if}
		</div>
	</main>
</div>
