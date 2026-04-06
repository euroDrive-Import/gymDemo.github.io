import React, { useState, useEffect } from 'react';
import { 
    ShoppingCart, Menu, X, Plus, Trash2, Check, 
    Instagram, Phone, Mail, Play, Download, Gift, ArrowRight, Star, 
    ChevronRight, CreditCard, ShieldCheck, ShoppingBag
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import './App.css';

const BRAND_NAME = "ELITE FITNESS";
const GENERIC_PHONE = "+34 000 000 000";

const PRODUCTS = [
    { id: 'p1', name: "Plan Iniciación", price: "49.00", period: "mes", image: "https://images.unsplash.com/photo-1541534741688-6078c64b5903?w=800", features: ["Plan nutricional básico", "Revisiones cada 14 días", "Acceso app fitness"] },
    { id: 'p2', name: "Plan Avanzado", price: "129.00", period: "trimestre", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800", features: ["Pack de entrenamiento trimestral", "Nutrición deportiva", "Soporte prioritario"] },
    { id: 'p3', name: "Plan Full Elite", price: "99.00", period: "mes", image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800", featured: true, features: ["Pack mensual completo", "Revisiones semanales", "Ajustes ilimitados"] },
    { id: 'p4', name: "Suscripción Anual", price: "899.00", period: "año", image: "https://images.unsplash.com/photo-1620188467120-093a100344bb?w=800", features: ["Acceso élite todo el año", "Regalo: 2 meses gratis", "Seguimiento 1 a 1"] }
];

const BLOG_SAMPLES = [
    { title: "Entrenar en ayunas: ¿Sí o no?", date: "15 Abr, 2026", img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600" },
    { title: "Mitos sobre los carbohidratos", date: "10 Abr, 2026", img: "https://images.unsplash.com/photo-1548690312-e3b507d17a47?w=600" }
];

const AnimatedSection = ({ children, className, id }) => (
    <motion.section 
        id={id} className={className}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
    >
        {children}
    </motion.section>
);

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
    if (currentPage !== 'home') window.scrollTo(0, 0);
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

  // VIEWS
  const Home = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        {/* HERO WOW */}
        <section className="hero-wow">
            <motion.div className="hero-parallax-bg" initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }} />
            <div className="hero-glass-overlay"></div>
            <div className="container hero-container">
                <motion.div className="hero-content-box" initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1 }}>
                    <h6 className="hero-badge">PENTACAMPEÓN NACIONAL & COACH DE ÉLITE</h6>
                    <h1 className="hero-mega-title">Transforma tu<br/><span className="gold-text-glow">Realidad.</span></h1>
                    <p className="hero-para">No vendemos planes, vendemos nuevas identidades. Sistema de entrenamiento y nutrición avanzado para resultados fuera de lo común.</p>
                    <div className="hero-cta-group">
                        <button className="btn-main-gold" onClick={() => setCurrentPage('shop')}>MI TIENDA ELITE <ArrowRight size={20} /></button>
                        <button className="btn-main-outline" onClick={() => setCurrentPage('about')}>CONÓCEME</button>
                    </div>
                </motion.div>
            </div>
            <div className="scroll-indicator"><div className="mouse"><div className="wheel"></div></div></div>
        </section>

        {/* RESULTS MARQUEE WOW */}
        <section className="marquee-results">
            <div className="marquee-content">
                {[
                    "https://images.unsplash.com/photo-1549476464-37392f717541?w=800",
                    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800",
                    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
                    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800",
                    "https://images.unsplash.com/photo-1549476464-37392f717541?w=800",
                    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800"
                ].map((url, i) => (
                    <div key={i} className="result-slide"><div className="res-img-placeholder" style={{ backgroundImage: `url(${url})` }} /></div>
                ))}
            </div>
        </section>

        {/* PLANES PREMIUM */}
        <AnimatedSection className="section planes-section">
            <div className="container">
                <div className="section-head-center">
                    <h6 className="gold-label">EL ESTÁNDAR</h6>
                    <h2 className="title-huge">Escogidos por los mejores</h2>
                </div>
                <div className="p-grid-wow">
                    {PRODUCTS.map((p, idx) => (
                        <ProductCard key={p.id} product={p} addToCart={addToCart} index={idx} />
                    ))}
                </div>
            </div>
        </AnimatedSection>

        {/* VIDEO / ABOUT TEASER */}
        <AnimatedSection className="section bg-warm-alternate video-section">
            <div className="container grid-2-center">
                <div className="video-blob-container">
                    <div className="video-ring"></div>
                    <div className="video-inner"><Play size={60} fill="#c5a021" /></div>
                </div>
                <div className="teaser-text">
                    <h6 className="gold-label">SOBRE EL MÉTODO</h6>
                    <h2 className="title-mega">Más que un entrenamiento</h2>
                    <p className="p-mega">Utilizamos biohacking, nutrición ortomolecular y periodización avanzada para que tu cuerpo rinda al 200%. Sin excusas, sin dietas milagro.</p>
                    <button className="btn-main-outline" onClick={() => setCurrentPage('about')}>MÁS SOBRE MÍ</button>
                </div>
            </div>
        </AnimatedSection>
    </motion.div>
  );

  const About = () => (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="page-view-premium">
        <div className="container">
            <div className="about-detailed-grid">
                <div className="img-stack">
                    <div className="img-main" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1548690312-e3b507d17a47?w=1200)' }}></div>
                    <div className="img-sub gold-border"></div>
                </div>
                <div className="text-stack">
                    <h2 className="title-mega">ELITE<br/><span className="gold-text">DEVELOPMENT</span></h2>
                    <p className="p-gold-intro">Acompaño a personas exigentes que buscan su máximo potencial físico y mental.</p>
                    <p className="p-normal">He dedicado mi vida a entender la fisiología humana aplicada al rendimiento y la estética. Mi método no es para todos, es para quienes están listos para invertir en sí mismos.</p>
                    <div className="stats-row">
                        <div className="stat"><h3>+500</h3><p>Alumnos</p></div>
                        <div className="stat"><h3>10</h3><p>Años Experiencia</p></div>
                    </div>
                </div>
            </div>
        </div>
    </motion.div>
  );

  const Shop = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="page-view-premium">
        <div className="container">
            <h2 className="title-huge text-center mb-20">Elite <span className="gold-text">Store</span></h2>
            <div className="p-grid-wow">
                {PRODUCTS.map((p, idx) => <ProductCard key={p.id} product={p} addToCart={addToCart} index={idx} />)}
            </div>
        </div>
    </motion.div>
  );

  const Blog = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="page-view-premium">
        <div className="container">
            <h2 className="title-huge text-center mb-20">Elite <span className="gold-text">Journal</span></h2>
            <div className="p-grid-wow">
                {BLOG_SAMPLES.map((post, idx) => (
                    <div key={idx} className="blog-card-v2">
                        <div className="bc-img" style={{ backgroundImage: `url(${post.img})` }}></div>
                        <div className="bc-body">
                            <span className="bc-date">{post.date}</span>
                            <h3>{post.title}</h3>
                            <button className="bc-btn">LEER MÁS <ChevronRight size={14}/></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </motion.div>
  );

  return (
    <div className="App premium-elite">
      <motion.div className="top-progress" style={{ scaleX }} />

      <nav className={`nav-v2 ${isScrolled ? 'nav-scrolled' : ''}`}>
        <div className="container nav-container">
            <div className="brand-logo" onClick={() => setCurrentPage('home')}>ELITE<span>FITNESS</span></div>
            <div className="nav-links-v2">
                {[{id:'home', l:'INICIO'}, {id:'about', l:'SOBRE MÍ'}, {id:'shop', l:'TIENDA'}, {id:'blog', l:'BLOG'}].map(p => (
                    <a key={p.id} href="#" className={currentPage === p.id ? 'active' : ''} onClick={(e) => {e.preventDefault(); setCurrentPage(p.id)}}>{p.l}</a>
                ))}
            </div>
            <div className="nav-actions-v2">
                <div className="cart-v2" onClick={() => setIsCartOpen(true)}>
                    <ShoppingCart size={22} /><span className="badge-v2">{cart.length}</span>
                </div>
                <button className="hamburguer" onClick={() => setIsMenuOpen(!isMenuOpen)}><Menu /></button>
            </div>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {currentPage === 'home' && <Home key="home" />}
        {currentPage === 'about' && <About key="about" />}
        {currentPage === 'shop' && <Shop key="shop" />}
        {currentPage === 'blog' && <Blog key="blog" />}
      </AnimatePresence>

      {/* FOOTER RICH */}
      <footer className="footer-rich">
        <div className="container footer-grid-rich">
            <div className="f-col-logo">
                <h2>ELITE<span>FITNESS</span></h2>
                <p>El estándar más sofisticado en transformación humana.</p>
                <div className="f-socials">
                    <Instagram size={20} /><Mail size={20} />
                </div>
            </div>
            <div className="f-col-links">
                <h4>ESTRUCTURA</h4>
                <a href="#" onClick={() => setCurrentPage('home')}>Incio</a>
                <a href="#" onClick={() => setCurrentPage('about')}>Sobre Mí</a>
                <a href="#" onClick={() => setCurrentPage('shop')}>Tienda</a>
            </div>
            <div className="f-col-contact">
                <h4>CONTACTO</h4>
                <p><Phone size={14} /> {GENERIC_PHONE}</p>
                <p><Mail size={14} /> info@elitedemo.com</p>
                <div className="payment-icons-footer grayscale">
                    <CreditCard size={30} /> <Gift size={30} />
                </div>
            </div>
        </div>
        <div className="footer-bottom-rich">© 2026 {BRAND_NAME} • DESIGNED FOR PERFORMANCE</div>
      </footer>

      {/* OVERLAYS */}
      <AnimatePresence>
        {isCartOpen && <SidebarCart cart={cart} close={() => setIsCartOpen(false)} total={cartTotal} remove={removeFromCart} checkout={() => {setIsCartOpen(false); setIsCheckoutOpen(true)}} />}
        {isCheckoutOpen && <StripeCheckout total={cartTotal} close={() => setIsCheckoutOpen(false)} method={paymentMethod} setMethod={setPaymentMethod} />}
      </AnimatePresence>
    </div>
  );
}

const ProductCard = ({ product, addToCart, index }) => (
    <motion.div 
        className={`card-v2 ${product.featured ? 'card-featured' : ''}`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
    >
        {product.featured && <div className="card-tag">TOP ELITE</div>}
        <div className="card-img-v2" style={{ backgroundImage: `url(${product.image})` }}></div>
        <div className="card-body-v2">
            <h3>{product.name}</h3>
            <div className="card-price-v2">{product.price}<span>€/{product.period}</span></div>
            <ul className="card-list-v2">
                {product.features.map((f, i) => <li key={i}><Check size={14} className="gold" /> {f}</li>)}
            </ul>
            <button className="btn-card-elite" onClick={() => addToCart(product)}>ADQUIRIR PLAN</button>
        </div>
    </motion.div>
);

const SidebarCart = ({ cart, close, total, remove, checkout }) => (
    <>
        <motion.div className="overlay-blur-wow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close} />
        <motion.div className="drawer-wow" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%', transition: { duration: 0.5 } }}>
            <div className="drawer-h"><h3>CARRITO ELITE</h3><X onClick={close} className="cursor-pointer" /></div>
            <div className="drawer-b">
                {cart.length === 0 ? <div className="empty-wow"><ShoppingBag size={80} strokeWidth={0.5} /> <p>Vuelve a la tienda para añadir planes.</p></div> : cart.map((item, i) => (
                    <div key={i} className="cart-item-v2">
                        <div className="ci-img" style={{ backgroundImage: `url(${item.image})` }}></div>
                        <div className="ci-info"><h4>{item.name}</h4><p>{item.price}€</p></div>
                        <Trash2 className="ci-del" size={16} onClick={() => remove(i)} />
                    </div>
                ))}
            </div>
            {cart.length > 0 && (
                <div className="drawer-f">
                    <div className="df-total"><span>TOTAL INVERSIÓN</span><span>{total.toFixed(2)}€</span></div>
                    <button className="btn-checkout-v2" onClick={checkout}>FINALIZAR PAGO SEGURO</button>
                </div>
            )}
        </motion.div>
    </>
);

const StripeCheckout = ({ total, close, method, setMethod }) => (
    <div className="stripe-container">
        <motion.div className="stripe-modal" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <button className="s-close" onClick={close}><X /></button>
            <h2>Finalizar Pago</h2>
            <div className="s-methods">
                <div className={`sm ${method === 'card' ? 'active' : ''}`} onClick={() => setMethod('card')}>Tarjeta Crédito</div>
                <div className={`sm ${method === 'paypal' ? 'active' : ''}`} onClick={() => setMethod('paypal')}>PayPal</div>
            </div>
            <input type="email" placeholder="Email de contacto" className="s-input" />
            {method === 'card' && (
                <div className="s-card-meta">
                    <input type="text" placeholder="Número de tarjeta" className="s-input" />
                    <div className="flex-row gap-2"><input type="text" placeholder="MM/YY" className="s-input" /><input type="text" placeholder="CVC" className="s-input" /></div>
                </div>
            )}
            <button className="s-pay-btn">PAGAR {total.toFixed(2)}€</button>
            <div className="s-secure"><ShieldCheck size={14} /> Pago seguro cifrado SSL 256 bits</div>
        </motion.div>
    </div>
);

export default App;
