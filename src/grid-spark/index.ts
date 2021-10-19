import { Component, Grid, GridOptions, ICellRendererParams } from 'ag-grid-community';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import { AreaSparkline } from '../sparkline/area/areaSparkline';
import { LineSparkline } from '../sparkline/line/lineSparkline';
import { ColumnSparkline } from '../sparkline/bar-column/columnSparkline';

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
function getHistory(symbols: string[]) {
    return Promise.all(symbols.map(s => fetch(`http://localhost:8081/history/${s}`).then(response => response.json())));
}

class HistoryLineChartCellRenderer  {

    // init method gets the details of the cell to be renderer
    init(params: ICellRendererParams) {

        const sparkline = new LineSparkline();

        sparkline.width = params.column!.getActualWidth() - 34;
        sparkline.data = params.value;
        sparkline.height = 40;
        sparkline.marker.fill = '#7cb5ec';
        sparkline.marker.stroke = '#7cb5ec';
        sparkline.line.stroke = '#7cb5ec';

        (this as any).eGui = sparkline.getCanvasElement();


        params.api.addGlobalListener(function(type: any, event: any) {
            if (type === 'columnResized' && event.finished) {
                sparkline.width = event.column.actualWidth - 34;
            }
        });
    }

    getGui() {
        return (this as any).eGui;
    }

    refresh(params: ICellRendererParams): boolean {
        return true;
    }
}

class HistoryAreaChartCellRenderer {
    constructor() { }

    private eGui?: HTMLElement;
    // init method gets the details of the cell to be renderer
    init(params: ICellRendererParams) {

        const sparkline = new AreaSparkline();

        sparkline.data = params.value;
        sparkline.width = params!.column!.getActualWidth() - 34;
        sparkline.height = 40;
        sparkline.marker.fill = '#7cb5ec';
        sparkline.marker.stroke = '#7cb5ec';
        // sparkline.marker.enabled = false;
        sparkline.fill = 'rgba(124, 181, 236, 0.25)';
        sparkline.line.stroke = '#7cb5ec';

        this.eGui = sparkline.getCanvasElement();

        params.api.addGlobalListener(function(type: any, event: any) {
            if (type === 'columnResized' && event.finished) {
                sparkline.width = event.column.actualWidth - 34;
            }
        });
    }

    getGui() {
        return this.eGui;
    }

    refresh(params: ICellRendererParams): boolean {
        return true;
    }
}

class HistoryColumnChartCellRenderer {

    sparkline: ColumnSparkline = new ColumnSparkline();

    // init method gets the details of the cell to be renderer
    init(params: ICellRendererParams) {

        const { sparkline } = this;

        sparkline.width = params.column!.getActualWidth() - 34;
        sparkline.data = params.value;
        sparkline.height = 40;
        sparkline.fill = '#7cb5ec';
        sparkline.stroke = '#7cb5ec';

        params.api.addGlobalListener(this.updateWidth.bind(this));

    }

    // Return the DOM element in this function for the grid to use
    getGui() {
        return this.sparkline.getCanvasElement()
    }

    updateWidth(type: any, event: any) {
        if (type === 'columnResized' && event.finished) {
            this.sparkline.width = event.column.actualWidth - 34;
        }
    }

    updateSparkLine() {

    }

    refresh(params: ICellRendererParams): boolean {
        // const { sparkline } = this;
        // sparkline.data = params.value;
        console.log('refresh called')
        return true;
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const gridDiv = document.createElement('div');
    gridDiv.classList.add('ag-theme-alpine-dark');
    // gridDiv.classList.add('ag-theme-alpine');
    gridDiv.style.height = '800px';
    document.body.appendChild(gridDiv);

    const columnDefs = [
        { field: 'symbol' },
        { field: 'shortName' },
        { field: 'history', headerName: 'History Line Chart', cellRenderer: HistoryLineChartCellRenderer },
        { field: 'history', headerName: 'History Area Chart', cellRenderer: HistoryAreaChartCellRenderer },
        { field: 'history', headerName: 'History Column Chart', cellRenderer: HistoryColumnChartCellRenderer },
    ];

    const quotes = await getQuotes(symbols);
    const history = await getHistory(symbols);

    const mappedHistory =  history.map(eod => eod.map((d: any) => +d.Close));

    quotes.forEach((q, i) => {
        q.history = mappedHistory[i];
    })

    for (let i = 0; i < 5; i++) {
        quotes.push(...quotes);
    }

    const gridOptions: GridOptions = {
        columnDefs: columnDefs,
        defaultColDef: {
            resizable: true
        },
        // rowData: quotes,
        // rowBuffer: 1000
    };

    new Grid(gridDiv, gridOptions);

    gridOptions.api!.setRowData(quotes);

    const onDataChange = (event: MouseEvent) => {
        quotes.forEach(quote => {
            quote.history.shift();
            quote.history.push(quote.history[quote.history.length -1] * (Math.random() + 0.5));
        })
        gridOptions.api!.setRowData(quotes);
    }
    const changeDataButton = document.createElement('button');
    changeDataButton.textContent = 'Change History';
    document.body.appendChild(changeDataButton);
    changeDataButton.addEventListener('click', onDataChange);
});