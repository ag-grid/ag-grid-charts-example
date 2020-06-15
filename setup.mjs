import fs from 'fs';
import path from 'path';

fs.symlinkSync(path.resolve('.', '../../charts-packages/ag-charts-community/src'), 'charts', 'dir');