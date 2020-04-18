import React,{Component} from 'react'
import {connect} from 'react-redux'
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import logo from '../assets/images/logo.png'
import Button from 'react-bootstrap/Button'


class Login extends Component{
    
    

    render(){
        console.log("LOGIN",this.props)
        const {name,handleChange,handleSubmit,value} = this.props
        return (
            <div className="login-form">
            <Image className="login-image"  src={logo} alt="game logo" />
            <Form onSubmit={handleSubmit}>
            <Form.Group controlId="exampleForm.ControlSelect1" className='login-form-controls'>
    <Form.Label>Select User for Login</Form.Label>
    <Form.Control as='select' onChange={(e)=>handleChange(e)}>
      <option value=''>Select</option>
      {name.map((n)=>(
        <option key={n} value={n}>{n}</option>
      ))}  
    </Form.Control>
  </Form.Group>
  <Button variant="primary" type="submit" className="login-btn" disabled={value?false:true}>
    Submit
  </Button>
  </Form>
</div>
        )
    }
}

function mapStateToProps({users},{handleChange,handleSubmit,value}){
    const uid = Object.keys(users)
    const name = uid.map((id)=>users[id].name)

    return {
        name,
        value,
        handleSubmit,
        handleChange,
    }

}

export default connect(mapStateToProps)(Login)