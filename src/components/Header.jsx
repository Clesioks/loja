import { Navbar, Nav, Container } from 'react-bootstrap'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'
import logo from '../assets/logo10.png'

const Header = () => {
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
                            <Nav.Link><FaShoppingCart />Carrinho</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/login'>
                            <Nav.Link><FaUser />Login</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
            </Container>
        </Navbar>

    </header>
  )
}

export default Header