import React from "react";
import { Container, Navbar } from "react-bootstrap";
import Cart from "../Cart";
import { ReactComponent as Logo } from "../../assets/imagenes/logo.svg";
import "./Menu.scss";
export default function Menu(props) {
  const { productsCart, getProductsCart, products } = props;

  return (
    <Navbar bg="dark" variant="dark" className="top-menu">
      <Container>
        <BrandNav />

        <Cart
          productsCart={productsCart}
          getProductsCart={getProductsCart}
          products={products}
        />
      </Container>
    </Navbar>
  );
}

function BrandNav() {
  return (
    <>
      <Navbar.Brand>
        <Logo />
        <h1>Outlet Tenis Online</h1>
      </Navbar.Brand>
    </>
  );
}
