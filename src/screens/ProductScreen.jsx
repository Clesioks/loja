import { useParams, Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import { useGetProductDetailsQuery } from '../slices/productsApiSlice'

const ProductScreen = () => {


    const { id: productId } = useParams()

   const { data: product, isLoading, error } = useGetProductDetailsQuery(productId)
   

  return (
    <>

        <Link className='btn btn-light my-3' to="/">Voltar</Link>

        { isLoading ? (
          <h2>Carregando...</h2>
        ) : error ? (<div>{error?.data?.message || error.error}</div>) : (
          <Row>
          <Col md={5}>
            <Image src={product.image} alt={product.name} fluid />                    
          </Col>
          <Col md={4}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product.name}</h3>                
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
              </ListGroup.Item>
              <ListGroup.Item>Preço: R${product.price}</ListGroup.Item>
              <ListGroup.Item>Descrição: {product.description}</ListGroup.Item>
            </ListGroup>        
          
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Preço:</Col>
                    <Col>
                      <strong>R${product.price}</strong>

                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      <strong>{product.countInStock > 0 ? 'Em estoque' : 'Esgotado'}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>

                  <Button className='btn-block' type='button' disabled={product.countInStock === 0}>Adicionar ao Carrinho</Button>

                </ListGroup.Item>
               
              </ListGroup>
            </Card>
          
          
          </Col>

        </Row>
        ) }

        

    
    
    </>
  )
}

export default ProductScreen