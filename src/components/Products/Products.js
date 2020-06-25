import React from "react";
import { Container, Row, CardGroup } from "react-bootstrap";
import Product from "../Product";
import Loading from "../Loading";
import "./Products.scss";
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
              <div className="col-md-4">
                <Product
                  key={index}
                  product={product}
                  addProductCart={addProductCart}
                />
              </div>
            );
          })
        )}
      </Row>
    </Container>
  );
}
