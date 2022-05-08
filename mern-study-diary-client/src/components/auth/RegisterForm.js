// import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'

const RegisterForm = () => {
  return (
    <>
      <Form>
        <Form.Group className="mb-3">
          <Form.Control type="text" placeholder="Username" name="username" required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control type="password" placeholder="Password" name="password" required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control type="password" placeholder="Confirm Password" name="confirmPassword" required />
        </Form.Group>
        <Button variant="success" type="submit" className="mb-3">Register</Button>
      </Form>
      <p>
        Already have an account?{' '}
        <Link to="/login">
          <Button variant="info" className="ml-2">Login</Button>
        </Link>
      </p>
    </>
  )
}

export default RegisterForm