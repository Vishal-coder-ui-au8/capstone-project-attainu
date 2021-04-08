import React from "react";
import "../styles/Ttableitem.scss";


const Ttableitem = ({ currentTable}) => {
  let ttableComp = <h1>Loading...</h1>;
  if (currentTable) {
    ttableComp = (
      <div className='ttableitem'>
        <p><small>{currentTable.period} </small></p>        
        <p><strong> {currentTable.subject} </strong></p>
        <p><small> {currentTable.assignedto}</small></p>
        
      </div>
    );
  }
  return ttableComp;
};

export default Ttableitem;