<script lang="ts">
	import {
		Search,
		BookOpen,
		Clock,
		Users,
		Star,
		Play,
		ChevronRight,
		Grid,
		List,
		Award
	} from 'lucide-svelte';
	import AppNav from '$lib/components/AppNav.svelte';

	let searchQuery = $state('');
	let selectedCategory = $state('all');
	let viewMode = $state<'grid' | 'list'>('grid');

	const categories = [
		{ id: 'all', name: 'All Courses' },
		{ id: 'compliance', name: 'Compliance' },
		{ id: 'safety', name: 'Safety' },
		{ id: 'leadership', name: 'Leadership' },
		{ id: 'technology', name: 'Technology' },
		{ id: 'soft-skills', name: 'Soft Skills' }
	];

	const courses = [
		{
			id: 1,
			title: 'Workplace Safety Fundamentals',
			description: 'Learn essential workplace safety practices and protocols.',
			category: 'safety',
			duration: 45,
			enrollments: 1234,
			rating: 4.8,
			modules: 6,
			instructor: 'Sarah Johnson',
			status: 'in_progress',
			progress: 65,
			hasCertificate: true
		},
		{
			id: 2,
			title: 'GDPR Compliance Training',
			description: 'Comprehensive training on GDPR regulations and data protection.',
			category: 'compliance',
			duration: 90,
			enrollments: 892,
			rating: 4.6,
			modules: 8,
			instructor: 'Michael Chen',
			status: 'not_started',
			progress: 0,
			hasCertificate: true
		},
		{
			id: 3,
			title: 'Leadership Excellence Program',
			description: 'Develop essential leadership skills to inspire your team.',
			category: 'leadership',
			duration: 120,
			enrollments: 567,
			rating: 4.9,
			modules: 10,
			instructor: 'Emily Davis',
			status: 'completed',
			progress: 100,
			hasCertificate: true
		},
		{
			id: 4,
			title: 'Cybersecurity Awareness',
			description: 'Protect yourself and your organization from cyber threats.',
			category: 'technology',
			duration: 60,
			enrollments: 2341,
			rating: 4.7,
			modules: 5,
			instructor: 'Alex Kim',
			status: 'not_started',
			progress: 0,
			hasCertificate: true
		},
		{
			id: 5,
			title: 'Effective Communication Skills',
			description: 'Master the art of communication in professional settings.',
			category: 'soft-skills',
			duration: 75,
			enrollments: 789,
			rating: 4.5,
			modules: 7,
			instructor: 'Jordan Lee',
			status: 'in_progress',
			progress: 30,
			hasCertificate: false
		},
		{
			id: 6,
			title: 'Data Privacy Fundamentals',
			description: 'Understanding data privacy laws and best practices.',
			category: 'compliance',
			duration: 55,
			enrollments: 1102,
			rating: 4.4,
			modules: 6,
			instructor: 'Rachel Green',
			status: 'not_started',
			progress: 0,
			hasCertificate: true
		}
	];

	let filteredCourses = $derived(
		courses.filter(course => {
			const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				course.description.toLowerCase().includes(searchQuery.toLowerCase());
			const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
			return matchesSearch && matchesCategory;
		})
	);

	function getStatusBadge(status: string) {
		switch (status) {
			case 'completed': return { class: 'bg-green-50 text-green-700', label: 'Completed' };
			case 'in_progress': return { class: 'bg-teal-50 text-teal-700', label: 'In Progress' };
			default: return { class: 'bg-stone-100 text-stone-600', label: 'Not Started' };
		}
	}
</script>

<svelte:head>
	<title>Course Catalog - Certify365</title>
	<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet" />
</svelte:head>

