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
		Undo2,
		Redo2,
		Download,
		Save,
		Eye,
		Palette,
		Settings,
		ChevronLeft,
		Award
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

	let isDragging = false;
	let isResizing = false;
	let dragStart = { x: 0, y: 0 };
	let resizeHandle = '';
	let showPreview = false;
	let zoom = 0.7;

	function replacePlaceholders(text: string): string {
		return text.replace(/\{\{(\w+)\}\}/g, (_, key) => {
			return $previewData[key as keyof typeof $previewData] || `{{${key}}}`;
		});
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
		if (e.key === 'Delete' || e.key === 'Backspace') {
			if ($selectedElementId) deleteElement($selectedElementId);
		}
		if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
			e.preventDefault();
			e.shiftKey ? redo() : undo();
		}
		if ((e.metaKey || e.ctrlKey) && e.key === 'd' && $selectedElementId) {
			e.preventDefault();
			duplicateElement($selectedElementId);
		}
	}

	function handleMouseDown(e: MouseEvent, elementId: string, handle?: string) {
		e.stopPropagation();
		selectedElementId.set(elementId);
		if (handle) { isResizing = true; resizeHandle = handle; }
		else { isDragging = true; }
		dragStart = { x: e.clientX, y: e.clientY };
	}

	function handleMouseMove(e: MouseEvent) {
		if (!isDragging && !isResizing) return;
		if (!$selectedElement) return;
		const dx = (e.clientX - dragStart.x) / zoom;
		const dy = (e.clientY - dragStart.y) / zoom;
		if (isDragging) {
			updateElement($selectedElement.id, { x: $selectedElement.x + dx, y: $selectedElement.y + dy });
		} else if (isResizing) {
			let updates: Partial<CertificateElement> = {};
			if (resizeHandle.includes('e')) updates.width = Math.max(20, $selectedElement.width + dx);
			if (resizeHandle.includes('w')) { updates.width = Math.max(20, $selectedElement.width - dx); updates.x = $selectedElement.x + dx; }
			if (resizeHandle.includes('s')) updates.height = Math.max(20, $selectedElement.height + dy);
			if (resizeHandle.includes('n')) { updates.height = Math.max(20, $selectedElement.height - dy); updates.y = $selectedElement.y + dy; }
			updateElement($selectedElement.id, updates);
		}
		dragStart = { x: e.clientX, y: e.clientY };
	}

	function handleMouseUp() { isDragging = false; isResizing = false; }
	function handleCanvasClick() { selectedElementId.set(null); }

	function addText() {
		addElement({ type: 'text', x: 100, y: 100, width: 200, height: 40, rotation: 0, content: 'New Text', fontSize: 24, fontFamily: 'sans-serif', color: '#1C1917', textAlign: 'center' });
	}
	function addImage() {
		addElement({ type: 'image', x: 100, y: 100, width: 150, height: 150, rotation: 0, src: '', objectFit: 'contain' });
	}
	function addQRCode() {
		addElement({ type: 'qrcode', x: 100, y: 100, width: 100, height: 100, rotation: 0, content: '{{verification_url}}' });
	}
	function addShape() {
		addElement({ type: 'shape', x: 100, y: 100, width: 200, height: 100, rotation: 0, shapeType: 'rectangle', fill: '#0F766E', stroke: 'transparent', strokeWidth: 0, borderRadius: 0 });
	}
	function addLine() {
		addElement({ type: 'line', x: 100, y: 100, width: 200, height: 2, rotation: 0, lineWidth: 2, lineColor: '#78716C', lineStyle: 'solid' });
	}

	function getBackgroundStyle(): string {
		const bg = $template.background;
		if (bg.type === 'color') return `background-color: ${bg.value}`;
		if (bg.type === 'image') return `background-image: url(${bg.value}); background-size: cover`;
		return '';
	}

	onMount(() => {
		document.addEventListener('keydown', handleKeydown);
		return () => document.removeEventListener('keydown', handleKeydown);
	});
</script>

