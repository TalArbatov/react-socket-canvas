import React, {useState} from 'react';
import Canvas from './Canvas'
import Colors from './Colors'
import io from 'socket.io-client';


class App extends React.PureComponent {
    state = {
        color: 'black',
        size: 'small'
    }
  
   


    render() {
        return(
            <div>
                <Colors changeSize={size => this.setState({size})} changeColor={color => this.setState({color})}></Colors>
                <Canvas  color={this.state.color} size={this.state.size}/>
            </div>
        )
    }
}


export default App;