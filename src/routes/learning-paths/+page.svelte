<script lang="ts">
	import {
		Route,
		BookOpen,
		Clock,
		Award,
		ChevronRight,
		Play,
		CheckCircle,
		Lock,
		Users
	} from 'lucide-svelte';

	// Mock learning paths
	const learningPaths = [
		{
			id: 1,
			title: 'New Employee Onboarding',
			description: 'Essential training for all new hires covering company policies, safety, and compliance.',
			courses: 5,
			duration: 240,
			enrollments: 456,
			progress: 60,
			status: 'in_progress',
			thumbnail: null,
			coursesData: [
				{ id: 1, title: 'Company Overview & Culture', completed: true },
				{ id: 2, title: 'Workplace Safety Fundamentals', completed: true },
				{ id: 3, title: 'HR Policies & Procedures', completed: true },
				{ id: 4, title: 'IT Security Basics', completed: false, current: true },
				{ id: 5, title: 'Code of Conduct', completed: false }
			]
		},
		{
			id: 2,
			title: 'Leadership Development Track',
			description: 'Develop essential leadership skills from communication to strategic thinking.',
			courses: 8,
			duration: 480,
			enrollments: 234,
			progress: 0,
			status: 'not_started',
			thumbnail: null,
			coursesData: [
				{ id: 1, title: 'Leadership Foundations', completed: false },
				{ id: 2, title: 'Effective Communication', completed: false },
				{ id: 3, title: 'Team Building & Motivation', completed: false },
				{ id: 4, title: 'Conflict Resolution', completed: false },
				{ id: 5, title: 'Decision Making & Problem Solving', completed: false },
				{ id: 6, title: 'Delegation & Time Management', completed: false },
				{ id: 7, title: 'Strategic Planning', completed: false },
				{ id: 8, title: 'Change Management', completed: false }
			]
		},
		{
			id: 3,
			title: 'Compliance Essentials',
			description: 'Stay compliant with mandatory training on GDPR, workplace safety, and ethics.',
			courses: 4,
			duration: 180,
			enrollments: 892,
			progress: 100,
			status: 'completed',
			thumbnail: null,
			coursesData: [
				{ id: 1, title: 'GDPR Compliance', completed: true },
				{ id: 2, title: 'Workplace Safety', completed: true },
				{ id: 3, title: 'Anti-Harassment Training', completed: true },
				{ id: 4, title: 'Business Ethics', completed: true }
			]
		}
	];

	function getStatusColor(status: string) {
		switch (status) {
			case 'completed': return 'text-emerald-400 bg-emerald-500/10';
			case 'in_progress': return 'text-[#00d4ff] bg-[#00d4ff]/10';
			default: return 'text-slate-400 bg-white/5';
		}
	}

	function getStatusLabel(status: string) {
		switch (status) {
			case 'completed': return 'Completed';
			case 'in_progress': return 'In Progress';
			default: return 'Not Started';
		}
	}
</script>

