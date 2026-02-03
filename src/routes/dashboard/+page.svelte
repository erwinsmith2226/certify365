<script lang="ts">
	import {
		BookOpen,
		Award,
		Clock,
		TrendingUp,
		Play,
		CheckCircle,
		ChevronRight,
		Sparkles,
		Plus
	} from 'lucide-svelte';

	interface Props {
		data: {
			session: {
				user: {
					name?: string;
					email?: string;
					image?: string;
					role?: string;
				};
			} | null;
		};
	}

	let { data }: Props = $props();

	// Mock data for demo
	const stats = [
		{ label: 'Courses Enrolled', value: 8, icon: BookOpen, bgColor: 'bg-cyan-500/10', textColor: 'text-cyan-400' },
		{ label: 'Certificates Earned', value: 5, icon: Award, bgColor: 'bg-emerald-500/10', textColor: 'text-emerald-400' },
		{ label: 'Hours Learned', value: 24, icon: Clock, bgColor: 'bg-amber-500/10', textColor: 'text-amber-400' },
		{ label: 'Completion Rate', value: '87%', icon: TrendingUp, bgColor: 'bg-violet-500/10', textColor: 'text-violet-400' }
	];

	const inProgressCourses = [
		{ id: 1, title: 'Workplace Safety Fundamentals', progress: 75, thumbnail: null, dueDate: '2024-02-15' },
		{ id: 2, title: 'Data Privacy & GDPR Compliance', progress: 45, thumbnail: null, dueDate: '2024-02-20' },
		{ id: 3, title: 'Leadership Excellence Program', progress: 20, thumbnail: null, dueDate: null }
	];

	const recentCertificates = [
		{ id: 1, title: 'Introduction to Machine Learning', issuedAt: '2024-01-10' },
		{ id: 2, title: 'Project Management Basics', issuedAt: '2024-01-05' }
	];
</script>

<svelte:head>
	<title>Dashboard - Certify365</title>
</svelte:head>

