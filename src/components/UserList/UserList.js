import React from 'react';
import './UserList.css';
import User from '../User/User';


class UserList extends React.Component {
  render(){
    return (
      <div className="WorkshopList">
      {
          this.props.users.map(user => {
            return <User key={user.id} user={user} />
          })
        }
      </div>
    )
  }
}


export default UserList;
