# rollup-bug
Multi-entry plugin bug minimal repro.

`npm run build` will build invoking multi-entry plugin, which doesn't work on my Windows 10 system, although it appears fine on mac & repl.it.

`npm run nobug` will run (with a call to the plugin but without passing the result to be used anywhere), which works ok.

`npm run inlinemulti` uses a copy of the code from the module directly in the config file, with some `console.log` statements littered about.

Output from the version with comments looks like this on my Windows system:
```
C:\code\rollup-bug>npm run inlinemulti

> rollup-bug@1.0.0 inlinemulti C:\code\rollup-bug
> rollup -c rollup.config.inlinemulti.js


index.js → dist...
configuring with input 'index.js'
configured: '"index.js"'
patterns: ["index.js"]
input paths: ["C:\\code\\rollup-bug\\index.js"]
processed paths: "export * from \"C:\\\\code\\\\rollup-bug\\\\index.js\";"
[!] Error: ENOENT: no such file or directory, open 'C:\code\rollup-bug\dist\@rollup:plugin-multi-entry:entry-point.js'
Error: ENOENT: no such file or directory, open 'C:\code\rollup-bug\dist\@rollup:plugin-multi-entry:entry-point.js'

npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! rollup-bug@1.0.0 inlinemulti: `rollup -c rollup.config.inlinemulti.js`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the rollup-bug@1.0.0 inlinemulti script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\peter\AppData\Roaming\npm-cache\_logs\2020-01-10T09_40_02_865Z-debug.log

```

---
## additional:
The result of the build also exhibits the property of removing arguments from function calls to a global variable which is declared, but not assigned, in the input source.  I'm not sure if this is a bug or a feature (well, it's definitely *not* a feature, but may be a well-defined result of some aspect of rollup's design I'm unfamiliar with), or how it'd be possible to configure rollup to behave differently (unfortunately, I have a code-base with quite a lot of this stuff in it...).
