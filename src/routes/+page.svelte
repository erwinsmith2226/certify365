<script lang="ts">
	import { Award, BookOpen, BarChart3, Users, Route, Shield, Check, ArrowRight, Play } from 'lucide-svelte';
</script>

<svelte:head>
	<title>Certify365 — Training & Certificates Made Simple</title>
	<meta name="description" content="The modern way to train your team and issue certificates. Enterprise features, startup pricing." />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet" />
</svelte:head>

<div class="min-h-screen">
	<!-- Navigation -->
	<nav class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200/50">
		<div class="max-w-6xl mx-auto px-4 sm:px-6">
			<div class="flex items-center justify-between h-16">
				<a href="/" class="flex items-center gap-2">
					<div class="w-8 h-8 rounded-lg bg-teal-700 flex items-center justify-center">
						<Award class="w-5 h-5 text-white" />
					</div>
					<span class="text-lg font-semibold text-stone-900" style="font-family: var(--font-display)">Certify365</span>
				</a>
				<div class="hidden md:flex items-center gap-8">
					<a href="#features" class="text-stone-600 hover:text-stone-900 transition-colors text-sm">Features</a>
					<a href="#pricing" class="text-stone-600 hover:text-stone-900 transition-colors text-sm">Pricing</a>
					<a href="/docs" class="text-stone-600 hover:text-stone-900 transition-colors text-sm">Documentation</a>
				</div>
				<div class="flex items-center gap-3">
					<a href="/login" class="text-stone-600 hover:text-stone-900 text-sm">Sign in</a>
					<a href="/signup" class="btn btn-primary text-sm py-2 px-4">Start free trial</a>
				</div>
			</div>
		</div>
	</nav>

	<!-- Hero Section -->
	<section class="pt-28 pb-20 px-4 bg-hero-gradient">
		<div class="max-w-6xl mx-auto">
			<div class="max-w-3xl">
				<div class="badge mb-6">
					<span class="w-1.5 h-1.5 bg-teal-500 rounded-full"></span>
					Now in public beta
				</div>
				
				<h1 class="text-4xl sm:text-5xl lg:text-6xl font-semibold text-stone-900 leading-[1.1] mb-6" style="font-family: var(--font-display)">
					Train your team.
					<br />
					<span class="text-gradient">Issue certificates.</span>
					<br />
					Track everything.
				</h1>
				
				<p class="text-lg sm:text-xl text-stone-500 mb-10 max-w-xl leading-relaxed">
					A modern LMS built for growing teams. Create courses, automate certifications, 
					and prove compliance — without enterprise pricing.
				</p>
				
				<div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-16">
					<a href="/signup" class="btn btn-primary text-base px-6 py-3">
						Start free trial
						<ArrowRight class="w-4 h-4" />
					</a>
					<a href="#demo" class="btn btn-secondary text-base px-6 py-3">
						<Play class="w-4 h-4" />
						Watch demo
					</a>
				</div>

				<!-- Social proof -->
				<div class="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 text-sm text-stone-500">
					<div class="flex items-center gap-2">
						<Check class="w-4 h-4 text-teal-600" />
						<span>No credit card required</span>
					</div>
					<div class="flex items-center gap-2">
						<Check class="w-4 h-4 text-teal-600" />
						<span>14-day free trial</span>
					</div>
					<div class="flex items-center gap-2">
						<Check class="w-4 h-4 text-teal-600" />
						<span>Cancel anytime</span>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Metrics strip -->
	<section class="py-12 px-4 border-y border-stone-200 bg-white">
		<div class="max-w-6xl mx-auto">
			<div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
				<div>
					<div class="text-3xl font-semibold text-stone-900" style="font-family: var(--font-display)">75%</div>
					<div class="text-sm text-stone-500 mt-1">less than competitors</div>
				</div>
				<div>
					<div class="text-3xl font-semibold text-stone-900" style="font-family: var(--font-display)">5 min</div>
					<div class="text-sm text-stone-500 mt-1">to get started</div>
				</div>
				<div>
					<div class="text-3xl font-semibold text-stone-900" style="font-family: var(--font-display)">Unlimited</div>
					<div class="text-sm text-stone-500 mt-1">certificates</div>
				</div>
				<div>
					<div class="text-3xl font-semibold text-stone-900" style="font-family: var(--font-display)">99.9%</div>
					<div class="text-sm text-stone-500 mt-1">uptime SLA</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Features Section -->
	<section id="features" class="section bg-subtle-gradient">
		<div class="max-w-6xl mx-auto">
			<div class="max-w-2xl mb-16">
				<h2 class="text-3xl sm:text-4xl font-semibold text-stone-900 mb-4" style="font-family: var(--font-display)">
					Everything you need to train and certify
				</h2>
				<p class="text-lg text-stone-500">
					Simple enough for small teams, powerful enough for enterprises.
				</p>
			</div>

			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
				<div class="card">
					<div class="icon-container mb-4">
						<BookOpen class="w-5 h-5" />
					</div>
					<h3 class="text-lg font-semibold text-stone-900 mb-2">Course Builder</h3>
					<p class="text-stone-500 text-sm leading-relaxed">
						Create engaging courses with modules, videos, and quizzes. AI assists with content generation from your existing docs.
					</p>
				</div>

				<div class="card">
					<div class="icon-container mb-4" style="background: var(--color-coral-50); color: var(--color-coral-600);">
						<Award class="w-5 h-5" />
					</div>
					<h3 class="text-lg font-semibold text-stone-900 mb-2">Certificate Designer</h3>
					<p class="text-stone-500 text-sm leading-relaxed">
						Design custom certificates with your branding. QR verification, expiration tracking, and automatic issuance.
					</p>
				</div>

				<div class="card">
					<div class="icon-container mb-4">
						<BarChart3 class="w-5 h-5" />
					</div>
					<h3 class="text-lg font-semibold text-stone-900 mb-2">Analytics & Reports</h3>
					<p class="text-stone-500 text-sm leading-relaxed">
						Track completion rates, assessment scores, and compliance status. Export audit-ready reports in one click.
					</p>
				</div>

				<div class="card">
					<div class="icon-container mb-4">
						<Users class="w-5 h-5" />
					</div>
					<h3 class="text-lg font-semibold text-stone-900 mb-2">Team Management</h3>
					<p class="text-stone-500 text-sm leading-relaxed">
						Auto-enroll by role or department. Send reminders, set deadlines, and keep everyone accountable.
					</p>
				</div>

				<div class="card">
					<div class="icon-container mb-4">
						<Route class="w-5 h-5" />
					</div>
					<h3 class="text-lg font-semibold text-stone-900 mb-2">Learning Paths</h3>
					<p class="text-stone-500 text-sm leading-relaxed">
						Create sequential progressions with prerequisites. Personalized recommendations keep learners engaged.
					</p>
				</div>

				<div class="card">
					<div class="icon-container mb-4">
						<Shield class="w-5 h-5" />
					</div>
					<h3 class="text-lg font-semibold text-stone-900 mb-2">Compliance Ready</h3>
					<p class="text-stone-500 text-sm leading-relaxed">
						Built-in audit trails, expiration tracking, and renewal workflows. SOC 2 Type II compliant.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Pricing Section -->
	<section id="pricing" class="section bg-white">
		<div class="max-w-6xl mx-auto">
			<div class="text-center max-w-2xl mx-auto mb-16">
				<h2 class="text-3xl sm:text-4xl font-semibold text-stone-900 mb-4" style="font-family: var(--font-display)">
					Simple, transparent pricing
				</h2>
				<p class="text-lg text-stone-500">
					Start free. Upgrade when you're ready. No hidden fees.
				</p>
			</div>

			<div class="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
				<!-- Starter -->
				<div class="card">
					<div class="mb-6">
						<h3 class="text-lg font-semibold text-stone-900 mb-1">Starter</h3>
						<p class="text-sm text-stone-500 mb-4">For small teams getting started</p>
						<div class="flex items-baseline gap-1">
							<span class="text-4xl font-semibold text-stone-900" style="font-family: var(--font-display)">$99</span>
							<span class="text-stone-500">/month</span>
						</div>
						<p class="text-xs text-stone-400 mt-1">Up to 50 users</p>
					</div>
					<ul class="space-y-3 mb-8 text-sm">
						<li class="flex items-start gap-2 text-stone-600">
							<Check class="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
							5 active courses
						</li>
						<li class="flex items-start gap-2 text-stone-600">
							<Check class="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
							Unlimited certificates
						</li>
						<li class="flex items-start gap-2 text-stone-600">
							<Check class="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
							Basic analytics
						</li>
						<li class="flex items-start gap-2 text-stone-600">
							<Check class="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
							Email support
						</li>
					</ul>
					<a href="/signup" class="btn btn-secondary w-full">Get started</a>
				</div>

				<!-- Growth - Popular -->
				<div class="card border-teal-200 relative">
					<div class="absolute -top-3 left-4 px-2.5 py-0.5 bg-teal-700 text-white text-xs font-medium rounded">
						Most popular
					</div>
					<div class="mb-6">
						<h3 class="text-lg font-semibold text-stone-900 mb-1">Growth</h3>
						<p class="text-sm text-stone-500 mb-4">For scaling organizations</p>
						<div class="flex items-baseline gap-1">
							<span class="text-4xl font-semibold text-teal-700" style="font-family: var(--font-display)">$299</span>
							<span class="text-stone-500">/month</span>
						</div>
						<p class="text-xs text-stone-400 mt-1">Up to 250 users</p>
					</div>
					<ul class="space-y-3 mb-8 text-sm">
						<li class="flex items-start gap-2 text-stone-600">
							<Check class="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
							Unlimited courses
						</li>
						<li class="flex items-start gap-2 text-stone-600">
							<Check class="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
							Learning paths
						</li>
						<li class="flex items-start gap-2 text-stone-600">
							<Check class="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
							Advanced reporting
						</li>
						<li class="flex items-start gap-2 text-stone-600">
							<Check class="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
							AI course builder
						</li>
						<li class="flex items-start gap-2 text-stone-600">
							<Check class="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
							Priority support
						</li>
					</ul>
					<a href="/signup" class="btn btn-primary w-full">Get started</a>
				</div>

				<!-- Business -->
				<div class="card">
					<div class="mb-6">
						<h3 class="text-lg font-semibold text-stone-900 mb-1">Business</h3>
						<p class="text-sm text-stone-500 mb-4">For larger teams with custom needs</p>
						<div class="flex items-baseline gap-1">
							<span class="text-4xl font-semibold text-stone-900" style="font-family: var(--font-display)">$599</span>
							<span class="text-stone-500">/month</span>
						</div>
						<p class="text-xs text-stone-400 mt-1">Up to 1,000 users</p>
					</div>
					<ul class="space-y-3 mb-8 text-sm">
						<li class="flex items-start gap-2 text-stone-600">
							<Check class="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
							Everything in Growth
						</li>
						<li class="flex items-start gap-2 text-stone-600">
							<Check class="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
							SSO / SAML
						</li>
						<li class="flex items-start gap-2 text-stone-600">
							<Check class="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
							API access
						</li>
						<li class="flex items-start gap-2 text-stone-600">
							<Check class="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
							Custom integrations
						</li>
						<li class="flex items-start gap-2 text-stone-600">
							<Check class="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
							Dedicated support
						</li>
					</ul>
					<a href="/contact" class="btn btn-secondary w-full">Contact sales</a>
				</div>
			</div>

			<p class="text-center text-sm text-stone-500 mt-8">
				Need more? <a href="/enterprise" class="text-teal-700 hover:underline">Enterprise plans</a> available with self-hosting and custom SLAs.
			</p>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="py-20 px-4 bg-stone-900">
		<div class="max-w-3xl mx-auto text-center">
			<h2 class="text-3xl sm:text-4xl font-semibold text-white mb-4" style="font-family: var(--font-display)">
				Ready to modernize your training?
			</h2>
			<p class="text-lg text-stone-400 mb-8">
				Join hundreds of teams who switched from expensive enterprise LMS platforms.
			</p>
			<a href="/signup" class="btn btn-primary text-base px-8 py-3.5 bg-white text-stone-900 hover:bg-stone-100">
				Start your free trial
				<ArrowRight class="w-4 h-4" />
			</a>
		</div>
	</section>

	<!-- Footer -->
	<footer class="py-12 px-4 bg-stone-50 border-t border-stone-200">
		<div class="max-w-6xl mx-auto">
			<div class="flex flex-col md:flex-row items-center justify-between gap-4">
				<div class="flex items-center gap-2">
					<div class="w-7 h-7 rounded-lg bg-teal-700 flex items-center justify-center">
						<Award class="w-4 h-4 text-white" />
					</div>
					<span class="font-semibold text-stone-900" style="font-family: var(--font-display)">Certify365</span>
				</div>
				<div class="flex items-center gap-6 text-sm text-stone-500">
					<a href="/privacy" class="hover:text-stone-900 transition-colors">Privacy</a>
					<a href="/terms" class="hover:text-stone-900 transition-colors">Terms</a>
					<a href="/docs" class="hover:text-stone-900 transition-colors">Docs</a>
					<a href="/blog" class="hover:text-stone-900 transition-colors">Blog</a>
				</div>
				<p class="text-sm text-stone-400">© 2026 Certify365</p>
			</div>
		</div>
	</footer>
</div>
