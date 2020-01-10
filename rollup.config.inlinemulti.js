import { promise } from 'matched';


/* eslint-disable consistent-return, no-param-reassign */
const entry = '\0rollup:plugin-multi-entry:entry-point';
function multiEntry(conf) {
  let include = [];
  let exclude = [];

  let exporter = path => `export * from ${JSON.stringify(path)};`;
  /////////////// thought that maybe this might help
  //let exporter = path => `export * from ${JSON.stringify(path.replace(/\\/g, '/'))};`;

  function configure(config) {
    if (typeof config === 'string') {
      include = [config];
    } else if (Array.isArray(config)) {
      include = config;
    } else {
      include = config.include || [];
      exclude = config.exclude || [];

      if (config.exports === false) {
        console.log('config.exports === false');
        exporter = path => `import ${JSON.stringify(path)};`;
      }
    }
    console.log(`configured: '${JSON.stringify(config)}'`);
  }

  if (conf) {
    configure(conf);
  }

  return {
    options(options) {
      if (options.input && options.input !== entry) {
        console.log(`configuring with input '${options.input}'`);
        configure(options.input);
      }

      options.input = entry;
    },

    resolveId(id) {
      console.log(`resolveId: ${id}`);
      if (id === entry) {
          //should this be happening?
        return entry;
      }
    },

    load(id) {
      if (id === entry) {
        if (!include.length) {
          return Promise.resolve('');
        }

        const patterns = include.concat(exclude.map(pattern => `!${pattern}`));
        console.log(`patterns: ${JSON.stringify(patterns)}`);
        return promise(patterns, {
          realpath: true
        }).then(paths => {
            console.log(`input paths: ${JSON.stringify(paths)}`);
            const r = paths.map(exporter).join('\n')
            console.log(`processed paths: ${JSON.stringify(r)}`);
            return r;
        });
      }
    }

  };
}


export default {
    input: 'index.js',
    plugins: [
        multiEntry() //this causes a failure in some cases (Windows related?)
    ],
    output: {
        dir: 'dist'
    }
}