import { Grid, GridOptions, ICellRendererParams } from 'ag-grid-community';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import { MiniAreaChart } from '../sparkline/miniAreaChart';
import { MiniLineChart } from '../sparkline/miniLineChart';
import { MiniColumnChart } from '../sparkline/miniColumnChart';

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

class HistoryLineChartCellRenderer {
    constructor() { }

    // init method gets the details of the cell to be renderer
    init(params: ICellRendererParams) {

        const sparkline = new MiniLineChart();

        sparkline.width = params.column.getActualWidth() - 34;
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

    // init method gets the details of the cell to be renderer
    init(params: ICellRendererParams) {

        const sparkline = new MiniAreaChart();
        
        sparkline.data = params.value;
        sparkline.width = params.column.getActualWidth() - 34;
        sparkline.height = 40;
        sparkline.marker.fill = '#7cb5ec';
        sparkline.marker.stroke = '#7cb5ec';
        sparkline.marker.enabled = false;
        sparkline.fill = 'rgba(124, 181, 236, 0.25)';
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

class HistoryColumnChartCellRenderer {
    constructor() { }

        sparkline: MiniColumnChart = new MiniColumnChart();

        // init method gets the details of the cell to be renderer
        init(params: ICellRendererParams) {

            const { sparkline } = this;

            sparkline.width = params.column.getActualWidth() - 34;
            sparkline.data = params.value;
            sparkline.height = 40;
            sparkline.fill = '#7cb5ec';
            sparkline.stroke = '#7cb5ec';

            (this as any).eGui = sparkline.getCanvasElement();

            params.api.addGlobalListener(function(type: any, event: any) {
                if (type === 'columnResized' && event.finished) {
                    sparkline.width = event.column.actualWidth - 34;
                }
            });

        }

        updateSparkLine() {

        }
    
        getGui() {
            return (this as any).eGui;
        }
    
        refresh(params: ICellRendererParams): boolean {
            const { sparkline } = this;
            sparkline.data = params.value;
            return true;
        }
}

document.addEventListener('DOMContentLoaded', async () => {
    const gridDiv = document.createElement('div');
    // gridDiv.classList.add('ag-theme-alpine-dark');
    gridDiv.classList.add('ag-theme-alpine');
    gridDiv.style.height = '100px';
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

    gridOptions.api.setRowData(quotes.slice(0, 1));

    const onDataChange = (event: MouseEvent) => {
        console.log(event)
        const randomNumber = Math.random();
        const slicedQuotes = quotes.slice(0,1)
        slicedQuotes.forEach(quote => {
            quote.history = quote.history.map((h: any) => {
                const randomNumber = (Math.random() + 0.8) * 100;
                return h * randomNumber;
            })
        })
        gridOptions.api.setRowData(slicedQuotes);
    }
    const changeDataButton = document.createElement('button');
    changeDataButton.textContent = 'Change History';
    changeDataButton.addEventListener('click', onDataChange);
    document.body.appendChild(changeDataButton);

});