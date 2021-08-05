import { Grid, GridOptions } from 'ag-grid-community';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const symbols: string[] = [
    'AAPL',
    'MSFT',
    'BA',
    'C',
    'QFIN',
    'BABA',
    'LRCX',
    'JD',
    'TTD',
    'ENPH',
    'FSLY',
    'DIDI',
    'AMZN',
    'TSLA',
    'DIS',
    'PG',
    'JNJ',
    'INTC',
    'AVGO',
    'PFE',
    'V',
    'MA',
    'BAC',
    'JPM',
    'WMT',
    'GE',
    'NFLX',
    'GOOGL',
    'FB',
    'VZ',
    'T'
];

function getQuotes(symbols: string[]) {
    return Promise.all(symbols.map(s => fetch(`http://localhost:8081/quote/${s}`).then(response => response.json())));
}

class HistoryCellRenderer {
    constructor() { }

    // init method gets the details of the cell to be renderer
    init(params: any) {
        const canvas = document.createElement('canvas');
        canvas.width = params.column.actualWidth;
        canvas.height = 40;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'yellow';
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, (canvas.height - 4) / 2, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        (this as any).eGui = canvas;
        // sparkline.data = params.value;
    }

    getGui() {
        return (this as any).eGui;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const gridDiv = document.createElement('div');
    gridDiv.style.height = '500px';
    gridDiv.style.width = '1000px';
    gridDiv.classList.add('ag-theme-alpine');
    gridDiv.style.height = '800px';
    document.body.appendChild(gridDiv);

    const columnDefs = [
        { field: 'symbol' },
        { field: 'shortName' },
        { field: 'bid' },
        { field: 'ask' },
        { field: 'history', cellRenderer: 'historyCellRenderer' }
    ];

    getQuotes(symbols).then(quotes => {
        console.log(quotes);
        for (let i = 0; i < 5; i++) {
            quotes.push(...quotes);
        }
        const gridOptions: GridOptions = {
            columnDefs: columnDefs,
            defaultColDef: {
                resizable: true
            },
            components: {
                historyCellRenderer: HistoryCellRenderer
            },
            rowData: quotes
        };

        new Grid(gridDiv, gridOptions);
    });
});