<script lang="ts">
	import {
		Search,
		Filter,
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

	// Mock courses data
	const courses = [
		{
			id: 1,
			title: 'Workplace Safety Fundamentals',
			description: 'Learn essential workplace safety practices and protocols to maintain a safe working environment.',
			category: 'safety',
			duration: 45,
			enrollments: 1234,
			rating: 4.8,
			modules: 6,
			thumbnail: null,
			instructor: 'Sarah Johnson',
			status: 'in_progress',
			progress: 65,
			hasCertificate: true
		},
		{
			id: 2,
			title: 'GDPR Compliance Training',
			description: 'Comprehensive training on GDPR regulations, data protection, and privacy compliance.',
			category: 'compliance',
			duration: 90,
			enrollments: 892,
			rating: 4.6,
			modules: 8,
			thumbnail: null,
			instructor: 'Michael Chen',
			status: 'not_started',
			progress: 0,
			hasCertificate: true
		},
		{
			id: 3,
			title: 'Leadership Excellence Program',
			description: 'Develop essential leadership skills to inspire and guide your team to success.',
			category: 'leadership',
			duration: 120,
			enrollments: 567,
			rating: 4.9,
			modules: 10,
			thumbnail: null,
			instructor: 'Emily Davis',
			status: 'completed',
			progress: 100,
			hasCertificate: true
		},
		{
			id: 4,
			title: 'Cybersecurity Awareness',
			description: 'Protect yourself and your organization from cyber threats with this essential training.',
			category: 'technology',
			duration: 60,
			enrollments: 2341,
			rating: 4.7,
			modules: 5,
			thumbnail: null,
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
			thumbnail: null,
			instructor: 'Jordan Lee',
			status: 'in_progress',
			progress: 30,
			hasCertificate: false
		},
		{
			id: 6,
			title: 'Data Privacy Fundamentals',
			description: 'Understanding data privacy laws and best practices for handling sensitive information.',
			category: 'compliance',
			duration: 55,
			enrollments: 1102,
			rating: 4.4,
			modules: 6,
			thumbnail: null,
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
	<title>Course Catalog - Certify365</title>
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
						<a href="/courses" class="text-white font-medium">Courses</a>
						<a href="/certificates" class="text-slate-400 hover:text-white transition-colors">Certificates</a>
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
			<h1 class="text-2xl font-bold text-white">Course Catalog</h1>
			<p class="text-slate-400 mt-1">Browse and enroll in courses to advance your skills</p>
		</div>

		<!-- Search and Filters -->
		<div class="flex flex-col sm:flex-row gap-4 mb-6">
			<div class="relative flex-1">
				<Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="Search courses..."
					class="w-full bg-[#141b2d] border border-white/10 rounded-lg pl-11 pr-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00d4ff]/50"
				/>
			</div>

			<div class="flex items-center gap-2">
				<button
					on:click={() => viewMode = 'grid'}
					class="p-3 rounded-lg transition-colors {viewMode === 'grid' ? 'bg-[#00d4ff]/20 text-[#00d4ff]' : 'bg-[#141b2d] text-slate-400 hover:text-white'}"
				>
					<Grid class="w-5 h-5" />
				</button>
				<button
					on:click={() => viewMode = 'list'}
					class="p-3 rounded-lg transition-colors {viewMode === 'list' ? 'bg-[#00d4ff]/20 text-[#00d4ff]' : 'bg-[#141b2d] text-slate-400 hover:text-white'}"
				>
					<List class="w-5 h-5" />
				</button>
			</div>
		</div>

		<!-- Categories -->
		<div class="flex flex-wrap gap-2 mb-8">
			{#each categories as category}
				<button
					on:click={() => selectedCategory = category.id}
					class="px-4 py-2 rounded-lg text-sm font-medium transition-colors {selectedCategory === category.id ? 'bg-[#00d4ff] text-[#0a0e1a]' : 'bg-[#141b2d] text-slate-400 hover:text-white hover:bg-white/5'}"
				>
					{category.name}
				</button>
			{/each}
		</div>

		<!-- Course Grid/List -->
		{#if viewMode === 'grid'}
			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each filteredCourses as course}
					<a
						href="/courses/{course.id}"
						class="bg-[#141b2d]/80 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden hover:border-[#00d4ff]/30 transition-all hover:-translate-y-1"
					>
						<!-- Thumbnail -->
						<div class="aspect-video bg-gradient-to-br from-[#00d4ff]/20 to-[#10b981]/20 flex items-center justify-center relative">
							<BookOpen class="w-12 h-12 text-[#00d4ff]/50" />
							{#if course.hasCertificate}
								<div class="absolute top-3 right-3 p-1.5 bg-amber-500/20 rounded-lg">
									<Award class="w-4 h-4 text-amber-400" />
								</div>
							{/if}
							{#if course.status === 'in_progress'}
								<div class="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
									<div class="h-full bg-[#00d4ff]" style="width: {course.progress}%"></div>
								</div>
							{/if}
						</div>

						<div class="p-5">
							<!-- Status Badge -->
							<div class="flex items-center justify-between mb-3">
								<span class="px-2 py-1 rounded text-xs font-medium {getStatusColor(course.status)}">
									{getStatusLabel(course.status)}
								</span>
								<div class="flex items-center gap-1 text-amber-400">
									<Star class="w-4 h-4 fill-current" />
									<span class="text-sm">{course.rating}</span>
								</div>
							</div>

							<h3 class="font-semibold text-white mb-2 line-clamp-2">{course.title}</h3>
							<p class="text-sm text-slate-400 mb-4 line-clamp-2">{course.description}</p>

							<div class="flex items-center justify-between text-xs text-slate-500">
								<div class="flex items-center gap-3">
									<span class="flex items-center gap-1">
										<Clock class="w-3.5 h-3.5" />
										{course.duration} min
									</span>
									<span class="flex items-center gap-1">
										<BookOpen class="w-3.5 h-3.5" />
										{course.modules} modules
									</span>
								</div>
								<span class="flex items-center gap-1">
									<Users class="w-3.5 h-3.5" />
									{course.enrollments}
								</span>
							</div>
						</div>
					</a>
				{/each}
			</div>
		{:else}
			<div class="space-y-4">
				{#each filteredCourses as course}
					<a
						href="/courses/{course.id}"
						class="flex gap-6 bg-[#141b2d]/80 backdrop-blur-sm rounded-xl border border-white/10 p-5 hover:border-[#00d4ff]/30 transition-colors"
					>
						<!-- Thumbnail -->
						<div class="w-48 aspect-video bg-gradient-to-br from-[#00d4ff]/20 to-[#10b981]/20 rounded-lg flex items-center justify-center flex-shrink-0 relative">
							<BookOpen class="w-10 h-10 text-[#00d4ff]/50" />
							{#if course.status === 'in_progress'}
								<div class="absolute bottom-0 left-0 right-0 h-1 bg-white/10 rounded-b-lg overflow-hidden">
									<div class="h-full bg-[#00d4ff]" style="width: {course.progress}%"></div>
								</div>
							{/if}
						</div>

						<div class="flex-1 min-w-0">
							<div class="flex items-start justify-between gap-4">
								<div>
									<div class="flex items-center gap-2 mb-2">
										<span class="px-2 py-1 rounded text-xs font-medium {getStatusColor(course.status)}">
											{getStatusLabel(course.status)}
										</span>
										{#if course.hasCertificate}
											<span class="flex items-center gap-1 px-2 py-1 bg-amber-500/10 rounded text-xs text-amber-400">
												<Award class="w-3 h-3" />
												Certificate
											</span>
										{/if}
									</div>
									<h3 class="font-semibold text-white text-lg mb-1">{course.title}</h3>
									<p class="text-sm text-slate-400 mb-3">{course.description}</p>
								</div>

								<div class="flex items-center gap-1 text-amber-400 flex-shrink-0">
									<Star class="w-4 h-4 fill-current" />
									<span class="text-sm">{course.rating}</span>
								</div>
							</div>

							<div class="flex items-center gap-6 text-sm text-slate-500">
								<span class="flex items-center gap-1">
									<Clock class="w-4 h-4" />
									{course.duration} min
								</span>
								<span class="flex items-center gap-1">
									<BookOpen class="w-4 h-4" />
									{course.modules} modules
								</span>
								<span class="flex items-center gap-1">
									<Users class="w-4 h-4" />
									{course.enrollments} enrolled
								</span>
								<span>by {course.instructor}</span>
							</div>
						</div>

						<div class="flex items-center">
							<div class="p-2 bg-[#00d4ff] rounded-lg">
								{#if course.status === 'in_progress'}
									<Play class="w-5 h-5 text-[#0a0e1a]" />
								{:else}
									<ChevronRight class="w-5 h-5 text-[#0a0e1a]" />
								{/if}
							</div>
						</div>
					</a>
				{/each}
			</div>
		{/if}

		{#if filteredCourses.length === 0}
			<div class="text-center py-12">
				<BookOpen class="w-12 h-12 text-slate-600 mx-auto mb-4" />
				<h3 class="text-lg font-medium text-white mb-2">No courses found</h3>
				<p class="text-slate-400">Try adjusting your search or filter criteria</p>
			</div>
		{/if}
	</main>
</div>
