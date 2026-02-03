import { writable, derived } from 'svelte/store';

export interface CertificateElement {
	id: string;
	type: 'text' | 'image' | 'qrcode' | 'shape' | 'line';
	x: number;
	y: number;
	width: number;
	height: number;
	rotation: number;
	// Text properties
	content?: string;
	fontSize?: number;
	fontFamily?: string;
	fontWeight?: string;
	fontStyle?: string;
	color?: string;
	textAlign?: 'left' | 'center' | 'right';
	// Image properties
	src?: string;
	objectFit?: 'contain' | 'cover' | 'fill';
	// Shape properties
	shapeType?: 'rectangle' | 'circle' | 'triangle';
	fill?: string;
	stroke?: string;
	strokeWidth?: number;
	borderRadius?: number;
	// Line properties
	lineWidth?: number;
	lineColor?: string;
	lineStyle?: 'solid' | 'dashed' | 'dotted';
}

export interface CertificateTemplate {
	id: string;
	name: string;
	width: number;
	height: number;
	background: {
		type: 'color' | 'gradient' | 'image';
		value: string;
		gradient?: {
			type: 'linear' | 'radial';
			angle: number;
			stops: Array<{ color: string; position: number }>;
		};
	};
	elements: CertificateElement[];
}

// Default certificate template
const defaultTemplate: CertificateTemplate = {
	id: 'default',
	name: 'Classic Certificate',
	width: 1056, // 11" at 96dpi (landscape letter)
	height: 816, // 8.5" at 96dpi
	background: {
		type: 'color',
		value: '#ffffff'
	},
	elements: [
		{
			id: 'border',
			type: 'shape',
			x: 20,
			y: 20,
			width: 1016,
			height: 776,
			rotation: 0,
			shapeType: 'rectangle',
			fill: 'transparent',
			stroke: '#00d4ff',
			strokeWidth: 3,
			borderRadius: 0
		},
		{
			id: 'inner-border',
			type: 'shape',
			x: 35,
			y: 35,
			width: 986,
			height: 746,
			rotation: 0,
			shapeType: 'rectangle',
			fill: 'transparent',
			stroke: '#10b981',
			strokeWidth: 1,
			borderRadius: 0
		},
		{
			id: 'title',
			type: 'text',
			x: 528,
			y: 120,
			width: 600,
			height: 60,
			rotation: 0,
			content: 'CERTIFICATE OF COMPLETION',
			fontSize: 36,
			fontFamily: 'serif',
			fontWeight: 'bold',
			color: '#0a0e1a',
			textAlign: 'center'
		},
		{
			id: 'subtitle',
			type: 'text',
			x: 528,
			y: 180,
			width: 500,
			height: 30,
			rotation: 0,
			content: 'This certifies that',
			fontSize: 18,
			fontFamily: 'serif',
			fontStyle: 'italic',
			color: '#666666',
			textAlign: 'center'
		},
		{
			id: 'recipient-name',
			type: 'text',
			x: 528,
			y: 260,
			width: 700,
			height: 50,
			rotation: 0,
			content: '{{recipient_name}}',
			fontSize: 42,
			fontFamily: 'serif',
			fontWeight: 'bold',
			color: '#00d4ff',
			textAlign: 'center'
		},
		{
			id: 'completion-text',
			type: 'text',
			x: 528,
			y: 340,
			width: 600,
			height: 30,
			rotation: 0,
			content: 'has successfully completed the course',
			fontSize: 18,
			fontFamily: 'serif',
			color: '#666666',
			textAlign: 'center'
		},
		{
			id: 'course-name',
			type: 'text',
			x: 528,
			y: 400,
			width: 800,
			height: 40,
			rotation: 0,
			content: '{{course_name}}',
			fontSize: 28,
			fontFamily: 'serif',
			fontWeight: 'bold',
			color: '#0a0e1a',
			textAlign: 'center'
		},
		{
			id: 'date-label',
			type: 'text',
			x: 250,
			y: 580,
			width: 200,
			height: 20,
			rotation: 0,
			content: 'Date Issued',
			fontSize: 12,
			fontFamily: 'sans-serif',
			color: '#999999',
			textAlign: 'center'
		},
		{
			id: 'date-value',
			type: 'text',
			x: 250,
			y: 600,
			width: 200,
			height: 30,
			rotation: 0,
			content: '{{issue_date}}',
			fontSize: 16,
			fontFamily: 'serif',
			color: '#333333',
			textAlign: 'center'
		},
		{
			id: 'signature-line',
			type: 'line',
			x: 700,
			y: 620,
			width: 200,
			height: 2,
			rotation: 0,
			lineWidth: 1,
			lineColor: '#333333',
			lineStyle: 'solid'
		},
		{
			id: 'signature-label',
			type: 'text',
			x: 800,
			y: 630,
			width: 200,
			height: 20,
			rotation: 0,
			content: 'Authorized Signature',
			fontSize: 12,
			fontFamily: 'sans-serif',
			color: '#999999',
			textAlign: 'center'
		},
		{
			id: 'cert-id',
			type: 'text',
			x: 528,
			y: 720,
			width: 400,
			height: 20,
			rotation: 0,
			content: 'Certificate ID: {{certificate_id}}',
			fontSize: 10,
			fontFamily: 'monospace',
			color: '#999999',
			textAlign: 'center'
		},
		{
			id: 'qr-code',
			type: 'qrcode',
			x: 930,
			y: 680,
			width: 80,
			height: 80,
			rotation: 0,
			content: '{{verification_url}}'
		}
	]
};

