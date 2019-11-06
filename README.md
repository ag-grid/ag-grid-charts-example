# ag-grid-charts-example

Run `npm run bundle` to perform full TypeScript compilation and bundle all examples, which can then be accessed in the `dist` folder.

Run `npm run bundleQuick` to only transpile and bundle - no type checking will be performed.

If you are actively developing a particular example, rename the example folder to `_` (one underscore). Now when you run the builds,
only this example will be built, type-checking will be performed, and watch mode will automatically be enabled. Make sure not to
check in this state!