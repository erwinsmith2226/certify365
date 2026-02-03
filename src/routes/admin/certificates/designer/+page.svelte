<script lang="ts">
	import { onMount } from 'svelte';
	import {
		Type,
		Image,
		QrCode,
		Square,
		Minus,
		Trash2,
		Copy,
		ArrowUp,
		ArrowDown,
		ChevronsUp,
		ChevronsDown,
		Undo2,
		Redo2,
		Download,
		Save,
		Eye,
		Palette,
		Move,
		Settings,
		ChevronLeft
	} from 'lucide-svelte';
	import {
		template,
		selectedElementId,
		selectedElement,
		updateElement,
		addElement,
		deleteElement,
		duplicateElement,
		moveElement,
		updateBackground,
		undo,
		redo,
		previewData,
		type CertificateElement
	} from '$lib/stores/certificate';

	let canvasRef: HTMLDivElement;
	let isDragging = false;
	let isResizing = false;
	let dragStart = { x: 0, y: 0 };
	let resizeHandle = '';
	let showPreview = false;
	let zoom = 0.75;

	// Replace placeholders with preview data
	function replacePlaceholders(text: string): string {
		return text.replace(/\{\{(\w+)\}\}/g, (_, key) => {
			return $previewData[key as keyof typeof $previewData] || `{{${key}}}`;
		});
	}

	// Handle keyboard shortcuts
	function handleKeydown(e: KeyboardEvent) {
		if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

		if (e.key === 'Delete' || e.key === 'Backspace') {
			if ($selectedElementId) {
				deleteElement($selectedElementId);
			}
		}

		if (e.metaKey || e.ctrlKey) {
			if (e.key === 'z') {
				e.preventDefault();
				if (e.shiftKey) {
					redo();
				} else {
					undo();
				}
			}
			if (e.key === 'd' && $selectedElementId) {
				e.preventDefault();
				duplicateElement($selectedElementId);
			}
		}
	}

	// Mouse handlers for drag/resize
	function handleMouseDown(e: MouseEvent, elementId: string, handle?: string) {
		e.stopPropagation();
		selectedElementId.set(elementId);

		if (handle) {
			isResizing = true;
			resizeHandle = handle;
		} else {
			isDragging = true;
		}

		dragStart = { x: e.clientX, y: e.clientY };
	}

	function handleMouseMove(e: MouseEvent) {
		if (!isDragging && !isResizing) return;
		if (!$selectedElement) return;

		const dx = (e.clientX - dragStart.x) / zoom;
		const dy = (e.clientY - dragStart.y) / zoom;

		if (isDragging) {
			updateElement($selectedElement.id, {
				x: $selectedElement.x + dx,
				y: $selectedElement.y + dy
			});
		} else if (isResizing) {
			let updates: Partial<CertificateElement> = {};

			if (resizeHandle.includes('e')) {
				updates.width = Math.max(20, $selectedElement.width + dx);
			}
			if (resizeHandle.includes('w')) {
				updates.width = Math.max(20, $selectedElement.width - dx);
				updates.x = $selectedElement.x + dx;
			}
			if (resizeHandle.includes('s')) {
				updates.height = Math.max(20, $selectedElement.height + dy);
			}
			if (resizeHandle.includes('n')) {
				updates.height = Math.max(20, $selectedElement.height - dy);
				updates.y = $selectedElement.y + dy;
			}

			updateElement($selectedElement.id, updates);
		}

		dragStart = { x: e.clientX, y: e.clientY };
	}

	function handleMouseUp() {
		isDragging = false;
		isResizing = false;
	}

	function handleCanvasClick() {
		selectedElementId.set(null);
	}

	// Add new elements
	function addText() {
		addElement({
			type: 'text',
			x: 100,
			y: 100,
			width: 200,
			height: 40,
			rotation: 0,
			content: 'New Text',
			fontSize: 24,
			fontFamily: 'sans-serif',
			color: '#333333',
			textAlign: 'center'
		});
	}

	function addImage() {
		addElement({
			type: 'image',
			x: 100,
			y: 100,
			width: 150,
			height: 150,
			rotation: 0,
			src: '',
			objectFit: 'contain'
		});
	}

	function addQRCode() {
		addElement({
			type: 'qrcode',
			x: 100,
			y: 100,
			width: 100,
			height: 100,
			rotation: 0,
			content: '{{verification_url}}'
		});
	}

	function addShape() {
		addElement({
			type: 'shape',
			x: 100,
			y: 100,
			width: 200,
			height: 100,
			rotation: 0,
			shapeType: 'rectangle',
			fill: '#00d4ff',
			stroke: 'transparent',
			strokeWidth: 0,
			borderRadius: 0
		});
	}

	function addLine() {
		addElement({
			type: 'line',
			x: 100,
			y: 100,
			width: 200,
			height: 2,
			rotation: 0,
			lineWidth: 2,
			lineColor: '#333333',
			lineStyle: 'solid'
		});
	}

	// Get background style
	function getBackgroundStyle(): string {
		const bg = $template.background;
		if (bg.type === 'color') {
			return `background-color: ${bg.value}`;
		}
		if (bg.type === 'gradient' && bg.gradient) {
			const stops = bg.gradient.stops.map(s => `${s.color} ${s.position}%`).join(', ');
			if (bg.gradient.type === 'linear') {
				return `background: linear-gradient(${bg.gradient.angle}deg, ${stops})`;
			}
			return `background: radial-gradient(circle, ${stops})`;
		}
		if (bg.type === 'image') {
			return `background-image: url(${bg.value}); background-size: cover; background-position: center`;
		}
		return '';
	}

	onMount(() => {
		document.addEventListener('keydown', handleKeydown);
		return () => document.removeEventListener('keydown', handleKeydown);
	});
