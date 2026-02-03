<script lang="ts">
	import { Route, BookOpen, Clock, Award, ChevronRight, Play, CheckCircle, Lock, Users } from 'lucide-svelte';
	import AppNav from '$lib/components/AppNav.svelte';

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
			coursesData: [
				{ id: 1, title: 'Leadership Foundations', completed: false },
				{ id: 2, title: 'Effective Communication', completed: false },
				{ id: 3, title: 'Team Building & Motivation', completed: false },
				{ id: 4, title: 'Conflict Resolution', completed: false }
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
			coursesData: [
				{ id: 1, title: 'GDPR Compliance', completed: true },
				{ id: 2, title: 'Workplace Safety', completed: true },
				{ id: 3, title: 'Anti-Harassment Training', completed: true },
				{ id: 4, title: 'Business Ethics', completed: true }
			]
		}
	];

	function getStatusBadge(status: string) {
		switch (status) {
			case 'completed': return { class: 'bg-green-50 text-green-700', label: 'Completed' };
			case 'in_progress': return { class: 'bg-teal-50 text-teal-700', label: 'In Progress' };
			default: return { class: 'bg-stone-100 text-stone-600', label: 'Not Started' };
		}
	}
</script>

<svelte:head>
	<title>Learning Paths - Certify365</title>
	<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet" />
</svelte:head>

<div class="min-h-screen bg-stone-25">
	<AppNav currentPath="/learning-paths" />

	<main class="max-w-6xl mx-auto px-4 sm:px-6 py-8">
		<div class="mb-8">
			<h1 class="text-2xl font-semibold text-stone-900" style="font-family: var(--font-display)">Learning Paths</h1>
			<p class="text-stone-500 mt-1">Structured course sequences to guide your learning journey</p>
		</div>

		<div class="space-y-6">
			{#each learningPaths as path}
				{@const statusBadge = getStatusBadge(path.status)}
				<div class="card">
					<!-- Header -->
					<div class="flex items-start gap-6 pb-6 border-b border-stone-100">
						<div class="w-20 h-20 bg-gradient-to-br from-teal-50 to-stone-100 rounded-xl flex items-center justify-center flex-shrink-0">
							<Route class="w-8 h-8 text-teal-600" />
						</div>

						<div class="flex-1 min-w-0">
							<div class="flex items-start justify-between gap-4">
								<div>
									<span class="px-2 py-1 rounded-full text-xs font-medium {statusBadge.class}">
										{statusBadge.label}
									</span>
									<h2 class="text-xl font-semibold text-stone-900 mt-2" style="font-family: var(--font-display)">{path.title}</h2>
									<p class="text-stone-500 mt-1">{path.description}</p>
								</div>

								{#if path.status === 'completed'}
									<div class="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-lg flex-shrink-0">
										<Award class="w-4 h-4 text-green-600" />
										<span class="text-sm text-green-700 font-medium">Certificate Earned</span>
									</div>
								{/if}
							</div>

							<div class="flex items-center gap-6 mt-4 text-sm text-stone-500">
								<span class="flex items-center gap-1">
									<BookOpen class="w-4 h-4" />
									{path.courses} courses
								</span>
								<span class="flex items-center gap-1">
									<Clock class="w-4 h-4" />
									{Math.floor(path.duration / 60)}h {path.duration % 60}m
								</span>
								<span class="flex items-center gap-1">
									<Users class="w-4 h-4" />
									{path.enrollments} enrolled
								</span>
							</div>

							{#if path.status !== 'not_started'}
								<div class="mt-4">
									<div class="flex items-center justify-between text-sm mb-1">
										<span class="text-stone-500">{path.progress}% complete</span>
										<span class="text-stone-400">{path.coursesData.filter(c => c.completed).length}/{path.courses}</span>
									</div>
									<div class="h-2 bg-stone-100 rounded-full overflow-hidden">
										<div class="h-full rounded-full transition-all {path.status === 'completed' ? 'bg-green-500' : 'bg-teal-500'}" style="width: {path.progress}%"></div>
									</div>
								</div>
							{/if}
						</div>
					</div>

					<!-- Course List -->
					<div class="pt-6">
						<h3 class="text-xs font-semibold text-stone-500 mb-4 uppercase tracking-wide">Courses in this path</h3>
						<div class="space-y-2">
							{#each path.coursesData as course, i}
								<div class="flex items-center gap-4 p-3 rounded-lg transition-colors {course.current ? 'bg-teal-50 border border-teal-200' : 'hover:bg-stone-50'}">
									<div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 {course.completed ? 'bg-green-100' : course.current ? 'bg-teal-100' : 'bg-stone-100'}">
										{#if course.completed}
											<CheckCircle class="w-4 h-4 text-green-600" />
										{:else if course.current}
											<Play class="w-4 h-4 text-teal-700" />
										{:else if i > 0 && !path.coursesData[i-1]?.completed}
											<Lock class="w-4 h-4 text-stone-400" />
										{:else}
											<span class="text-sm text-stone-500">{i + 1}</span>
										{/if}
									</div>

									<div class="flex-1 min-w-0">
										<p class="text-stone-900 {course.completed ? 'line-through text-stone-400' : ''}">{course.title}</p>
									</div>

									{#if course.current}
										<button class="btn btn-primary py-1.5 px-4 text-sm">Continue</button>
									{:else if !course.completed && (i === 0 || path.coursesData[i-1]?.completed)}
										<button class="btn btn-secondary py-1.5 px-4 text-sm">Start</button>
									{/if}

									<ChevronRight class="w-4 h-4 text-stone-300" />
								</div>
							{/each}
						</div>
					</div>

					{#if path.status === 'not_started'}
						<div class="pt-6 mt-6 border-t border-stone-100">
							<button class="btn btn-primary w-full py-3">Start Learning Path</button>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</main>
</div>

<style>
	.bg-stone-25 { background-color: #FDFCFB; }
</style>
