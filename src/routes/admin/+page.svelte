<script lang="ts">
	import {
		Users,
		BookOpen,
		Award,
		TrendingUp,
		Plus,
		FileText,
		BarChart3,
		ArrowUpRight,
		ArrowDownRight,
		Clock,
		CheckCircle,
		AlertCircle,
		Sparkles
	} from 'lucide-svelte';
	import AppNav from '$lib/components/AppNav.svelte';

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

	function getActivityIcon(type: string) {
		switch (type) {
			case 'completion': return { icon: CheckCircle, class: 'bg-green-50 text-green-600' };
			case 'certificate': return { icon: Award, class: 'bg-amber-50 text-amber-600' };
			default: return { icon: BookOpen, class: 'bg-teal-50 text-teal-600' };
		}
	}
</script>

<svelte:head>
	<title>Admin Dashboard - Certify365</title>
	<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet" />
</svelte:head>

<div class="min-h-screen bg-stone-25">
	<AppNav currentPath="/admin" isAdmin={true} />

	<main class="max-w-6xl mx-auto px-4 sm:px-6 py-8">
		<!-- Header -->
		<div class="flex items-center justify-between mb-8">
			<div>
				<h1 class="text-2xl font-semibold text-stone-900" style="font-family: var(--font-display)">Admin Dashboard</h1>
				<p class="text-stone-500 mt-1">Overview of your learning platform</p>
			</div>

			<div class="flex items-center gap-3">
				<a href="/admin/courses/create" class="btn btn-secondary">
					<Sparkles class="w-4 h-4" />
					AI Course Builder
				</a>
				<a href="/admin/certificates/designer" class="btn btn-primary">
					<Plus class="w-4 h-4" />
					New Certificate
				</a>
			</div>
		</div>

		<!-- Stats Grid -->
		<div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
			{#each stats as stat}
				<div class="card">
					<div class="flex items-center justify-between mb-3">
						<div class="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center text-teal-700">
							<stat.icon class="w-5 h-5" />
						</div>
						<div class="flex items-center gap-1 text-sm {stat.up ? 'text-green-600' : 'text-red-500'}">
							{#if stat.up}
								<ArrowUpRight class="w-4 h-4" />
							{:else}
								<ArrowDownRight class="w-4 h-4" />
							{/if}
							{stat.change}
						</div>
					</div>
					<p class="text-2xl font-semibold text-stone-900" style="font-family: var(--font-display)">{stat.value}</p>
					<p class="text-stone-500 text-sm">{stat.label}</p>
				</div>
			{/each}
		</div>

		<div class="grid lg:grid-cols-3 gap-8">
			<div class="lg:col-span-2 space-y-6">
				<!-- Recent Activity -->
				<div class="card">
					<div class="flex items-center justify-between mb-4">
						<h2 class="text-lg font-semibold text-stone-900" style="font-family: var(--font-display)">Recent Activity</h2>
						<a href="/admin/activity" class="text-teal-700 text-sm hover:underline">View all</a>
					</div>

					<div class="space-y-4">
						{#each recentActivity as activity}
							{@const iconData = getActivityIcon(activity.type)}
							<div class="flex items-start gap-3">
								<div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 {iconData.class}">
									<iconData.icon class="w-4 h-4" />
								</div>
								<div class="flex-1 min-w-0">
									<p class="text-sm text-stone-700">
										<span class="font-medium">{activity.user}</span>
										<span class="text-stone-500"> {activity.action} </span>
										<span class="font-medium">{activity.target}</span>
									</p>
									<p class="text-xs text-stone-400 flex items-center gap-1 mt-1">
										<Clock class="w-3 h-3" />
										{activity.time}
									</p>
								</div>
							</div>
						{/each}
					</div>
				</div>

				<!-- Top Courses -->
				<div class="card">
					<div class="flex items-center justify-between mb-4">
						<h2 class="text-lg font-semibold text-stone-900" style="font-family: var(--font-display)">Top Courses</h2>
						<a href="/admin/courses" class="text-teal-700 text-sm hover:underline">View all</a>
					</div>

					<div class="space-y-4">
						{#each topCourses as course, i}
							<div class="flex items-center gap-4">
								<div class="w-6 h-6 bg-stone-100 rounded flex items-center justify-center text-stone-500 text-sm font-medium">
									{i + 1}
								</div>
								<div class="flex-1 min-w-0">
									<p class="text-sm text-stone-900 font-medium truncate">{course.name}</p>
									<p class="text-xs text-stone-400">{course.enrollments} enrollments</p>
								</div>
								<div class="text-right">
									<p class="text-sm font-medium text-green-600">{course.completionRate}%</p>
									<p class="text-xs text-stone-400">completion</p>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>

			<!-- Sidebar -->
			<div class="space-y-6">
				<!-- Quick Actions -->
				<div class="card">
					<h2 class="text-lg font-semibold text-stone-900 mb-4" style="font-family: var(--font-display)">Quick Actions</h2>
					<div class="space-y-2">
						<a href="/admin/courses/create" class="flex items-center gap-3 p-3 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors">
							<Plus class="w-5 h-5 text-teal-600" />
							<span class="text-stone-700 text-sm">Create Course</span>
						</a>
						<a href="/admin/users/invite" class="flex items-center gap-3 p-3 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors">
							<Users class="w-5 h-5 text-green-600" />
							<span class="text-stone-700 text-sm">Invite Users</span>
						</a>
						<a href="/admin/certificates/designer" class="flex items-center gap-3 p-3 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors">
							<Award class="w-5 h-5 text-amber-600" />
							<span class="text-stone-700 text-sm">Design Certificate</span>
						</a>
						<a href="/admin/reports" class="flex items-center gap-3 p-3 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors">
							<BarChart3 class="w-5 h-5 text-violet-600" />
							<span class="text-stone-700 text-sm">View Reports</span>
						</a>
					</div>
				</div>

				<!-- Pending Tasks -->
				<div class="card">
					<h2 class="text-lg font-semibold text-stone-900 mb-4" style="font-family: var(--font-display)">Pending Tasks</h2>
					<div class="space-y-3">
						{#each pendingTasks as task}
							<div class="flex items-start gap-3 p-3 bg-stone-50 rounded-lg">
								<div class="mt-0.5">
									{#if task.priority === 'high'}
										<AlertCircle class="w-4 h-4 text-red-500" />
									{:else if task.priority === 'medium'}
										<Clock class="w-4 h-4 text-amber-500" />
									{:else}
										<FileText class="w-4 h-4 text-stone-400" />
									{/if}
								</div>
								<p class="text-sm text-stone-700 flex-1">{task.task}</p>
							</div>
						{/each}
					</div>
				</div>

				<!-- Storage Usage -->
				<div class="card">
					<h2 class="text-lg font-semibold text-stone-900 mb-4" style="font-family: var(--font-display)">Storage Usage</h2>
					<div class="space-y-3">
						<div>
							<div class="flex items-center justify-between text-sm mb-1">
								<span class="text-stone-500">Videos</span>
								<span class="text-stone-700 font-medium">12.4 GB</span>
							</div>
							<div class="h-2 bg-stone-100 rounded-full overflow-hidden">
								<div class="h-full bg-teal-500 rounded-full" style="width: 62%"></div>
							</div>
						</div>
						<div>
							<div class="flex items-center justify-between text-sm mb-1">
								<span class="text-stone-500">Documents</span>
								<span class="text-stone-700 font-medium">3.2 GB</span>
							</div>
							<div class="h-2 bg-stone-100 rounded-full overflow-hidden">
								<div class="h-full bg-green-500 rounded-full" style="width: 16%"></div>
							</div>
						</div>
						<div>
							<div class="flex items-center justify-between text-sm mb-1">
								<span class="text-stone-500">Certificates</span>
								<span class="text-stone-700 font-medium">890 MB</span>
							</div>
							<div class="h-2 bg-stone-100 rounded-full overflow-hidden">
								<div class="h-full bg-amber-500 rounded-full" style="width: 4%"></div>
							</div>
						</div>
						<p class="text-xs text-stone-400 text-center mt-2">16.5 GB of 50 GB used</p>
					</div>
				</div>
			</div>
		</div>
	</main>
</div>

<style>
	.bg-stone-25 { background-color: #FDFCFB; }
</style>
