# rollup-bug
Multi-entry plugin bug minimal repro.

`npm run build` will build invoking multi-entry plugin, which doesn't work on my Windows 10 system, although it appears fine on mac & repl.it.

`npm run nobug` will run (with a call to the plugin but without passing the result to be used anywhere), which works ok.

---
## additional:
The result of the build also exhibits the property of removing arguments from function calls to a global variable which is declared, but not assigned, in the input source.  I'm not sure if this is a bug or a feature (well, it's definitely *not* a feature, but may be a well-defined result of some aspect of rollup's design I'm unfamiliar with), or how it'd be possible to configure rollup to behave differently (unfortunately, I have a code-base with quite a lot of this stuff in it...).
