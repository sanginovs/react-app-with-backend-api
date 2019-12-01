import React from 'react';
import './Workshop.css';


class Workshop extends React.Component {
  render(){
    return (
      <div class="Business">
        <div className="image-container">
          <img src="https://cdn.mindful.org/Meditation_Goleman.jpg?q=80&fm=jpg&fit=crop&w=1400&h=875" alt=''/>
        </div>
        <h2> {this.props.workshop.title}</h2>
        <h3> {this.props.workshop.description} </h3>
        <div className="Business-information">
          <div className="Business-address">
            <p>{this.props.workshop.schedule}</p>
            <p>Google Hangouts</p>
            <p> Speaker: {this.props.workshop.speaker} </p>

          </div>
          <div className="Business-reviews">

          </div>
            <a href='https://hangouts.google.com/call/6zSRHD0v6TNFpxX1PGcBAEEE'><button>Join </button></a>
        </div>
    </div>
    )
  }


}
export default Workshop;
