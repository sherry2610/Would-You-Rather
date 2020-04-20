import React, { Component } from 'react'
import {connect} from 'react-redux'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'


class Menu extends Component {
  render(){
  const {toAllQuestion,toLeaderboard,toAddQuestion,pic,name} = this.props
    return (
        <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">WOULD YOU RATHER</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link  onClick={toAllQuestion}>Home</Nav.Link>
          <Nav.Link  onClick={toAddQuestion}>ADD QUESTION</Nav.Link>
          <Nav.Link onClick={toLeaderboard} >Leaderboard</Nav.Link>
        </Nav>
        <Image src={pic} alt="profile pic" roundedCircle style={{height:'50px'}} />
        <span style={{color:'white'}}>{name}</span>
          <Button variant="outline-info">Logout</Button>
        
      </Navbar>
    
    )
  }
}


function mapStateToProps({users,loggedUser}){
  const uid = Object.keys(users);
  const currentUser = Object.values(loggedUser).join('')
  const currentUserId = uid.filter((uid) => {
    if (users[uid].name === currentUser) {
      return users[uid].answers;
    }
  });
  const name = users[currentUserId].name
  const pic = users[currentUserId].avatarURL
return {
  pic,
  name,
}
}


export default connect(mapStateToProps)(Menu)

