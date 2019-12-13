import * as React from 'react';
import * as ReactDOM from 'react-dom';

const Index = () => {
    return <div>Hello ag-Grid!</div>;
};

document.addEventListener('DOMContentLoaded', () => {
    const app = document.createElement('div');
    app.id = 'app';
    document.body.appendChild(app);

    ReactDOM.render(<Index/>, document.getElementById('app'));
});
