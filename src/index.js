import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Link, Route } from 'react-router-dom';
import axios from 'axios';


// import { createStore } from 'redux';
// // use redux to create components
// // component: page
// // nav bar: page numbers
// // by clicking on page number, the webpage should render a list of employee
// // base case: create one page and render some list
// const reducer = (state = [], action) => {
//     if (action.type === 'SET_PAGE') {
//         state = action.data;
//     }
//     return state;
// };

// const store = createStore(reducer)


//const pageOne = () => <div>page one</div>

class App extends Component {
    constructor(){
        super();
        this.state = {
            employees: [],
        }
    }

    componentDidMount(){
        //how to fetch data from a local database?
        axios.get('/api/employees')
        .then(response => response.data)
        .then(data => {
            this.setState({ employees: data})
            //console.log(this.state)
        })
    }

    render() {
        const { employees } = this.state
        //console.log(employees)
        return (
            <HashRouter>
                <h1>Acme Pager</h1>
                <Header />
                <Route path='/0' render={() => <Page {...this.state}/>} />
            </HashRouter>
        )
    }
}

const Header = () => {
    return (
        <div
        style ={{
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
//render all employee's first name on one page
class Page extends Component {
    constructor(props){
        super(props);
        this.state = {
            employees: this.props.employees,
        }
        console.log(this.props)
    }
    
    render(){
        const { employees } = this.state;
        //console.log(employees)
        return(
            <ul>
                {employees.map(employee => {
                    return <li key={employee.id}>
                    {employee.firstName}
                    </li>
                })}
            </ul>
        )
    }
}

const rootEl = document.querySelector('#root');

ReactDOM.render(<App />, rootEl);
