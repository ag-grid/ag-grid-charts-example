import {Grid, GridOptions} from 'ag-grid-community';

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
];

function getQuotes(symbols: string[]) {
    return Promise.all(symbols.map(s => fetch(`http://localhost:8081/quote/${s}`).then(response => response.json())));
}

document.addEventListener('DOMContentLoaded', () => {
    const gridDiv = document.createElement('div');
    gridDiv.style.height = "500px";
    gridDiv.style.width = "500px";
    gridDiv.classList.add('ag-theme-alpine');

    document.body.appendChild(gridDiv);

    const columnDefs = [
        { field: "symbol" },
        { field: "shortName" },
        { field: "bid" },
        { field: "ask" }
    ];

    const gridOptions: GridOptions = {
        columnDefs: columnDefs,
        rowData: []
    };

    new Grid(gridDiv, gridOptions);

    // getQuotes(symbols).then(quotes => {
    //     console.log(quotes);
    //     const gridOptions: GridOptions = {
    //         columnDefs: columnDefs,
    //         rowData: quotes
    //     };

    //     new agGrid.Grid(gridDiv, gridOptions);
    // });
});
