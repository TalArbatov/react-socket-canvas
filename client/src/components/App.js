import React, {useState} from 'react';
import Canvas from './Canvas'
import Colors from './Colors'
import io from 'socket.io-client';


class App extends React.PureComponent {
    state = {
        color: 'black',
     
    }
  
   


    render() {
        return(
            <div>
                <Colors changeColor={color => this.setState({color})}></Colors>
                <Canvas  color={this.state.color}/>
            </div>
        )
    }
}


export default App;