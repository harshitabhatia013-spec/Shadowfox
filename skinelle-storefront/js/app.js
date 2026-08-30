/**
 * SKINELLE — Global App UI & Cart Drawer Controller
 */

document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initCartDrawer();
    initQuickViewModal();
    initMobileMenu();
    updateCartUI();
});

// Sync UI whenever cart state changes
document.addEventListener('skinelle:cartUpdated', () => {
    updateCartUI();
});

// 1. Header Scroll Glassmorphism Effect
function initHeaderScroll() {
    const navbar = document.querySelector('.skinelle-navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('bg-stone-50/90', 'backdrop-blur-md', 'shadow-sm', 'border-b', 'border-stone-200/50');
        } else {
            navbar.classList.remove('bg-stone-50/90', 'backdrop-blur-md', 'shadow-sm', 'border-b', 'border-stone-200/50');
        }
    });
}

// 2. Mobile Menu Toggle
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav-drawer');
    const closeBtn = document.getElementById('close-mobile-nav');

    if (!menuBtn || !mobileNav) return;

    const toggleMenu = (open) => {
        if (open) {
            mobileNav.classList.remove('translate-x-full', 'pointer-events-none', 'opacity-0');
            mobileNav.classList.add('translate-x-0', 'opacity-100');
            document.body.classList.add('overflow-hidden');
        } else {
            mobileNav.classList.add('translate-x-full', 'opacity-0', 'pointer-events-none');
            mobileNav.classList.remove('translate-x-0', 'opacity-100');
            document.body.classList.remove('overflow-hidden');
        }
    };

    menuBtn.addEventListener('click', () => toggleMenu(true));
    if (closeBtn) closeBtn.addEventListener('click', () => toggleMenu(false));
}

// 3. Slide-Over Cart Drawer Controller
function initCartDrawer() {
    const cartTriggers = document.querySelectorAll('.trigger-cart-drawer');
    const drawer = document.getElementById('cart-slide-drawer');
    const overlay = document.getElementById('cart-drawer-overlay');
    const closeBtn = document.getElementById('close-cart-drawer');

    if (!drawer || !overlay) return;

    const openDrawer = () => {
        drawer.classList.remove('translate-x-full');
        drawer.classList.add('translate-x-0');
        overlay.classList.remove('opacity-0', 'pointer-events-none');
        overlay.classList.add('opacity-100');
        document.body.classList.add('overflow-hidden');
    };

    const closeDrawer = () => {
        drawer.classList.add('translate-x-full');
        drawer.classList.remove('translate-x-0');
        overlay.classList.add('opacity-0', 'pointer-events-none');
        overlay.classList.remove('opacity-100');
        document.body.classList.remove('overflow-hidden');
    };

    cartTriggers.forEach(btn => btn.addEventListener('click', (e) => {
        e.preventDefault();
        openDrawer();
    }));

    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (overlay) overlay.addEventListener('click', closeDrawer);

    // Global listener to trigger open drawer programmatically
    window.openCartDrawer = openDrawer;
    window.closeCartDrawer = closeDrawer;
}

