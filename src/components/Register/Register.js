import React from 'react';
import './Register.css';

import axios, { post } from 'axios';

class Register extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        username: '',
        password: '',
        created: "",
        imgFile: null,
        last_name: '',
        first_name: '',
        discuss: ''
      };
      this.sortByOptions = {
        'Best Match': 'Workshops',//'best_match',
        'Highest Rated': '1-on-1',  //rating
      //  'Most Reviewed': 'review_count'
      };
      this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
      this.handleDiscussChange = this.handleDiscussChange.bind(this);
      this.handleLastNameChange = this.handleLastNameChange.bind(this);
      this.handleCreate = this.handleCreate.bind(this);
      this.onFileChange = this.onFileChange.bind(this);
      this.onCreateFormSubmit = this.onCreateFormSubmit.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this.handleUsernameChange = this.handleUsernameChange.bind(this);
  }

  onDateTimeChange = date => this.setState({ date })


  getSortByClass(sortByOption) {
    if(sortByOption === this.state.sortBy){
      return 'active';}
    return '';
  }

  handleSortByChange(sortByOption){
    this.setState({sortBy: sortByOption});
  }

  handleFirstNameChange(event){
    this.setState({first_name: event.target.value});
  }

  handleLastNameChange(event){
    this.setState({last_name: event.target.value});
  }

  handleDiscussChange(event){
    this.setState({discuss: event.target.value});
  }

  handleUsernameChange(event){
    this.setState({username: event.target.value});
  }
  handlePasswordChange(event){
    this.setState({password: event.target.value});
  }
  onCreateFormSubmit(e){
    e.preventDefault() // Stop form submit
    this.handleCreate().then((response)=>{
      console.log(response.data);
      this.setState({created: "Your account has been created!!!"})
    })
  }


  handleCreate(){
    const url = 'http://127.0.0.1:5000/register';
    console.log("hi");
    const formData = new FormData();

    formData.append('first_name', this.state.first_name);
    formData.append('last_name',this.state.last_name);
    formData.append('username', this.state.username);
    formData.append('password', this.state.password);
    formData.append('discuss', this.state.discuss);

    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    return  post(url, formData,config)

    //TODO: createWorkshop method should be created on parent and passed to child
    //create state for each input and pass them as parameter to a function
//    this.props.saveWorkshop(formData);
  }

  onFileChange(event){
    this.setState({imgFile: event.target.files[0]})
  }


  renderSortByOptions() { return Object.keys(this.sortByOptions).map(sortByOption => {
    let sortByOptionValue = this.sortByOptions[sortByOption];
    return <li onClick={this.handleSortByChange.bind(this, sortByOptionValue)} className={this.getSortByClass(sortByOptionValue)} key={sortByOption}> {sortByOptionValue} </li>;
  });
    }

  render(){
    return (
      <div className="Create-Workshop">
        <h2>Create Your Profile</h2>
        <div className="Workshop-fields">

          <span className="text">First Name:</span><input onChange={this.handleFirstNameChange} placeholder="What is your first name?" />
          <span className="text">Last Name:</span><input onChange={this.handleLastNameChange} placeholder="What is your last name?" />
          <span className="text">Username:</span><input onChange={this.handleUsernameChange} placeholder="Username?" />
          <span className="text">Password:</span><input onChange={this.handlePasswordChange} type="password" placeholder="Choose a strong password" />

          <span className="text">Topics:</span><input onChange={this.handleDiscussChange} placeholder="What topics are you interested to talk about?" />
          <span className="text">Profile Picture:</span><input type="file" name="myImage" onChange={this.onFileChange} />

        </div>
        <div onClick={this.onCreateFormSubmit} className="CreateWorkshop-submit">
          <a>Register</a>
        </div>

        <div>{this.state.created}</div>
      </div>
    )
  }
}

export default Register;
