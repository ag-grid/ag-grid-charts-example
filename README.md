# ag-grid-charts-example

Run `lerna bootstrap` to link required npm modules.

Run `npm run bundleAll` to perform full TypeScript compilation and bundle all examples, which can then be accessed in the `dist` folder.

Run `npm run bundleOneAndWatch` to only transpile and bundle - no type checking will be performed.

If you are actively developing a particular example, you can specify the example to build by calling

`npm run bundleOneAndWatch -- --env.example=your-example-name`

This will build only the specified example, but type-checking will be performed, and watch mode will automatically be enabled. Alternatively, you can rename an example folder to `_` (one underscore) to achieve the same, but make sure not to check in this state!