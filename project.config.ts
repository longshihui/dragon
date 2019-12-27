import ProjectConfigCreator from './build/ProjectConfigCreator';
import path from 'path';

export default ProjectConfigCreator({
    entry: {
        main: './src/main/main.ts',
        renderer: './src/renderer/App.tsx'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        mainFilename: 'main.js',
        rendererFilename: 'renderer.js'
    }
});