// Template store
export const template = writable<CertificateTemplate>(defaultTemplate);

// Selected element store
export const selectedElementId = writable<string | null>(null);

// Derived store for selected element
export const selectedElement = derived(
	[template, selectedElementId],
	([$template, $selectedId]) => {
		if (!$selectedId) return null;
		return $template.elements.find(el => el.id === $selectedId) || null;
	}
);

// History for undo/redo
interface HistoryState {
	past: CertificateTemplate[];
	future: CertificateTemplate[];
}

const history = writable<HistoryState>({ past: [], future: [] });

// Actions
export function updateElement(id: string, updates: Partial<CertificateElement>) {
	template.update(t => {
		// Save to history
		history.update(h => ({
			past: [...h.past.slice(-49), t],
			future: []
		}));

		return {
			...t,
			elements: t.elements.map(el =>
				el.id === id ? { ...el, ...updates } : el
			)
		};
	});
}

export function addElement(element: Omit<CertificateElement, 'id'>) {
	const id = `element-${Date.now()}`;
	template.update(t => {
		history.update(h => ({
			past: [...h.past.slice(-49), t],
			future: []
		}));

		return {
			...t,
			elements: [...t.elements, { ...element, id }]
		};
	});
	selectedElementId.set(id);
	return id;
}

export function deleteElement(id: string) {
	template.update(t => {
		history.update(h => ({
			past: [...h.past.slice(-49), t],
			future: []
		}));

		return {
			...t,
			elements: t.elements.filter(el => el.id !== id)
		};
	});
	selectedElementId.set(null);
}

export function duplicateElement(id: string) {
	template.update(t => {
		const element = t.elements.find(el => el.id === id);
		if (!element) return t;

		const newId = `element-${Date.now()}`;
		const newElement = {
			...element,
			id: newId,
			x: element.x + 20,
			y: element.y + 20
		};

		history.update(h => ({
			past: [...h.past.slice(-49), t],
			future: []
		}));

		return {
			...t,
			elements: [...t.elements, newElement]
		};
	});
}

export function moveElement(id: string, direction: 'up' | 'down' | 'top' | 'bottom') {
	template.update(t => {
		const index = t.elements.findIndex(el => el.id === id);
		if (index === -1) return t;

		const newElements = [...t.elements];
		const [element] = newElements.splice(index, 1);

		switch (direction) {
			case 'up':
				newElements.splice(Math.min(index + 1, newElements.length), 0, element);
				break;
			case 'down':
				newElements.splice(Math.max(index - 1, 0), 0, element);
				break;
			case 'top':
				newElements.push(element);
				break;
			case 'bottom':
				newElements.unshift(element);
				break;
		}

		history.update(h => ({
			past: [...h.past.slice(-49), t],
			future: []
		}));

		return { ...t, elements: newElements };
	});
}

export function updateBackground(background: CertificateTemplate['background']) {
	template.update(t => {
		history.update(h => ({
			past: [...h.past.slice(-49), t],
			future: []
		}));

		return { ...t, background };
	});
}

export function undo() {
	history.update(h => {
		if (h.past.length === 0) return h;

		const previous = h.past[h.past.length - 1];
		const newPast = h.past.slice(0, -1);

		template.update(current => {
			return previous;
		});

		// Get current template for future
		let current: CertificateTemplate;
		template.subscribe(t => current = t)();

		return {
			past: newPast,
			future: [current!, ...h.future]
		};
	});
}

export function redo() {
	history.update(h => {
		if (h.future.length === 0) return h;

		const next = h.future[0];
		const newFuture = h.future.slice(1);

		let current: CertificateTemplate;
		template.subscribe(t => current = t)();

		template.set(next);

		return {
			past: [...h.past, current!],
			future: newFuture
		};
	});
}

export function loadTemplate(newTemplate: CertificateTemplate) {
	template.set(newTemplate);
	selectedElementId.set(null);
	history.set({ past: [], future: [] });
}

export function exportTemplate(): CertificateTemplate {
	let current: CertificateTemplate;
	template.subscribe(t => current = t)();
	return current!;
}

// Preview data for placeholders
export const previewData = writable({
	recipient_name: 'John Smith',
	course_name: 'Workplace Safety Fundamentals',
	issue_date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
	certificate_id: 'CERT-2024-001234',
	verification_url: 'https://certify365.com/verify/CERT-2024-001234',
	organization_name: 'Acme Corporation',
	score: '95%',
	expiry_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
});
