import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useGetOrderDetailsQuery, usePayOrderMutation, useGetPayPalClientIdQuery } from '../slices/ordersApiSlice'


import React from 'react'

const OrderScreen = () => {

    const { id: orderId } = useParams()

    const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId)

    console.log(order)


  return isLoading ? <Loader /> : error ? <Message variant="danger" /> 
  : (
    <>
        <h1>Order {order._id}</h1>
        <Row>
            <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Envio</h2>
                                <p>
                                    <strong>Nome: </strong> {order.user.name}
                                </p>
                                <p>
                                    <strong>Email: </strong> {order.user.email}
                                </p>
                                <p>
                                    <strong>Endereço: </strong> {order.shippingAddress.address}, {order.shippingAddress.city},{' '}  
                                     {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                                </p>
                                { order.isDelivered ? (
                                    <Message variant='success'>
                                        Entregue em {order.isDelivered}
                                    </Message>
                                ) : (
                                    <Message variant='danger'>Não entregue</Message>
                                ) }  
                        </ListGroup.Item>

                        <ListGroup.Item>
                                <h2>Forma de pagamento</h2>
                                    <p>
                                        <strong>Forma: </strong>
                                        {order.paymentMethod}
                                    </p>

                                    {order.isPaid ? (
                                        <Message variant='success'>Pago em {order.paidAt}</Message>
                                    ) : ( 
                                        <Message variant='danger'>Não pago</Message>
                                    ) }

                        </ListGroup.Item>

                        <ListGroup.Item>
                                <h2>Itens do pedido:</h2>
                                {order.orderItems.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded />
                                            </Col>
                                            <Col>
                                                <Link to={`/product/${item.product}`}>
                                                {item.name}
                                                </Link>
                                            </Col>
                                            <Col md={4}>
                                                {item.qty} x R${item.price} = ${item.qty * item.price}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}

                        </ListGroup.Item>
                    </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2> Resumo do pedido</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                                <Row>
                                    <Col>Itens</Col>
                                    <Col>R${order.itemsPrice}</Col>
                                </Row>

                                <Row>
                                    <Col>Envio</Col>
                                    <Col>R${order.shippingPrice}</Col>
                                </Row>

                                <Row>
                                    <Col>Imposto</Col>
                                    <Col>R${order.taxPrice}</Col>
                                </Row>

                                <Row>
                                    <Col>Total</Col>
                                    <Col>R${order.totalPrice}</Col>
                                </Row>

                        </ListGroup.Item>
                                {/* PAY ORDER PLACEHOLDER */}
                                {/* MARK AS  DELEVERED */}

                    </ListGroup>
                </Card>
            </Col>
        </Row>
    
    
    </>
  )
}

export default OrderScreen