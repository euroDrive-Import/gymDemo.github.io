import React, { useState, useEffect } from 'react';
import { 
    ShoppingCart, Menu, X, Plus, Trash2, Check, 
    Instagram, Phone, Mail, Play, Download, Gift, ArrowRight, Star, 
    BookOpen, User, ShoppingBag, Home, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import './App.css';

const BRAND_NAME = "ELITE FITNESS";

const PRODUCTS = [
    { 
        id: 'p1', name: "Plan OnlyDiet", price: "49.00", 
        features: ["Plan nutricional personalizado", "Revisiones cada 14 días", "Asesoramiento suplementación", "Soporte exclusivo", "Recetario mensual"],
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800",
        type: 'plan'
    },
    { 
        id: 'p2', name: "Plan Workout", price: "59.00", 
        features: ["Entrenamiento personalizado", "Rutinas adaptadas", "Revisiones mensuales", "Asesoramiento profesional", "Hogar / Gym"],
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800",
        type: 'plan'
    },
    { 
        id: 'p3', name: "Plan Full Fit", price: "99.00", featured: true,
        features: ["Nutrición + Entrenamiento", "Revisiones cada 14 días", "Ajustes ilimitados", "Respuesta < 24h", "Regalo: Guía Suplementación"],
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
        type: 'plan'
    },
    { 
        id: 'p4', name: "Team Pro", price: "149.00",
        features: ["Entrenamiento avanzado", "Posing técnico", "Mindset y motivación", "Seguimiento continuo", "Preparación específica"],
        image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800",
        type: 'plan'
    },
    {
        id: 'p5', name: "Guía Suplementación PDF", price: "19.99",
        features: ["PDF Descargable", "Top Suplementos", "Dosis recomendadas"],
        image: "https://images.unsplash.com/photo-1579722820308-d74e571900a9?w=800",
        type: 'digital'
    }
];

const BLOG_POSTS = [
    { id: 1, title: "5 errores comunes en tu dieta", date: "12 Abr, 2026", excerpt: "Aprende por qué no estás perdiendo peso a pesar de comer sano...", img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600" },
    { id: 2, title: "La importancia del descanso", date: "08 Abr, 2026", excerpt: "El músculo no crece en el gimnasio, crece mientras duermes...", img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600" },
    { id: 3, title: "Entrenamiento en casa eficiente", date: "02 Abr, 2026", excerpt: "No necesitas grandes máquinas para transformar tu cuerpo...", img: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600" }
];

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    window.scrollTo(0, 0); // Reset scroll on page change
    return () => window.removeEventListener('scroll', handleScroll);
  }, [cart, currentPage]);

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
    alert('¡Procesando pago seguro! Redirigiendo...');
    setCart([]);
    setIsCheckoutOpen(false);
  };

  // Components for each "page"
  const HomeView = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <section className="hero-premium">
        <div className="hero-bg" />
        <div className="hero-gradient"></div>
        <div className="container">
          <div className="hero-wrapper">
            <h6 className="hero-subtitle">MÁS QUE FITNESS: ES TU TRANSFORMACIÓN</h6>
            <h1 className="hero-title">{BRAND_NAME}<br/><span className="gold-text italic">Premium Coaching</span></h1>
            <p className="hero-description">Libera tu mejor versión con asesoramiento de élite adaptado a tu estilo de vida.</p>
            <div className="hero-btns">
              <button className="btn-premium gold" onClick={() => setCurrentPage('shop')}>EMPEZAR AHORA <ArrowRight size={18} /></button>
              <button className="btn-premium outline" onClick={() => setCurrentPage('about')}>MI MÉTODO</button>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-light">
        <div className="container text-center">
            <h6 className="gold-text">PLANES DESTACADOS</h6>
            <h2 className="section-title">Elige tu objetivo</h2>
            <div className="planes-grid-premium">
              {PRODUCTS.filter(p => p.featured).map(p => (
                <ProductCard key={p.id} product={p} addToCart={addToCart} />
              ))}
            </div>
            <button className="btn-premium outline mt-10" onClick={() => setCurrentPage('shop')}>VER TODOS LOS PLANES</button>
        </div>
      </section>
    </motion.div>
  );

  const AboutView = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="page-padding">
      <div className="container">
        <div className="about-grid">
          <div className="about-image" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1548690312-e3b507d17a47?w=800)' }} />
          <div className="about-text">
            <h6 className="gold-text">SOBRE MÍ</h6>
            <h2 className="title-premium">Mi misión es tu éxito</h2>
            <p className="p-desc">Con más de 10 años en el mundo del fitness de competición y el coaching nutricional, he ayudado a cientos de personas a encontrar el equilibrio entre salud y estética.</p>
            <div className="values-list">
              <div className="val-item"><Check className="gold" /> <span>Resultados reales sin dietas extremas.</span></div>
              <div className="val-item"><Check className="gold" /> <span>Entrenamientos basados en ciencia.</span></div>
              <div className="val-item"><Check className="gold" /> <span>Soporte 24/7 y motivación constante.</span></div>
            </div>
            <div className="cta-box-mini">
                <Play fill="#d4af37" className="gold" /> <span>Ver video de mi método</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const ShopView = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="page-padding">
      <div className="container">
        <h2 className="title-premium text-center mb-20">Tienda Elite</h2>
        <div className="planes-grid-premium">
          {PRODUCTS.map(p => <ProductCard key={p.id} product={p} addToCart={addToCart} />)}
        </div>
      </div>
    </motion.div>
  );

  const BlogView = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="page-padding">
      <div className="container">
        <h2 className="title-premium text-center mb-20">Blog & Consejos</h2>
        <div className="blog-grid">
          {BLOG_POSTS.map(post => (
            <div key={post.id} className="blog-card">
              <div className="blog-img" style={{ backgroundImage: `url(${post.img})` }} />
              <div className="blog-body">
                <span className="blog-date">{post.date}</span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <div className="blog-link">Leer más <ChevronRight size={16} /></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="App premium">
      <motion.div className="scroll-progress" style={{ scaleX }} />

      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="logo" onClick={() => setCurrentPage('home')}>
            <a href="#">{BRAND_NAME}</a>
          </div>
          
          <div className="nav-group">
            <div className="nav-links">
                {['INICIO', 'SOBRE MÍ', 'TIENDA', 'BLOG'].map((item) => (
                    <a 
                        key={item} 
                        href="#"
                        className={currentPage === item.toLowerCase().replace(' ', '-') ? 'active' : ''}
                        onClick={(e) => {
                            e.preventDefault();
                            const page = item === 'INICIO' ? 'home' : item.toLowerCase().replace(' ', '-');
                            setCurrentPage(page);
                            setIsMenuOpen(false);
                        }}
                    >
                        {item}
                    </a>
                ))}
            </div>
            
            <div className="nav-utility">
                <div className="cart-trigger" onClick={() => setIsCartOpen(true)}>
                    <ShoppingCart size={22} />
                    {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
                </div>
                <Menu className="mobile-menu-btn" size={24} onClick={() => setIsMenuOpen(true)} />
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {currentPage === 'home' && <HomeView key="home" />}
        {currentPage === 'sobre-mí' && <AboutView key="about" />}
        {currentPage === 'tienda' && <ShopView key="shop" />}
        {currentPage === 'blog' && <BlogView key="blog" />}
      </AnimatePresence>

      <Footer setCurrentPage={setCurrentPage} />

      {/* Overlays (Cart, Checkout) */}
      <AnimatePresence>
        {isCartOpen && <CartDrawer cart={cart} setIsCartOpen={setIsCartOpen} removeFromCart={removeFromCart} cartTotal={cartTotal} setIsCheckoutOpen={setIsCheckoutOpen} />}
        {isCheckoutOpen && <CheckoutModal cartTotal={cartTotal} setIsCheckoutOpen={setIsCheckoutOpen} handleCheckoutSubmit={handleCheckoutSubmit} paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />}
      </AnimatePresence>
    </div>
  );
}

const ProductCard = ({ product, addToCart }) => (
  <motion.div className={`p-card-premium ${product.featured ? 'is-featured' : ''}`} whileHover={{ y: -10 }}>
    {product.featured && <div className="p-card-badge">MÁS POPULAR</div>}
    <div className="p-card-img" style={{ backgroundImage: `url(${product.image})` }} />
    <div className="p-card-header">
      <h3>{product.name}</h3>
      <div className="p-card-price">{product.price}<span>€{product.type === 'plan' ? '/mes' : ''}</span></div>
    </div>
    <div className="p-card-body">
      <ul className="p-feature-list">
        {product.features.map((f, i) => <li key={i}><Check size={14} /> {f}</li>)}
      </ul>
      <button className="p-card-btn" onClick={() => addToCart(product)}>AÑADIR AL CARRITO</button>
    </div>
  </motion.div>
);

const CartDrawer = ({ cart, setIsCartOpen, removeFromCart, cartTotal, setIsCheckoutOpen }) => (
    <>
        <motion.div className="premium-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} />
        <motion.div className="premium-drawer" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}>
            <div className="drawer-header"><h2>TU CARRITO</h2><X onClick={() => setIsCartOpen(false)} className="cursor-pointer" /></div>
            <div className="drawer-content">
                {cart.length === 0 ? <p className="text-center opacity-50 mt-10">Vacío</p> : cart.map((item, i) => (
                    <div key={i} className="drawer-item">
                        <div className="drawer-item-img" style={{ backgroundImage: `url(${item.image})` }} />
                        <div className="drawer-item-info"><h4>{item.name}</h4><p className="gold-text">{item.price}€</p></div>
                        <X size={16} onClick={() => removeFromCart(i)} className="drawer-item-del" />
                    </div>
                ))}
            </div>
            {cart.length > 0 && (
                <div className="drawer-footer">
                    <div className="drawer-total"><span>TOTAL</span><span>{cartTotal.toFixed(2)}€</span></div>
                    <button className="btn-checkout-premium" onClick={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}>FINALIZAR PEDIDO</button>
                </div>
            )}
        </motion.div>
    </>
);

const CheckoutModal = ({ cartTotal, setIsCheckoutOpen, handleCheckoutSubmit, paymentMethod, setPaymentMethod }) => (
    <div className="checkout-modal-container">
        <motion.div className="checkout-modal-content" initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
            <button className="close-checkout" onClick={() => setIsCheckoutOpen(false)}><X /></button>
            <div className="checkout-form-side">
                <h2>Pago Seguro</h2>
                <form onSubmit={handleCheckoutSubmit}>
                    <div className="f-group"><label>Email</label><input type="email" required /></div>
                    <div className="payment-selector">
                        <div className={`p-method ${paymentMethod === 'card' ? 'active' : ''}`} onClick={() => setPaymentMethod('card')}>Tarjeta</div>
                        <div className={`p-method ${paymentMethod === 'paypal' ? 'active' : ''}`} onClick={() => setPaymentMethod('paypal')}>PayPal</div>
                    </div>
                    {paymentMethod === 'card' && <div className="card-fields"><input type="text" placeholder="Card Number" className="card-input" required /></div>}
                    <button type="submit" className="btn-pay-now">PAGAR {cartTotal.toFixed(2)}€</button>
                </form>
            </div>
        </motion.div>
    </div>
);

const Footer = ({ setCurrentPage }) => (
    <footer className="footer-premium">
        <div className="container">
            <div className="footer-top">
                <div className="f-item-brand"><h2>{BRAND_NAME}</h2><p>Estándar de élite en transformación física.</p></div>
                <div className="f-item-links">
                    <a href="#" onClick={() => setCurrentPage('sobre-mí')}>Sobre Mí</a>
                    <a href="#" onClick={() => setCurrentPage('tienda')}>Tienda</a>
                    <a href="#" onClick={() => setCurrentPage('blog')}>Blog</a>
                </div>
                <div className="f-item-social">
                    <a href="#"><Instagram size={20} /></a>
                    <a href="tel:+34000000000"><Phone size={20} /></a>
                    <span className="opacity-50">+34 000 000 000</span>
                </div>
            </div>
            <div className="footer-base">&copy; 2026 {BRAND_NAME} • DEMO PROFESIONAL</div>
        </div>
    </footer>
);

export default App;
