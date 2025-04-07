
import type { Config } from "tailwindcss";

export default {
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: '#e2e8f0',
				input: '#e2e8f0',
				ring: '#3b82f6',
				background: '#ffffff',
				foreground: '#0f172a',
				primary: {
					DEFAULT: '#3b82f6',
					foreground: '#ffffff'
				},
				secondary: {
					DEFAULT: '#f1f5f9',
					foreground: '#1e293b'
				},
				destructive: {
					DEFAULT: '#ef4444',
					foreground: '#ffffff'
				},
				muted: {
					DEFAULT: '#f1f5f9',
					foreground: '#64748b'
				},
				accent: {
					DEFAULT: '#f1f5f9',
					foreground: '#1e293b'
				},
				card: {
					DEFAULT: '#ffffff',
					foreground: '#0f172a'
				},
        skill: {
					DEFAULT: '#F97316', // Orange primary
					light: '#FFEDD5',   // Light orange
					dark: '#C2410C',    // Dark orange
				}
			},
			borderRadius: {
				lg: '0.5rem',
				md: '0.375rem',
				sm: '0.25rem'
			},
			keyframes: {
				'fade-in': {
					from: {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					to: {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'fade-out': {
					from: {
						opacity: '1',
						transform: 'translateY(0)'
					},
					to: {
						opacity: '0',
						transform: 'translateY(10px)'
					}
				},
				'slide-in': {
					from: {
						opacity: '0',
						transform: 'translateX(20px)'
					},
					to: {
						opacity: '1',
						transform: 'translateX(0)'
					}
				}
			},
			animation: {
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-out': 'fade-out 0.3s ease-out',
				'slide-in': 'slide-in 0.3s ease-out'
			}
		}
	},
	plugins: [],
} satisfies Config;
