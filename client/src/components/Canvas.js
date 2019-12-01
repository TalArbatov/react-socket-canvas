import React, { Component, createRef } from "react";
import styled from "styled-components";
import ReactDOM from "react-dom";
import io from 'socket.io-client'
import config from '../../../config';
const socketURL = config.socketURI

const CanvasWrapper = styled.div`
    overflow:hidden;
    height:100%;
`

class Canvas extends Component {
  state = {
    socket: null,
    isPainting: false,
    coordinates: {
      x: null,
      y: null
    }
  };

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }
  newContext = null;
  canvas = null;
  componentDidMount() {
    this.initSocket();

    const canvas = ReactDOM.findDOMNode(this.refs.myCanvas);
    // console.log("canvas");
    // console.log(canvas.getContext("2d"));
    //this.setState({canvas, context: canvas.getContext('2d')});
    // this.setState({color: this.props.color})
    this.canvas = canvas;
    this.newContext = canvas.getContext("2d");
    canvas.setAttribute("width", window.innerWidth);
    canvas.setAttribute("height", window.innerHeight);
    //events
    canvas.addEventListener("mousedown", this.startPaint);
    canvas.addEventListener("touchstart", this.startPaint);

    canvas.addEventListener("mousemove", this.paint);
    canvas.addEventListener("touchmove", this.paint);


    canvas.addEventListener("mouseleave", this.exit);
    canvas.addEventListener("mouseup", this.exit);
    canvas.addEventListener("touchend", this.exit);

  }

  initSocket = () => {
    const socket = io(socketURL);
    socket.on('connect', () => {
        console.log('connected');
        socket.emit('connectionStart', 'test from client')
        this.setState({socket})

        socket.on('draw_from_server', message => {
            console.log('draw_from_server');
            const {oldX, oldY, newX, newY, color} = message;
            this.drawLine(oldX, oldY, newX, newY, color);
        })

    })
}


  getCoordinates = event => {
    // check to see if mobile or desktop
    if (["mousedown", "mousemove"].includes(event.type)) {
      // click events
      return [
        event.pageX - this.canvas.offsetLeft,
        event.pageY - this.canvas.offsetTop
      ];
    } else {
      // touch coordinates
      return [
        event.touches[0].pageX - this.canvas.offsetLeft,
        event.touches[0].pageY - this.canvas.offsetTop
      ];
    }
  };

  startPaint = e => {
    //   console.log('startPaint')
    // change the old coordinates to the new ones*
    this.setState({ isPainting: true });
    let coordinates = this.getCoordinates(e);
    // console.log('startPaint: ' + coordinates)
    this.setState({
      coordinates: {
        x: coordinates[0],
        y: coordinates[1]
      }
    });
  };

  drawLine = (firstX, firstY, secondX, secondY, color) => {
    //    console.log(this.state.context)
    // set the attributes of the line*
    const newContext = {
      ...this.state.context,
      strokeStyle: this.props.color,
      lineJoin: "round",
      linWidth: 5
    };
    this.setState({
      context: newContext
    });
    this.newContext.strokeStyle = color;
    this.newContext.lineJoin = "round";
    if(this.props.size === 'small')
      this.newContext.lineWidth = 5;
    if(this.props.size === 'medium')
      this.newContext.lineWidth = 10;
    if(this.props.size === 'big')
      this.newContext.lineWidth = 20;
    this.newContext.beginPath();
    this.newContext.moveTo(secondX, secondY);
    this.newContext.lineTo(firstX, firstY);
    this.newContext.closePath();

    // actually draw the path*
    this.newContext.stroke();
  };

  paint = e => {
    if (this.state.isPainting) {
      let [newX, newY] = this.getCoordinates(e);
      this.drawLine(
        this.state.coordinates.x,
        this.state.coordinates.y,
        newX,
        newY,
        this.props.color
      );

      //send to socket
      const toSend = {
        oldX: this.state.coordinates.x,
        oldY: this.state.coordinates.y,
        newX,
        newY,
        color: this.props.color
      };
      this.state.socket.emit('draw', toSend)

      
      // Set x and y to our new coordinates*
      this.setState({
        coordinates: {
          x: newX,
          y: newY
        }
      });

    }
  };

  exit = () => {
    this.setState({ isPainting: false });
  };

  render() {
    return (
      <CanvasWrapper>
        <canvas ref="myCanvas" />
      </CanvasWrapper>
    );
  }
}

export default Canvas;
