import React, { useState, useEffect } from 'react';
import { 
    ShoppingCart, Menu, X, Plus, Trash2, Check, 
    Instagram, Phone, Mail, CircleHelp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProducts, createOrder } from './services/woocommerce';
import './App.css';

// --- MOCK DATA FALLBACK (When no keys set) ---
const MOCK_PRODUCTS = [
    { id: 1, name: "Plan OnlyDiet", price: "49.99", description: "Personalización nutricional total.", images: [{ src: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800" }], categories: [{ name: "Planes" }] },
    { id: 2, name: "Plan Workout", price: "59.99", description: "Entrenamiento adaptado a tu nivel.", images: [{ src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800" }], categories: [{ name: "Planes" }] },
    { id: 3, name: "Plan Full Fit", price: "89.99", description: "Combinación de Dieta + Entrenamiento.", images: [{ src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800" }], categories: [{ name: "Planes" }] },
    { id: 4, name: "Ebook: Recetario Fit", price: "19.90", description: "50 recetas saludables y fáciles.", images: [{ src: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800" }], categories: [{ name: "Ebooks" }] }
];

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts().then(data => {
      // If data is empty (no keys or error), use Mocks to keep the web functional for demos
      setProducts(data.length > 0 ? data : MOCK_PRODUCTS);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart([...cart, product]);
    setIsCartOpen(true);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const cartTotal = cart.reduce((acc, item) => acc + parseFloat(item.price), 0);

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    const orderData = {
        line_items: cart.map(item => ({ product_id: item.id, quantity: 1 })),
        billing: {
            first_name: e.target.name.value,
            email: e.target.email.value,
            phone: e.target.phone.value
        }
    };
    
    try {
        await createOrder(orderData);
        alert('¡Pedido realizado con éxito a WooCommerce!');
        setCart([]);
        setIsCheckoutOpen(false);
    } catch (err) {
        alert('Simulando Checkout falló (conecta tus claves de WooCommerce en .env)');
        setCart([]); 
        setIsCheckoutOpen(false);
    }
  };

  return (
    <div className="App">
      {/* Navbar */}
      <header className="navbar">
        <div className="container">
          <div className="logo"><a href="#">LA PAULETTE</a></div>
          <nav className="nav-links">
            <a href="#planes">Planes</a>
            <a href="#sobre-mi">Sobre Mí</a>
            <a href="#resultados">Resultados</a>
            <a href="#faq">FAQ</a>
          </nav>
          <div className="nav-icons">
            <div className="cart-btn" onClick={() => setIsCartOpen(true)}>
              <ShoppingCart size={24} />
              <span className="cart-count">{cart.length}</span>
            </div>
            <button className="menu-btn" onClick={() => setIsMenuOpen(true)}>
                <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <motion.div 
            className="hero-content container"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <h6 className="subtitle gold">TRANSFORMACIÓN REAL</h6>
          <h1>Consigue el cuerpo <br/>que siempre deseaste</h1>
          <p>Planes 100% personalizados por Paulette. Entrenamiento, Nutrición y Mentalidad.</p>
          <div className="hero-actions">
            <a href="#planes" className="btn gold-btn">EMPEZAR AHORA</a>
            <a href="https://wa.me/34635303875" className="btn outline-white">CONSULTA GRATIS</a>
          </div>
        </motion.div>
      </section>

      {/* Empoderamiento */}
      <section className="empower-section section animate-on-scroll">
        <div className="container">
          <div className="empower-card">
            <h2>"No es una dieta, es un estilo de vida que amarás"</h2>
            <p>Descubre por qué más de 500 mujeres ya han cambiado su relación con el espejo y la comida con nosotros.</p>
            <div className="stats-row">
                <div className="stat"><span>+500</span> Mujeres</div>
                <div className="stat"><span>100%</span> Personalizado</div>
                <div className="stat"><span>24/7</span> Soporte</div>
            </div>
          </div>
        </div>
      </section>

      {/* Planes x WooCommerce */}
      <section id="planes" className="section products-section">
        <div className="container">
          <div className="section-header">
            <h6 className="subtitle gold">LOS MEJORES PLANES</h6>
            <h2>Nuestra Oferta Fitness</h2>
          </div>
          {loading ? (
            <div className="loader">Cargando catálogo...</div>
          ) : (
            <div className="products-grid">
              {products.map(product => (
                <motion.div 
                    key={product.id} className="product-card"
                    whileHover={{ scale: 1.03 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                  <div className="p-img" style={{ backgroundImage: `url(${product.images[0].src})` }}>
                    <div className="p-price">{product.price}€</div>
                  </div>
                  <div className="p-details">
                    <h3>{product.name}</h3>
                    <p>{product.description.replace(/<[^>]*>?/gm, '').slice(0, 80)}...</p>
                    <button className="add-btn" onClick={() => addToCart(product)}>
                      <Plus size={18} /> COMPRAR PLAN
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

       {/* FAQ */}
       <section id="faq" className="section faq-section">
        <div className="container">
          <div className="section-header">
            <h6 className="subtitle gold">DUDAS COMUNES</h6>
            <h2>Preguntas Frecuentes</h2>
          </div>
          <div className="faq-grid">
            <div className="faq-item">
              <h4><CircleHelp size={20} className="gold" /> ¿Cómo recibo mi plan?</h4>
              <p>Tras la compra, recibirás un cuestionario. En 48h hábiles tendrás tu plan en tu email y WhatsApp.</p>
            </div>
            <div className="faq-item">
              <h4><CircleHelp size={20} className="gold" /> ¿Hay permanencia?</h4>
              <p>No. Pagas mes a mes o por el pack elegido. Tú decides cuándo continuar.</p>
            </div>
            <div className="faq-item">
                <h4><CircleHelp size={20} className="gold" /> ¿Es apto para veganas?</h4>
                <p>Sí, todos los planes nutricionales tienen opciones 100% vegetales e intolerancias.</p>
              </div>
          </div>
        </div>
      </section>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
                className="cart-overlay-fixed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsCartOpen(false)}
            />
            <motion.div 
                className="cart-sidebar-drawer"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
            >
              <div className="cart-h">
                <h3>Tu Selección</h3>
                <X onClick={() => setIsCartOpen(false)} className="close-x" />
              </div>
              <div className="cart-list">
                {cart.length === 0 ? <div className="c-empty">No hay nada seleccionado aún.</div> : (
                  cart.map((item, i) => (
                    <div key={i} className="c-item">
                      <div className="c-item-img" style={{ backgroundImage: `url(${item.images[0].src})` }}></div>
                      <div className="c-item-info">
                        <h5>{item.name}</h5>
                        <p>{item.price}€</p>
                      </div>
                      <Trash2 size={16} onClick={() => removeFromCart(i)} className="del-btn" />
                    </div>
                  ))
                )}
              </div>
              <div className="cart-f">
                <div className="c-total"><span>Suma:</span><span>{cartTotal.toFixed(2)}€</span></div>
                <button className="c-checkout-btn" onClick={() => setIsCheckoutOpen(true)}>PAGAR PEDIDO</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="modal-container">
            <motion.div 
                className="checkout-modal"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
            >
              <button className="close-modal-btn" onClick={() => setIsCheckoutOpen(false)}><X /></button>
              <h2>Finalizar Compra</h2>
              <p>Sus datos están cifrados y son seguros.</p>
              <form onSubmit={handleCheckoutSubmit}>
                <div className="f-group"><label>Nombre Completo</label><input name="name" required /></div>
                <div className="f-group"><label>Email de contacto</label><input name="email" type="email" required /></div>
                <div className="f-group"><label>Teléfono móvil</label><input name="phone" required /></div>
                <div className="p-selector">
                    <span>💳 Pagar con Tarjeta o Bizum</span>
                </div>
                <button type="submit" className="buy-final-btn">CONFIRMAR Y FINALIZAR</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* Footer */}
      <footer className="main-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="f-col">
              <h3>LA PAULETTE</h3>
              <p>La revolución del fitness femenino. Cambiamos vidas, no solo cuerpos.</p>
            </div>
            <div className="f-col">
              <h4>CONTACTO</h4>
              <p><Mail size={16} /> info@lapaulettefitness.com</p>
              <p><Instagram size={16} /> @lapaulette_fit</p>
            </div>
          </div>
          <div className="f-bottom">
            &copy; 2026 La Paulette Fitness. Powered by La Paulette x WooCommerce API.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
