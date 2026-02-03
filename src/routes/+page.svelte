<script lang="ts">
	import { Award, BookOpen, BarChart3, Users, Zap, Shield, CheckCircle2, ArrowRight } from 'lucide-svelte';
</script>

<svelte:head>
	<title>Certify365 — Modern LMS & Certificate Platform</title>
	<meta name="description" content="Enterprise-grade learning management and certificate creation at a fraction of the cost. Built for modern teams." />
</svelte:head>

<div class="min-h-screen">
	<!-- Navigation -->
	<nav class="fixed top-0 left-0 right-0 z-50 glass">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between h-16">
				<div class="flex items-center gap-2">
					<Award class="w-8 h-8 text-cyan-500" />
					<span class="text-xl font-bold">Certify365</span>
				</div>
				<div class="hidden md:flex items-center gap-8">
					<a href="#features" class="text-slate-400 hover:text-cyan-400 transition-colors">Features</a>
					<a href="#pricing" class="text-slate-400 hover:text-cyan-400 transition-colors">Pricing</a>
					<a href="/docs" class="text-slate-400 hover:text-cyan-400 transition-colors">Docs</a>
				</div>
				<div class="flex items-center gap-4">
					<a href="/login" class="text-slate-400 hover:text-white transition-colors">Sign In</a>
					<a href="/signup" class="btn btn-primary text-sm">Get Started</a>
				</div>
			</div>
		</div>
	</nav>

	<!-- Hero Section -->
	<section class="pt-32 pb-20 px-4 relative overflow-hidden">
		<!-- Background gradient -->
		<div class="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-emerald-500/5"></div>
		<div class="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
		<div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-steel-500/10 rounded-full blur-3xl"></div>
		
		<div class="max-w-7xl mx-auto text-center relative">
			<div class="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
				<span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
				<span class="text-sm text-slate-400">Now in beta — Join 100+ early adopters</span>
			</div>
			
			<h1 class="text-5xl md:text-7xl font-bold mb-6 leading-tight">
				<span class="gradient-text">Enterprise LMS</span>
				<br />
				<span class="text-white">at Startup Prices</span>
			</h1>
			
			<p class="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
				Create courses, issue certificates, and track training — all without paying $31,000/year. 
				Built for modern teams who refuse to overpay for learning management.
			</p>
			
			<div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
				<a href="/signup" class="btn btn-primary text-lg px-8 py-4 glow-cyan">
					Start Free Trial
					<ArrowRight class="w-5 h-5" />
				</a>
				<a href="#demo" class="btn btn-secondary text-lg px-8 py-4">
					Watch Demo
				</a>
			</div>

			<!-- Stats -->
			<div class="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
				<div class="text-center">
					<div class="text-3xl font-bold text-cyan-400">75%</div>
					<div class="text-sm text-slate-500">Cost Savings</div>
				</div>
				<div class="text-center">
					<div class="text-3xl font-bold text-cyan-400">5min</div>
					<div class="text-sm text-slate-500">Setup Time</div>
				</div>
				<div class="text-center">
					<div class="text-3xl font-bold text-cyan-400">∞</div>
					<div class="text-sm text-slate-500">Certificates</div>
				</div>
				<div class="text-center">
					<div class="text-3xl font-bold text-cyan-400">24/7</div>
					<div class="text-sm text-slate-500">Support</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Features Section -->
	<section id="features" class="py-20 px-4">
		<div class="max-w-7xl mx-auto">
			<div class="text-center mb-16">
				<h2 class="text-3xl md:text-5xl font-bold mb-4">
					Everything you need. <span class="text-cyan-400">Nothing you don't.</span>
				</h2>
				<p class="text-slate-400 text-lg max-w-2xl mx-auto">
					We studied what enterprises actually use — then built exactly that, minus the bloat.
				</p>
			</div>

			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
				<!-- Feature 1 -->
				<div class="card card-hover group">
					<div class="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors">
						<BookOpen class="w-6 h-6 text-cyan-400" />
					</div>
					<h3 class="text-xl font-semibold mb-2">Course Builder</h3>
					<p class="text-slate-400">
						Create engaging courses with modules, lessons, videos, and quizzes. AI-powered content generation from your documents.
					</p>
				</div>

				<!-- Feature 2 -->
				<div class="card card-hover group">
					<div class="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
						<Award class="w-6 h-6 text-emerald-400" />
					</div>
					<h3 class="text-xl font-semibold mb-2">Certificate Designer</h3>
					<p class="text-slate-400">
						Drag-and-drop certificate templates with dynamic fields, QR verification, and custom branding. Issue instantly on completion.
					</p>
				</div>

				<!-- Feature 3 -->
				<div class="card card-hover group">
					<div class="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center mb-4 group-hover:bg-amber-500/20 transition-colors">
						<BarChart3 class="w-6 h-6 text-amber-400" />
					</div>
					<h3 class="text-xl font-semibold mb-2">Analytics Dashboard</h3>
					<p class="text-slate-400">
						Track completion rates, assessment scores, and compliance status. Export audit-ready reports in one click.
					</p>
				</div>

				<!-- Feature 4 -->
				<div class="card card-hover group">
					<div class="w-12 h-12 rounded-lg bg-steel-500/10 flex items-center justify-center mb-4 group-hover:bg-steel-500/20 transition-colors">
						<Users class="w-6 h-6 text-steel-400" />
					</div>
					<h3 class="text-xl font-semibold mb-2">Team Management</h3>
					<p class="text-slate-400">
						Auto-enroll by role or department. Send reminders. Track who's completed what. Keep everyone accountable.
					</p>
				</div>

				<!-- Feature 5 -->
				<div class="card card-hover group">
					<div class="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors">
						<Zap class="w-6 h-6 text-cyan-400" />
					</div>
					<h3 class="text-xl font-semibold mb-2">Learning Paths</h3>
					<p class="text-slate-400">
						Create sequential course progressions with prerequisites. Personalized recommendations keep learners engaged.
					</p>
				</div>

				<!-- Feature 6 -->
				<div class="card card-hover group">
					<div class="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
						<Shield class="w-6 h-6 text-emerald-400" />
					</div>
					<h3 class="text-xl font-semibold mb-2">Compliance Ready</h3>
					<p class="text-slate-400">
						Built-in audit trails, expiration tracking, and renewal reminders. SOC 2 compliant infrastructure.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Pricing Section -->
	<section id="pricing" class="py-20 px-4 relative">
		<div class="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent"></div>
		
		<div class="max-w-7xl mx-auto relative">
			<div class="text-center mb-16">
				<h2 class="text-3xl md:text-5xl font-bold mb-4">
					Simple, <span class="text-cyan-400">honest</span> pricing
				</h2>
				<p class="text-slate-400 text-lg">
					No hidden fees. No per-user surprises. Just straightforward plans.
				</p>
			</div>

			<div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
				<!-- Starter -->
				<div class="card">
					<div class="mb-6">
						<h3 class="text-xl font-semibold mb-2">Starter</h3>
						<div class="flex items-baseline gap-1">
							<span class="text-4xl font-bold">$99</span>
							<span class="text-slate-500">/month</span>
						</div>
						<p class="text-sm text-slate-500 mt-1">Up to 50 users</p>
					</div>
					<ul class="space-y-3 mb-8">
						<li class="flex items-center gap-2 text-slate-300">
							<CheckCircle2 class="w-5 h-5 text-emerald-500 shrink-0" />
							5 courses
						</li>
						<li class="flex items-center gap-2 text-slate-300">
							<CheckCircle2 class="w-5 h-5 text-emerald-500 shrink-0" />
							Unlimited certificates
						</li>
						<li class="flex items-center gap-2 text-slate-300">
							<CheckCircle2 class="w-5 h-5 text-emerald-500 shrink-0" />
							Basic analytics
						</li>
						<li class="flex items-center gap-2 text-slate-300">
							<CheckCircle2 class="w-5 h-5 text-emerald-500 shrink-0" />
							Email support
						</li>
					</ul>
					<a href="/signup" class="btn btn-secondary w-full">Get Started</a>
				</div>

				<!-- Growth - Popular -->
				<div class="card border-cyan-500/50 relative">
					<div class="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-cyan-500 text-navy-950 text-sm font-semibold rounded-full">
						Most Popular
					</div>
					<div class="mb-6">
						<h3 class="text-xl font-semibold mb-2">Growth</h3>
						<div class="flex items-baseline gap-1">
							<span class="text-4xl font-bold text-cyan-400">$299</span>
							<span class="text-slate-500">/month</span>
						</div>
						<p class="text-sm text-slate-500 mt-1">Up to 250 users</p>
					</div>
					<ul class="space-y-3 mb-8">
						<li class="flex items-center gap-2 text-slate-300">
							<CheckCircle2 class="w-5 h-5 text-emerald-500 shrink-0" />
							Unlimited courses
						</li>
						<li class="flex items-center gap-2 text-slate-300">
							<CheckCircle2 class="w-5 h-5 text-emerald-500 shrink-0" />
							Learning paths
						</li>
						<li class="flex items-center gap-2 text-slate-300">
							<CheckCircle2 class="w-5 h-5 text-emerald-500 shrink-0" />
							Advanced reporting
						</li>
						<li class="flex items-center gap-2 text-slate-300">
							<CheckCircle2 class="w-5 h-5 text-emerald-500 shrink-0" />
							AI course builder
						</li>
						<li class="flex items-center gap-2 text-slate-300">
							<CheckCircle2 class="w-5 h-5 text-emerald-500 shrink-0" />
							Priority support
						</li>
					</ul>
					<a href="/signup" class="btn btn-primary w-full">Get Started</a>
				</div>

				<!-- Business -->
				<div class="card">
					<div class="mb-6">
						<h3 class="text-xl font-semibold mb-2">Business</h3>
						<div class="flex items-baseline gap-1">
							<span class="text-4xl font-bold">$599</span>
							<span class="text-slate-500">/month</span>
						</div>
						<p class="text-sm text-slate-500 mt-1">Up to 1000 users</p>
					</div>
					<ul class="space-y-3 mb-8">
						<li class="flex items-center gap-2 text-slate-300">
							<CheckCircle2 class="w-5 h-5 text-emerald-500 shrink-0" />
							Everything in Growth
						</li>
						<li class="flex items-center gap-2 text-slate-300">
							<CheckCircle2 class="w-5 h-5 text-emerald-500 shrink-0" />
							SSO / SAML
						</li>
						<li class="flex items-center gap-2 text-slate-300">
							<CheckCircle2 class="w-5 h-5 text-emerald-500 shrink-0" />
							API access
						</li>
						<li class="flex items-center gap-2 text-slate-300">
							<CheckCircle2 class="w-5 h-5 text-emerald-500 shrink-0" />
							Custom integrations
						</li>
						<li class="flex items-center gap-2 text-slate-300">
							<CheckCircle2 class="w-5 h-5 text-emerald-500 shrink-0" />
							Dedicated support
						</li>
					</ul>
					<a href="/signup" class="btn btn-secondary w-full">Contact Sales</a>
				</div>
			</div>

			<p class="text-center text-slate-500 mt-8">
				Need more? <a href="/enterprise" class="text-cyan-400 hover:underline">Enterprise plans</a> with self-hosting and custom SLAs available.
			</p>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="py-20 px-4">
		<div class="max-w-4xl mx-auto text-center">
			<h2 class="text-3xl md:text-5xl font-bold mb-6">
				Ready to stop overpaying?
			</h2>
			<p class="text-xl text-slate-400 mb-10">
				Join hundreds of teams who switched from expensive enterprise LMS platforms.
				<br />Start your free trial today — no credit card required.
			</p>
			<a href="/signup" class="btn btn-primary text-lg px-10 py-4 glow-cyan animate-pulse-glow">
				Start Free Trial
				<ArrowRight class="w-5 h-5" />
			</a>
		</div>
	</section>

	<!-- Footer -->
	<footer class="border-t border-slate-800 py-12 px-4">
		<div class="max-w-7xl mx-auto">
			<div class="flex flex-col md:flex-row items-center justify-between gap-4">
				<div class="flex items-center gap-2">
					<Award class="w-6 h-6 text-cyan-500" />
					<span class="font-semibold">Certify365</span>
				</div>
				<div class="flex items-center gap-6 text-sm text-slate-500">
					<a href="/privacy" class="hover:text-white transition-colors">Privacy</a>
					<a href="/terms" class="hover:text-white transition-colors">Terms</a>
					<a href="/docs" class="hover:text-white transition-colors">Docs</a>
					<a href="/blog" class="hover:text-white transition-colors">Blog</a>
				</div>
				<p class="text-sm text-slate-600">© 2026 Certify365. All rights reserved.</p>
			</div>
		</div>
	</footer>
</div>
