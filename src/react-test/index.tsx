import * as React from 'react';
import { useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom';
import { CartesianChart, CategoryAxis, ChartAxisPosition, ColumnSeries } from "ag-charts-community";
import { NumberAxis } from "ag-charts-community/dist/cjs/chart/axis/numberAxis";
import { Legend } from "ag-charts-community/dist/cjs/chart/legend";
import { AgChart } from "ag-charts-community/src/chart/agChart";

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

interface AgChartOptions {
    width?: number;
    height?: number;
    data?: any[];
    series: {
        type?: string;
        xKey: string;
        yKey: string;
    }[];
    legend?: AgLegendProps;
}

interface AgChartProps {
    options: AgChartOptions;
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

        this.chart = AgChart.create(props.options);
    }

    processPropsChanges(prevProps: Readonly<AgChartProps> & Readonly<{ children?: React.ReactNode }>, nextProps: Readonly<AgChartProps>) {
        AgChart.update(this.chart, nextProps.options);
    }

    shouldComponentUpdate(nextProps: Readonly<AgChartProps>, nextState: Readonly<AgChartState>, nextContext: any): boolean {
        this.processPropsChanges(this.props, nextProps);
        return false;
    }
}

const chartData = [{
    month: 'Jan',
    revenue: 155000,
    profit: 33000
}, {
    month: 'Feb',
    revenue: 123000,
    profit: 35500
}, {
    month: 'Mar',
    revenue: 172500,
    profit: 41000
}, {
    month: 'Apr',
    revenue: 185000,
    profit: 50000
}];

// Need more granular control
// How to specify axes and series? And anything not on the top level.

const ChartExample = () => {
    const [markerSize, setMarkerSize] = useState(15);
    const [data, setData] = useState(chartData);

    return (
        <div>
            <AgChartReact
                options={{
                    data,
                    series: [{
                        xKey: 'month',
                        yKey: 'revenue'
                    }],
                    legend: {
                        markerSize
                    }
                }}
            />
            <p>chart.legend.markerSize: {markerSize}</p>
            <button onClick={() => setMarkerSize(markerSize + 3)}>
                Increase marker size
            </button>
            <button onClick={() => setMarkerSize(undefined)}>
                Set marker size to undefined
            </button>
            <button onClick={() => { setData([]) }}>
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
