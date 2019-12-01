import React from 'react';
import './CreateWorkshop.css';
import DateTimePicker from 'react-datetime-picker';

import axios, { post } from 'axios';

class CreateWorkshop extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        created: "",
        date: new Date(),
        imgFile: null,
        description: '',
        title: '',
        speaker: '',
        sortBy: 'best_match'
      };
      this.sortByOptions = {
        'Best Match': 'Workshops',//'best_match',
        'Highest Rated': '1-on-1',  //rating
      //  'Most Reviewed': 'review_count'
      };
      this.handleTitleChange = this.handleTitleChange.bind(this);
      this.handleSpeakerChange = this.handleSpeakerChange.bind(this);
      this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
      this.handleCreate = this.handleCreate.bind(this);
      this.onFileChange = this.onFileChange.bind(this);
      this.onDateTimeChange = this.onDateTimeChange.bind(this);
      this.onCreateFormSubmit = this.onCreateFormSubmit.bind(this);

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

  handleTitleChange(event){
    this.setState({title: event.target.value});
  }

  handleDescriptionChange(event){
    this.setState({description: event.target.value});
  }

  handleSpeakerChange(event){
    this.setState({speaker: event.target.value});
  }

  onCreateFormSubmit(e){
    e.preventDefault() // Stop form submit
    this.handleCreate().then((response)=>{
      console.log(response.data);
      this.setState({created: "The Workshop has successfully been created!!!"})
    })
  }

  handleCreate(){
    const url = 'http://127.0.0.1:5000/workshops/create';
    console.log("hi");
    const formData = new FormData();

    formData.append('title', this.state.title);
    formData.append('file',this.state.imgFile);
    formData.append('description', this.state.description);
    formData.append('speaker', this.state.speaker);
    formData.append('date', this.state.date);

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
        <h2>Create a Workshop</h2>
        <div className="Workshop-fields">
          <span className="text">Title:</span><input onChange={this.handleTitleChange} placeholder="Title of the Workshop" />
          <span className="text">Description:</span><input onChange={this.handleDescriptionChange} placeholder="Description" />
          <span className="text">Speaker:</span><input onChange={this.handleSpeakerChange} placeholder="Speaker Name" />
          <span className="text">Cover Photo:</span><input type="file" name="myImage" onChange={this.onFileChange} />
          <span className="text">When:</span>
          <div>
          <DateTimePicker onChange={this.onDateTimeChange} value={this.state.date}/>
          </div>
        </div>
        <div onClick={this.onCreateFormSubmit} className="CreateWorkshop-submit">
          <a>Create Workshop</a>
        </div>

        <div>{this.state.created}</div>
      </div>
    )
  }
}

export default CreateWorkshop;
