/**
 * 主进程Vite配置
 */
import { defineConfig } from 'vite';
import { builtinModules } from 'module';

// https://vitejs.dev/config/
export default defineConfig({
    mode: process.env.MODE,
    build: {
        sourcemap: 'inline',
        target: `node16`,
        outDir: 'dist',
        assetsDir: '.',
        minify: process.env.MODE !== 'development',
        lib: {
            entry: 'src/main.ts',
            formats: ['cjs']
        },
        rollupOptions: {
            external: [
                'electron',
                'electron-devtools-installer',
                ...builtinModules
            ],
            output: {
                entryFileNames: '[name].cjs'
            }
        },
        emptyOutDir: true
    }
});
