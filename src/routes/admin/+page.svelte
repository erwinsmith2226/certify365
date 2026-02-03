<script lang="ts">
	import {
		Users,
		BookOpen,
		Award,
		TrendingUp,
		Plus,
		FileText,
		Settings,
		BarChart3,
		ArrowUpRight,
		ArrowDownRight,
		Clock,
		CheckCircle,
		AlertCircle,
		Sparkles
	} from 'lucide-svelte';

	// Mock data
	const stats = [
		{ label: 'Total Users', value: '1,234', change: '+12%', up: true, icon: Users },
		{ label: 'Active Courses', value: '48', change: '+3', up: true, icon: BookOpen },
		{ label: 'Certificates Issued', value: '892', change: '+8%', up: true, icon: Award },
		{ label: 'Completion Rate', value: '87%', change: '-2%', up: false, icon: TrendingUp }
	];

	const recentActivity = [
		{ type: 'enrollment', user: 'Sarah Chen', action: 'enrolled in', target: 'GDPR Compliance Training', time: '5 min ago' },
		{ type: 'completion', user: 'Mike Johnson', action: 'completed', target: 'Workplace Safety', time: '12 min ago' },
		{ type: 'certificate', user: 'Emily Davis', action: 'earned certificate for', target: 'Leadership Basics', time: '1 hour ago' },
		{ type: 'enrollment', user: 'Alex Kim', action: 'enrolled in', target: 'Data Privacy Fundamentals', time: '2 hours ago' },
		{ type: 'completion', user: 'Jordan Lee', action: 'completed', target: 'Customer Service Excellence', time: '3 hours ago' }
	];

	const topCourses = [
		{ name: 'Workplace Safety Fundamentals', enrollments: 234, completionRate: 92 },
		{ name: 'GDPR Compliance Training', enrollments: 189, completionRate: 78 },
		{ name: 'Leadership Excellence Program', enrollments: 156, completionRate: 85 },
		{ name: 'Customer Service Basics', enrollments: 142, completionRate: 91 },
		{ name: 'Cybersecurity Awareness', enrollments: 128, completionRate: 73 }
	];

	const pendingTasks = [
		{ task: 'Review course: Advanced Excel Training', priority: 'high' },
		{ task: '12 certificates pending approval', priority: 'medium' },
		{ task: 'Update compliance training for Q1', priority: 'low' }
	];
</script>

<svelte:head>
	<title>Admin Dashboard - Certify365</title>
</svelte:head>

