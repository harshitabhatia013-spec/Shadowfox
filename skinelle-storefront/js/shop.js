/**
 * SKINELLE — Shop & Product Catalog Controller
 */

document.addEventListener('DOMContentLoaded', () => {
    initShopCatalog();
});

function initShopCatalog() {
    const grid = document.getElementById('products-grid');
    if (!grid) return; // Not on shop page

    const searchInput = document.getElementById('shop-search-input');
    const categoryBtns = document.querySelectorAll('.shop-category-btn');
    const skinTypeInputs = document.querySelectorAll('.skin-type-checkbox');
    const sortSelect = document.getElementById('shop-sort-select');
    const resultCountEl = document.getElementById('products-count');

    let activeCategory = 'all';
    let selectedSkinTypes = [];
    let searchQuery = '';
    let currentSort = 'featured';

    function renderCatalog() {
        let filtered = PRODUCTS.filter(p => {
            // 1. Category Filter
            if (activeCategory !== 'all' && p.category !== activeCategory) {
                return false;
            }

            // 2. Skin Type Filter
            if (selectedSkinTypes.length > 0) {
                const hasMatchingSkinType = selectedSkinTypes.some(st => p.skinTypes.includes(st));
                if (!hasMatchingSkinType) return false;
            }

            // 3. Search Query
            if (searchQuery.trim() !== '') {
                const q = searchQuery.toLowerCase();
                const matchName = p.name.toLowerCase().includes(q);
                const matchSub = p.subtitle.toLowerCase().includes(q);
                const matchDesc = p.description.toLowerCase().includes(q);
                const matchIng = p.keyIngredients.some(i => i.toLowerCase().includes(q));
                if (!matchName && !matchSub && !matchDesc && !matchIng) return false;
            }

            return true;
        });

        // Sort Engine
        if (currentSort === 'price-low') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (currentSort === 'price-high') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (currentSort === 'rating') {
            filtered.sort((a, b) => b.rating - a.rating);
        }

        // Update result count
        if (resultCountEl) {
            resultCountEl.textContent = `${filtered.length} ${filtered.length === 1 ? 'product' : 'products'} found`;
        }

        if (filtered.length === 0) {
            grid.innerHTML = `
                <div class="col-span-full py-16 text-center">
                    <svg class="w-12 h-12 text-stone-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                    <h3 class="font-serif text-xl font-medium text-stone-800 mb-2">No matching formulas found</h3>
                    <p class="text-sm text-stone-500 max-w-md mx-auto mb-6">Try broadening your search term or clearing skin type filters to see all available SKINELLE products.</p>
                    <button type="button" id="reset-shop-filters" class="px-5 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors">Reset All Filters</button>
                </div>
            `;

            const resetBtn = document.getElementById('reset-shop-filters');
            if (resetBtn) {
                resetBtn.addEventListener('click', () => {
                    activeCategory = 'all';
                    selectedSkinTypes = [];
                    searchQuery = '';
                    if (searchInput) searchInput.value = '';
                    skinTypeInputs.forEach(cb => cb.checked = false);
                    categoryBtns.forEach(btn => {
                        btn.className = btn.getAttribute('data-category') === 'all' 
                            ? 'shop-category-btn px-4 py-2 rounded-full text-xs font-semibold transition-all bg-stone-900 text-white shadow-xs'
                            : 'shop-category-btn px-4 py-2 rounded-full text-xs font-semibold transition-all bg-stone-100 text-stone-600 hover:bg-stone-200';
                    });
                    renderCatalog();
                });
            }
            return;
        }

        grid.innerHTML = filtered.map(p => `
            <article class="group bg-white rounded-3xl overflow-hidden border border-stone-200/80 hover:border-stone-400 transition-all duration-300 shadow-xs hover:shadow-xl flex flex-col">
                <div class="relative aspect-square overflow-hidden bg-stone-100">
                    <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />
                    
                    ${p.tag ? `<span class="absolute top-4 left-4 bg-stone-900/90 backdrop-blur-md text-stone-100 text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full">${p.tag}</span>` : ''}

                    <div class="absolute inset-0 bg-stone-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 p-4">
                        <button type="button" onclick="openQuickView('${p.id}')" class="px-4 py-2.5 rounded-xl bg-white/90 backdrop-blur-md text-stone-900 text-xs font-semibold shadow-lg hover:bg-white transition-all transform translate-y-2 group-hover:translate-y-0">
                            Quick View
                        </button>
                    </div>
                </div>

                <div class="p-6 flex flex-col flex-grow justify-between">
                    <div>
                        <div class="flex items-center justify-between gap-2 mb-2">
                            <span class="text-[11px] font-semibold uppercase tracking-wider text-stone-400">${p.category}</span>
                            <div class="flex items-center gap-1 text-amber-500 text-xs font-semibold">
                                <span>★</span>
                                <span>${p.rating}</span>
                                <span class="text-stone-400 text-[10px]">(${p.reviewsCount})</span>
                            </div>
                        </div>

                        <h3 class="font-serif text-xl font-medium text-stone-900 mb-1 group-hover:text-stone-700 transition-colors">
                            <a href="product-detail.html?id=${p.id}">${p.name}</a>
                        </h3>
                        <p class="text-xs text-stone-500 line-clamp-2 mb-4">${p.subtitle}</p>
                    </div>

                    <div>
                        <div class="flex items-baseline gap-2 mb-4">
                            <span class="text-lg font-bold text-stone-900">${formatCurrency(p.price)}</span>
                            ${p.originalPrice ? `<span class="text-xs text-stone-400 line-through">${formatCurrency(p.originalPrice)}</span>` : ''}
                        </div>

                        <div class="grid grid-cols-2 gap-2">
                            <a href="product-detail.html?id=${p.id}" class="py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-semibold text-center hover:bg-stone-50 transition-colors">Details</a>
                            <button type="button" onclick="storeCart.addItem('${p.id}'); if(window.openCartDrawer) window.openCartDrawer();" class="py-2.5 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors shadow-xs">Add to Bag</button>
                        </div>
                    </div>
                </div>
            </article>
        `).join('');
    }

    // Category Tabs
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => {
                b.className = 'shop-category-btn px-4 py-2 rounded-full text-xs font-semibold transition-all bg-stone-100 text-stone-600 hover:bg-stone-200';
            });
            btn.className = 'shop-category-btn px-4 py-2 rounded-full text-xs font-semibold transition-all bg-stone-900 text-white shadow-xs';
            activeCategory = btn.getAttribute('data-category');
            renderCatalog();
        });
    });

    // Checkbox Skin Types
    skinTypeInputs.forEach(cb => {
        cb.addEventListener('change', () => {
            selectedSkinTypes = Array.from(skinTypeInputs)
                .filter(c => c.checked)
                .map(c => c.value);
            renderCatalog();
        });
    });

    // Live Search
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            renderCatalog();
        });
    }

    // Sort Dropdown
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            renderCatalog();
        });
    }

    // Initial render
    renderCatalog();
}
