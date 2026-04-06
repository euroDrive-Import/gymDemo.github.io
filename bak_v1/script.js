document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Logic
    const menuToggle = document.getElementById('menuToggle');
    const sideMenu = document.getElementById('sideMenu');
    const closeMenu = document.getElementById('closeMenu');

    menuToggle.onclick = () => sideMenu.classList.add('open');
    closeMenu.onclick = () => sideMenu.classList.remove('open');
    
    // Close side menu when clicking a link
    document.querySelectorAll('.menu-link').forEach(link => {
        link.onclick = () => sideMenu.classList.remove('open');
    });

    // 3. Cart Logic
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartBtn = document.getElementById('cartBtn');
    const cartSidebar = document.getElementById('cartSidebar');
    const closeCart = document.getElementById('closeCart');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalPrice = document.getElementById('cartTotalPrice');
    const cartCount = document.querySelector('.cart-count');
    const checkoutBtn = document.getElementById('checkoutBtn');

    const openCart = () => {
        cartSidebar.classList.add('open');
        cartOverlay.classList.add('open');
    };

    const toggleCart = () => {
        cartSidebar.classList.toggle('open');
        cartOverlay.classList.toggle('open');
    };

    cartBtn.onclick = toggleCart;
    closeCart.onclick = toggleCart;
    cartOverlay.onclick = toggleCart;

    const updateCartUI = () => {
        // Clear container
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<div class="empty-msg">Tu carrito está vacío.</div>';
            cartTotalPrice.innerText = '0,00€';
            cartCount.innerText = '0';
        } else {
            let total = 0;
            let count = 0;

            cart.forEach((item, index) => {
                total += parseFloat(item.price);
                count += 1;

                const cartItemElement = document.createElement('div');
                cartItemElement.className = 'cart-item';
                cartItemElement.innerHTML = `
                    <div class="cart-item-img" style="background: #f5f5f5 url('${item.image || ''}') center/cover no-repeat"></div>
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>${item.price.toFixed(2)}€</p>
                    </div>
                    <button class="btn-remove" data-index="${index}">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                `;
                cartItemsContainer.appendChild(cartItemElement);
            });

            cartTotalPrice.innerText = `${total.toFixed(2)}€`;
            cartCount.innerText = count;
        }

        // Save to local storage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Add event listeners to remove buttons
        document.querySelectorAll('.btn-remove').forEach(btn => {
            btn.onclick = (e) => {
                const index = e.currentTarget.dataset.index;
                cart.splice(index, 1);
                updateCartUI();
            };
        });
    };

    // Add to Cart Buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.onclick = (e) => {
            const card = e.target.closest('.plan-card') || e.target.closest('.product-item');
            const item = {
                id: card.dataset.id,
                name: card.dataset.name,
                price: parseFloat(card.dataset.price),
                image: card.querySelector('.plan-image, .product-thumb')?.style.backgroundImage.slice(5, -2) || ''
            };
            
            cart.push(item);
            updateCartUI();
            openCart(); // Show cart when adding item
        };
    });

    // 4. Scroll Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate').forEach(el => observer.observe(el));

    // 5. Checkout Modal Logic
    const checkoutModal = document.getElementById('checkoutModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const checkoutForm = document.getElementById('checkoutForm');

    const openCheckout = () => {
        if (cart.length === 0) {
            alert('Añade algo al carrito antes de finalizar la compra.');
            return;
        }
        checkoutModal.style.display = 'flex';
        toggleCart(); // Close sidebar
    };

    checkoutBtn.onclick = openCheckout;
    closeModalBtn.onclick = () => checkoutModal.style.display = 'none';
    window.onclick = (e) => {
        if (e.target === checkoutModal) checkoutModal.style.display = 'none';
    };

    checkoutForm.onsubmit = (e) => {
        e.preventDefault();
        const total = cartTotalPrice.innerText;
        alert(`¡Gracias por tu pedido! \nTotal pagado: ${total}\nPronto recibirás un correo con los siguientes pasos.`);
        
        // Reset everything
        cart = [];
        updateCartUI();
        checkoutModal.style.display = 'none';
        checkoutForm.reset();
    };

    // Initial load
    updateCartUI();
});
