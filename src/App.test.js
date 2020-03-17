import React from 'react';
import {render, fireEvent, act, prettyDOM} from '@testing-library/react';
import App from './App';
import {Header} from "./components/header";
import {Lists} from "./components/lists";

const element = () => {
    return <button>test</button>
};

test('renders App-component', () => {
    const {getByTestId} = render(<App/>);
    const app = getByTestId('App');
    expect(app).toBeInTheDocument();
});

test('renders AppBar', () => {
    const {getByTestId} = render(<App/>);
    const appBar = getByTestId('AppBar');
    expect(appBar).toBeInTheDocument();
});

test('doesn\'t render Tooltip', () => {
    const {container} = render(<App/>);
    const tooltip = container.querySelector('tooltip');
    expect(tooltip).not.toBeInTheDocument();
});

test('renders Lists', () => {
    const {getByTestId} = render(<App/>);
    const lists = getByTestId('Lists');
    expect(lists).toBeInTheDocument();
});

test('Header renders children from prop', () => {
    const {getByText} = render(<Header children={element}/>);
    const button = getByText('test');
    expect(button).toBeInTheDocument();
});

describe('Lists with empty localStorage', () => {
    beforeEach(() => {
        Object.defineProperty(window, "localStorage", {
            value: {
                getItem: jest.fn(() => null),
                setItem: jest.fn(() => null)
            },
            writable: true
        });
    });
    test('Lists try to get value from localStorage', () => {
        render(<Lists/>);
        expect(window.localStorage.getItem).toHaveBeenCalled()
    });

    test('Lists save values in localStorage', async () => {
        const {container, getAllByTestId} = render(<Lists/>);
        const input = container.querySelectorAll('input')[0];
        fireEvent.change(input, {target: {value: 'first task'}});
        const button = getAllByTestId('button')[0];
        await act(async () => {fireEvent.click(button)});
        expect(window.localStorage.setItem).toHaveBeenCalled()
    })
});

describe('Lists with something in localStorage', () => {
  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => JSON.stringify({open:[{name:'something', description:'', id:'1'}]})),
        setItem: jest.fn(() => null)
      },
      writable: true
    });
  });
  test('Lists get value from localStorage', () => {
    const {getByText} = render(<Lists/>);
    const task = getByText('something');
    expect(window.localStorage.getItem).toHaveBeenCalled();
    expect(task).toBeInTheDocument()
  });
});
