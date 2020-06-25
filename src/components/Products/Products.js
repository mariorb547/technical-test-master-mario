import React from "react";
import { Container, Row } from "react-bootstrap";
import Product from "../Product";
import Loading from "../Loading";
export default function Products(props) {
  const {
    products: { result, loading },
    addProductCart,
  } = props;
  return (
    <Container>
      <Row>
        {loading || !result ? (
          <Loading />
        ) : (
          result.map((product, index) => {
            return (
              <Product
                key={index}
                product={product}
                addProductCart={addProductCart}
              />
            );
          })
        )}
      </Row>
    </Container>
  );
}
