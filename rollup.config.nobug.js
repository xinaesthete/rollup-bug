import multi from '@rollup/plugin-multi-entry'

multi(); //invoking the function and casting it to the void is ok...

export default {
    input: 'index.js',
    plugins: [
        //multi() //this causes a failure in some cases (Windows related?)
    ],
    output: {
        dir: 'dist'
    }
}