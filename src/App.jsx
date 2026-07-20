import { useState } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    title: "М'який зайчик",
    price: 499,
    icon: "🐰",
  },
  {
    id: 2,
    title: "Веселий ведмедик",
    price: 699,
    icon: "🧸",
  },
  {
    id: 3,
    title: "Кубики",
    price: 349,
    icon: "🧱",
  },
  {
    id: 4,
    title: "Машинка",
    price: 549,
    icon: "🚗",
  },
  {
    id: 5,
    title: "Лялька",
    price: 799,
    icon: "🪆",
  },
  {
    id: 6,
    title: "Пазли",
    price: 299,
    icon: "🧩",
  },
];

function Header({ cartCount, onCartOpen }) {
  return (
    <header className="header">
      <h1 className="logo">Kiddo</h1>

      <nav className="navigation">
        <a href="#home">Головна</a>
        <a href="#catalog">Каталог</a>
        <a href="#about">Про нас</a>
        <a href="#contacts">Контакти</a>
      </nav>

      <div className="headerActions">
        <button className="iconButton" type="button">
          🔍
        </button>

        <button className="iconButton" type="button">
          ❤️
        </button>

        <button className="cartButton" type="button" onClick={onCartOpen}>
          🛒
          {cartCount > 0 && <span className="cartCount">{cartCount}</span>}
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="heroContent">
        <p className="heroLabel">Дитячий онлайн-магазин</p>

        <h2 className="title">Все найкраще для ваших малюків</h2>

        <p className="subtitle">
          Іграшки, одяг та аксесуари для дітей різного віку.
        </p>

        <a className="heroButton" href="#catalog">
          Перейти до каталогу
        </a>
      </div>

      <div className="imgContent">🧸</div>
    </section>
  );
}

function ProductCard({ product, onAdd }) {
  return (
    <article className="productCard">
      <div className="productIcon">{product.icon}</div>

      <h3 className="productTitle">{product.title}</h3>

      <p className="productPrice">{product.price} грн</p>

      <button
        className="addButton"
        type="button"
        onClick={() => onAdd(product)}
      >
        Додати в корзину
      </button>
    </article>
  );
}

function Products({ onAdd }) {
  return (
    <section className="productsSection" id="catalog">
      <div className="sectionHeading">
        <div>
          <p className="sectionLabel">Каталог</p>
          <h2 className="sectionTitle">Популярні товари</h2>
        </div>

        <p className="sectionDescription">
          Обери товар і додай його до корзини.
        </p>
      </div>

      <div className="productsGrid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={onAdd} />
        ))}
      </div>
    </section>
  );
}

function CartItem({ product, index, onRemove }) {
  return (
    <div className="cartItem">
      <div className="cartItemIcon">{product.icon}</div>

      <div className="cartItemInfo">
        <h3>{product.title}</h3>
        <p>{product.price} грн</p>
      </div>

      <button
        className="removeButton"
        type="button"
        onClick={() => onRemove(index)}
      >
        Видалити
      </button>
    </div>
  );
}

function Cart({ cart, onClose, onRemove }) {
  const totalPrice = cart.reduce((total, product) => total + product.price, 0);

  return (
    <div className="cartOverlay" onClick={onClose}>
      <aside className="cartPanel" onClick={(event) => event.stopPropagation()}>
        <div className="cartHeader">
          <div>
            <p className="sectionLabel">Ваші покупки</p>
            <h2>Корзина</h2>
          </div>

          <button className="closeButton" type="button" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="cartContent">
          {cart.length === 0 ? (
            <div className="emptyCart">
              <div className="emptyCartIcon">🛒</div>
              <h3>Корзина порожня</h3>
              <p>Додай хоча б один товар із каталогу.</p>
            </div>
          ) : (
            cart.map((product, index) => (
              <CartItem
                key={`${product.id}-${index}`}
                product={product}
                index={index}
                onRemove={onRemove}
              />
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cartFooter">
            <div className="totalRow">
              <span>Загальна сума:</span>
              <strong>{totalPrice} грн</strong>
            </div>

            <button className="orderButton" type="button">
              Оформити замовлення
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  function addToCart(product) {
    setCart((currentCart) => [...currentCart, product]);
  }

  function removeFromCart(indexToRemove) {
    setCart((currentCart) =>
      currentCart.filter((_, index) => index !== indexToRemove),
    );
  }

  function openCart() {
    setIsCartOpen(true);
  }

  function closeCart() {
    setIsCartOpen(false);
  }

  return (
    <>
      <Header cartCount={cart.length} onCartOpen={openCart} />

      <main>
        <Hero />
        <Products onAdd={addToCart} />
      </main>

      {isCartOpen && (
        <Cart cart={cart} onClose={closeCart} onRemove={removeFromCart} />
      )}
    </>
  );
}

export default App;
