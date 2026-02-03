<script lang="ts">
	import { page } from '$app/stores';
	import {
		BookOpen,
		Clock,
		Users,
		Star,
		Play,
		Pause,
		CheckCircle,
		Lock,
		ChevronDown,
		ChevronRight,
		Award,
		FileText,
		Video,
		HelpCircle,
		ArrowLeft,
		Share2,
		Bookmark
	} from 'lucide-svelte';

	let currentLessonId = $state('lesson-1');
	let isPlaying = $state(false);
	let expandedModules = $state<Set<string>>(new Set(['module-1']));

	// Mock course data
	const course = {
		id: $page.params.id,
		title: 'Workplace Safety Fundamentals',
		description: 'Learn essential workplace safety practices and protocols to maintain a safe working environment. This comprehensive course covers hazard identification, emergency procedures, and safety best practices.',
		instructor: {
			name: 'Sarah Johnson',
			title: 'Safety Director',
			avatar: null
		},
		duration: 45,
		enrollments: 1234,
		rating: 4.8,
		reviews: 156,
		lastUpdated: '2024-01-15',
		hasCertificate: true,
		progress: 65,
		modules: [
			{
				id: 'module-1',
				title: 'Introduction to Workplace Safety',
				duration: 15,
				lessons: [
					{ id: 'lesson-1', title: 'Welcome & Course Overview', type: 'video', duration: 5, completed: true },
					{ id: 'lesson-2', title: 'Why Safety Matters', type: 'video', duration: 8, completed: true },
					{ id: 'lesson-3', title: 'Quiz: Safety Basics', type: 'quiz', duration: 2, completed: false }
				]
			},
			{
				id: 'module-2',
				title: 'Hazard Identification',
				duration: 12,
				lessons: [
					{ id: 'lesson-4', title: 'Types of Workplace Hazards', type: 'video', duration: 6, completed: false },
					{ id: 'lesson-5', title: 'Risk Assessment Methods', type: 'document', duration: 4, completed: false },
					{ id: 'lesson-6', title: 'Hazard Reporting Procedures', type: 'video', duration: 2, completed: false }
				]
			},
			{
				id: 'module-3',
				title: 'Emergency Procedures',
				duration: 10,
				lessons: [
					{ id: 'lesson-7', title: 'Fire Safety & Evacuation', type: 'video', duration: 5, completed: false },
					{ id: 'lesson-8', title: 'First Aid Basics', type: 'video', duration: 3, completed: false },
					{ id: 'lesson-9', title: 'Emergency Contact Protocols', type: 'document', duration: 2, completed: false }
				]
			},
			{
				id: 'module-4',
				title: 'Final Assessment',
				duration: 8,
				lessons: [
					{ id: 'lesson-10', title: 'Course Summary', type: 'video', duration: 3, completed: false },
					{ id: 'lesson-11', title: 'Final Exam', type: 'quiz', duration: 5, completed: false }
				]
			}
		]
	};

	function toggleModule(moduleId: string) {
		if (expandedModules.has(moduleId)) {
			expandedModules.delete(moduleId);
		} else {
			expandedModules.add(moduleId);
		}
		expandedModules = new Set(expandedModules);
	}

	function getLessonIcon(type: string) {
		switch (type) {
			case 'video': return Video;
			case 'quiz': return HelpCircle;
			case 'document': return FileText;
			default: return BookOpen;
		}
	}

	function getCurrentLesson() {
		for (const module of course.modules) {
			const lesson = module.lessons.find(l => l.id === currentLessonId);
			if (lesson) return { module, lesson };
		}
		return null;
	}

	let currentContent = $derived(getCurrentLesson());
</script>

<svelte:head>
	<title>{course.title} - Certify365</title>
</svelte:head>

