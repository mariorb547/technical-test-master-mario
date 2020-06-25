import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Menu from "./components/Menu/Menu";
import Products from "./components/Products";
import useFetch from "./hooks/useFetch";
import { urlApiProducts } from "./Utils/constans";
import { STORAGE_PRODUCTS_CART } from "./Utils/constans";

function App() {
  const products = useFetch(urlApiProducts);

  const [productsCart, setProductsCart] = useState([]);
  useEffect(() => {
    getProductsCart();
  }, []);
  const getProductsCart = () => {
    const idsProducts = localStorage.getItem(STORAGE_PRODUCTS_CART);
    if (idsProducts) {
      const idsProductsSplit = idsProducts.split(",");
      setProductsCart(idsProductsSplit);
    } else {
      setProductsCart([]);
    }
  };
  const addProductCart = (id, name) => {
    const idsProducts = productsCart;
    idsProducts.push(id);
    setProductsCart(idsProducts);
    localStorage.setItem(STORAGE_PRODUCTS_CART, productsCart);
    getProductsCart();
    toast.info(`${name} añadido al carrito correctamente`);
  };
  return (
    <div>
      <Menu
        productsCart={productsCart}
        getProductsCart={getProductsCart}
        products={products}
      />

      <Products products={products} addProductCart={addProductCart} />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange={false}
        draggable
        pauseOnHover={false}
      />
    </div>
  );
}

export default App;
