import React from "react";
import { Col, Card, Button } from "react-bootstrap";
import { BASE_PAHT } from "../../Utils/constans";
import "./Product.scss";
export default function Product(props) {
  const { product, addProductCart } = props;
  return (
    <Col className="product">
      <Card>
        <Card.Img
          variant="top"
          src={`${BASE_PAHT}/${product.image}`}
        ></Card.Img>
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.extraInfo}</Card.Text>
          <Card.Text>{product.price} $ / Unidad</Card.Text>
          <Button onClick={() => addProductCart(product.id, product.name)}>
            Añadir al Carrito
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}