<div class="h-screen bg-[#0a0e1a] flex flex-col overflow-hidden">
	<!-- Top Bar -->
	<nav class="h-14 bg-[#141b2d] border-b border-white/10 flex items-center justify-between px-4 flex-shrink-0">
		<div class="flex items-center gap-4">
			<a href="/courses" class="p-2 hover:bg-white/5 rounded-lg transition-colors">
				<ArrowLeft class="w-5 h-5 text-slate-400" />
			</a>
			<div>
				<h1 class="text-white font-medium truncate max-w-md">{course.title}</h1>
				<div class="flex items-center gap-2 text-xs text-slate-400">
					<span>{course.progress}% complete</span>
					<span>•</span>
					<span>{course.duration} min total</span>
				</div>
			</div>
		</div>

		<div class="flex items-center gap-2">
			<button class="p-2 hover:bg-white/5 rounded-lg transition-colors">
				<Bookmark class="w-5 h-5 text-slate-400" />
			</button>
			<button class="p-2 hover:bg-white/5 rounded-lg transition-colors">
				<Share2 class="w-5 h-5 text-slate-400" />
			</button>
			{#if course.hasCertificate}
				<div class="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 rounded-lg">
					<Award class="w-4 h-4 text-amber-400" />
					<span class="text-xs text-amber-400 font-medium">Certificate Available</span>
				</div>
			{/if}
		</div>
	</nav>

	<div class="flex-1 flex overflow-hidden">
		<!-- Main Content Area -->
		<div class="flex-1 flex flex-col overflow-hidden">
			<!-- Video/Content Player -->
			<div class="flex-1 bg-black flex items-center justify-center relative">
				{#if currentContent?.lesson.type === 'video'}
					<div class="absolute inset-0 bg-gradient-to-br from-[#00d4ff]/5 to-[#10b981]/5 flex items-center justify-center">
						<button
							on:click={() => isPlaying = !isPlaying}
							class="w-20 h-20 bg-[#00d4ff] rounded-full flex items-center justify-center hover:scale-110 transition-transform"
						>
							{#if isPlaying}
								<Pause class="w-8 h-8 text-[#0a0e1a]" />
							{:else}
								<Play class="w-8 h-8 text-[#0a0e1a] ml-1" />
							{/if}
						</button>
					</div>

					<!-- Video Controls -->
					<div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
						<div class="flex items-center gap-4">
							<button on:click={() => isPlaying = !isPlaying} class="text-white">
								{#if isPlaying}
									<Pause class="w-6 h-6" />
								{:else}
									<Play class="w-6 h-6" />
								{/if}
							</button>

							<div class="flex-1">
								<div class="h-1 bg-white/20 rounded-full overflow-hidden">
									<div class="h-full bg-[#00d4ff] rounded-full" style="width: 35%"></div>
								</div>
							</div>

							<span class="text-white text-sm">1:45 / {currentContent.lesson.duration}:00</span>
						</div>
					</div>
				{:else if currentContent?.lesson.type === 'quiz'}
					<div class="max-w-2xl w-full p-8">
						<div class="bg-[#141b2d] rounded-2xl border border-white/10 p-8">
							<div class="flex items-center gap-3 mb-6">
								<div class="w-10 h-10 bg-[#00d4ff]/10 rounded-lg flex items-center justify-center">
									<HelpCircle class="w-5 h-5 text-[#00d4ff]" />
								</div>
								<div>
									<h2 class="text-white font-semibold">{currentContent.lesson.title}</h2>
									<p class="text-sm text-slate-400">5 questions • {currentContent.lesson.duration} min</p>
								</div>
							</div>

							<p class="text-slate-300 mb-6">
								Test your knowledge of the concepts covered in this module. You need 70% to pass.
							</p>

							<button class="w-full py-3 bg-[#00d4ff] text-[#0a0e1a] font-semibold rounded-lg hover:bg-[#00d4ff]/90 transition-colors">
								Start Quiz
							</button>
						</div>
					</div>
				{:else if currentContent?.lesson.type === 'document'}
					<div class="max-w-3xl w-full h-full p-8 overflow-auto">
						<div class="bg-[#141b2d] rounded-2xl border border-white/10 p-8">
							<div class="flex items-center gap-3 mb-6">
								<div class="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
									<FileText class="w-5 h-5 text-emerald-400" />
								</div>
								<div>
									<h2 class="text-white font-semibold">{currentContent.lesson.title}</h2>
									<p class="text-sm text-slate-400">Reading • {currentContent.lesson.duration} min</p>
								</div>
							</div>

							<div class="prose prose-invert max-w-none">
								<p class="text-slate-300">
									This is a document lesson. The content would be displayed here in a readable format
									with proper formatting, images, and any embedded resources.
								</p>

								<h3 class="text-white mt-6 mb-3">Key Points</h3>
								<ul class="text-slate-300 space-y-2">
									<li>Understanding risk assessment methodologies</li>
									<li>Identifying potential hazards in your workspace</li>
									<li>Implementing preventive measures</li>
									<li>Documentation and reporting requirements</li>
								</ul>
							</div>

							<button class="w-full mt-8 py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-colors">
								Mark as Complete
							</button>
						</div>
					</div>
				{/if}
			</div>

			<!-- Lesson Info Bar -->
			<div class="h-16 bg-[#141b2d] border-t border-white/10 flex items-center justify-between px-6">
				<div>
					<h3 class="text-white font-medium">{currentContent?.lesson.title}</h3>
					<p class="text-sm text-slate-400">{currentContent?.module.title}</p>
				</div>

				<div class="flex items-center gap-4">
					<button class="px-4 py-2 text-slate-400 hover:text-white transition-colors">
						Previous
					</button>
					<button class="px-6 py-2 bg-[#00d4ff] text-[#0a0e1a] font-medium rounded-lg hover:bg-[#00d4ff]/90 transition-colors">
						Next Lesson
					</button>
				</div>
			</div>
		</div>

		<!-- Sidebar - Course Content -->
		<div class="w-80 bg-[#141b2d] border-l border-white/10 flex flex-col overflow-hidden">
			<div class="p-4 border-b border-white/10">
				<h2 class="text-white font-semibold">Course Content</h2>
				<div class="flex items-center gap-2 mt-2">
					<div class="flex-1 h-2 bg-[#0a0e1a] rounded-full overflow-hidden">
						<div class="h-full bg-[#00d4ff] rounded-full" style="width: {course.progress}%"></div>
					</div>
					<span class="text-xs text-slate-400">{course.progress}%</span>
				</div>
			</div>

			<div class="flex-1 overflow-y-auto">
				{#each course.modules as module}
					<div class="border-b border-white/5">
						<button
							on:click={() => toggleModule(module.id)}
							class="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
						>
							<div class="flex items-center gap-3">
								{#if expandedModules.has(module.id)}
									<ChevronDown class="w-4 h-4 text-slate-400" />
								{:else}
									<ChevronRight class="w-4 h-4 text-slate-400" />
								{/if}
								<div class="text-left">
									<h3 class="text-white text-sm font-medium">{module.title}</h3>
									<p class="text-xs text-slate-500">{module.lessons.length} lessons • {module.duration} min</p>
								</div>
							</div>
						</button>

						{#if expandedModules.has(module.id)}
							<div class="pb-2">
								{#each module.lessons as lesson}
									{@const Icon = getLessonIcon(lesson.type)}
									<button
										on:click={() => currentLessonId = lesson.id}
										class="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 transition-colors {currentLessonId === lesson.id ? 'bg-[#00d4ff]/10 border-l-2 border-[#00d4ff]' : ''}"
									>
										<div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 {lesson.completed ? 'bg-emerald-500/20' : 'bg-[#0a0e1a]'}">
											{#if lesson.completed}
												<CheckCircle class="w-4 h-4 text-emerald-400" />
											{:else}
												<Icon class="w-4 h-4 text-slate-400" />
											{/if}
										</div>
										<div class="flex-1 text-left min-w-0">
											<p class="text-sm text-white truncate {lesson.completed ? 'line-through text-slate-400' : ''}">{lesson.title}</p>
											<p class="text-xs text-slate-500">{lesson.duration} min</p>
										</div>
									</button>
								{/each}
							</div>
						{/if}
					</div>
				{/each}
			</div>

			<!-- Course Info Footer -->
			<div class="p-4 border-t border-white/10 bg-[#0a0e1a]">
				<div class="flex items-center gap-3 mb-3">
					<div class="w-10 h-10 bg-gradient-to-br from-[#00d4ff] to-[#10b981] rounded-full flex items-center justify-center text-[#0a0e1a] font-semibold">
						{course.instructor.name.charAt(0)}
					</div>
					<div>
						<p class="text-white text-sm font-medium">{course.instructor.name}</p>
						<p class="text-xs text-slate-400">{course.instructor.title}</p>
					</div>
				</div>

				<div class="flex items-center gap-4 text-xs text-slate-400">
					<span class="flex items-center gap-1">
						<Star class="w-3 h-3 text-amber-400 fill-current" />
						{course.rating} ({course.reviews})
					</span>
					<span class="flex items-center gap-1">
						<Users class="w-3 h-3" />
						{course.enrollments}
					</span>
				</div>
			</div>
		</div>
	</div>
</div>
