# rollup-bug
Multi-entry plugin bug minimal repro.

`npm run build` will build invoking multi-entry plugin, which doesn't work on my Windows 10 system.

`npm run nobug` will run (with a call to the plugin but without passing the result to be used anywhere), which works ok.