<svelte:head>
	<title>Certificate Designer - Certify365</title>
	<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet" />
</svelte:head>

<svelte:window onmousemove={handleMouseMove} onmouseup={handleMouseUp} />

<div class="h-screen bg-stone-50 flex flex-col overflow-hidden">
	<!-- Top Bar -->
	<div class="h-14 bg-white border-b border-stone-200 flex items-center justify-between px-4">
		<div class="flex items-center gap-4">
			<a href="/admin/certificates" class="p-2 hover:bg-stone-100 rounded-lg transition-colors">
				<ChevronLeft class="w-5 h-5 text-stone-500" />
			</a>
			<div class="flex items-center gap-2">
				<div class="w-8 h-8 rounded-lg bg-teal-700 flex items-center justify-center">
					<Award class="w-5 h-5 text-white" />
				</div>
				<input
					type="text"
					value={$template.name}
					oninput={(e) => template.update(t => ({ ...t, name: e.currentTarget.value }))}
					class="bg-transparent text-stone-900 font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 rounded px-2 py-1"
					style="font-family: var(--font-display)"
				/>
			</div>
		</div>

		<div class="flex items-center gap-2">
			<button onclick={undo} class="p-2 hover:bg-stone-100 rounded-lg" title="Undo">
				<Undo2 class="w-5 h-5 text-stone-500" />
			</button>
			<button onclick={redo} class="p-2 hover:bg-stone-100 rounded-lg" title="Redo">
				<Redo2 class="w-5 h-5 text-stone-500" />
			</button>
			<div class="w-px h-6 bg-stone-200 mx-2"></div>
			<button onclick={() => showPreview = !showPreview} class="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors {showPreview ? 'bg-teal-50 text-teal-700' : 'hover:bg-stone-100 text-stone-600'}">
				<Eye class="w-4 h-4" />
				<span class="text-sm">Preview</span>
			</button>
			<button class="btn btn-secondary py-2">
				<Download class="w-4 h-4" />
				Export
			</button>
			<button class="btn btn-primary py-2">
				<Save class="w-4 h-4" />
				Save
			</button>
		</div>
	</div>

	<div class="flex-1 flex overflow-hidden">
		<!-- Left Toolbar -->
		<div class="w-16 bg-white border-r border-stone-200 flex flex-col items-center py-4 gap-1">
			<button onclick={addText} class="p-3 hover:bg-stone-100 rounded-lg group" title="Text">
				<Type class="w-5 h-5 text-stone-500 group-hover:text-teal-700" />
			</button>
			<button onclick={addImage} class="p-3 hover:bg-stone-100 rounded-lg group" title="Image">
				<Image class="w-5 h-5 text-stone-500 group-hover:text-teal-700" />
			</button>
			<button onclick={addQRCode} class="p-3 hover:bg-stone-100 rounded-lg group" title="QR Code">
				<QrCode class="w-5 h-5 text-stone-500 group-hover:text-teal-700" />
			</button>
			<button onclick={addShape} class="p-3 hover:bg-stone-100 rounded-lg group" title="Shape">
				<Square class="w-5 h-5 text-stone-500 group-hover:text-teal-700" />
			</button>
			<button onclick={addLine} class="p-3 hover:bg-stone-100 rounded-lg group" title="Line">
				<Minus class="w-5 h-5 text-stone-500 group-hover:text-teal-700" />
			</button>
			<div class="w-8 h-px bg-stone-200 my-2"></div>
			<button class="p-3 hover:bg-stone-100 rounded-lg group" title="Background">
				<Palette class="w-5 h-5 text-stone-500 group-hover:text-teal-700" />
			</button>
		</div>

		<!-- Canvas -->
		<div class="flex-1 overflow-auto bg-stone-100 p-8 flex items-center justify-center">
			<div
				class="relative shadow-xl rounded-sm"
				style="width: {$template.width * zoom}px; height: {$template.height * zoom}px; {getBackgroundStyle()}"
				onclick={handleCanvasClick}
				role="button"
				tabindex="0"
				onkeydown={() => {}}
			>
				{#each $template.elements as element (element.id)}
					{@const isSelected = $selectedElementId === element.id}
					<div
						class="absolute cursor-move"
						class:ring-2={isSelected}
						class:ring-teal-500={isSelected}
						style="left:{element.x * zoom}px;top:{element.y * zoom}px;width:{element.width * zoom}px;height:{element.height * zoom}px"
						onmousedown={(e) => handleMouseDown(e, element.id)}
						role="button"
						tabindex="0"
						onkeydown={() => {}}
					>
						{#if element.type === 'text'}
							<div class="w-full h-full flex items-center" style="font-size:{(element.fontSize || 16) * zoom}px;font-family:{element.fontFamily || 'sans-serif'};font-weight:{element.fontWeight || 'normal'};color:{element.color || '#333'};text-align:{element.textAlign || 'left'};justify-content:{element.textAlign === 'center' ? 'center' : element.textAlign === 'right' ? 'flex-end' : 'flex-start'}">
								{showPreview ? replacePlaceholders(element.content || '') : element.content || ''}
							</div>
						{:else if element.type === 'shape'}
							<div class="w-full h-full {element.shapeType === 'circle' ? 'rounded-full' : ''}" style="background-color:{element.fill || 'transparent'};border:{element.strokeWidth || 0}px solid {element.stroke || 'transparent'};border-radius:{element.shapeType !== 'circle' ? (element.borderRadius || 0) * zoom + 'px' : ''}"></div>
						{:else if element.type === 'line'}
							<div class="w-full" style="height:{(element.lineWidth || 2) * zoom}px;background-color:{element.lineColor || '#333'}"></div>
						{:else if element.type === 'qrcode'}
							<div class="w-full h-full bg-white flex items-center justify-center border border-stone-200 rounded">
								<QrCode class="w-3/4 h-3/4 text-stone-800" />
							</div>
						{:else if element.type === 'image'}
							{#if element.src}
								<img src={element.src} alt="" class="w-full h-full" style="object-fit:{element.objectFit || 'contain'}" />
							{:else}
								<div class="w-full h-full bg-stone-100 flex items-center justify-center border-2 border-dashed border-stone-300 rounded">
									<Image class="w-8 h-8 text-stone-400" />
								</div>
							{/if}
						{/if}
						{#if isSelected}
							<div class="absolute -top-1 -left-1 w-3 h-3 bg-teal-500 cursor-nw-resize rounded-sm" onmousedown={(e) => handleMouseDown(e, element.id, 'nw')} role="button" tabindex="0" onkeydown={() => {}}></div>
							<div class="absolute -top-1 -right-1 w-3 h-3 bg-teal-500 cursor-ne-resize rounded-sm" onmousedown={(e) => handleMouseDown(e, element.id, 'ne')} role="button" tabindex="0" onkeydown={() => {}}></div>
							<div class="absolute -bottom-1 -left-1 w-3 h-3 bg-teal-500 cursor-sw-resize rounded-sm" onmousedown={(e) => handleMouseDown(e, element.id, 'sw')} role="button" tabindex="0" onkeydown={() => {}}></div>
							<div class="absolute -bottom-1 -right-1 w-3 h-3 bg-teal-500 cursor-se-resize rounded-sm" onmousedown={(e) => handleMouseDown(e, element.id, 'se')} role="button" tabindex="0" onkeydown={() => {}}></div>
						{/if}
					</div>
				{/each}
			</div>
		</div>

		<!-- Right Panel -->
		<div class="w-72 bg-white border-l border-stone-200 overflow-y-auto">
			{#if $selectedElement}
				<div class="p-4 border-b border-stone-200">
					<div class="flex items-center justify-between mb-4">
						<h3 class="font-semibold text-stone-900 capitalize" style="font-family: var(--font-display)">{$selectedElement.type}</h3>
						<div class="flex items-center gap-1">
							<button onclick={() => moveElement($selectedElement.id, 'up')} class="p-1.5 hover:bg-stone-100 rounded" title="Move Up">
								<ArrowUp class="w-4 h-4 text-stone-500" />
							</button>
							<button onclick={() => moveElement($selectedElement.id, 'down')} class="p-1.5 hover:bg-stone-100 rounded" title="Move Down">
								<ArrowDown class="w-4 h-4 text-stone-500" />
							</button>
							<button onclick={() => duplicateElement($selectedElement.id)} class="p-1.5 hover:bg-stone-100 rounded" title="Duplicate">
								<Copy class="w-4 h-4 text-stone-500" />
							</button>
							<button onclick={() => deleteElement($selectedElement.id)} class="p-1.5 hover:bg-red-50 rounded" title="Delete">
								<Trash2 class="w-4 h-4 text-red-500" />
							</button>
						</div>
					</div>

					<!-- Position -->
					<div class="grid grid-cols-2 gap-2 mb-4">
						<div>
							<label class="block text-xs text-stone-500 mb-1">X</label>
							<input type="number" value={Math.round($selectedElement.x)} oninput={(e) => updateElement($selectedElement.id, { x: Number(e.currentTarget.value) })} class="w-full border border-stone-200 rounded px-2 py-1.5 text-stone-900 text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500" />
						</div>
						<div>
							<label class="block text-xs text-stone-500 mb-1">Y</label>
							<input type="number" value={Math.round($selectedElement.y)} oninput={(e) => updateElement($selectedElement.id, { y: Number(e.currentTarget.value) })} class="w-full border border-stone-200 rounded px-2 py-1.5 text-stone-900 text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500" />
						</div>
						<div>
							<label class="block text-xs text-stone-500 mb-1">Width</label>
							<input type="number" value={Math.round($selectedElement.width)} oninput={(e) => updateElement($selectedElement.id, { width: Number(e.currentTarget.value) })} class="w-full border border-stone-200 rounded px-2 py-1.5 text-stone-900 text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500" />
						</div>
						<div>
							<label class="block text-xs text-stone-500 mb-1">Height</label>
							<input type="number" value={Math.round($selectedElement.height)} oninput={(e) => updateElement($selectedElement.id, { height: Number(e.currentTarget.value) })} class="w-full border border-stone-200 rounded px-2 py-1.5 text-stone-900 text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500" />
						</div>
					</div>

					{#if $selectedElement.type === 'text'}
						<div class="space-y-3">
							<div>
								<label class="block text-xs text-stone-500 mb-1">Content</label>
								<textarea value={$selectedElement.content || ''} oninput={(e) => updateElement($selectedElement.id, { content: e.currentTarget.value })} rows="2" class="w-full border border-stone-200 rounded px-2 py-1.5 text-stone-900 text-sm resize-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500" placeholder="Use {{placeholder}}"></textarea>
							</div>
							<div class="grid grid-cols-2 gap-2">
								<div>
									<label class="block text-xs text-stone-500 mb-1">Font Size</label>
									<input type="number" value={$selectedElement.fontSize || 16} oninput={(e) => updateElement($selectedElement.id, { fontSize: Number(e.currentTarget.value) })} class="w-full border border-stone-200 rounded px-2 py-1.5 text-stone-900 text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500" />
								</div>
								<div>
									<label class="block text-xs text-stone-500 mb-1">Color</label>
									<input type="color" value={$selectedElement.color || '#333333'} oninput={(e) => updateElement($selectedElement.id, { color: e.currentTarget.value })} class="w-full h-9 border border-stone-200 rounded cursor-pointer" />
								</div>
							</div>
							<div>
								<label class="block text-xs text-stone-500 mb-1">Font</label>
								<select value={$selectedElement.fontFamily || 'sans-serif'} onchange={(e) => updateElement($selectedElement.id, { fontFamily: e.currentTarget.value })} class="w-full border border-stone-200 rounded px-2 py-1.5 text-stone-900 text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500">
									<option value="sans-serif">Sans Serif</option>
									<option value="serif">Serif</option>
									<option value="Georgia, serif">Georgia</option>
									<option value="Times New Roman, serif">Times New Roman</option>
								</select>
							</div>
							<div>
								<label class="block text-xs text-stone-500 mb-1">Align</label>
								<div class="flex gap-1">
									{#each ['left', 'center', 'right'] as align}
										<button onclick={() => updateElement($selectedElement.id, { textAlign: align })} class="flex-1 py-1.5 rounded text-xs capitalize transition-colors {$selectedElement.textAlign === align ? 'bg-teal-700 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}">
											{align}
										</button>
									{/each}
								</div>
							</div>
						</div>
					{:else if $selectedElement.type === 'shape'}
						<div class="space-y-3">
							<div class="grid grid-cols-2 gap-2">
								<div>
									<label class="block text-xs text-stone-500 mb-1">Fill</label>
									<input type="color" value={$selectedElement.fill || '#0F766E'} oninput={(e) => updateElement($selectedElement.id, { fill: e.currentTarget.value })} class="w-full h-9 border border-stone-200 rounded cursor-pointer" />
								</div>
								<div>
									<label class="block text-xs text-stone-500 mb-1">Stroke</label>
									<input type="color" value={$selectedElement.stroke || '#000000'} oninput={(e) => updateElement($selectedElement.id, { stroke: e.currentTarget.value })} class="w-full h-9 border border-stone-200 rounded cursor-pointer" />
								</div>
							</div>
						</div>
					{/if}
				</div>

				<!-- Placeholders -->
				<div class="p-4">
					<h4 class="text-xs font-semibold text-stone-500 mb-2 uppercase tracking-wide">Placeholders</h4>
					<div class="space-y-1 text-xs">
						{#each Object.entries($previewData) as [key, value]}
							<button onclick={() => { if ($selectedElement?.type === 'text') updateElement($selectedElement.id, { content: ($selectedElement.content || '') + `{{${key}}}` }); }} class="block w-full text-left px-2 py-1.5 rounded hover:bg-stone-50 transition-colors">
								<span class="text-teal-700 font-medium">{`{{${key}}}`}</span>
								<span class="text-stone-400 ml-2 truncate">{value}</span>
							</button>
						{/each}
					</div>
				</div>
			{:else}
				<div class="p-4 text-center text-stone-400">
					<Settings class="w-8 h-8 mx-auto mb-2 opacity-50" />
					<p class="text-sm">Select an element to edit</p>
				</div>

				<div class="p-4 border-t border-stone-200">
					<h4 class="text-xs font-semibold text-stone-500 mb-3 uppercase tracking-wide">Canvas</h4>
					<div class="space-y-3">
						<div class="grid grid-cols-2 gap-2">
							<div>
								<label class="block text-xs text-stone-500 mb-1">Width</label>
								<input type="number" value={$template.width} oninput={(e) => template.update(t => ({ ...t, width: Number(e.currentTarget.value) }))} class="w-full border border-stone-200 rounded px-2 py-1.5 text-stone-900 text-sm" />
							</div>
							<div>
								<label class="block text-xs text-stone-500 mb-1">Height</label>
								<input type="number" value={$template.height} oninput={(e) => template.update(t => ({ ...t, height: Number(e.currentTarget.value) }))} class="w-full border border-stone-200 rounded px-2 py-1.5 text-stone-900 text-sm" />
							</div>
						</div>
						<div>
							<label class="block text-xs text-stone-500 mb-1">Background</label>
							<input type="color" value={$template.background.type === 'color' ? $template.background.value : '#ffffff'} oninput={(e) => updateBackground({ type: 'color', value: e.currentTarget.value })} class="w-full h-9 border border-stone-200 rounded cursor-pointer" />
						</div>
						<div>
							<label class="block text-xs text-stone-500 mb-1">Zoom ({Math.round(zoom * 100)}%)</label>
							<input type="range" min="0.25" max="1.5" step="0.05" bind:value={zoom} class="w-full accent-teal-700" />
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
