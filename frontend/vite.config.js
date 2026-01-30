import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	const API_URL = env.VITE_API_URL || 'http://localhost:5000';

	return {
		base: '/',
		plugins: [react()],
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src'),
			},
		},
		server: {
			host: '0.0.0.0',
			port: 3000,
			proxy:
				mode === 'development'
					? {
							'/api': {
								target: API_URL,
								changeOrigin: true,
								rewrite: (p) => p.replace(/^\/api/, ''),
							},
						}
					: undefined,
		},
		define: {
			'import.meta.env.VITE_API_URL': JSON.stringify(API_URL),
		},
	};
});
