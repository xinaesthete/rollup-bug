import multi from '@rollup/plugin-multi-entry'

export default {
    input: 'index.js',
    plugins: [
        multi() //this causes a failure in some cases (Windows related?)
    ],
    output: {
        dir: 'dist'
    }
}