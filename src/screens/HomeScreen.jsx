import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { useGetProductsQuery } from '../slices/productsApiSlice'

const HomeScreen = () => {

  const { data: products, isLoading, error} = useGetProductsQuery()


  return (

    
    
    <>
    { isLoading ? (
      <h2>Carregando...</h2>
    ) : error ? (<div>{error?.data?.message || error.error}</div>) : (<>
     <h1>Produtos</h1>
     <Row>
         { products.map((product) => (
             <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                 <Product product={product} />
             </Col>                
         ))}
     </Row>
    </>) }

   
    </>

  )
}


export default HomeScreen