// Update Cart Drawer UI & Counter Badges
function updateCartUI() {
    // 1. Update counter badges
    const totalCount = storeCart.TotalItems;
    const badgeElements = document.querySelectorAll('.cart-count-badge');
    badgeElements.forEach(badge => {
        badge.textContent = totalCount;
        if (totalCount > 0) {
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    });

    // 2. Render Drawer Items
    const container = document.getElementById('cart-drawer-items');
    const emptyState = document.getElementById('cart-drawer-empty');
    const footerState = document.getElementById('cart-drawer-footer');
    const freeShippingProgress = document.getElementById('free-shipping-progress');
    const freeShippingText = document.getElementById('free-shipping-text');

    if (!container) return;

    if (storeCart.items.length === 0) {
        container.innerHTML = '';
        if (emptyState) emptyState.classList.remove('hidden');
        if (footerState) footerState.classList.add('hidden');
    } else {
        if (emptyState) emptyState.classList.add('hidden');
        if (footerState) footerState.classList.remove('hidden');

        container.innerHTML = storeCart.items.map(item => `
            <div class="flex items-center gap-4 py-4 border-b border-stone-200/70">
                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg bg-stone-100 flex-shrink-0" />
                <div class="flex-grow min-w-0">
                    <h4 class="text-sm font-semibold text-stone-900 truncate">${item.name}</h4>
                    <p class="text-xs text-stone-500 mb-2">${item.volume}</p>
                    <div class="flex items-center gap-2">
                        <div class="inline-flex items-center border border-stone-300 rounded-lg text-xs">
                            <button onclick="storeCart.updateQuantity('${item.key}', -1)" class="px-2 py-1 text-stone-600 hover:bg-stone-100 transition-colors">-</button>
                            <span class="px-2 font-medium text-stone-900">${item.quantity}</span>
                            <button onclick="storeCart.updateQuantity('${item.key}', 1)" class="px-2 py-1 text-stone-600 hover:bg-stone-100 transition-colors">+</button>
                        </div>
                        <button onclick="storeCart.removeItem('${item.key}')" class="text-xs text-rose-500 hover:underline ml-2">Remove</button>
                    </div>
                </div>
                <div class="text-right">
                    <span class="text-sm font-bold text-stone-900">${formatCurrency(item.price * item.quantity)}</span>
                </div>
            </div>
        `).join('');
    }

    // 3. Free Shipping Progress Bar
    const subtotal = storeCart.Subtotal;
    if (freeShippingProgress && freeShippingText) {
        const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
        if (remaining <= 0) {
            freeShippingProgress.style.width = '100%';
            freeShippingText.innerHTML = '<span class="text-emerald-700 font-semibold">🎉 Congratulations! You unlocked FREE Express Shipping!</span>';
        } else {
            const percentage = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
            freeShippingProgress.style.width = `${percentage}%`;
            freeShippingText.innerHTML = `Add <strong>${formatCurrency(remaining)}</strong> more to get <strong>FREE Express Shipping</strong>`;
        }
    }

    // 4. Drawer Totals
    const drawerSubtotal = document.getElementById('cart-drawer-subtotal');
    if (drawerSubtotal) drawerSubtotal.textContent = formatCurrency(storeCart.Subtotal);

    const drawerFinalTotal = document.getElementById('cart-drawer-total');
    if (drawerFinalTotal) drawerFinalTotal.textContent = formatCurrency(storeCart.FinalTotal);
}

// 4. Quick-View Product Modal Controller
function initQuickViewModal() {
    const modal = document.getElementById('quick-view-modal');
    const overlay = document.getElementById('quick-view-overlay');
    const closeBtn = document.getElementById('close-quick-view');

    if (!modal || !overlay) return;

    const closeModal = () => {
        modal.classList.add('opacity-0', 'pointer-events-none');
        overlay.classList.add('opacity-0', 'pointer-events-none');
        document.body.classList.remove('overflow-hidden');
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (overlay) overlay.addEventListener('click', closeModal);

    window.openQuickView = (productId, isHomepage = false) => {
        const product = PRODUCTS.find(p => p.id === productId);
        if (!product) return;

        const imgEl = document.getElementById('qv-product-image');
        const nameEl = document.getElementById('qv-product-name');
        const categoryEl = document.getElementById('qv-product-category');
        const priceEl = document.getElementById('qv-product-price');
        const descEl = document.getElementById('qv-product-desc');
        const ingredientsEl = document.getElementById('qv-product-ingredients');
        const volumeContainer = document.getElementById('qv-volume-options');
        const addBtn = document.getElementById('qv-add-to-bag');

        let selectedVolume = product.volumeOptions ? product.volumeOptions[0] : 'Standard';

        if (imgEl) imgEl.src = isHomepage ? product.homepageImage : product.image;
        if (nameEl) nameEl.textContent = product.name;
        if (categoryEl) categoryEl.textContent = `${product.category.toUpperCase()} · ${product.tag}`;
        if (priceEl) priceEl.textContent = formatCurrency(product.price);
        if (descEl) descEl.textContent = product.description;

        if (ingredientsEl && product.keyIngredients) {
            ingredientsEl.innerHTML = product.keyIngredients.map(ing => `
                <span class="inline-block bg-stone-100 text-stone-700 text-xs px-2.5 py-1 rounded-full font-medium border border-stone-200">${ing}</span>
            `).join(' ');
        }

        if (volumeContainer && product.volumeOptions) {
            volumeContainer.innerHTML = product.volumeOptions.map((vol, index) => `
                <button type="button" class="qv-vol-btn px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${index === 0 ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-700 border-stone-300 hover:border-stone-500'}" data-vol="${vol}">
                    ${vol}
                </button>
            `).join('');

            const volBtns = volumeContainer.querySelectorAll('.qv-vol-btn');
            volBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    volBtns.forEach(b => b.className = 'qv-vol-btn px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all bg-white text-stone-700 border-stone-300 hover:border-stone-500');
                    btn.className = 'qv-vol-btn px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all bg-stone-900 text-white border-stone-900';
                    selectedVolume = btn.getAttribute('data-vol');
                });
            });
        }

        if (addBtn) {
            addBtn.onclick = () => {
                storeCart.addItem(product.id, selectedVolume, 1, isHomepage);
                closeModal();
                if (window.openCartDrawer) window.openCartDrawer();
            };
        }

        modal.classList.remove('opacity-0', 'pointer-events-none');
        overlay.classList.remove('opacity-0', 'pointer-events-none');
        document.body.classList.add('overflow-hidden');
    };
}

// 5. Checkout Simulator Modal
window.triggerCheckoutSimulation = () => {
    if (storeCart.items.length === 0) {
        showToast('Your bag is currently empty!');
        return;
    }

    const modal = document.getElementById('checkout-modal');
    if (modal) {
        modal.classList.remove('hidden');
        if (window.closeCartDrawer) window.closeCartDrawer();
    }
};

window.closeCheckoutModal = () => {
    const modal = document.getElementById('checkout-modal');
    if (modal) modal.classList.add('hidden');
};

window.completeCheckoutOrder = (e) => {
    e.preventDefault();
    closeCheckoutModal();
    storeCart.clear();
    showToast('✨ Thank you! Your SKINELLE order #SK-92841 has been placed!');
};
