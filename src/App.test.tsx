import React from 'react';
import {render, screen} from '@testing-library/react';
import {SamuraiJSApp} from './App';
import ReactDOM from "react-dom";

test('renders without crashing', () => {
    render(<SamuraiJSApp/>);
    const div = document.createElement('div');
    ReactDOM.render(<SamuraiJSApp/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