<div class="min-h-screen bg-[#0a0e1a]">
	<!-- Top Nav -->
	<nav class="border-b border-white/10 bg-[#141b2d]/50 backdrop-blur-sm sticky top-0 z-50">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between h-16">
				<div class="flex items-center gap-8">
					<a href="/" class="text-xl font-bold text-[#00d4ff]">Certify365</a>
					<div class="hidden md:flex items-center gap-6">
						<a href="/dashboard" class="text-white font-medium">Dashboard</a>
						<a href="/courses" class="text-slate-400 hover:text-white transition-colors">Courses</a>
						<a href="/certificates" class="text-slate-400 hover:text-white transition-colors">Certificates</a>
						<a href="/learning-paths" class="text-slate-400 hover:text-white transition-colors">Learning Paths</a>
					</div>
				</div>

				<div class="flex items-center gap-4">
					{#if data.session?.user?.role === 'admin' || data.session?.user?.role === 'instructor'}
						<a
							href="/admin"
							class="px-4 py-2 bg-[#00d4ff]/10 text-[#00d4ff] text-sm font-medium rounded-lg hover:bg-[#00d4ff]/20 transition-colors"
						>
							Admin Panel
						</a>
					{/if}

					<div class="flex items-center gap-3">
						{#if data.session?.user?.image}
							<img
								src={data.session.user.image}
								alt="Profile"
								class="w-8 h-8 rounded-full"
							/>
						{:else}
							<div class="w-8 h-8 bg-gradient-to-br from-[#00d4ff] to-[#10b981] rounded-full flex items-center justify-center text-[#0a0e1a] font-semibold text-sm">
								{data.session?.user?.name?.charAt(0) || 'U'}
							</div>
						{/if}
						<a href="/auth/signout" class="text-slate-400 hover:text-white text-sm transition-colors">
							Sign Out
						</a>
					</div>
				</div>
			</div>
		</div>
	</nav>

	<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		<!-- Welcome -->
		<div class="mb-8">
			<h1 class="text-2xl font-bold text-white">
				Welcome back, {data.session?.user?.name || 'Learner'}!
			</h1>
			<p class="text-slate-400 mt-1">Continue your learning journey</p>
		</div>

		<!-- Stats Grid -->
		<div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
			{#each stats as stat}
				<div class="bg-[#141b2d]/80 backdrop-blur-sm rounded-xl border border-white/10 p-5">
					<div class="flex items-center justify-between mb-3">
						<div class="w-10 h-10 rounded-lg flex items-center justify-center {stat.bgColor}">
							<stat.icon class="w-5 h-5 {stat.textColor}" />
						</div>
					</div>
					<p class="text-2xl font-bold text-white">{stat.value}</p>
					<p class="text-slate-400 text-sm">{stat.label}</p>
				</div>
			{/each}
		</div>

		<div class="grid lg:grid-cols-3 gap-8">
			<!-- In Progress -->
			<div class="lg:col-span-2">
				<div class="flex items-center justify-between mb-4">
					<h2 class="text-lg font-semibold text-white">In Progress</h2>
					<a href="/courses" class="text-[#00d4ff] text-sm hover:underline">View all</a>
				</div>

				<div class="space-y-4">
					{#each inProgressCourses as course}
						<div class="bg-[#141b2d]/80 backdrop-blur-sm rounded-xl border border-white/10 p-5 hover:border-[#00d4ff]/30 transition-colors">
							<div class="flex items-start gap-4">
								<div class="w-16 h-16 bg-gradient-to-br from-[#00d4ff]/20 to-[#10b981]/20 rounded-lg flex items-center justify-center flex-shrink-0">
									<BookOpen class="w-8 h-8 text-[#00d4ff]" />
								</div>

								<div class="flex-1 min-w-0">
									<h3 class="font-medium text-white truncate">{course.title}</h3>

									{#if course.dueDate}
										<p class="text-sm text-slate-400 mt-1">
											Due: {new Date(course.dueDate).toLocaleDateString()}
										</p>
									{/if}

									<div class="mt-3">
										<div class="flex items-center justify-between text-sm mb-1">
											<span class="text-slate-400">{course.progress}% complete</span>
										</div>
										<div class="h-2 bg-[#0a0e1a] rounded-full overflow-hidden">
											<div
												class="h-full bg-gradient-to-r from-[#00d4ff] to-[#10b981] rounded-full transition-all"
												style="width: {course.progress}%"
											></div>
										</div>
									</div>
								</div>

								<button class="p-2 bg-[#00d4ff] rounded-lg hover:bg-[#00d4ff]/90 transition-colors">
									<Play class="w-5 h-5 text-[#0a0e1a]" />
								</button>
							</div>
						</div>
					{/each}
				</div>

				<!-- AI Course Builder CTA -->
				<div class="mt-6 bg-gradient-to-r from-[#00d4ff]/10 to-[#10b981]/10 rounded-xl border border-[#00d4ff]/30 p-6">
					<div class="flex items-center gap-4">
						<div class="w-12 h-12 bg-[#00d4ff]/20 rounded-xl flex items-center justify-center">
							<Sparkles class="w-6 h-6 text-[#00d4ff]" />
						</div>
						<div class="flex-1">
							<h3 class="font-semibold text-white">AI Course Builder</h3>
							<p class="text-slate-400 text-sm">Generate courses from documents or topics using AI</p>
						</div>
						<a
							href="/admin/courses/create"
							class="flex items-center gap-2 px-4 py-2 bg-[#00d4ff] text-[#0a0e1a] font-medium rounded-lg hover:bg-[#00d4ff]/90 transition-colors"
						>
							<Plus class="w-4 h-4" />
							Create Course
						</a>
					</div>
				</div>
			</div>

			<!-- Sidebar -->
			<div class="space-y-6">
				<!-- Recent Certificates -->
				<div>
					<div class="flex items-center justify-between mb-4">
						<h2 class="text-lg font-semibold text-white">Recent Certificates</h2>
						<a href="/certificates" class="text-[#00d4ff] text-sm hover:underline">View all</a>
					</div>

					<div class="space-y-3">
						{#each recentCertificates as cert}
							<div class="bg-[#141b2d]/80 backdrop-blur-sm rounded-xl border border-white/10 p-4 hover:border-emerald-500/30 transition-colors">
								<div class="flex items-center gap-3">
									<div class="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
										<Award class="w-5 h-5 text-emerald-400" />
									</div>
									<div class="flex-1 min-w-0">
										<h3 class="text-sm font-medium text-white truncate">{cert.title}</h3>
										<p class="text-xs text-slate-400">
											{new Date(cert.issuedAt).toLocaleDateString()}
										</p>
									</div>
									<ChevronRight class="w-4 h-4 text-slate-400" />
								</div>
							</div>
						{/each}
					</div>
				</div>

				<!-- Quick Actions -->
				<div>
					<h2 class="text-lg font-semibold text-white mb-4">Quick Actions</h2>
					<div class="space-y-2">
						<a
							href="/courses"
							class="flex items-center gap-3 p-3 bg-[#141b2d]/80 rounded-lg border border-white/10 hover:border-[#00d4ff]/30 transition-colors"
						>
							<BookOpen class="w-5 h-5 text-[#00d4ff]" />
							<span class="text-white text-sm">Browse Courses</span>
						</a>
						<a
							href="/certificates"
							class="flex items-center gap-3 p-3 bg-[#141b2d]/80 rounded-lg border border-white/10 hover:border-[#00d4ff]/30 transition-colors"
						>
							<Award class="w-5 h-5 text-emerald-400" />
							<span class="text-white text-sm">My Certificates</span>
						</a>
						<a
							href="/profile"
							class="flex items-center gap-3 p-3 bg-[#141b2d]/80 rounded-lg border border-white/10 hover:border-[#00d4ff]/30 transition-colors"
						>
							<CheckCircle class="w-5 h-5 text-amber-400" />
							<span class="text-white text-sm">Update Profile</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	</main>
</div>
