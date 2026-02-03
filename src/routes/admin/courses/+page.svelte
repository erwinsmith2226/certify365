<script lang="ts">
	import {
		Search,
		Plus,
		Filter,
		BookOpen,
		Users,
		Clock,
		MoreVertical,
		Edit,
		Trash2,
		Eye,
		Copy,
		Archive,
		Sparkles,
		CheckCircle,
		AlertCircle
	} from 'lucide-svelte';

	let searchQuery = $state('');
	let selectedStatus = $state('all');
	let openMenuId = $state<number | null>(null);

	const courses = [
		{
			id: 1,
			title: 'Workplace Safety Fundamentals',
			status: 'published',
			enrollments: 234,
			completions: 189,
			modules: 6,
			duration: 45,
			createdAt: '2024-01-10',
			updatedAt: '2024-02-01'
		},
		{
			id: 2,
			title: 'GDPR Compliance Training',
			status: 'published',
			enrollments: 189,
			completions: 142,
			modules: 8,
			duration: 90,
			createdAt: '2024-01-05',
			updatedAt: '2024-01-28'
		},
		{
			id: 3,
			title: 'Leadership Excellence Program',
			status: 'draft',
			enrollments: 0,
			completions: 0,
			modules: 10,
			duration: 120,
			createdAt: '2024-02-15',
			updatedAt: '2024-02-15'
		},
		{
			id: 4,
			title: 'Cybersecurity Awareness',
			status: 'published',
			enrollments: 456,
			completions: 398,
			modules: 5,
			duration: 60,
			createdAt: '2023-11-20',
			updatedAt: '2024-01-15'
		},
		{
			id: 5,
			title: 'Customer Service Excellence',
			status: 'archived',
			enrollments: 892,
			completions: 845,
			modules: 7,
			duration: 75,
			createdAt: '2023-06-10',
			updatedAt: '2024-01-01'
		}
	];

	let filteredCourses = $derived(
		courses.filter(course => {
			const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
			const matchesStatus = selectedStatus === 'all' || course.status === selectedStatus;
			return matchesSearch && matchesStatus;
		})
	);

	function getStatusBadge(status: string) {
		switch (status) {
			case 'published':
				return { color: 'bg-emerald-500/10 text-emerald-400', label: 'Published' };
			case 'draft':
				return { color: 'bg-amber-500/10 text-amber-400', label: 'Draft' };
			case 'archived':
				return { color: 'bg-slate-500/10 text-slate-400', label: 'Archived' };
			default:
				return { color: 'bg-slate-500/10 text-slate-400', label: status };
		}
	}

	function toggleMenu(id: number) {
		openMenuId = openMenuId === id ? null : id;
	}
</script>

<svelte:head>
	<title>Manage Courses - Certify365</title>
</svelte:head>

