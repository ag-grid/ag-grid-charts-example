import * as React from 'react';
import { useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom';
import { AgChart } from "../../charts/chart/agChart";
import { AgCartesianChartOptions, AgChartOptions } from "../../charts/chart/agChartOptions";
import { CartesianChart } from "../../charts/chart/cartesianChart";

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
        this.chart = AgChart.create(this.props.options as AgCartesianChartOptions);
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
    const [theme, setTheme] = useState(undefined);

    return (
        <div>
            <AgChartReact
                options={{
                    theme,
                    container: document.body,
                    width: 600,
                    height: 400,
                    data,
                    series: [{
                        xKey: 'month',
                        yKey: 'revenue'
                    }],
                    axes: [{
                        type: 'category',
                        position: 'bottom'
                    }, {
                        type: 'number',
                        position: 'left'
                    }],
                    legend: {
                        item: {
                            marker: {
                                size: markerSize
                            }
                        }
                    }
                }}
            />
            <p>chart.legend.markerSize: {markerSize}</p>
            <button onClick={() => setMarkerSize(markerSize + 3)}>
                Increase marker size
            </button>
            <button onClick={() => setMarkerSize(15)}>
                Reset marker size
            </button>
            <button onClick={() => { setData([]) }}>
                Remove data
            </button>
            <button onClick={() => { setData(chartData) }}>
                Set data
            </button>
            <button onClick={() => { setTheme('pastel-dark') }}>
                Use 'pastel-dark' theme
            </button>
            <button onClick={() => { setTheme(undefined) }}>
                Use default theme
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
