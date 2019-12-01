import React from 'react';
import './User.css';


class User extends React.Component {
  render(){
    return (
      <div class="Business">
        <div className="image-container">
          <img src="https://cdn.mindful.org/Meditation_Goleman.jpg?q=80&fm=jpg&fit=crop&w=1400&h=875" alt=''/>
        </div>
        <h2> User: {this.props.user.first_name} {this.props.user.last_name} </h2>
        <div className="Business-information">
          <div className="Business-address">
            <p>Interested topics: {this.props.user.discuss}</p>
            <span>Would you like to talk to this person? Feel free to schedule a call.</span>
          </div>
          <div className="Business-reviews">

          </div>
            <a href='https://hangouts.google.com/call/6zSRHD0v6TNFpxX1PGcBAEEE'><button>Schedule </button></a>
        </div>
    </div>
    )
  }


}
export default User;
