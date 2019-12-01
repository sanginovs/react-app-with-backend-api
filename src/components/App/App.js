import React from 'react';
import logo from './logo.svg';
import './App.css';
import WorkshopList from '../WorkshopList/WorkshopList';
import SearchBar from '../SearchBar/SearchBar';
import CreateWorkshop from '../CreateWorkshop/CreateWorkshop'
import Register from '../Register/Register'
import UserList from '../UserList/UserList'
import Flask from '../../util/Flask'

const business = {
  imageSrc: 'https://cdn.mindful.org/Meditation_Goleman.jpg?q=80&fm=jpg&fit=crop&w=1400&h=875',
  link: "https://hangouts.google.com/call/8SbN3PCyksqiTyFn4NcFAEEE"
};

const businesses = [
  business,
  business,
  business,
];


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {workshops:  [], users: [], currView: 'view'};
    this.createWorkshop = this.createWorkshop.bind(this);
  }
  handleSubmit = (event) => {
        this.setState({currView: event.target.name });
    }


  createWorkshop(queryString, sortBy){
    Flask.search(queryString, sortBy).then(
      (all_workshops)=>{
        console.log(all_workshops);
        if(sortBy === "Workshops"){
        this.setState({workshops: all_workshops, users:[]});}
        else{this.setState({users: all_workshops, workshops:[]})}
      }
    );
    console.log("works");
  }

  saveWorkshop(formData){
    Flask.saveWorkshop(formData).then(
      (res)=> {console.log("works");}
    )
  }

  render() {

      return (
        <div class="App">

        { this.state.currView === 'view' ?
        (
          <div>
            <h1>explore</h1>
            <div className = "center-this">
            <button className="sample-button" onClick={this.handleSubmit} name="create">Create a Workshop </button>
            <button className="sample-button" onClick={this.handleSubmit} name="login">Login </button>
            <button className="sample-button" onClick={this.handleSubmit} name="register">Register </button>
            </div>
            <SearchBar searchWorkshop={this.createWorkshop}/>
            { this.state.workshops.length ?
            (<WorkshopList workshops = {this.state.workshops}/>) :
            (<UserList users = {this.state.users}/>)}
          </div>
        ) : this.state.currView === "create" ?
            (<CreateWorkshop saveWorkshop={this.saveWorkshop}/>)
        : this.state.currView === "register" ? (<Register/>)
        :  (<h1>Login</h1>)
      }

        </div>
          );

  }
}

export default App;
