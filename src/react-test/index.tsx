import * as React from 'react';
import { useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom';
import { CartesianChart, CategoryAxis, ChartAxisPosition, ColumnSeries } from "ag-charts-community";
import { NumberAxis } from "ag-charts-community/dist/cjs/chart/axis/numberAxis";
import { Legend } from "ag-charts-community/dist/cjs/chart/legend";

const CounterExample = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = `You clicked ${count} times`;
    });

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
};

const Index = () => {
    return <div>Hello ag-Grid!</div>;
};

const DateComponent = (props: any) => React.createElement("time", { dateTime: props.iso8601Date }, props.message);

// class Clock extends React.Component {
//     constructor(props: any) {
//         super(props);
//         this.state = {date: new Date()};
//     }
//
//     render() {
//         return (
//             <div>
//                 <h1>Hello, world!</h1>
//                 <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
//             </div>
//         );
//     }
// }

// ReactDOM.render(
//     <Clock />,
//     document.getElementById('root')
// );

export interface Props {
    /** The user's name */
    name: string;
    /** Should the name be rendered in bold */
    priority?: boolean
}

const PrintName: React.FC<Props> = (props) => {
    return (
        <div>
            <p style={{ fontWeight: props.priority ? "bold" : "normal" }}>{props.name}</p>
        </div>
    )
};

export interface NameFormProps {
    // value: string;
}

export interface NameFormState {
    value: string;
}

class NameForm extends React.Component<NameFormProps, NameFormState> {
    constructor(props: NameFormProps) {
        super(props);
        this.state = {
            value: ''
        };
    }

    handleChange = (event: any) => {  //  React.FormEvent<HTMLInputElement>
        this.setState({value: event.target.value.toUpperCase()});
    };

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

interface AgLegendProps {
    enabled?: boolean;
    padding?: number;
    itemPaddingX?: number;
    itemPaddingY?: number;
    markerSize?: number;
    markerStrokeWidth?: number;
    labelColor?: string;
    labelFontFamily?: string;
}

interface AgChartProps {
    width?: number;
    height?: number;
    data?: any[];
    legend?: AgLegendProps;
}

interface AgChartState {

}

class AgChartReact extends React.Component<AgChartProps, AgChartState> {
    constructor(props: AgChartProps) {
        super(props);

        this.state = {

        };
    }

    render() {
        return React.createElement('div', null);
    }

    private chart: CartesianChart;

    componentDidMount() {
        const props = this.props;

        const chart = new CartesianChart();
        chart.parent = document.body;
        this.chart = chart;

        const bottomAxis = new CategoryAxis();
        bottomAxis.position = ChartAxisPosition.Bottom;

        const leftAxis = new NumberAxis();
        leftAxis.position = ChartAxisPosition.Left;

        chart.axes = [bottomAxis, leftAxis];

        const columnSeries = new ColumnSeries();
        columnSeries.xKey = 'x';
        columnSeries.yKeys = ['y1', 'y2', 'y3'];

        chart.series = [columnSeries];

        chart.width = props.width;
        chart.height = props.height;
        chart.data = props.data;


        // Need to set chart properties only when corresponding React props are defined.
        // However, `undefined` may be a value you actually want to set,
        // like remove the existing label formatter function.
        if (props.legend) {
            if (props.legend.enabled === undefined) {
                chart.legend.enabled = Legend.defaults.enabled;
            } else {
                chart.legend.enabled = props.legend.enabled;
            }
            // chart.legend.padding = props.legend.padding;
            // chart.legend.itemPaddingX = props.legend.itemPaddingX;
            // chart.legend.itemPaddingY = props.legend.itemPaddingY;
            // chart.legend.markerSize = props.legend.markerSize;
            // chart.legend.markerStrokeWidth = props.legend.markerStrokeWidth;
        }
    }

    processPropsChanges(prevProps: Readonly<AgChartProps> & Readonly<{ children?: React.ReactNode }>, nextProps: Readonly<AgChartProps>) {
        this.chart.width = nextProps.width;
        this.chart.height = nextProps.height;
        this.chart.data = nextProps.data;
    }

    shouldComponentUpdate(nextProps: Readonly<AgChartProps>, nextState: Readonly<AgChartState>, nextContext: any): boolean {
        this.processPropsChanges(this.props, nextProps);
        return false;
    }
}

const chartData = [{
    x: 'Bob',
    y1: 10,
}, {
    x: 'Joe',
    y1: 4,
}, {
    x: 'John',
    y1: 7,
}] as any[];

// Need more granular control
// How to specify axes and series? And anything not on the top level.

const ChartExample = () => {
    const [width, setWidth] = useState(500);
    const [data, setData] = useState(chartData);

    useEffect(() => {
        document.title = `The chart width is ${width}px`;
    });

    return (
        <div>
            <AgChartReact
                width={width}
                height={500}
                data={data}
                legend={{
                    // enabled: false
                }}
            />
            <p>The chart width is {width}px</p>
            <button onClick={() => setWidth(width + 100)}>
                Increase width
            </button>
            <button onClick={() => { setData([{x: 'Mary', y1: 5, y2: 3, y3: 1}, {x: 'Ann', y1: 7, y2: 4, y3: 2}]) }}>
                Set data
            </button>
        </div>
    );
};

document.addEventListener('DOMContentLoaded', () => {
    const app = document.createElement('div');
    app.id = 'app';
    document.body.appendChild(app);

    // ReactDOM.render(<Index/>, document.getElementById('app'));
    ReactDOM.render(<PrintName name="Ned" priority />, app);
    // ReactDOM.render(<CounterExample/>, app);
    // ReactDOM.render(<NameForm/>, app);

    // ReactDOM.render(<AgChartReact width={500} height={500} data={chartData}/>, app);
    ReactDOM.render(<ChartExample/>, app);

    // class Hello extends React.Component {
    //     render() {
    //         return React.createElement('div', null, `Hello ${(this.props as any).toWhat}`);
    //     }
    // }

    // ReactDOM.render(
    //     React.createElement(Hello, {toWhat: 'World'}, null),
    //     document.getElementById('root')
    // );
});
