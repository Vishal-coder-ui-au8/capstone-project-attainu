import React, {Component} from "react";


class FeeItem extends Component { 

    constructor() {
        super();
        this.state = {      
          
        };
        
    }  

    
      render() {
          if(this.props.currentStudent) {
              console.log(this.props.currentStudent);
        return (
          <tr >
          
           {this.props.currentStudent.name} 
          <button> Edit </button>
           
          </tr>
          
        );
        }
        else {
        return (
        
            <div> 
                
                
            </div>
        
        )
        }
      }
}
  



export default FeeItem