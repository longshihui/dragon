/**
 * 主进程Vite配置
 */
import { defineConfig } from 'vite';
import { join } from 'path';
import { builtinModules } from 'module';

const PACKAGE_ROOT = __dirname;

// https://vitejs.dev/config/
export default defineConfig({
    mode: process.env.MODE,
    root: PACKAGE_ROOT,
    envDir: process.cwd(),
    resolve: {
        alias: {
            '/@/': join(PACKAGE_ROOT, 'src') + '/'
        }
    },
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
        emptyOutDir: true,
        brotliSize: false
    }
});
