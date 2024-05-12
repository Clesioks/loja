import {useState, useEffect} from "react";
import { Table, Form, Button, Row, Col} from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify'
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useProfileMutation } from '../slices/userApiSlice'
import { setCredentials } from '../slices/authSlice'


const ProfileScreen = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState()

    const dispatch = useDispatch()

    const { userInfo } = useSelector((state) => state.auth)

    const [ updateProfile, { isLoading: loadingUpdateProfile } ] = useProfileMutation()

    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name)
            setEmail(userInfo.email)
        }
    }, [userInfo, userInfo.name, userInfo.email])

    const submitHandler = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            toast.error('Senhas não conferem')
        } else {
            try {
                const res = await updateProfile({ _id: userInfo._id, name, email, password }).unwrap()
                dispatch(setCredentials(res))
                toast.success('Perfil atualizado')
            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        }
    }

  return (
    <Row>
        <Col md={3}>
        <h2>Perfil do usuário</h2>

        <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-2">
                <Form.Label>Nome:</Form.Label>
                <Form.Control type="name" placeholder="Digite seu nome" value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>
          
            <Form.Group controlId="email" className="my-2">
                <Form.Label>E-mail:</Form.Label>
                <Form.Control type="email" placeholder="Digite seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
            </Form.Group>
          
            <Form.Group controlId="password" className="my-2">
                <Form.Label>Senha:</Form.Label>
                <Form.Control type="password" placeholder="Digite seu password" value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
            </Form.Group>
          
            <Form.Group controlId="confirmPassword" className="my-2">
                <Form.Label>Confirme sua Senha:</Form.Label>
                <Form.Control type="password" placeholder="Confirme sua senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
            </Form.Group>

            <Button type="submit" variant='primary' className="my-2" >Atualizar</Button>

            { loadingUpdateProfile && <Loader /> }

        </Form>
        </Col>

        <Col md={9}>Colunas</Col>
    </Row>
  )
};

export default ProfileScreen;
