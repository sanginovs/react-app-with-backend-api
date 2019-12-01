import React from 'react';
import './WorkshopList.css';
import Workshop from '../Workshop/Workshop';


class WorkshopList extends React.Component {
  render(){
    return (
      <div className="WorkshopList">
      {
          this.props.workshops.map(workshop => {
            return <Workshop key={workshop.id} workshop={workshop} />
          })
        }
      </div>
    )
  }
}


export default WorkshopList;
