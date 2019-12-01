import React from 'react';
import './SearchBar.css';


class SearchBar extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        term: '',
        location: '',
        sortBy: 'Workshops',
        placeholder: "Search for workshops"
      };
      this.sortByOptions = {
        'Many': 'Workshops',//'best_match',
        'One': '1-on-1',  //rating
      //  'Most Reviewed': 'review_count'
      };
      this.handleTermChange = this.handleTermChange.bind(this);
      this.handleLocationChange = this.handleLocationChange.bind(this);
      this.handleSearch = this.handleSearch.bind(this);
  }

  getSortByClass(sortByOption) {
    if(sortByOption === this.state.sortBy){
      return 'active';}
    return '';
  }


  handleSortByChange(sortByOption){
    let text = ""
    if(sortByOption=="Workshops"){
      text = "Search for Workshops"
    }
    else {
      text = "What topic are you interested to talk about?"
    }

    this.setState({sortBy: sortByOption, placeholder: text});
  }

  handleTermChange(event){
    this.setState({term: event.target.value});
  }

  handleLocationChange(event){
    this.setState({location: event.target.value});
  }

  handleSearch(event){
    console.log("hi");
    this.props.searchWorkshop(this.state.term, this.state.sortBy);
    event.preventDefault() //prpevent default action of clicking formSubmit
  }


  renderSortByOptions() { return Object.keys(this.sortByOptions).map(sortByOption => {
    let sortByOptionValue = this.sortByOptions[sortByOption];
    return <li onClick={this.handleSortByChange.bind(this, sortByOptionValue)} className={this.getSortByClass(sortByOptionValue)} key={sortByOption}> {sortByOptionValue} </li>;
  });
    }
  render(){
    return (
      <div className="SearchBar">
        <div className="SearchBar-sort-options">
          <ul>
              {this.renderSortByOptions()}
          </ul>
        </div>
        <div className="SearchBar-fields">
          <input onChange={this.handleTermChange} placeholder={this.state.placeholder} />

        </div>
        <div onClick={this.handleSearch} className="SearchBar-submit">
          <a>Find</a>
        </div>
      </div>
    )
  }
}

export default SearchBar;