</script>

<svelte:head>
	<title>Certificate Designer - Certify365</title>
</svelte:head>

<svelte:window on:mousemove={handleMouseMove} on:mouseup={handleMouseUp} />

<div class="h-screen bg-[#0a0e1a] flex flex-col overflow-hidden">
	<!-- Top Bar -->
	<div class="h-14 bg-[#141b2d] border-b border-white/10 flex items-center justify-between px-4">
		<div class="flex items-center gap-4">
			<a href="/admin/certificates" class="p-2 hover:bg-white/5 rounded-lg transition-colors">
				<ChevronLeft class="w-5 h-5 text-slate-400" />
			</a>
			<div>
				<input
					type="text"
					value={$template.name}
					on:input={(e) => template.update(t => ({ ...t, name: e.currentTarget.value }))}
					class="bg-transparent text-white font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-[#00d4ff]/50 rounded px-2 py-1"
				/>
			</div>
		</div>

		<div class="flex items-center gap-2">
			<button
				on:click={undo}
				class="p-2 hover:bg-white/5 rounded-lg transition-colors"
				title="Undo (Cmd+Z)"
			>
				<Undo2 class="w-5 h-5 text-slate-400" />
			</button>
			<button
				on:click={redo}
				class="p-2 hover:bg-white/5 rounded-lg transition-colors"
				title="Redo (Cmd+Shift+Z)"
			>
				<Redo2 class="w-5 h-5 text-slate-400" />
			</button>

			<div class="w-px h-6 bg-white/10 mx-2"></div>

			<button
				on:click={() => showPreview = !showPreview}
				class="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors {showPreview ? 'bg-[#00d4ff]/20 text-[#00d4ff]' : 'hover:bg-white/5 text-slate-400'}"
			>
				<Eye class="w-4 h-4" />
				<span class="text-sm">Preview</span>
			</button>

			<button class="flex items-center gap-2 px-3 py-2 hover:bg-white/5 rounded-lg text-slate-400 transition-colors">
				<Download class="w-4 h-4" />
				<span class="text-sm">Export</span>
			</button>

			<button class="flex items-center gap-2 px-4 py-2 bg-[#00d4ff] text-[#0a0e1a] font-medium rounded-lg hover:bg-[#00d4ff]/90 transition-colors">
				<Save class="w-4 h-4" />
				<span class="text-sm">Save Template</span>
			</button>
		</div>
	</div>

	<div class="flex-1 flex overflow-hidden">
		<!-- Left Toolbar -->
		<div class="w-16 bg-[#141b2d] border-r border-white/10 flex flex-col items-center py-4 gap-2">
			<button
				on:click={addText}
				class="p-3 hover:bg-white/5 rounded-lg transition-colors group"
				title="Add Text"
			>
				<Type class="w-5 h-5 text-slate-400 group-hover:text-[#00d4ff]" />
			</button>
			<button
				on:click={addImage}
				class="p-3 hover:bg-white/5 rounded-lg transition-colors group"
				title="Add Image"
			>
				<Image class="w-5 h-5 text-slate-400 group-hover:text-[#00d4ff]" />
			</button>
			<button
				on:click={addQRCode}
				class="p-3 hover:bg-white/5 rounded-lg transition-colors group"
				title="Add QR Code"
			>
				<QrCode class="w-5 h-5 text-slate-400 group-hover:text-[#00d4ff]" />
			</button>
			<button
				on:click={addShape}
				class="p-3 hover:bg-white/5 rounded-lg transition-colors group"
				title="Add Shape"
			>
				<Square class="w-5 h-5 text-slate-400 group-hover:text-[#00d4ff]" />
			</button>
			<button
				on:click={addLine}
				class="p-3 hover:bg-white/5 rounded-lg transition-colors group"
				title="Add Line"
			>
				<Minus class="w-5 h-5 text-slate-400 group-hover:text-[#00d4ff]" />
			</button>

			<div class="w-8 h-px bg-white/10 my-2"></div>

			<button
				class="p-3 hover:bg-white/5 rounded-lg transition-colors group"
				title="Background"
			>
				<Palette class="w-5 h-5 text-slate-400 group-hover:text-[#00d4ff]" />
			</button>
		</div>

		<!-- Canvas Area -->
		<div class="flex-1 overflow-auto bg-[#0a0e1a] p-8 flex items-center justify-center">
			<div
				bind:this={canvasRef}
				class="relative shadow-2xl"
				style="width: {$template.width * zoom}px; height: {$template.height * zoom}px; {getBackgroundStyle()}"
				on:click={handleCanvasClick}
				role="button"
				tabindex="0"
				on:keydown={() => {}}
			>
				{#each $template.elements as element (element.id)}
					{@const isSelected = $selectedElementId === element.id}
					<div
						class="absolute cursor-move"
						class:ring-2={isSelected}
						class:ring-[#00d4ff]={isSelected}
						style="
							left: {element.x * zoom}px;
							top: {element.y * zoom}px;
							width: {element.width * zoom}px;
							height: {element.height * zoom}px;
							transform: rotate({element.rotation}deg);
						"
						on:mousedown={(e) => handleMouseDown(e, element.id)}
						role="button"
						tabindex="0"
						on:keydown={() => {}}
					>
						<!-- Render element based on type -->
						{#if element.type === 'text'}
							<div
								class="w-full h-full flex items-center"
								style="
									font-size: {(element.fontSize || 16) * zoom}px;
									font-family: {element.fontFamily || 'sans-serif'};
									font-weight: {element.fontWeight || 'normal'};
									font-style: {element.fontStyle || 'normal'};
									color: {element.color || '#333'};
									text-align: {element.textAlign || 'left'};
									justify-content: {element.textAlign === 'center' ? 'center' : element.textAlign === 'right' ? 'flex-end' : 'flex-start'};
								"
							>
								{showPreview ? replacePlaceholders(element.content || '') : element.content || ''}
							</div>
						{:else if element.type === 'shape'}
							{#if element.shapeType === 'rectangle'}
								<div
									class="w-full h-full"
									style="
										background-color: {element.fill || 'transparent'};
										border: {element.strokeWidth || 0}px solid {element.stroke || 'transparent'};
										border-radius: {(element.borderRadius || 0) * zoom}px;
									"
								></div>
							{:else if element.shapeType === 'circle'}
								<div
									class="w-full h-full rounded-full"
									style="
										background-color: {element.fill || 'transparent'};
										border: {element.strokeWidth || 0}px solid {element.stroke || 'transparent'};
									"
								></div>
							{/if}
						{:else if element.type === 'line'}
							<div
								class="w-full"
								style="
									height: {(element.lineWidth || 2) * zoom}px;
									background-color: {element.lineColor || '#333'};
									{element.lineStyle === 'dashed' ? 'background: repeating-linear-gradient(90deg, ' + (element.lineColor || '#333') + ' 0, ' + (element.lineColor || '#333') + ' 10px, transparent 10px, transparent 20px)' : ''}
								"
							></div>
						{:else if element.type === 'qrcode'}
							<div class="w-full h-full bg-white flex items-center justify-center border border-gray-200">
								<QrCode class="w-3/4 h-3/4 text-gray-800" />
							</div>
						{:else if element.type === 'image'}
							{#if element.src}
								<img
									src={element.src}
									alt=""
									class="w-full h-full"
									style="object-fit: {element.objectFit || 'contain'}"
								/>
							{:else}
								<div class="w-full h-full bg-gray-200 flex items-center justify-center border-2 border-dashed border-gray-400">
									<Image class="w-8 h-8 text-gray-400" />
								</div>
							{/if}
						{/if}

						<!-- Resize handles (only when selected) -->
						{#if isSelected}
							<div class="absolute -top-1 -left-1 w-3 h-3 bg-[#00d4ff] cursor-nw-resize" on:mousedown={(e) => handleMouseDown(e, element.id, 'nw')} role="button" tabindex="0" on:keydown={() => {}}></div>
							<div class="absolute -top-1 -right-1 w-3 h-3 bg-[#00d4ff] cursor-ne-resize" on:mousedown={(e) => handleMouseDown(e, element.id, 'ne')} role="button" tabindex="0" on:keydown={() => {}}></div>
							<div class="absolute -bottom-1 -left-1 w-3 h-3 bg-[#00d4ff] cursor-sw-resize" on:mousedown={(e) => handleMouseDown(e, element.id, 'sw')} role="button" tabindex="0" on:keydown={() => {}}></div>
							<div class="absolute -bottom-1 -right-1 w-3 h-3 bg-[#00d4ff] cursor-se-resize" on:mousedown={(e) => handleMouseDown(e, element.id, 'se')} role="button" tabindex="0" on:keydown={() => {}}></div>
						{/if}
					</div>
				{/each}
			</div>
		</div>

		<!-- Right Panel - Properties -->
		<div class="w-72 bg-[#141b2d] border-l border-white/10 overflow-y-auto">
			{#if $selectedElement}
				<div class="p-4 border-b border-white/10">
					<div class="flex items-center justify-between mb-4">
						<h3 class="font-semibold text-white capitalize">{$selectedElement.type} Properties</h3>
						<div class="flex items-center gap-1">
							<button
								on:click={() => moveElement($selectedElement.id, 'up')}
								class="p-1.5 hover:bg-white/5 rounded transition-colors"
								title="Move Up"
							>
								<ArrowUp class="w-4 h-4 text-slate-400" />
							</button>
							<button
								on:click={() => moveElement($selectedElement.id, 'down')}
								class="p-1.5 hover:bg-white/5 rounded transition-colors"
								title="Move Down"
							>
								<ArrowDown class="w-4 h-4 text-slate-400" />
							</button>
							<button
								on:click={() => duplicateElement($selectedElement.id)}
								class="p-1.5 hover:bg-white/5 rounded transition-colors"
								title="Duplicate (Cmd+D)"
							>
								<Copy class="w-4 h-4 text-slate-400" />
							</button>
							<button
								on:click={() => deleteElement($selectedElement.id)}
								class="p-1.5 hover:bg-red-500/10 rounded transition-colors"
								title="Delete"
							>
								<Trash2 class="w-4 h-4 text-red-400" />
							</button>
						</div>
					</div>

					<!-- Position -->
					<div class="grid grid-cols-2 gap-2 mb-4">
						<div>
							<label class="block text-xs text-slate-400 mb-1">X</label>
							<input
								type="number"
								value={Math.round($selectedElement.x)}
								on:input={(e) => updateElement($selectedElement.id, { x: Number(e.currentTarget.value) })}
								class="w-full bg-[#0a0e1a] border border-white/10 rounded px-2 py-1.5 text-white text-sm"
							/>
						</div>
						<div>
							<label class="block text-xs text-slate-400 mb-1">Y</label>
							<input
								type="number"
								value={Math.round($selectedElement.y)}
								on:input={(e) => updateElement($selectedElement.id, { y: Number(e.currentTarget.value) })}
								class="w-full bg-[#0a0e1a] border border-white/10 rounded px-2 py-1.5 text-white text-sm"
							/>
						</div>
						<div>
							<label class="block text-xs text-slate-400 mb-1">Width</label>
							<input
								type="number"
								value={Math.round($selectedElement.width)}
								on:input={(e) => updateElement($selectedElement.id, { width: Number(e.currentTarget.value) })}
								class="w-full bg-[#0a0e1a] border border-white/10 rounded px-2 py-1.5 text-white text-sm"
							/>
						</div>
						<div>
							<label class="block text-xs text-slate-400 mb-1">Height</label>
							<input
								type="number"
								value={Math.round($selectedElement.height)}
								on:input={(e) => updateElement($selectedElement.id, { height: Number(e.currentTarget.value) })}
								class="w-full bg-[#0a0e1a] border border-white/10 rounded px-2 py-1.5 text-white text-sm"
							/>
						</div>
					</div>

					<!-- Type-specific properties -->
					{#if $selectedElement.type === 'text'}
						<div class="space-y-3">
							<div>
								<label class="block text-xs text-slate-400 mb-1">Content</label>
								<textarea
									value={$selectedElement.content || ''}
									on:input={(e) => updateElement($selectedElement.id, { content: e.currentTarget.value })}
									rows="2"
									class="w-full bg-[#0a0e1a] border border-white/10 rounded px-2 py-1.5 text-white text-sm resize-none"
									placeholder="Use {{placeholder}} for dynamic content"
								></textarea>
							</div>

							<div class="grid grid-cols-2 gap-2">
								<div>
									<label class="block text-xs text-slate-400 mb-1">Font Size</label>
									<input
										type="number"
										value={$selectedElement.fontSize || 16}
										on:input={(e) => updateElement($selectedElement.id, { fontSize: Number(e.currentTarget.value) })}
										class="w-full bg-[#0a0e1a] border border-white/10 rounded px-2 py-1.5 text-white text-sm"
									/>
								</div>
								<div>
									<label class="block text-xs text-slate-400 mb-1">Color</label>
									<input
										type="color"
										value={$selectedElement.color || '#333333'}
										on:input={(e) => updateElement($selectedElement.id, { color: e.currentTarget.value })}
										class="w-full h-8 bg-[#0a0e1a] border border-white/10 rounded cursor-pointer"
									/>
								</div>
							</div>

							<div>
								<label class="block text-xs text-slate-400 mb-1">Font Family</label>
								<select
									value={$selectedElement.fontFamily || 'sans-serif'}
									on:change={(e) => updateElement($selectedElement.id, { fontFamily: e.currentTarget.value })}
									class="w-full bg-[#0a0e1a] border border-white/10 rounded px-2 py-1.5 text-white text-sm"
								>
									<option value="sans-serif">Sans Serif</option>
									<option value="serif">Serif</option>
									<option value="monospace">Monospace</option>
									<option value="Georgia, serif">Georgia</option>
									<option value="Times New Roman, serif">Times New Roman</option>
									<option value="Arial, sans-serif">Arial</option>
								</select>
							</div>

							<div>
								<label class="block text-xs text-slate-400 mb-1">Text Align</label>
								<div class="flex gap-1">
									{#each ['left', 'center', 'right'] as align}
										<button
											on:click={() => updateElement($selectedElement.id, { textAlign: align })}
											class="flex-1 py-1.5 rounded text-xs capitalize transition-colors {$selectedElement.textAlign === align ? 'bg-[#00d4ff] text-[#0a0e1a]' : 'bg-[#0a0e1a] text-slate-400 hover:bg-white/5'}"
										>
											{align}
										</button>
									{/each}
								</div>
							</div>

							<div>
								<label class="block text-xs text-slate-400 mb-1">Font Weight</label>
								<select
									value={$selectedElement.fontWeight || 'normal'}
									on:change={(e) => updateElement($selectedElement.id, { fontWeight: e.currentTarget.value })}
									class="w-full bg-[#0a0e1a] border border-white/10 rounded px-2 py-1.5 text-white text-sm"
								>
									<option value="normal">Normal</option>
									<option value="bold">Bold</option>
									<option value="lighter">Light</option>
								</select>
							</div>
						</div>
					{:else if $selectedElement.type === 'shape'}
						<div class="space-y-3">
							<div>
								<label class="block text-xs text-slate-400 mb-1">Shape Type</label>
								<select
									value={$selectedElement.shapeType || 'rectangle'}
									on:change={(e) => updateElement($selectedElement.id, { shapeType: e.currentTarget.value })}
									class="w-full bg-[#0a0e1a] border border-white/10 rounded px-2 py-1.5 text-white text-sm"
								>
									<option value="rectangle">Rectangle</option>
									<option value="circle">Circle</option>
								</select>
							</div>

							<div class="grid grid-cols-2 gap-2">
								<div>
									<label class="block text-xs text-slate-400 mb-1">Fill</label>
									<input
										type="color"
										value={$selectedElement.fill || '#00d4ff'}
										on:input={(e) => updateElement($selectedElement.id, { fill: e.currentTarget.value })}
										class="w-full h-8 bg-[#0a0e1a] border border-white/10 rounded cursor-pointer"
									/>
								</div>
								<div>
									<label class="block text-xs text-slate-400 mb-1">Stroke</label>
									<input
										type="color"
										value={$selectedElement.stroke || '#000000'}
										on:input={(e) => updateElement($selectedElement.id, { stroke: e.currentTarget.value })}
										class="w-full h-8 bg-[#0a0e1a] border border-white/10 rounded cursor-pointer"
									/>
								</div>
							</div>

							<div class="grid grid-cols-2 gap-2">
								<div>
									<label class="block text-xs text-slate-400 mb-1">Stroke Width</label>
									<input
										type="number"
										value={$selectedElement.strokeWidth || 0}
										on:input={(e) => updateElement($selectedElement.id, { strokeWidth: Number(e.currentTarget.value) })}
										class="w-full bg-[#0a0e1a] border border-white/10 rounded px-2 py-1.5 text-white text-sm"
									/>
								</div>
								<div>
									<label class="block text-xs text-slate-400 mb-1">Border Radius</label>
									<input
										type="number"
										value={$selectedElement.borderRadius || 0}
										on:input={(e) => updateElement($selectedElement.id, { borderRadius: Number(e.currentTarget.value) })}
										class="w-full bg-[#0a0e1a] border border-white/10 rounded px-2 py-1.5 text-white text-sm"
									/>
								</div>
							</div>
						</div>
					{:else if $selectedElement.type === 'line'}
						<div class="space-y-3">
							<div class="grid grid-cols-2 gap-2">
								<div>
									<label class="block text-xs text-slate-400 mb-1">Line Width</label>
									<input
										type="number"
										value={$selectedElement.lineWidth || 2}
										on:input={(e) => updateElement($selectedElement.id, { lineWidth: Number(e.currentTarget.value) })}
										class="w-full bg-[#0a0e1a] border border-white/10 rounded px-2 py-1.5 text-white text-sm"
									/>
								</div>
								<div>
									<label class="block text-xs text-slate-400 mb-1">Color</label>
									<input
										type="color"
										value={$selectedElement.lineColor || '#333333'}
										on:input={(e) => updateElement($selectedElement.id, { lineColor: e.currentTarget.value })}
										class="w-full h-8 bg-[#0a0e1a] border border-white/10 rounded cursor-pointer"
									/>
								</div>
							</div>

							<div>
								<label class="block text-xs text-slate-400 mb-1">Style</label>
								<select
									value={$selectedElement.lineStyle || 'solid'}
									on:change={(e) => updateElement($selectedElement.id, { lineStyle: e.currentTarget.value })}
									class="w-full bg-[#0a0e1a] border border-white/10 rounded px-2 py-1.5 text-white text-sm"
								>
									<option value="solid">Solid</option>
									<option value="dashed">Dashed</option>
									<option value="dotted">Dotted</option>
								</select>
							</div>
						</div>
					{:else if $selectedElement.type === 'image'}
						<div class="space-y-3">
							<div>
								<label class="block text-xs text-slate-400 mb-1">Image URL</label>
								<input
									type="text"
									value={$selectedElement.src || ''}
									on:input={(e) => updateElement($selectedElement.id, { src: e.currentTarget.value })}
									class="w-full bg-[#0a0e1a] border border-white/10 rounded px-2 py-1.5 text-white text-sm"
									placeholder="https://..."
								/>
							</div>

							<div>
								<label class="block text-xs text-slate-400 mb-1">Fit</label>
								<select
									value={$selectedElement.objectFit || 'contain'}
									on:change={(e) => updateElement($selectedElement.id, { objectFit: e.currentTarget.value })}
									class="w-full bg-[#0a0e1a] border border-white/10 rounded px-2 py-1.5 text-white text-sm"
								>
									<option value="contain">Contain</option>
									<option value="cover">Cover</option>
									<option value="fill">Fill</option>
								</select>
							</div>
						</div>
					{:else if $selectedElement.type === 'qrcode'}
						<div>
							<label class="block text-xs text-slate-400 mb-1">QR Content</label>
							<input
								type="text"
								value={$selectedElement.content || ''}
								on:input={(e) => updateElement($selectedElement.id, { content: e.currentTarget.value })}
								class="w-full bg-[#0a0e1a] border border-white/10 rounded px-2 py-1.5 text-white text-sm"
								placeholder="{{verification_url}}"
							/>
						</div>
					{/if}
				</div>

				<!-- Placeholders Reference -->
				<div class="p-4">
					<h4 class="text-xs font-semibold text-slate-400 mb-2">AVAILABLE PLACEHOLDERS</h4>
					<div class="space-y-1 text-xs">
						{#each Object.entries($previewData) as [key, value]}
							<button
								on:click={() => {
									if ($selectedElement?.type === 'text') {
										updateElement($selectedElement.id, { 
											content: ($selectedElement.content || '') + `{{${key}}}` 
										});
									}
								}}
								class="block w-full text-left px-2 py-1 rounded hover:bg-white/5 transition-colors"
							>
								<span class="text-[#00d4ff]">{`{{${key}}}`}</span>
								<span class="text-slate-500 ml-2 truncate">{value}</span>
							</button>
						{/each}
					</div>
				</div>
			{:else}
				<div class="p-4 text-center text-slate-400">
					<Settings class="w-8 h-8 mx-auto mb-2 opacity-50" />
					<p class="text-sm">Select an element to edit its properties</p>
				</div>

				<!-- Canvas Properties when nothing selected -->
				<div class="p-4 border-t border-white/10">
					<h4 class="text-xs font-semibold text-slate-400 mb-3">CANVAS SETTINGS</h4>

					<div class="space-y-3">
						<div class="grid grid-cols-2 gap-2">
							<div>
								<label class="block text-xs text-slate-400 mb-1">Width</label>
								<input
									type="number"
									value={$template.width}
									on:input={(e) => template.update(t => ({ ...t, width: Number(e.currentTarget.value) }))}
									class="w-full bg-[#0a0e1a] border border-white/10 rounded px-2 py-1.5 text-white text-sm"
								/>
							</div>
							<div>
								<label class="block text-xs text-slate-400 mb-1">Height</label>
								<input
									type="number"
									value={$template.height}
									on:input={(e) => template.update(t => ({ ...t, height: Number(e.currentTarget.value) }))}
									class="w-full bg-[#0a0e1a] border border-white/10 rounded px-2 py-1.5 text-white text-sm"
								/>
							</div>
						</div>

						<div>
							<label class="block text-xs text-slate-400 mb-1">Background Color</label>
							<input
								type="color"
								value={$template.background.type === 'color' ? $template.background.value : '#ffffff'}
								on:input={(e) => updateBackground({ type: 'color', value: e.currentTarget.value })}
								class="w-full h-8 bg-[#0a0e1a] border border-white/10 rounded cursor-pointer"
							/>
						</div>

						<div>
							<label class="block text-xs text-slate-400 mb-1">Zoom</label>
							<input
								type="range"
								min="0.25"
								max="1.5"
								step="0.05"
								bind:value={zoom}
								class="w-full"
							/>
							<div class="text-center text-xs text-slate-500">{Math.round(zoom * 100)}%</div>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
