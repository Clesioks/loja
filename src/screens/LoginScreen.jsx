import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('submit')
    }

  return (
    <FormContainer>
        <h1>Entrar</h1>

        <Form onSubmit={submitHandler}>
            <Form.Group controlId='email' className='my-3'>
                <Form.Label>Endereço de email:</Form.Label>
                <Form.Control type='email' placeholder='Adicione um email' value={email} onChange={(e) => setEmail(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='password' className='my-3'>
                <Form.Label>Senha:</Form.Label>
                <Form.Control type='password' placeholder='Adicione um email' value={password} onChange={(e) => setPassword(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='mt-2'>Entrar</Button>
        </Form>

        <Row className='py-3'>
            <Col>
                Novo cliente? <Link to='/register'>Cadastrar</Link>
            </Col>
        </Row>
    </FormContainer>

  )
}

export default LoginScreen