
import { resolve } from 'path';

const src = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');
const test = resolve(__dirname, 'test');
const snapshots = resolve(__dirname, 'snapshots');

export default {
    plugins: [  ],
    resolve: {
        alias: { '@': src, '@test': test }
    },
    build: {
        lib: {
            entry: `${ src }/index.ts`,
            name: 'LktDataState',
            fileName: (format) => `lkt-data-state.${ format }.js`,
            formats: ['es']
        },
        outDir,
        minify: true,
        rollupOptions: {
            external: [ 'lkt-tools', 'lkt-date-tools', 'lkt-control-tools', 'lkt-object-tools', 'lkt-string-tools' ],
            output: {
                globals: {
                    "lkt-tools": 'LktTools'
                },
                sourcemapExcludeSources: true
            }
        }
    },
    test: {
        coverage: {
            reporter: [ 'text', 'lcov' ]
        },
        resolveSnapshotPath: (testPath, snapExtension) => {
            const path = testPath.split('/').splice(-2);
            return `${ snapshots }/${ path[0] }/${ path[1] }${ snapExtension }`;
        }
    }
};