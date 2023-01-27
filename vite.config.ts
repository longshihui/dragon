/**
 * 主进程Vite配置
 */
import { defineConfig } from 'vite';
import { builtinModules } from 'node:module';

export default defineConfig({
    mode: process.env.MODE,
    build: {
        sourcemap: 'inline',
        target: `node16`,
        outDir: 'dist',
        emptyOutDir: false,
        assetsDir: '.',
        minify: process.env.MODE !== 'development',
        lib: {
            entry: './src/main.ts',
            formats: ['cjs']
        },
        rollupOptions: {
            external: ['electron', ...builtinModules],
            output: {
                entryFileNames: '[name].cjs'
            }
        },
        watch: process.env.MODE === 'development' ? Object.create(null) : null
    }
});
