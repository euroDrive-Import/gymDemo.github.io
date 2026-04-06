import React, { useState, useEffect } from 'react';
import { 
    ShoppingCart, Menu, X, Plus, Trash2, Check, 
    Instagram, Phone, Mail, Play, Download, Gift, ArrowRight, Star
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import './App.css';

const PRODUCTS = [
    { 
        id: 'p1', name: "Plan OnlyDiet", price: "49.00", 
        description: "Plan nutricional personalizado, revisiones cada 14 días, recetario saludable.",
        features: ["Plan nutricional personalizado", "Revisiones cada 14 días", "Asesoramiento suplementación", "Soporte exclusivo", "Recetario saludable"],
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800"
    },
    { 
        id: 'p2', name: "Plan Workout", price: "59.00", 
        description: "Rutinas adaptadas a tu nivel, hogar o gym, revisiones mensuales.",
        features: ["Entrenamiento personalizado", "Rutinas adaptadas", "Revisiones mensuales", "Asesoramiento suplementación", "Hogar / Gym"],
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800"
    },
    { 
        id: 'p3', name: "Plan Full Fit", price: "99.00", 
        featured: true,
        description: "Nutrición + Entrenamiento con soporte prioritario y ajustes ilimitados.",
        features: ["Plan Nutricional + Entrenamiento", "Revisiones cada 14 días", "Ajustes ilimitados", "Respuesta < 24h", "Regalo: Guía Suplementación"],
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800"
    },
    { 
        id: 'p4', name: "Team Competición", price: "149.00",
        description: "Entrenamiento avanzado, posing, mindset y preparación específica.",
        features: ["Entrenamiento avanzado", "Posing técnico", "Asesoramiento estética", "Mindset y motivación", "Seguimiento continuo"],
        image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800"
    }
];

const AnimatedSection = ({ children, className, id }) => {
    return (
        <motion.section 
            id={id}
            className={className}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {children}
        </motion.section>
    );
};


function App() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' or 'paypal'
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    alert('¡Procesando pago seguro! Serás redirigido a la pasarela bancaria.');
    setCart([]);
    setIsCheckoutOpen(false);
  };

  return (
    <div className="App premium">
      {/* Progress Bar */}
      <motion.div className="scroll-progress" style={{ scaleX }} />

      {/* Navbar con Efecto Glassmorphism Profundo */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <motion.div 
            className="logo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a href="#">LA PAULETTE</a>
          </motion.div>
          
          <div className="nav-group">
            <div className="nav-links">
                {['PLANES', 'SOBRE MÍ', 'TIENDA', 'BLOG'].map((item) => (
                    <motion.a 
                        key={item} 
                        href={`#${item.toLowerCase()}`}
                        whileHover={{ y: -2, color: '#d4af37' }}
                    >
                        {item}
                    </motion.a>
                ))}
            </div>
            
            <div className="nav-utility">
                <motion.div 
                    className="cart-trigger" 
                    onClick={() => setIsCartOpen(true)}
                    whileHover={{ scale: 1.1 }}
                >
                    <ShoppingCart size={22} />
                    <AnimatePresence>
                        {cart.length > 0 && (
                            <motion.span 
                                className="cart-badge"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                            >
                                {cart.length}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.div>
                <Menu className="mobile-menu-btn" size={24} onClick={() => setIsMenuOpen(true)} />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section con Parallax y Reveal */}
      <section className="hero-premium">
        <motion.div 
            className="hero-bg"
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5 }}
        />
        <div className="hero-gradient"></div>
        <div className="container">
          <div className="hero-wrapper">
            <motion.h6 
                className="hero-subtitle"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
            >
                ENTRENADORA PERSONAL & COACH NUTRICIONAL
            </motion.h6>
            
            <motion.div 
                className="hero-title-container"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 1 }}
            >
                <h1 className="hero-title">Tu transformación<br/><span className="gold-text italic">empieza aquí</span></h1>
            </motion.div>

            <motion.p 
                className="hero-description"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
            >
                Caminos bien hechos, resultados que duran. No es una dieta, es recuperar tu equilibrio, confianza y bienestar.
            </motion.p>

            <motion.div 
                className="hero-btns"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
            >
              <button className="btn-premium gold" onClick={() => document.getElementById('planes').scrollIntoView()}>VER PLANES <ArrowRight size={18} /></button>
              <button className="btn-premium outline">SOBRE MÍ</button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Floating Star Badges */}
      <div className="floating-badge-container">
          {[1,2,3].map((_, i) => (
             <motion.div 
                key={i} className={`float-badge float-${i}`}
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 3 + i, ease: "easeInOut" }}
             >
                <Star className="gold" size={14} fill="#d4af37" />
             </motion.div>
          ))}
      </div>

      {/* Planes Section con Reveal Staggered */}
      <AnimatedSection id="planes" className="planes-premium section">
        <div className="container">
          <div className="section-head text-center">
            <h6 className="gold-text">ELEGANCIA & PODER</h6>
            <h2 className="section-title">Elige tu camino</h2>
          </div>
          
          <div className="planes-grid-premium">
            {PRODUCTS.map((p, idx) => (
              <motion.div 
                  key={p.id} 
                  className={`p-card-premium ${p.featured ? 'is-featured' : ''}`}
                  whileHover={{ y: -15, boxShadow: '0 30px 60px rgba(0,0,0,0.1)' }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
              >
                {p.featured && <div className="p-card-badge">TOP VENTAS</div>}
                <div className="p-card-img" style={{ backgroundImage: `url(${p.image})` }} />
                <div className="p-card-header">
                  <h3>{p.name}</h3>
                  <div className="p-card-price">{p.price}<span>€/mes</span></div>
                </div>
                <div className="p-card-body">
                  <ul className="p-feature-list">
                    {p.features.map((f, i) => <li key={i}><Check size={16} /> {f}</li>)}
                  </ul>
                  <motion.button 
                    className="p-card-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addToCart(p)}
                  >
                    AÑADIR PLAN
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Resultados con Galería Animada */}
      <AnimatedSection className="results-premium section bg-dark text-white">
        <div className="container text-center">
            <h2 className="title-premium">Resultados de impacto</h2>
            <p className="subtitle-premium">No son dietas milagro, son procesos reales sostenibles en el tiempo.</p>
            
            <div className="marquee-container">
                <div className="results-track">
                    {[1,2,3,4].map((n) => (
                        <div key={n} className="result-item-card">
                            <div className="result-img-wrapper" />
                        </div>
                    ))}
                </div>
            </div>

            <motion.div 
                className="cta-panel-premium"
                whileHover={{ scale: 1.02 }}
            >
                <h3>Transforma tu vida hoy</h3>
                <p>Reserva tu sesión informativa gratuita conmigo por WhatsApp.</p>
                <button className="btn-whatsapp-premium" onClick={() => window.open('https://wa.me/34635303875')}>
                    <Phone size={20} /> CONTACTAR CON PAULETTE
                </button>
            </motion.div>
        </div>
      </AnimatedSection>

      {/* Cart Drawer Premium con Blur */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
                className="premium-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, backdropFilter: 'blur(10px)' }}
                exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                onClick={() => setIsCartOpen(false)}
            />
            <motion.div 
                className="premium-drawer"
                initial={{ x: '100%', opacity: 0.5 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '100%', opacity: 0.5 }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <div className="drawer-header">
                <h2>CARRITO</h2>
                <motion.div whileHover={{ rotate: 90 }} onClick={() => setIsCartOpen(false)}>
                    <X size={28} className="cursor-pointer" />
                </motion.div>
              </div>
              
              <div className="drawer-content">
                {cart.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="empty-cart-msg"
                    >
                        <ShoppingCart size={60} strokeWidth={1} opacity={0.3} />
                        <p>Tu selección está vacía.</p>
                    </motion.div>
                ) : (
                  cart.map((item, i) => (
                    <motion.div 
                        key={i} className="drawer-item"
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                    >
                      <div className="drawer-item-img" style={{ backgroundImage: `url(${item.image})` }} />
                      <div className="drawer-item-info">
                        <h4>{item.name}</h4>
                        <p className="gold-text">{item.price}€</p>
                      </div>
                      <X size={18} onClick={() => removeFromCart(i)} className="drawer-item-del" />
                    </motion.div>
                  ))
                )}
              </div>

              <div className="drawer-footer">
                <div className="drawer-total">
                  <span>TOTAL</span>
                  <span>{cartTotal.toFixed(2)}€</span>
                </div>
                <button className="btn-checkout-premium" onClick={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}>
                    FINALIZAR PEDIDO
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modern Checkout Modal (Stripe/PayPal) */}
      <AnimatePresence>
          {isCheckoutOpen && (
              <div className="checkout-modal-container">
                  <motion.div 
                    className="checkout-modal-content"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                  >
                      <button className="close-checkout" onClick={() => setIsCheckoutOpen(false)}><X /></button>
                      
                      <div className="checkout-grid">
                          <div className="checkout-form-side">
                              <h2>Finalizar Compra</h2>
                              <form onSubmit={handleCheckoutSubmit}>
                                  <div className="f-row">
                                      <div className="f-group"><label>Email</label><input type="email" placeholder="tu@email.com" required /></div>
                                  </div>
                                  
                                  <div className="payment-selector">
                                      <div 
                                        className={`p-method ${paymentMethod === 'card' ? 'active' : ''}`}
                                        onClick={() => setPaymentMethod('card')}
                                      >
                                          <span>💳 Tarjeta</span>
                                      </div>
                                      <div 
                                        className={`p-method ${paymentMethod === 'paypal' ? 'active' : ''}`}
                                        onClick={() => setPaymentMethod('paypal')}
                                      >
                                          <span>🅿️ PayPal</span>
                                      </div>
                                  </div>

                                  {paymentMethod === 'card' ? (
                                      <div className="card-fields animate-in">
                                          <input type="text" placeholder="Número de tarjeta" className="card-input" required />
                                          <div className="flex gap-2">
                                              <input type="text" placeholder="MM/YY" className="card-input" required />
                                              <input type="text" placeholder="CVC" className="card-input" required />
                                          </div>
                                      </div>
                                  ) : (
                                      <div className="paypal-notice animate-in">
                                          <p>Serás redirigido a PayPal para completar el pago de forma segura.</p>
                                      </div>
                                  )}

                                  <button type="submit" className="btn-pay-now">
                                      PAGAR {cartTotal.toFixed(2)}€
                                  </button>
                                  <p className="secure-p"><Check size={12} /> Pago seguro cifrado con SSL 256-bit</p>
                              </form>
                          </div>
                      </div>
                  </motion.div>
              </div>
          )}
      </AnimatePresence>

      {/* Footer Minimalista & Elegante */}
      <footer className="footer-premium">
        <div className="container">
            <div className="footer-top">
                <div className="f-item-brand">
                    <h2 className="logo">LA PAULETTE</h2>
                    <p>Cambiando la relación de la mujer con su cuerpo y la nutrición.</p>
                </div>
                <div className="f-item-links">
                    {['Privacidad', 'Condiciones', 'FAQ', 'Contacto'].map(l => <a key={l} href="#">{l}</a>)}
                </div>
                <div className="f-item-social">
                    <a href="#"><Instagram size={20} /></a>
                    <a href="#"><Phone size={20} /></a>
                </div>
            </div>
            <div className="footer-base">
                &copy; 2026 PAULETTE FITNESS • DISEÑO DE LUJO
            </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
