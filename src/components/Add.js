import React, { Component } from "react"
import {connect} from 'react-redux'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {handleAddQuestion} from '../actions/questions'
import { withRouter } from "react-router-dom"

class Add extends Component {
    state = {
        opt1:'',
        opt2:''
    }
    handleBtn = () => {
        const {opt1,opt2} = this.state
        return (opt1 && opt2 ? false : true )
    }
    handleChngeOpt1=(e)=>{
        e.persist()
        this.setState(()=>({
            opt1:e.target.value
        }))
    }
    handleChngeOpt2=(e)=>{
        e.persist()
        this.setState(()=>({
            opt2:e.target.value
        }))
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const {opt1,opt2} = this.state
        const {dispatch} = this.props

        dispatch(handleAddQuestion(opt1,opt2))
        setTimeout(()=>this.props.history.push('/home'),1000)

    }
  render() {
    
      
    return (
      <div className='add-question'>


        <Form onSubmit={(e)=>this.handleSubmit(e)}>
  <Form.Row>
    <Col>
    <h6>Option One</h6>
      <Form.Control  placeholder="option two" className="add-option" onChange={(e)=>this.handleChngeOpt1(e)}/>
    </Col>
    </Form.Row>
    <Form.Row>
    <Col>
    <h6>Option Two</h6>
      <Form.Control  placeholder="option two" className="add-option" onChange={(e)=>this.handleChngeOpt2(e)} />
    </Col>
    </Form.Row>
    <Form.Row>
    <Col>
    <Button variant="primary" className='add-btn' type="submit" disabled={this.handleBtn()}>
            Submit
          </Button>
    </Col>
  </Form.Row>
</Form>

      </div>
    );
  }
}

function mapStateToProps({users,questions,loggedUser}){
    const uid = Object.keys(users);
    const currentUser = Object.values(loggedUser).join('')
    const currentUserId = uid.filter((uid) => {
      if (users[uid].name === currentUser) {
        return users[uid].answers;
      }
    })
  
    return {
        currentUserId,
    }
}


export default withRouter(connect(mapStateToProps)(Add))
