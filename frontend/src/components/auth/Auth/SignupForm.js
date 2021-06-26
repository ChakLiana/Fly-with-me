import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Container, Row, Col } from '../../forauth/Grid/index';
import { Card } from '../../forauth/Card/index';
import { Input, FormBtn } from '../../forauth/Form/index';
import AUTH from '../../../utils/AUTH';

function SignupForm() {
  const [userObject, setUserObject] = useState({
    firstName: '',
    username: '',
    password: '',
    confirmPassword: '',
    redirectTo: null
  });
  const [redirectTo, setRedirectTo] = useState(null);

  const handleChange = (event) => {
		setUserObject({
      ...userObject,
			[event.target.name]: event.target.value
		});
	};
  
	const handleSubmit = (event) => {
		event.preventDefault();
	
		AUTH.signup({
      firstName: userObject.firstName,

      username: userObject.username,
      password: userObject.password
    }).then(response => {
      // console.log(response);
      if (!response.data.errmsg) {
        setRedirectTo('/main');
      } else {
        console.log('duplicate');
      }
    });
  };
  
  if (redirectTo) {
    return <Redirect to={{ pathname: redirectTo }} />
  }
  
  return (
    <Container>
      <Row>
        <Col size="md-3"></Col>
        <Col size="md-6">
          <Card title="Register ">
            <form style={{marginTop: 10}}>
              <label htmlFor="username">First name: </label>
              <Input
                type="text"
                name="firstName"
                value={userObject.firstName}
                onChange={handleChange}
              />
             
              <label htmlFor="username">email: </label>
              <Input
                type="email"
                name="username"
                value={userObject.username}
                onChange={handleChange}
              />
              <label htmlFor="password">Password: </label>
              <Input
                type="password"
                name="password"
                value={userObject.password}
                onChange={handleChange}
              />
              <label htmlFor="confirmPassword">Confirm Password: </label>
              <Input
                type="password"
                name="confirmPassword"
                value={userObject.confirmPassword}
                onChange={handleChange}
              />
              <Link to="/">Login</Link>
              <FormBtn onClick={handleSubmit}>Register</FormBtn>
            </form>
          </Card>
        </Col>
        <Col size="md-3"></Col>
      </Row>
    </Container>
  )
}

export default SignupForm;