<svelte:head>
	<title>Learning Paths - Certify365</title>
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
						<a href="/certificates" class="text-slate-400 hover:text-white transition-colors">Certificates</a>
						<a href="/learning-paths" class="text-white font-medium">Learning Paths</a>
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
			<h1 class="text-2xl font-bold text-white">Learning Paths</h1>
			<p class="text-slate-400 mt-1">Structured course sequences to guide your learning journey</p>
		</div>

		<!-- Learning Paths -->
		<div class="space-y-6">
			{#each learningPaths as path}
				<div class="bg-[#141b2d]/80 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
					<!-- Header -->
					<div class="p-6 border-b border-white/10">
						<div class="flex items-start gap-6">
							<!-- Thumbnail -->
							<div class="w-24 h-24 bg-gradient-to-br from-[#00d4ff]/20 to-[#10b981]/20 rounded-xl flex items-center justify-center flex-shrink-0">
								<Route class="w-10 h-10 text-[#00d4ff]" />
							</div>

							<!-- Info -->
							<div class="flex-1 min-w-0">
								<div class="flex items-start justify-between gap-4">
									<div>
										<span class="px-2 py-1 rounded text-xs font-medium {getStatusColor(path.status)}">
											{getStatusLabel(path.status)}
										</span>
										<h2 class="text-xl font-semibold text-white mt-2">{path.title}</h2>
										<p class="text-slate-400 mt-1">{path.description}</p>
									</div>

									{#if path.status === 'completed'}
										<div class="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 rounded-lg flex-shrink-0">
											<Award class="w-4 h-4 text-emerald-400" />
											<span class="text-sm text-emerald-400 font-medium">Certificate Earned</span>
										</div>
									{/if}
								</div>

								<div class="flex items-center gap-6 mt-4 text-sm text-slate-400">
									<span class="flex items-center gap-1">
										<BookOpen class="w-4 h-4" />
										{path.courses} courses
									</span>
									<span class="flex items-center gap-1">
										<Clock class="w-4 h-4" />
										{Math.round(path.duration / 60)}h {path.duration % 60}m
									</span>
									<span class="flex items-center gap-1">
										<Users class="w-4 h-4" />
										{path.enrollments} enrolled
									</span>
								</div>

								{#if path.status !== 'not_started'}
									<div class="mt-4">
										<div class="flex items-center justify-between text-sm mb-1">
											<span class="text-slate-400">{path.progress}% complete</span>
											<span class="text-slate-500">{path.coursesData.filter(c => c.completed).length}/{path.courses} courses</span>
										</div>
										<div class="h-2 bg-[#0a0e1a] rounded-full overflow-hidden">
											<div
												class="h-full rounded-full transition-all {path.status === 'completed' ? 'bg-emerald-500' : 'bg-gradient-to-r from-[#00d4ff] to-[#10b981]'}"
												style="width: {path.progress}%"
											></div>
										</div>
									</div>
								{/if}
							</div>
						</div>
					</div>

					<!-- Course List -->
					<div class="p-6">
						<h3 class="text-sm font-medium text-slate-400 mb-4">COURSES IN THIS PATH</h3>
						<div class="space-y-2">
							{#each path.coursesData as course, i}
								<div class="flex items-center gap-4 p-3 rounded-lg {course.current ? 'bg-[#00d4ff]/10 border border-[#00d4ff]/30' : 'hover:bg-white/5'} transition-colors">
									<div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 {course.completed ? 'bg-emerald-500/20' : course.current ? 'bg-[#00d4ff]/20' : 'bg-[#0a0e1a]'}">
										{#if course.completed}
											<CheckCircle class="w-4 h-4 text-emerald-400" />
										{:else if course.current}
											<Play class="w-4 h-4 text-[#00d4ff]" />
										{:else if i > 0 && !path.coursesData[i-1]?.completed}
											<Lock class="w-4 h-4 text-slate-500" />
										{:else}
											<span class="text-sm text-slate-400">{i + 1}</span>
										{/if}
									</div>

									<div class="flex-1 min-w-0">
										<p class="text-white {course.completed ? 'line-through text-slate-400' : ''}">{course.title}</p>
									</div>

									{#if course.current}
										<button class="px-4 py-1.5 bg-[#00d4ff] text-[#0a0e1a] text-sm font-medium rounded-lg hover:bg-[#00d4ff]/90 transition-colors">
											Continue
										</button>
									{:else if !course.completed && path.coursesData[i-1]?.completed}
										<button class="px-4 py-1.5 bg-white/5 text-white text-sm font-medium rounded-lg hover:bg-white/10 transition-colors">
											Start
										</button>
									{/if}

									<ChevronRight class="w-4 h-4 text-slate-500" />
								</div>
							{/each}
						</div>
					</div>

					<!-- Footer -->
					{#if path.status === 'not_started'}
						<div class="px-6 pb-6">
							<button class="w-full py-3 bg-[#00d4ff] text-[#0a0e1a] font-semibold rounded-lg hover:bg-[#00d4ff]/90 transition-colors">
								Start Learning Path
							</button>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</main>
</div>
