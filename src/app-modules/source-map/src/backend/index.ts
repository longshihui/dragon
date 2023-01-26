/**
 * SourceMap安装
 */
import sourceMapSupport from 'source-map-support';
import { useService } from '@dragon-app/core';

export default useService({
    id: 'source-map',
    setup: async function SourceMapSetup() {
        if (import.meta.env.DEV) {
            sourceMapSupport.install();
        }
    }
});