<div class="min-h-screen bg-stone-25">
	<AppNav currentPath="/courses" />

	<main class="max-w-6xl mx-auto px-4 sm:px-6 py-8">
		<div class="mb-8">
			<h1 class="text-2xl font-semibold text-stone-900" style="font-family: var(--font-display)">Course Catalog</h1>
			<p class="text-stone-500 mt-1">Browse and enroll in courses to advance your skills</p>
		</div>

		<!-- Search and Filters -->
		<div class="flex flex-col sm:flex-row gap-4 mb-6">
			<div class="relative flex-1">
				<Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="Search courses..."
					class="w-full border border-stone-200 rounded-lg pl-11 pr-4 py-3 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
				/>
			</div>

			<div class="flex items-center gap-2">
				<button
					onclick={() => viewMode = 'grid'}
					class="p-3 rounded-lg border transition-colors {viewMode === 'grid' ? 'bg-teal-50 border-teal-200 text-teal-700' : 'border-stone-200 text-stone-400 hover:border-stone-300'}"
				>
					<Grid class="w-5 h-5" />
				</button>
				<button
					onclick={() => viewMode = 'list'}
					class="p-3 rounded-lg border transition-colors {viewMode === 'list' ? 'bg-teal-50 border-teal-200 text-teal-700' : 'border-stone-200 text-stone-400 hover:border-stone-300'}"
				>
					<List class="w-5 h-5" />
				</button>
			</div>
		</div>

		<!-- Categories -->
		<div class="flex flex-wrap gap-2 mb-8">
			{#each categories as category}
				<button
					onclick={() => selectedCategory = category.id}
					class="px-4 py-2 rounded-full text-sm font-medium transition-colors {selectedCategory === category.id ? 'bg-teal-700 text-white' : 'bg-white border border-stone-200 text-stone-600 hover:border-stone-300'}"
				>
					{category.name}
				</button>
			{/each}
		</div>

		<!-- Course Grid -->
		{#if viewMode === 'grid'}
			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each filteredCourses as course}
					{@const statusBadge = getStatusBadge(course.status)}
					<a href="/courses/{course.id}" class="card hover:border-teal-200 transition-all hover:-translate-y-1">
						<!-- Thumbnail -->
						<div class="aspect-video bg-gradient-to-br from-teal-50 to-stone-100 rounded-lg flex items-center justify-center relative mb-4 -mx-6 -mt-6 overflow-hidden">
							<BookOpen class="w-10 h-10 text-teal-300" />
							{#if course.hasCertificate}
								<div class="absolute top-3 right-3 p-1.5 bg-white/80 backdrop-blur rounded-lg">
									<Award class="w-4 h-4 text-coral-500" />
								</div>
							{/if}
							{#if course.status === 'in_progress'}
								<div class="absolute bottom-0 left-0 right-0 h-1 bg-stone-200">
									<div class="h-full bg-teal-500" style="width: {course.progress}%"></div>
								</div>
							{/if}
						</div>

						<!-- Content -->
						<div class="flex items-center justify-between mb-3">
							<span class="px-2 py-1 rounded-full text-xs font-medium {statusBadge.class}">
								{statusBadge.label}
							</span>
							<div class="flex items-center gap-1 text-amber-500">
								<Star class="w-4 h-4 fill-current" />
								<span class="text-sm text-stone-600">{course.rating}</span>
							</div>
						</div>

						<h3 class="font-semibold text-stone-900 mb-2 line-clamp-2">{course.title}</h3>
						<p class="text-sm text-stone-500 mb-4 line-clamp-2">{course.description}</p>

						<div class="flex items-center justify-between text-xs text-stone-400 pt-4 border-t border-stone-100">
							<div class="flex items-center gap-3">
								<span class="flex items-center gap-1">
									<Clock class="w-3.5 h-3.5" />
									{course.duration}m
								</span>
								<span class="flex items-center gap-1">
									<BookOpen class="w-3.5 h-3.5" />
									{course.modules}
								</span>
							</div>
							<span class="flex items-center gap-1">
								<Users class="w-3.5 h-3.5" />
								{course.enrollments}
							</span>
						</div>
					</a>
				{/each}
			</div>
		{:else}
			<!-- List View -->
			<div class="space-y-4">
				{#each filteredCourses as course}
					{@const statusBadge = getStatusBadge(course.status)}
					<a href="/courses/{course.id}" class="card flex gap-6 hover:border-teal-200">
						<div class="w-40 aspect-video bg-gradient-to-br from-teal-50 to-stone-100 rounded-lg flex items-center justify-center flex-shrink-0 relative">
							<BookOpen class="w-8 h-8 text-teal-300" />
							{#if course.status === 'in_progress'}
								<div class="absolute bottom-0 left-0 right-0 h-1 bg-stone-200 rounded-b-lg overflow-hidden">
									<div class="h-full bg-teal-500" style="width: {course.progress}%"></div>
								</div>
							{/if}
						</div>

						<div class="flex-1 min-w-0">
							<div class="flex items-start justify-between gap-4">
								<div>
									<div class="flex items-center gap-2 mb-2">
										<span class="px-2 py-1 rounded-full text-xs font-medium {statusBadge.class}">
											{statusBadge.label}
										</span>
										{#if course.hasCertificate}
											<span class="flex items-center gap-1 px-2 py-1 bg-coral-50 rounded-full text-xs text-coral-600">
												<Award class="w-3 h-3" />
												Certificate
											</span>
										{/if}
									</div>
									<h3 class="font-semibold text-stone-900 text-lg">{course.title}</h3>
									<p class="text-sm text-stone-500 mt-1">{course.description}</p>
								</div>
								<div class="flex items-center gap-1 text-amber-500 flex-shrink-0">
									<Star class="w-4 h-4 fill-current" />
									<span class="text-sm text-stone-600">{course.rating}</span>
								</div>
							</div>

							<div class="flex items-center gap-6 mt-4 text-sm text-stone-400">
								<span class="flex items-center gap-1">
									<Clock class="w-4 h-4" />
									{course.duration}m
								</span>
								<span class="flex items-center gap-1">
									<BookOpen class="w-4 h-4" />
									{course.modules} modules
								</span>
								<span class="flex items-center gap-1">
									<Users class="w-4 h-4" />
									{course.enrollments}
								</span>
								<span>by {course.instructor}</span>
							</div>
						</div>

						<div class="flex items-center">
							<div class="p-2.5 bg-teal-700 rounded-lg text-white">
								{#if course.status === 'in_progress'}
									<Play class="w-5 h-5" />
								{:else}
									<ChevronRight class="w-5 h-5" />
								{/if}
							</div>
						</div>
					</a>
				{/each}
			</div>
		{/if}

		{#if filteredCourses.length === 0}
			<div class="text-center py-16">
				<BookOpen class="w-12 h-12 text-stone-300 mx-auto mb-4" />
				<h3 class="text-lg font-medium text-stone-900 mb-2">No courses found</h3>
				<p class="text-stone-500">Try adjusting your search or filter</p>
			</div>
		{/if}
	</main>
</div>

<style>
	.bg-stone-25 { background-color: #FDFCFB; }
	.bg-coral-50 { background-color: #FFF5F3; }
	.text-coral-500 { color: #F45D48; }
	.text-coral-600 { color: #DC3D28; }
</style>
