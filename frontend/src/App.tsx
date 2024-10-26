import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductContainer from "./components/ProductContainer";
import ProductPage from "./components/ProductPage";
import { Product } from "./types";
import { useState } from "react";
import SearchResults from "./components/SearchResults";
import MainPage from "./components/MainPage";

export const products: Product[] = [
  {
    id: '1',
    name: 'Pizza Margherita',
    description: 'Classic Italian pizza with fresh mozzarella and basil.',
    price: 12.99,
    image: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2016/8/23/0/FNM_100116-Classic-Crust_s4x3.jpg.rend.hgtvcom.616.462.suffix/1480972867043.webp',
  },
  {
    id: '2',
    name: 'Cheeseburger',
    description: 'Juicy beef burger with cheddar cheese and fresh toppings.',
    price: 9.99,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/RedDot_Burger.jpg/250px-RedDot_Burger.jpg',
  },
  {
    id: '3',
    name: 'Caesar Salad',
    description: 'Crisp romaine lettuce with Caesar dressing and croutons.',
    price: 8.49,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSip9aEhqGPmm0Ne1TFRKsBFjIQZS63rQ6t8g&s',
  },
];

const App = () => {
  const [cart, setCart] = useState<{ [key: string]: { product: Product; quantity: number } }>({});

  const handleAddToCart = (product: Product) => {
    setCart(prevCart => {
      const existingProduct = prevCart[product.id];
      if (existingProduct) {
        return {
          ...prevCart,
          [product.id]: {
            product,
            quantity: existingProduct.quantity + 1,
          },
        };
      } else {
        return {
          ...prevCart,
          [product.id]: {
            product,
            quantity: 1,
          },
        };
      }
    });
  };

  return (
    <>
      <BrowserRouter>
        <Navbar cartItems={cart} />
        <Routes>
          <Route path="/" element={<MainPage products={products} onAddToCart={handleAddToCart} />} />
          <Route path="/product/:productId" element={<ProductPage products={products} />} />
          <Route path="/search-results" element={<SearchResults onAddToCart={handleAddToCart} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
