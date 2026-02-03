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
	import AppNav from '$lib/components/AppNav.svelte';

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

	const stats = [
		{ label: 'Courses Enrolled', value: 8, icon: BookOpen, color: 'teal' },
		{ label: 'Certificates Earned', value: 5, icon: Award, color: 'coral' },
		{ label: 'Hours Learned', value: 24, icon: Clock, color: 'amber' },
		{ label: 'Completion Rate', value: '87%', icon: TrendingUp, color: 'forest' }
	];

	const inProgressCourses = [
		{ id: 1, title: 'Workplace Safety Fundamentals', progress: 75, dueDate: '2024-02-15' },
		{ id: 2, title: 'Data Privacy & GDPR Compliance', progress: 45, dueDate: '2024-02-20' },
		{ id: 3, title: 'Leadership Excellence Program', progress: 20, dueDate: null }
	];

	const recentCertificates = [
		{ id: 1, title: 'Introduction to Machine Learning', issuedAt: '2024-01-10' },
		{ id: 2, title: 'Project Management Basics', issuedAt: '2024-01-05' }
	];

	function getIconBg(color: string) {
		switch (color) {
			case 'teal': return 'bg-teal-50 text-teal-700';
			case 'coral': return 'bg-coral-50 text-coral-600';
			case 'amber': return 'bg-amber-50 text-amber-600';
			case 'forest': return 'bg-green-50 text-green-700';
			default: return 'bg-stone-100 text-stone-600';
		}
	}
</script>

<svelte:head>
	<title>Dashboard - Certify365</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet" />
</svelte:head>

<div class="min-h-screen bg-stone-25">
	<AppNav currentPath="/dashboard" userName={data.session?.user?.name} />

	<main class="max-w-6xl mx-auto px-4 sm:px-6 py-8">
		<!-- Welcome -->
		<div class="mb-8">
			<h1 class="text-2xl font-semibold text-stone-900" style="font-family: var(--font-display)">
				Welcome back, {data.session?.user?.name || 'Learner'}
			</h1>
			<p class="text-stone-500 mt-1">Continue your learning journey</p>
		</div>

		<!-- Stats Grid -->
		<div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
			{#each stats as stat}
				<div class="card">
					<div class="flex items-center justify-between mb-3">
						<div class="w-10 h-10 rounded-lg flex items-center justify-center {getIconBg(stat.color)}">
							<stat.icon class="w-5 h-5" />
						</div>
					</div>
					<p class="text-2xl font-semibold text-stone-900" style="font-family: var(--font-display)">{stat.value}</p>
					<p class="text-stone-500 text-sm">{stat.label}</p>
				</div>
			{/each}
		</div>

		<div class="grid lg:grid-cols-3 gap-8">
			<!-- In Progress -->
			<div class="lg:col-span-2">
				<div class="flex items-center justify-between mb-4">
					<h2 class="text-lg font-semibold text-stone-900" style="font-family: var(--font-display)">In Progress</h2>
					<a href="/courses" class="text-teal-700 text-sm hover:underline">View all</a>
				</div>

				<div class="space-y-4">
					{#each inProgressCourses as course}
						<div class="card hover:border-teal-200">
							<div class="flex items-start gap-4">
								<div class="w-14 h-14 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0">
									<BookOpen class="w-7 h-7 text-teal-600" />
								</div>

								<div class="flex-1 min-w-0">
									<h3 class="font-medium text-stone-900">{course.title}</h3>

									{#if course.dueDate}
										<p class="text-sm text-stone-400 mt-1">
											Due: {new Date(course.dueDate).toLocaleDateString()}
										</p>
									{/if}

									<div class="mt-3">
										<div class="flex items-center justify-between text-sm mb-1">
											<span class="text-stone-500">{course.progress}% complete</span>
										</div>
										<div class="h-2 bg-stone-100 rounded-full overflow-hidden">
											<div
												class="h-full bg-teal-500 rounded-full transition-all"
												style="width: {course.progress}%"
											></div>
										</div>
									</div>
								</div>

								<a href="/courses/{course.id}" class="btn btn-primary py-2 px-3">
									<Play class="w-4 h-4" />
								</a>
							</div>
						</div>
					{/each}
				</div>

				<!-- AI Course Builder CTA -->
				<div class="mt-6 card border-teal-200 bg-teal-50/50">
					<div class="flex items-center gap-4">
						<div class="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
							<Sparkles class="w-6 h-6 text-teal-700" />
						</div>
						<div class="flex-1">
							<h3 class="font-semibold text-stone-900">AI Course Builder</h3>
							<p class="text-stone-500 text-sm">Generate courses from documents or topics</p>
						</div>
						<a href="/admin/courses/create" class="btn btn-primary">
							<Plus class="w-4 h-4" />
							Create
						</a>
					</div>
				</div>
			</div>

			<!-- Sidebar -->
			<div class="space-y-6">
				<!-- Recent Certificates -->
				<div>
					<div class="flex items-center justify-between mb-4">
						<h2 class="text-lg font-semibold text-stone-900" style="font-family: var(--font-display)">Recent Certificates</h2>
						<a href="/certificates" class="text-teal-700 text-sm hover:underline">View all</a>
					</div>

					<div class="space-y-3">
						{#each recentCertificates as cert}
							<div class="card hover:border-coral-200">
								<div class="flex items-center gap-3">
									<div class="w-10 h-10 bg-coral-50 rounded-lg flex items-center justify-center">
										<Award class="w-5 h-5 text-coral-600" />
									</div>
									<div class="flex-1 min-w-0">
										<h3 class="text-sm font-medium text-stone-900 truncate">{cert.title}</h3>
										<p class="text-xs text-stone-400">
											{new Date(cert.issuedAt).toLocaleDateString()}
										</p>
									</div>
									<ChevronRight class="w-4 h-4 text-stone-300" />
								</div>
							</div>
						{/each}
					</div>
				</div>

				<!-- Quick Actions -->
				<div>
					<h2 class="text-lg font-semibold text-stone-900 mb-4" style="font-family: var(--font-display)">Quick Actions</h2>
					<div class="space-y-2">
						<a href="/courses" class="card flex items-center gap-3 hover:border-teal-200">
							<BookOpen class="w-5 h-5 text-teal-600" />
							<span class="text-stone-700 text-sm">Browse Courses</span>
						</a>
						<a href="/certificates" class="card flex items-center gap-3 hover:border-coral-200">
							<Award class="w-5 h-5 text-coral-600" />
							<span class="text-stone-700 text-sm">My Certificates</span>
						</a>
						<a href="/profile" class="card flex items-center gap-3 hover:border-stone-300">
							<CheckCircle class="w-5 h-5 text-amber-600" />
							<span class="text-stone-700 text-sm">Update Profile</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	</main>
</div>

<style>
	.bg-stone-25 { background-color: #FDFCFB; }
	.bg-coral-50 { background-color: #FFF5F3; }
	.text-coral-600 { color: #DC3D28; }
</style>
