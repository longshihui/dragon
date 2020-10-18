import ProjectConfigCreator from './cli/ProjectConfigCreator';
import path from 'path';

export default ProjectConfigCreator({
    entry: {
        main: './src/main.ts',
        renderer: './src/renderer-process/App.tsx'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        mainFilename: 'main.js',
        rendererFilename: 'renderer.js'
    }
});
