import React from 'react';
import io from 'socket.io-client'; //Used to establish connection
import Chat from './chat'
// const socket = io.connect('http://localhost:4000') //connecting front end to back end
const socket = io.connect("http://192.168.29.119:5000/");

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      room: null,
      showChat: false
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleRoomChange = this.handleRoomChange.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
  }

  handleNameChange(event) {
    this.setState({
      username: event.target.value
    })
  }
  
  handleRoomChange(event) {
    this.setState({
      room: event.target.value
    })
  }

  joinRoom() {
    if(this.state.username !== "" && this.state.room !== "") {
      socket.emit('join_room', this.state.room);
    }
    this.setState({
      showChat: true
    })
  }

  render() {
    return (
      <div className="App">
        {!this.state.showChat ? (
      <div className="joinChatContainer">
        <h3>Join Chat</h3>
        <input type="text" placeholder="Peter..." value={this.state.value} onChange={this.handleNameChange}/>
        <input type="text" placeholder="Room ID..." value={this.state.value} onChange={this.handleRoomChange}/>
        <button onClick={this.joinRoom}>Join A Room</button>
      </div>
        )
      :
        (<Chat socket={socket} username={this.state.username} room={this.state.room}/>)}
      </div>
    );
  }
}
