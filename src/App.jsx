import React, { useState, useEffect } from 'react';
import { 
    ShoppingCart, Menu, X, Plus, Trash2, Check, 
    Instagram, Phone, Mail, CircleHelp, Play, Download, Gift
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

const PRODUCTS = [
    { 
        id: 'p1', name: "Plan OnlyDiet", price: "49.99", 
        description: "Plan nutricional personalizado, revisiones cada 14 días, recetario saludable.",
        features: ["Plan nutricional personalizado", "Revisiones cada 14 días", "Asesoramiento suplementación", "Soporte WhatsApp", "Recetario saludable"],
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800"
    },
    { 
        id: 'p2', name: "Plan Workout", price: "59.99", 
        description: "Rutinas adaptadas a tu nivel, hogar o gym, revisiones mensuales.",
        features: ["Entrenamiento personalizado", "Rutinas adaptadas", "Revisiones mensuales", "Asesoramiento suplementación", "Hogar / Gym"],
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800"
    },
    { 
        id: 'p3', name: "Plan Full Fit", price: "89.99", 
        featured: true,
        description: "Nutrición + Entrenamiento con soporte prioritario y ajustes ilimitados.",
        features: ["Plan Nutricional + Entrenamiento", "Revisiones cada 14 días", "Ajustes ilimitados", "Respuesta < 24h", "Descuentos especiales"],
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800"
    },
    { 
        id: 'p4', name: "Team Competición", price: "149.99",
        description: "Entrenamiento avanzado, posing, mindset y preparación específica.",
        features: ["Entrenamiento avanzado", "Posing técnico", "Asesoramiento estética", "Mindset y motivación", "Seguimiento continuo"],
        image: "https://images.unsplash.com/photo-1583454110551-21f2fa2ec617?w=800"
    }
];

function App() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;
    
    const message = `Hola Paulette! Me gustaría contratar los siguientes planes:\n\n` + 
                    cart.map(item => `- ${item.name} (${item.price}€)`).join('\n') + 
                    `\n\nTotal: ${cartTotal.toFixed(2)}€\n\n¿Me podrías dar los pasos para empezar?`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/34635303875?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="App">
      {/* Navbar */}
      <header className="navbar">
        <div className="container">
          <div className="logo"><a href="#">LA PAULETTE</a></div>
          <nav className="nav-links">
            <a href="#planes">PLANES</a>
            <a href="#sobre-mi">SOBRE MÍ</a>
            <a href="#tienda">TIENDA</a>
            <a href="#blog">BLOG</a>
          </nav>
          <div className="nav-icons">
            <div className="cart-btn" onClick={() => setIsCartOpen(true)}>
              <ShoppingCart size={22} />
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
        <div className="container">
          <motion.div 
              className="hero-content"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
          >
            <h6 className="subtitle gold">MI TRABAJO</h6>
            <h1>Es acompañarte</h1>
            <p>No se trata solo de cambiar tu cuerpo. Se trata de acompañarte con un plan personalizado que encaje con tu vida y te ayude a recuperar equilibrio, confianza y bienestar.</p>
            <div className="hero-actions">
              <a href="#sobre-mi" className="btn solid">CONÓCEME</a>
              <a href="#planes" className="btn outline">VER PLANES</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Planes Section */}
      <section id="planes" className="section bg-light">
        <div className="container">
          <header className="section-header">
            <h6 className="subtitle gold">CONOCE</h6>
            <h2>Nuestros Planes</h2>
          </header>
          
          <div className="plans-grid">
            {PRODUCTS.map(p => (
              <motion.div 
                  key={p.id} className={`plan-card ${p.featured ? 'featured' : ''}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
              >
                {p.featured && <div className="badge">MÁS POPULAR</div>}
                <div className="plan-info">
                  <h6 className="plan-type">PLAN DE</h6>
                  <h3>{p.name.split(' ')[1]}</h3>
                  <div className="p-price-tag">{p.price}€</div>
                  <ul className="features-list">
                    {p.features.map((f, i) => <li key={i}><Check size={14} className="gold" /> {f}</li>)}
                  </ul>
                  <button className="btn-buy" onClick={() => addToCart(p)}>AÑADIR AL CARRITO</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section results-section">
        <div className="container text-center">
            <h2 className="title-large">RESULTADOS REALES EN MUJERES REALES</h2>
            <p className="p-intro">Lo que más repiten mis clientas no es el peso que pierden. Es cómo cambian su relación con la comida, con su cuerpo y con ellas mismas. Son procesos bien hechos, adaptados a cada mujer y sostenidos en el tiempo.</p>
            
            <div className="results-grid">
                <div className="result-img before-after-1"></div>
                <div className="result-img before-after-2"></div>
            </div>

            <div className="cta-box">
                <h3>Reserva tu sesión gratuita de valoración conmigo</h3>
                <p>Hablemos de tu objetivo, de tu situación y de cómo podemos construir un camino que sí funcione para ti.</p>
                <a href="https://wa.me/34635303875" className="btn-whatsapp"><Phone size={18} /> HABLAR POR WHATSAPP</a>
            </div>
        </div>
      </section>

      {/* Sobre Mi */}
      <section id="sobre-mi" className="section about-me">
        <div className="container grid-2">
            <div className="video-area">
                <div className="video-thumb">
                    <Play size={50} fill="white" />
                </div>
                <h2>Sobre mi</h2>
            </div>
            <div className="guide-area">
                <h6 className="subtitle gold">REGALO</h6>
                <h2>Descarga gratis mi guía de suplementación</h2>
                <p>Descubre qué suplementos realmente funcionan para tu cuerpo y objetivos.</p>
                <button className="btn-download"><Download size={18} /> DESCARGAR GUÍA</button>
            </div>
        </div>
      </section>

      {/* Gift Cards & Promo */}
      <section className="section bg-dark text-white">
        <div className="container grid-2">
            <div className="promo-card">
                <Gift className="gold" size={40} />
                <h6 className="subtitle gold">REGALA SALUD</h6>
                <h3>Tarjetas de regalo</h3>
                <p>¿Qué mejor regalo que un extra de motivación? Ayuda a esa persona que siempre dice "El lunes empiezo".</p>
                <button className="btn-outline-gold">COMPRAR TARJETA</button>
            </div>
            <div className="promo-card">
                <div className="discount-badge">5%</div>
                <h6 className="subtitle gold">¿ERES NUEVA?</h6>
                <h3>5% de Descuento</h3>
                <p>Entrenamiento y nutrición personalizados con acompañamiento cercano a tu ritmo.</p>
            </div>
        </div>
      </section>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div className="cart-overlay-blur" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} />
            <motion.div className="cart-drawer" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}>
              <div className="cart-header-top">
                <h3>TU CARRITO</h3>
                <X onClick={() => setIsCartOpen(false)} className="cursor-pointer" />
              </div>
              <div className="cart-body">
                {cart.length === 0 ? <p className="text-center py-10 opacity-50">Tu carrito está vacío</p> : (
                  cart.map((item, i) => (
                    <div key={i} className="cart-product">
                      <div className="cart-prod-img" style={{ backgroundImage: `url(${item.image})` }}></div>
                      <div className="cart-prod-meta">
                        <h4>{item.name}</h4>
                        <p className="gold font-bold">{item.price}€</p>
                      </div>
                      <Trash2 size={16} onClick={() => removeFromCart(i)} className="text-red hover:scale-110 transition-all cursor-pointer" />
                    </div>
                  ))
                )}
              </div>
              <div className="cart-footer-bottom">
                <div className="flex-between mb-4">
                  <span className="font-bold">TOTAL</span>
                  <span className="font-bold text-xl">{cartTotal.toFixed(2)}€</span>
                </div>
                <button className="btn-finalize" onClick={handleWhatsAppCheckout}>FINALIZAR POR WHATSAPP</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="footer-main">
        <div className="container">
            <div className="footer-cols">
                <div className="f-info">
                    <h2 className="logo">LA PAULETTE</h2>
                    <p>Nutrición y entrenamiento para mujeres de forma personalizada.</p>
                </div>
                <div className="f-links">
                    <h4>LINKS</h4>
                    <a href="#">Mi cuenta</a>
                    <a href="#">Condiciones generales</a>
                    <a href="#">Privacidad</a>
                </div>
                <div className="f-contact">
                    <h4>CONTACTO</h4>
                    <p><Mail size={16} /> info@lapaulettefitness.com</p>
                    <p><Phone size={16} /> +34 635 303 875</p>
                    <div className="social-row">
                        <Instagram size={20} />
                    </div>
                </div>
            </div>
            <div className="f-bar">
                &copy; 2026 La Paulette Fitness.
            </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
