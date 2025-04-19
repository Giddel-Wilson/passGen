/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			backgroundColor: {
				surface: 'var(--color-surface)',
				'surface-variant': 'var(--color-surface-variant)',
				primary: 'var(--color-primary)',
				'primary-hover': 'var(--color-primary-hover)'
			},
			textColor: {
				'on-surface': 'var(--color-on-surface)',
				'on-primary': 'var(--color-on-primary)',
				primary: 'var(--color-primary)',
				muted: 'var(--color-muted)',
				error: 'var(--color-error)',
				'error-hover': 'var(--color-error-hover)'
			},
			borderColor: {
				divider: 'var(--color-divider)',
				primary: 'var(--color-primary)'
			}
		}
	},
	plugins: [],
	safelist: [
		'bg-surface',
		'bg-surface-variant',
		'bg-primary',
		'bg-primary-hover',
		'text-on-surface',
		'text-on-primary',
		'text-primary',
		'text-muted',
		'text-error',
		'text-error-hover',
		'border-divider',
		'border-primary'
	]
};
