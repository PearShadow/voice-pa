import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            'react-dom/test-utils': path.resolve(__dirname, 'mock-test-utils.js'),
        },
    },
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./vitest-setup.ts'],
    },
});
