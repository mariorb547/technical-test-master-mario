import React, { Fragment, useState, useEffect } from "react";
import { Button, Badge } from "react-bootstrap";
import "./Cart.scss";
import { ReactComponent as CartEmpty } from "../../assets/imagenes/cart-empty.svg";
import { ReactComponent as CartFull } from "../../assets/imagenes/cart-full.svg";
import { ReactComponent as Close } from "../../assets/imagenes/close.svg";
import { ReactComponent as Garbage } from "../../assets/imagenes/garbage.svg";
import { STORAGE_PRODUCTS_CART, BASE_PAHT } from "../../Utils/constans";
import {
  removeArrayDuplicates,
  countDuplicatesItemArray,
  removeItemArray,
} from "../../Utils/arrayFunctions";
export default function Cart(props) {
  const { productsCart, getProductsCart, products } = props;
  const [cartOpen, setCartOpen] = useState(false);
  const widthCartContent = cartOpen ? 400 : 0;
  const [singelProductsCart, setSingelProductsCart] = useState([]);
  const [cartTotalPrice, setCartTotalPrecie] = useState(0);
  const [countProductsCart, setCountProductsCart] = useState(0);

  useEffect(() => {
    //obtiene los producto unicos es decir si existen 3  producto solo obtiene
    const allProductsId = removeArrayDuplicates(productsCart);
    setSingelProductsCart(allProductsId);
    setCountProductsCart(productsCart.length);
  }, [productsCart]);

  useEffect(() => {
    const productData = [];
    let totalPrecie = 0;

    const allProductsId = removeArrayDuplicates(productsCart);
    allProductsId.forEach((productId) => {
      const quantity = countDuplicatesItemArray(productId, productsCart);
      const productValue = {
        id: productId,
        quantity: quantity,
      };
      productData.push(productValue);
    });

    if (!products.loading && products.result) {
      products.result.forEach((product) => {
        productData.forEach((item) => {
          if (product.id === item.id) {
            const totalValue = product.price * item.quantity;
            totalPrecie = totalPrecie + totalValue;
          }
        });
      });
    }
    setCartTotalPrecie(totalPrecie);
  }, [productsCart, products]);

  const openCart = () => {
    setCartOpen(true);
    document.body.style.overflow = "hidden"; //evitar el scroll en la pagina cuando el carrito este abierto
  };
  const closeCart = () => {
    setCartOpen(false);
    document.body.style.overflow = "scroll"; //permitir el scroll en la pagina cuando el carrito este abierto
  };
  const emptyCart = () => {
    localStorage.removeItem(STORAGE_PRODUCTS_CART);
    getProductsCart();
  };

  const incrementQuantity = (id) => {
    const arrayItemCart = productsCart;
    arrayItemCart.push(id);
    localStorage.setItem(STORAGE_PRODUCTS_CART, arrayItemCart);
    getProductsCart();
  };

  const decreaseQuantity = (id) => {
    const arrayItemCart = productsCart;
    const result = removeItemArray(arrayItemCart, id.toString());
    localStorage.setItem(STORAGE_PRODUCTS_CART, result);
    getProductsCart();
  };
  return (
    <Fragment>
      <Button variant="link" className="cart">
        {productsCart.length > 0 ? (
          <div>
            <Badge className="countProductCart" color="secondary">
              <span>{countProductsCart}</span>
            </Badge>
            <CartFull onClick={openCart} />
          </div>
        ) : (
          <CartEmpty onClick={openCart} />
        )}
      </Button>
      <div className="cart-content" style={{ width: widthCartContent }}>
        <CartContentHeader closeCart={closeCart} emptyCart={emptyCart} />
        <div className="cart-content__products">
          {singelProductsCart.map((idProductCart, index) => (
            <CartContentProducts
              key={index}
              products={products}
              idsProductCart={productsCart}
              idProductCart={idProductCart}
              incrementQuantity={incrementQuantity}
              decreaseQuantity={decreaseQuantity}
            />
          ))}
        </div>
        <CartContentFooter cartTotalPrice={cartTotalPrice} />
      </div>
    </Fragment>
  );
}

function CartContentHeader(props) {
  const { closeCart, emptyCart } = props;
  return (
    <div className="cart-content__header">
      <div onClick={closeCart}>
        <Close />
        <h2>Carrito</h2>
      </div>
      <Button onClick={emptyCart} variant="link">
        Vaciar
        <Garbage />
      </Button>
    </div>
  );
}

function CartContentProducts(props) {
  const {
    products: { loading, result },
    idsProductCart,
    idProductCart,
    incrementQuantity,
    decreaseQuantity,
  } = props;

  if (!loading && result) {
    return result.map((product, index) => {
      if (idProductCart === product.id) {
        const quantity = countDuplicatesItemArray(product.id, idsProductCart);
        return (
          <RenderProduct
            key={index}
            product={product}
            quantity={quantity}
            incrementQuantity={incrementQuantity}
            decreaseQuantity={decreaseQuantity}
          />
        );
      }
    });
  }
  return null;
}

function RenderProduct(props) {
  const { product, quantity, incrementQuantity, decreaseQuantity } = props;
  return (
    <div className="cart-content__product">
      <img src={`${BASE_PAHT}/${product.image}`} alt={product.name} />
      <div className="cart-content__producto-info">
        <div>
          <h3>{product.name.substr(0, 25)}</h3>
          <p>{product.price.toFixed(2)} $ / Unidad</p>
        </div>
        <div>
          <p>En carrito: {quantity}</p>
          <div>
            <button onClick={() => incrementQuantity(product.id)}>+</button>
            <button onClick={() => decreaseQuantity(product.id)}>-</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartContentFooter(props) {
  const { cartTotalPrice } = props;

  return (
    <div className="cart-content__footer">
      <div>
        <p>Total aproximado:</p>
        <p>{cartTotalPrice.toFixed(2)}</p>
      </div>
      <Button>Terminar pedido</Button>
    </div>
  );
}
