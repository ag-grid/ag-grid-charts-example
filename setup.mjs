import fs from 'fs';
import path from 'path';

fs.symlinkSync(path.resolve('.', '../ag-grid/charts-packages/ag-charts-community/src'), 'charts', 'dir');
fs.symlinkSync(path.resolve('.', '../ag-grid/enterprise-modules/sparklines/src'), 'sparklines', 'dir');