<div class="min-h-screen bg-[#0a0e1a]">
	<!-- Top Nav -->
	<nav class="border-b border-white/10 bg-[#141b2d]/50 backdrop-blur-sm sticky top-0 z-50">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between h-16">
				<div class="flex items-center gap-8">
					<a href="/" class="text-xl font-bold text-[#00d4ff]">Certify365</a>
					<div class="hidden md:flex items-center gap-6">
						<a href="/admin" class="text-slate-400 hover:text-white transition-colors">Dashboard</a>
						<a href="/admin/courses" class="text-white font-medium">Courses</a>
						<a href="/admin/users" class="text-slate-400 hover:text-white transition-colors">Users</a>
						<a href="/admin/certificates" class="text-slate-400 hover:text-white transition-colors">Certificates</a>
						<a href="/admin/reports" class="text-slate-400 hover:text-white transition-colors">Reports</a>
					</div>
				</div>
			</div>
		</div>
	</nav>

	<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		<!-- Header -->
		<div class="flex items-center justify-between mb-8">
			<div>
				<h1 class="text-2xl font-bold text-white">Courses</h1>
				<p class="text-slate-400 mt-1">Manage your course catalog</p>
			</div>

			<div class="flex items-center gap-3">
				<a
					href="/admin/courses/create"
					class="flex items-center gap-2 px-4 py-2 bg-[#00d4ff]/10 text-[#00d4ff] font-medium rounded-lg hover:bg-[#00d4ff]/20 transition-colors"
				>
					<Sparkles class="w-4 h-4" />
					AI Create
				</a>
				<a
					href="/admin/courses/new"
					class="flex items-center gap-2 px-4 py-2 bg-[#00d4ff] text-[#0a0e1a] font-medium rounded-lg hover:bg-[#00d4ff]/90 transition-colors"
				>
					<Plus class="w-4 h-4" />
					New Course
				</a>
			</div>
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

			<div class="flex gap-2">
				{#each [{ id: 'all', label: 'All' }, { id: 'published', label: 'Published' }, { id: 'draft', label: 'Draft' }, { id: 'archived', label: 'Archived' }] as filter}
					<button
						on:click={() => selectedStatus = filter.id}
						class="px-4 py-2 rounded-lg text-sm font-medium transition-colors {selectedStatus === filter.id ? 'bg-[#00d4ff] text-[#0a0e1a]' : 'bg-[#141b2d] text-slate-400 hover:text-white'}"
					>
						{filter.label}
					</button>
				{/each}
			</div>
		</div>

		<!-- Courses Table -->
		<div class="bg-[#141b2d]/80 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
			<table class="w-full">
				<thead>
					<tr class="border-b border-white/10">
						<th class="text-left p-4 text-sm font-medium text-slate-400">Course</th>
						<th class="text-left p-4 text-sm font-medium text-slate-400">Status</th>
						<th class="text-center p-4 text-sm font-medium text-slate-400">Enrollments</th>
						<th class="text-center p-4 text-sm font-medium text-slate-400">Completions</th>
						<th class="text-center p-4 text-sm font-medium text-slate-400">Duration</th>
						<th class="text-left p-4 text-sm font-medium text-slate-400">Updated</th>
						<th class="p-4"></th>
					</tr>
				</thead>
				<tbody>
					{#each filteredCourses as course}
						{@const statusBadge = getStatusBadge(course.status)}
						<tr class="border-b border-white/5 hover:bg-white/5 transition-colors">
							<td class="p-4">
								<div class="flex items-center gap-3">
									<div class="w-10 h-10 bg-[#00d4ff]/10 rounded-lg flex items-center justify-center flex-shrink-0">
										<BookOpen class="w-5 h-5 text-[#00d4ff]" />
									</div>
									<div>
										<h3 class="text-white font-medium">{course.title}</h3>
										<p class="text-xs text-slate-500">{course.modules} modules</p>
									</div>
								</div>
							</td>
							<td class="p-4">
								<span class="px-2.5 py-1 rounded-lg text-xs font-medium {statusBadge.color}">
									{statusBadge.label}
								</span>
							</td>
							<td class="p-4 text-center">
								<div class="flex items-center justify-center gap-1 text-white">
									<Users class="w-4 h-4 text-slate-400" />
									{course.enrollments}
								</div>
							</td>
							<td class="p-4 text-center">
								<div class="flex items-center justify-center gap-1 text-emerald-400">
									<CheckCircle class="w-4 h-4" />
									{course.completions}
								</div>
							</td>
							<td class="p-4 text-center">
								<div class="flex items-center justify-center gap-1 text-slate-400">
									<Clock class="w-4 h-4" />
									{course.duration}m
								</div>
							</td>
							<td class="p-4 text-sm text-slate-400">
								{new Date(course.updatedAt).toLocaleDateString()}
							</td>
							<td class="p-4">
								<div class="relative">
									<button
										on:click={() => toggleMenu(course.id)}
										class="p-2 hover:bg-white/5 rounded-lg transition-colors"
									>
										<MoreVertical class="w-4 h-4 text-slate-400" />
									</button>

									{#if openMenuId === course.id}
										<div class="absolute right-0 top-full mt-1 w-48 bg-[#1a2235] border border-white/10 rounded-lg shadow-xl z-10">
											<a href="/admin/courses/{course.id}/edit" class="flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-white/5 transition-colors">
												<Edit class="w-4 h-4" />
												Edit
											</a>
											<a href="/courses/{course.id}" class="flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-white/5 transition-colors">
												<Eye class="w-4 h-4" />
												Preview
											</a>
											<button class="w-full flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-white/5 transition-colors">
												<Copy class="w-4 h-4" />
												Duplicate
											</button>
											<button class="w-full flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-white/5 transition-colors">
												<Archive class="w-4 h-4" />
												Archive
											</button>
											<hr class="border-white/10 my-1" />
											<button class="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors">
												<Trash2 class="w-4 h-4" />
												Delete
											</button>
										</div>
									{/if}
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>

			{#if filteredCourses.length === 0}
				<div class="text-center py-12">
					<BookOpen class="w-12 h-12 text-slate-600 mx-auto mb-4" />
					<h3 class="text-lg font-medium text-white mb-2">No courses found</h3>
					<p class="text-slate-400 mb-4">Get started by creating your first course</p>
					<a
						href="/admin/courses/new"
						class="inline-flex items-center gap-2 px-4 py-2 bg-[#00d4ff] text-[#0a0e1a] font-medium rounded-lg"
					>
						<Plus class="w-4 h-4" />
						Create Course
					</a>
				</div>
			{/if}
		</div>
	</main>
</div>