<div class="min-h-screen bg-[#0a0e1a]">
	<!-- Top Nav -->
	<nav class="border-b border-white/10 bg-[#141b2d]/50 backdrop-blur-sm sticky top-0 z-50">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between h-16">
				<div class="flex items-center gap-8">
					<a href="/" class="text-xl font-bold text-[#00d4ff]">Certify365</a>
					<div class="hidden md:flex items-center gap-6">
						<a href="/admin" class="text-white font-medium">Dashboard</a>
						<a href="/admin/courses" class="text-slate-400 hover:text-white transition-colors">Courses</a>
						<a href="/admin/users" class="text-slate-400 hover:text-white transition-colors">Users</a>
						<a href="/admin/certificates" class="text-slate-400 hover:text-white transition-colors">Certificates</a>
						<a href="/admin/reports" class="text-slate-400 hover:text-white transition-colors">Reports</a>
					</div>
				</div>

				<div class="flex items-center gap-4">
					<a
						href="/dashboard"
						class="px-3 py-1.5 text-sm text-slate-400 hover:text-white transition-colors"
					>
						Switch to Learner
					</a>
					<button class="p-2 hover:bg-white/5 rounded-lg transition-colors">
						<Settings class="w-5 h-5 text-slate-400" />
					</button>
				</div>
			</div>
		</div>
	</nav>

	<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		<!-- Header -->
		<div class="flex items-center justify-between mb-8">
			<div>
				<h1 class="text-2xl font-bold text-white">Admin Dashboard</h1>
				<p class="text-slate-400 mt-1">Overview of your learning platform</p>
			</div>

			<div class="flex items-center gap-3">
				<a
					href="/admin/courses/create"
					class="flex items-center gap-2 px-4 py-2 bg-[#00d4ff]/10 text-[#00d4ff] font-medium rounded-lg hover:bg-[#00d4ff]/20 transition-colors"
				>
					<Sparkles class="w-4 h-4" />
					AI Course Builder
				</a>
				<a
					href="/admin/certificates/designer"
					class="flex items-center gap-2 px-4 py-2 bg-[#00d4ff] text-[#0a0e1a] font-medium rounded-lg hover:bg-[#00d4ff]/90 transition-colors"
				>
					<Plus class="w-4 h-4" />
					New Certificate
				</a>
			</div>
		</div>

		<!-- Stats Grid -->
		<div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
			{#each stats as stat}
				<div class="bg-[#141b2d]/80 backdrop-blur-sm rounded-xl border border-white/10 p-5">
					<div class="flex items-center justify-between mb-3">
						<div class="w-10 h-10 bg-[#00d4ff]/10 rounded-lg flex items-center justify-center">
							<stat.icon class="w-5 h-5 text-[#00d4ff]" />
						</div>
						<div class="flex items-center gap-1 text-sm {stat.up ? 'text-emerald-400' : 'text-red-400'}">
							{#if stat.up}
								<ArrowUpRight class="w-4 h-4" />
							{:else}
								<ArrowDownRight class="w-4 h-4" />
							{/if}
							{stat.change}
						</div>
					</div>
					<p class="text-2xl font-bold text-white">{stat.value}</p>
					<p class="text-slate-400 text-sm">{stat.label}</p>
				</div>
			{/each}
		</div>

		<div class="grid lg:grid-cols-3 gap-8">
			<!-- Recent Activity -->
			<div class="lg:col-span-2 space-y-6">
				<div class="bg-[#141b2d]/80 backdrop-blur-sm rounded-xl border border-white/10 p-6">
					<div class="flex items-center justify-between mb-4">
						<h2 class="text-lg font-semibold text-white">Recent Activity</h2>
						<a href="/admin/activity" class="text-[#00d4ff] text-sm hover:underline">View all</a>
					</div>

					<div class="space-y-4">
						{#each recentActivity as activity}
							<div class="flex items-start gap-3">
								<div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 {activity.type === 'completion' ? 'bg-emerald-500/10' : activity.type === 'certificate' ? 'bg-amber-500/10' : 'bg-[#00d4ff]/10'}">
									{#if activity.type === 'completion'}
										<CheckCircle class="w-4 h-4 text-emerald-400" />
									{:else if activity.type === 'certificate'}
										<Award class="w-4 h-4 text-amber-400" />
									{:else}
										<BookOpen class="w-4 h-4 text-[#00d4ff]" />
									{/if}
								</div>
								<div class="flex-1 min-w-0">
									<p class="text-sm text-white">
										<span class="font-medium">{activity.user}</span>
										<span class="text-slate-400"> {activity.action} </span>
										<span class="font-medium">{activity.target}</span>
									</p>
									<p class="text-xs text-slate-500 flex items-center gap-1 mt-1">
										<Clock class="w-3 h-3" />
										{activity.time}
									</p>
								</div>
							</div>
						{/each}
					</div>
				</div>

				<!-- Top Courses -->
				<div class="bg-[#141b2d]/80 backdrop-blur-sm rounded-xl border border-white/10 p-6">
					<div class="flex items-center justify-between mb-4">
						<h2 class="text-lg font-semibold text-white">Top Courses</h2>
						<a href="/admin/courses" class="text-[#00d4ff] text-sm hover:underline">View all</a>
					</div>

					<div class="space-y-4">
						{#each topCourses as course, i}
							<div class="flex items-center gap-4">
								<div class="w-6 h-6 bg-[#0a0e1a] rounded flex items-center justify-center text-slate-400 text-sm font-medium">
									{i + 1}
								</div>
								<div class="flex-1 min-w-0">
									<p class="text-sm text-white font-medium truncate">{course.name}</p>
									<p class="text-xs text-slate-400">{course.enrollments} enrollments</p>
								</div>
								<div class="text-right">
									<p class="text-sm font-medium text-emerald-400">{course.completionRate}%</p>
									<p class="text-xs text-slate-500">completion</p>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>

			<!-- Sidebar -->
			<div class="space-y-6">
				<!-- Quick Actions -->
				<div class="bg-[#141b2d]/80 backdrop-blur-sm rounded-xl border border-white/10 p-6">
					<h2 class="text-lg font-semibold text-white mb-4">Quick Actions</h2>
					<div class="space-y-2">
						<a
							href="/admin/courses/create"
							class="flex items-center gap-3 p-3 bg-[#0a0e1a] rounded-lg hover:bg-white/5 transition-colors"
						>
							<Plus class="w-5 h-5 text-[#00d4ff]" />
							<span class="text-white text-sm">Create Course</span>
						</a>
						<a
							href="/admin/users/invite"
							class="flex items-center gap-3 p-3 bg-[#0a0e1a] rounded-lg hover:bg-white/5 transition-colors"
						>
							<Users class="w-5 h-5 text-emerald-400" />
							<span class="text-white text-sm">Invite Users</span>
						</a>
						<a
							href="/admin/certificates/designer"
							class="flex items-center gap-3 p-3 bg-[#0a0e1a] rounded-lg hover:bg-white/5 transition-colors"
						>
							<Award class="w-5 h-5 text-amber-400" />
							<span class="text-white text-sm">Design Certificate</span>
						</a>
						<a
							href="/admin/reports"
							class="flex items-center gap-3 p-3 bg-[#0a0e1a] rounded-lg hover:bg-white/5 transition-colors"
						>
							<BarChart3 class="w-5 h-5 text-violet-400" />
							<span class="text-white text-sm">View Reports</span>
						</a>
					</div>
				</div>

				<!-- Pending Tasks -->
				<div class="bg-[#141b2d]/80 backdrop-blur-sm rounded-xl border border-white/10 p-6">
					<h2 class="text-lg font-semibold text-white mb-4">Pending Tasks</h2>
					<div class="space-y-3">
						{#each pendingTasks as task}
							<div class="flex items-start gap-3 p-3 bg-[#0a0e1a] rounded-lg">
								<div class="mt-0.5">
									{#if task.priority === 'high'}
										<AlertCircle class="w-4 h-4 text-red-400" />
									{:else if task.priority === 'medium'}
										<Clock class="w-4 h-4 text-amber-400" />
									{:else}
										<FileText class="w-4 h-4 text-slate-400" />
									{/if}
								</div>
								<p class="text-sm text-white flex-1">{task.task}</p>
							</div>
						{/each}
					</div>
				</div>

				<!-- Storage Usage -->
				<div class="bg-[#141b2d]/80 backdrop-blur-sm rounded-xl border border-white/10 p-6">
					<h2 class="text-lg font-semibold text-white mb-4">Storage Usage</h2>
					<div class="space-y-3">
						<div>
							<div class="flex items-center justify-between text-sm mb-1">
								<span class="text-slate-400">Videos</span>
								<span class="text-white">12.4 GB</span>
							</div>
							<div class="h-2 bg-[#0a0e1a] rounded-full overflow-hidden">
								<div class="h-full bg-[#00d4ff] rounded-full" style="width: 62%"></div>
							</div>
						</div>
						<div>
							<div class="flex items-center justify-between text-sm mb-1">
								<span class="text-slate-400">Documents</span>
								<span class="text-white">3.2 GB</span>
							</div>
							<div class="h-2 bg-[#0a0e1a] rounded-full overflow-hidden">
								<div class="h-full bg-emerald-500 rounded-full" style="width: 16%"></div>
							</div>
						</div>
						<div>
							<div class="flex items-center justify-between text-sm mb-1">
								<span class="text-slate-400">Certificates</span>
								<span class="text-white">890 MB</span>
							</div>
							<div class="h-2 bg-[#0a0e1a] rounded-full overflow-hidden">
								<div class="h-full bg-amber-500 rounded-full" style="width: 4%"></div>
							</div>
						</div>
						<p class="text-xs text-slate-500 text-center mt-2">16.5 GB of 50 GB used</p>
					</div>
				</div>
			</div>
		</div>
	</main>
</div>
