import { useNavigate } from 'react-router-dom'
import { Badge, Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useLogoutMutation } from '../slices/userApiSlice'
import { logout } from '../slices/authSlice'
import logo from '../assets/logo10.png'

const Header = () => {

    const { cartItems } = useSelector((state) => state.cart)
    const { userInfo } = useSelector((state) => state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [logoutApiCall] = useLogoutMutation()

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap()
            dispatch(logout())
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }
    
  return (
    <header>
        <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
            <Container>
                <LinkContainer to="/" >
                    <Navbar.Brand>
                        <img src={logo} style={{marginRight:"8px"}} alt='' />
                        Lótus Software
                    </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id="basic-mavbar-nav">
                        <Nav className='ms-auto'>
                            <LinkContainer to="/cart">
                            <Nav.Link><FaShoppingCart />Carrinho
                            {

                                cartItems.length > 0 && (
                                    <Badge pill bg='success' style={{marginLeft: '5px'}}>
                                        { cartItems.reduce((a, c) => a + c.qty, 0) }
                                    </Badge>
                                )
                            }
                            </Nav.Link>
                            </LinkContainer>
                            { userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>
                                            Perfil
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Sair
                                        </NavDropdown.Item>
                                </NavDropdown>
                            ) : ( 
                            <LinkContainer to='/login'>
                            <Nav.Link>
                                <FaUser />Login</Nav.Link>
                            </LinkContainer>) }                           
                        </Nav>
                    </Navbar.Collapse>
            </Container>
        </Navbar>

    </header>
  )
}

export default Header