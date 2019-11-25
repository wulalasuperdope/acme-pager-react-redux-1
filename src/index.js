import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Link, Route } from 'react-router-dom';
import axios from 'axios';

//redux
/*
import { createStore } from 'redux';
// use redux to create components
// component: page
// nav bar: page numbers
// by clicking on page number, the webpage should render a list of employee
// base case: create one page and render some list

//define the action as "SET_PAGE" in reducer func, which set new value to the state
const reducer = (state = [], action) => {
    if (action.type === 'SET_PAGE') {
        state = action.data;
    }
    return state;
};
//create a state with initial value as an empty array.
const store = createStore(reducer)

//define the dispatch function: get employees data
const fetchData = async () => {
    return store.dispatch({
        type: 'SET_PAGE',
        data: await axios.get('/api/employees').data
    })
}
const Header = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
            }}
        >
            <div>First Name</div>
            <div>Last Name</div>
            <div>Email</div>
            <div>Title</div>
        </div>
    )
}

//how to create Page component based on the store?

class App extends Component {

    render() {
        return (
            <HashRouter>
                <h1>Acme Pager</h1>
                <Header />
                <Route path='/0' component={Page} />
            </HashRouter>
        )
    }
}
*/

//react only

class App extends Component {
    constructor() {
        super();
        this.state = {
            employees: [],
        }
    }

    componentDidMount() {
        //how to fetch data from a local database?
        axios.get('/api/employees')
            .then(response => response.data)
            .then(data => {
                console.log('received data from api')
                this.setState({ employees: data.rows })
                //console.log(this.state)
            })
    }

    render() {
        //const { employees } = this.state

        console.log('App rendering. ', 'state=', this.state)
        return (
            <HashRouter>
                <h1>Acme Pager</h1>
                <Route path='/0' render={() => <Page {...this.state} />} />
            </HashRouter>
        )
    }
}

//render all employee's first name on one page
class Page extends Component {
    constructor(props) {
        console.log('Page initializing')
        super(props);
        //console.log(props)
        this.state = {
            employees: this.props.employees,
        }
    }

    componentWillReceiveProps(props) {
        console.log('Page received new props', props);
        // recieving new props does not trigger a rerender
        // we have to force the update by changing the state
        // UNCOMMENT BELOW
        console.log('setting Page state from new props')
        this.setState({ employees: props.employees });
    }


    render() {
        const { employees } = this.state;
        // react might rerender the component but that
        // doesnt mean it will append it to the actual DOM (if a parent component rerenders it can trigger the children to also rerender)
        // the only way to make it show on the page is to change the state
        console.log('Page rendering.  ', 'state=', this.state);
        return (
            <div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
                    <div>First Name</div>
                    <div>Last Name</div>
                    <div>Email</div>
                    <div>Title</div>
                </div>

                <ul>
                    {employees.map(employee => {
                        return <li key={employee.id} style={{
                            display: 'flex',
                            flexDirection: 'row',
                        }}>
                            <div>{employee.firstName}</div>
                            <div>{employee.lastName}</div>
                            <div>{employee.email}</div>
                            <div>{employee.title}</div>
                        </li>
                    })}
                </ul>
            </div>
        )
    }
}


const rootEl = document.querySelector('#root');

ReactDOM.render(<App />, rootEl);
