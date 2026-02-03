<script lang="ts">
	import { Award, CheckCircle, XCircle, Calendar, User, BookOpen, Shield } from 'lucide-svelte';

	interface Props {
		data: {
			valid: boolean;
			certificate?: {
				recipientName: string;
				courseName: string;
				issuedAt: string;
				expiresAt?: string;
				organizationName: string;
				score?: number;
			};
			error?: string;
		};
	}

	let { data }: Props = $props();
</script>

<svelte:head>
	<title>
		{data.valid ? `Certificate Verification - ${data.certificate?.recipientName}` : 'Certificate Verification'}
	</title>
</svelte:head>

<div class="min-h-screen bg-[#0a0e1a] flex items-center justify-center p-4">
	<div class="w-full max-w-lg">
		{#if data.valid && data.certificate}
			<!-- Valid Certificate -->
			<div class="bg-gradient-to-b from-[#141b2d] to-[#0a0e1a] rounded-2xl border border-emerald-500/30 overflow-hidden">
				<!-- Header -->
				<div class="bg-gradient-to-r from-emerald-600 to-emerald-500 p-6 text-center">
					<div class="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
						<CheckCircle class="w-10 h-10 text-white" />
					</div>
					<h1 class="text-2xl font-bold text-white">Certificate Verified</h1>
					<p class="text-emerald-100 mt-1">This certificate is authentic</p>
				</div>

				<!-- Certificate Details -->
				<div class="p-6 space-y-6">
					<!-- Recipient -->
					<div class="flex items-start gap-4">
						<div class="w-10 h-10 bg-[#00d4ff]/10 rounded-lg flex items-center justify-center flex-shrink-0">
							<User class="w-5 h-5 text-[#00d4ff]" />
						</div>
						<div>
							<p class="text-slate-400 text-sm">Awarded To</p>
							<p class="text-white text-lg font-semibold">{data.certificate.recipientName}</p>
						</div>
					</div>

					<!-- Course -->
					<div class="flex items-start gap-4">
						<div class="w-10 h-10 bg-[#00d4ff]/10 rounded-lg flex items-center justify-center flex-shrink-0">
							<BookOpen class="w-5 h-5 text-[#00d4ff]" />
						</div>
						<div>
							<p class="text-slate-400 text-sm">Course Completed</p>
							<p class="text-white text-lg font-semibold">{data.certificate.courseName}</p>
						</div>
					</div>

					<!-- Organization -->
					<div class="flex items-start gap-4">
						<div class="w-10 h-10 bg-[#00d4ff]/10 rounded-lg flex items-center justify-center flex-shrink-0">
							<Shield class="w-5 h-5 text-[#00d4ff]" />
						</div>
						<div>
							<p class="text-slate-400 text-sm">Issued By</p>
							<p class="text-white text-lg font-semibold">{data.certificate.organizationName}</p>
						</div>
					</div>

					<!-- Date & Score -->
					<div class="grid grid-cols-2 gap-4">
						<div class="bg-[#0a0e1a] rounded-lg p-4 border border-white/5">
							<div class="flex items-center gap-2 text-slate-400 text-sm mb-1">
								<Calendar class="w-4 h-4" />
								<span>Issue Date</span>
							</div>
							<p class="text-white font-medium">
								{new Date(data.certificate.issuedAt).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'long',
									day: 'numeric'
								})}
							</p>
						</div>

						{#if data.certificate.score}
							<div class="bg-[#0a0e1a] rounded-lg p-4 border border-white/5">
								<div class="flex items-center gap-2 text-slate-400 text-sm mb-1">
									<Award class="w-4 h-4" />
									<span>Final Score</span>
								</div>
								<p class="text-white font-medium">{data.certificate.score}%</p>
							</div>
						{/if}
					</div>

					{#if data.certificate.expiresAt}
						<div class="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
							<p class="text-amber-400 text-sm">
								⚠️ This certificate expires on{' '}
								<strong>
									{new Date(data.certificate.expiresAt).toLocaleDateString('en-US', {
										year: 'numeric',
										month: 'long',
										day: 'numeric'
									})}
								</strong>
							</p>
						</div>
					{/if}
				</div>

				<!-- Footer -->
				<div class="border-t border-white/5 p-4 text-center">
					<p class="text-slate-500 text-sm">
						Verified by <span class="text-[#00d4ff]">Certify365</span>
					</p>
				</div>
			</div>
		{:else}
			<!-- Invalid Certificate -->
			<div class="bg-gradient-to-b from-[#141b2d] to-[#0a0e1a] rounded-2xl border border-red-500/30 overflow-hidden">
				<div class="bg-gradient-to-r from-red-600 to-red-500 p-6 text-center">
					<div class="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
						<XCircle class="w-10 h-10 text-white" />
					</div>
					<h1 class="text-2xl font-bold text-white">Certificate Not Found</h1>
					<p class="text-red-100 mt-1">This certificate could not be verified</p>
				</div>

				<div class="p-6 text-center">
					<p class="text-slate-400">
						{data.error || 'The verification code provided is invalid or the certificate has been revoked.'}
					</p>

					<a
						href="/"
						class="inline-block mt-6 px-6 py-3 bg-[#00d4ff] text-[#0a0e1a] font-semibold rounded-lg hover:bg-[#00d4ff]/90 transition-colors"
					>
						Go to Homepage
					</a>
				</div>
			</div>
		{/if}
	</div>
</div>
