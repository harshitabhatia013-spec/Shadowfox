/**
 * SKINELLE — Core Store Engine & Data Management
 */

// Product Dataset
const PRODUCTS = [
    {
        id: 'serum-calm',
        name: 'Calm Face Serum',
        subtitle: 'Barrier Support & Redness Relief',
        category: 'serums',
        price: 899,
        originalPrice: 1099,
        rating: 4.9,
        reviewsCount: 128,
        tag: 'Bestseller',
        skinTypes: ['sensitive', 'dry', 'combination'],
        volumeOptions: ['30ml', '50ml'],
        image: '../assets/images/serum.jpg',
        homepageImage: 'assets/images/serum.jpg',
        description: 'A concentrated calming serum formulated with 5% Niacinamide, Centella Asiatica, and Triple Hyaluronic Acid to restore skin barrier health, reduce redness, and impart a subtle glass-skin glow.',
        keyIngredients: ['5% Niacinamide', 'Centella Asiatica (Cica)', 'Triple Hyaluronic Acid', 'Madecassoside'],
        howToUse: 'Dispense 3-4 drops onto clean, damp skin morning and evening. Press gently into face and neck before applying moisturizer.',
        fullIngredients: 'Aqua/Water, Niacinamide, Glycerin, Centella Asiatica Leaf Extract, Sodium Hyaluronate, Madecassoside, Panthenol, Allantoin, Carbomer, Phenoxyethanol, Ethylhexylglycerin.'
    },
    {
        id: 'cream-cloud',
        name: 'Cloud Dew Moisturizer',
        subtitle: 'Deep Hydration & Skin Cushion',
        category: 'moisturizers',
        price: 799,
        originalPrice: 950,
        rating: 4.8,
        reviewsCount: 96,
        tag: 'Trending',
        skinTypes: ['dry', 'sensitive', 'normal'],
        volumeOptions: ['50ml', '100ml'],
        image: '../assets/images/moisturizer.jpg',
        homepageImage: 'assets/images/moisturizer.jpg',
        description: 'Feather-light whipped cream moisturizer that melts upon contact to deliver 72-hour continuous hydration without clogging pores or feeling greasy.',
        keyIngredients: ['Ceramide NP', 'Squalane', 'Eucalyptus Leaf Extract', 'Polyglutamic Acid'],
        howToUse: 'Smooth a pearl-sized amount over clean skin morning and night after serum. Can be layered under sunscreen or makeup.',
        fullIngredients: 'Aqua, Squalane, Caprylic/Capric Triglyceride, Ceramide NP, Glycerin, Cetearyl Alcohol, Eucalyptus Globulus Leaf Water, Hyaluronic Acid, Tocopherol, Xanthan Gum.'
    },
    {
        id: 'spf-shield',
        name: 'Daily Shield Sunscreen SPF 50+',
        subtitle: 'Invisible Weightless Protection',
        category: 'sunscreen',
        price: 749,
        originalPrice: 899,
        rating: 4.9,
        reviewsCount: 154,
        tag: 'Essential',
        skinTypes: ['oily', 'sensitive', 'combination', 'dry'],
        volumeOptions: ['50ml'],
        image: '../assets/images/sunscreen.jpg',
        homepageImage: 'assets/images/sunscreen.jpg',
        description: 'Broad spectrum UVA/UVB mineral SPF 50+ with zero white cast, velvet matte finish, and pollution defense shield for all day skin protection.',
        keyIngredients: ['Zinc Oxide (18%)', 'Vitamin E', 'Green Tea Extract', 'Bisabolol'],
        howToUse: 'Apply generously 15 minutes before sun exposure as the last step in your morning routine. Reapply every 2 hours.',
        fullIngredients: 'Zinc Oxide, Aqua, Cyclopentasiloxane, Camellia Sinensis Leaf Extract, Tocopheryl Acetate, Bisabolol, Polyglyceryl-3 Polyricinoleate, Silica, Phenoxyethanol.'
    },
    {
        id: 'cleanser-velvet',
        name: 'Velvet Gentle Gel Cleanser',
        subtitle: 'pH-Balanced Botanical Wash',
        category: 'cleansers',
        price: 649,
        originalPrice: 750,
        rating: 4.7,
        reviewsCount: 82,
        tag: 'Clean Formula',
        skinTypes: ['sensitive', 'oily', 'combination'],
        volumeOptions: ['150ml'],
        image: '../assets/images/cleanser.jpg',
        homepageImage: 'assets/images/cleanser.jpg',
        description: 'A soothing pH 5.5 gel cleanser that lifts away impurities, excess sebum, and light makeup while preserving skin barrier moisture.',
        keyIngredients: ['Botanical Amber Water', 'Chamomile', 'Oat Amino Acids', 'Aloe Leaf Juice'],
        howToUse: 'Massage 1-2 pumps onto damp skin in circular motions. Rinse thoroughly with lukewarm water.',
        fullIngredients: 'Aqua, Coco-Glucoside, Sodium Lauroyl Oat Amino Acids, Chamomilla Recutita Flower Extract, Aloe Barbadensis Leaf Juice, Citric Acid, Benzyl Alcohol.'
    },
    {
        id: 'elixir-midnight',
        name: 'Midnight Repair Elixir',
        subtitle: 'Overnight Cell Renewal & Peptide Oil',
        category: 'serums',
        price: 1199,
        originalPrice: 1499,
        rating: 5.0,
        reviewsCount: 64,
        tag: 'New Arrival',
        skinTypes: ['dry', 'combination'],
        volumeOptions: ['30ml'],
        image: '../assets/images/serum.jpg',
        homepageImage: 'assets/images/serum.jpg',
        description: 'Nutrient-dense overnight active elixir enriched with copper peptides, rosehip seed oil, and bakuchiol to firm, refine texture, and awaken radiance.',
        keyIngredients: ['Bakuchiol (1%)', 'Copper Tripeptide-1', 'Rosehip Seed Oil', 'Marula Oil'],
        howToUse: 'Warm 3 drops between palms and gently press into face as the final step of your nighttime routine.',
        fullIngredients: 'Rosa Canina Seed Oil, Sclerocarya Birrea Seed Oil, Bakuchiol, Copper Tripeptide-1, Squalane, Tocopherol, Caprylic/Capric Triglyceride.'
    },
    {
        id: 'set-ritual-glow',
        name: 'The Complete Ritual Set',
        subtitle: '3-Step Essential Skin Transformation',
        category: 'sets',
        price: 2199,
        originalPrice: 2647,
        rating: 4.9,
        reviewsCount: 210,
        tag: 'Value Pack',
        skinTypes: ['sensitive', 'dry', 'oily', 'combination'],
        volumeOptions: ['Full Routine Box'],
        image: '../assets/images/ritual_set.jpg',
        homepageImage: 'assets/images/ritual_set.jpg',
        description: 'Our award-winning 3-piece core routine: Calm Face Serum (30ml), Cloud Dew Moisturizer (50ml), and Daily Shield SPF 50+ (50ml) presented in a luxury reusable keepsake box.',
        keyIngredients: ['Niacinamide', 'Ceramides', 'Centella', 'Zinc Oxide'],
        howToUse: 'Follow Cleanse -> Serum -> Moisturize -> Sunscreen morning ritual for calm, luminous, healthy skin.',
        fullIngredients: 'Includes full sizes of Calm Face Serum, Cloud Dew Moisturizer, and Daily Shield SPF 50+.'
    }
];

// Free Shipping Threshold (in INR)
const FREE_SHIPPING_THRESHOLD = 1500;

// Cart Management Engine
class StoreCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('skinelle_cart')) || [];
        this.appliedDiscount = JSON.parse(localStorage.getItem('skinelle_discount')) || null;
    }

    save() {
        localStorage.setItem('skinelle_cart', JSON.stringify(this.items));
        localStorage.setItem('skinelle_discount', JSON.stringify(this.appliedDiscount));
        this.notifyListeners();
    }

    addItem(productId, selectedVolume = null, quantity = 1, isHomepage = false) {
        const product = PRODUCTS.find(p => p.id === productId);
        if (!product) return;

        const volume = selectedVolume || (product.volumeOptions ? product.volumeOptions[0] : 'Standard');
        const itemKey = `${productId}_${volume}`;
        const imagePath = isHomepage ? product.homepageImage : product.image;

        const existingIndex = this.items.findIndex(item => item.key === itemKey);
        if (existingIndex > -1) {
            this.items[existingIndex].quantity += quantity;
        } else {
            this.items.push({
                key: itemKey,
                id: product.id,
                name: product.name,
                price: product.price,
                image: imagePath,
                volume: volume,
                quantity: quantity
            });
        }

        this.save();
        showToast(`Added <strong>${product.name}</strong> (${volume}) to your bag!`);
    }

    updateQuantity(itemKey, delta) {
        const index = this.items.findIndex(item => item.key === itemKey);
        if (index > -1) {
            this.items[index].quantity += delta;
            if (this.items[index].quantity <= 0) {
                this.items.splice(index, 1);
            }
            this.save();
        }
    }

    removeItem(itemKey) {
        this.items = this.items.filter(item => item.key !== itemKey);
        this.save();
        showToast('Item removed from your bag.');
    }

    clear() {
        this.items = [];
        this.appliedDiscount = null;
        this.save();
    }

    get TotalItems() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    get Subtotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    get DiscountAmount() {
        if (!this.appliedDiscount) return 0;
        if (this.appliedDiscount.type === 'percent') {
            return Math.round(this.Subtotal * (this.appliedDiscount.value / 100));
        }
        return this.appliedDiscount.value;
    }

    get FinalTotal() {
        return Math.max(0, this.Subtotal - this.DiscountAmount);
    }

    applyPromoCode(code) {
        const cleanCode = code.trim().toUpperCase();
        if (cleanCode === 'WELCOME10') {
            this.appliedDiscount = { code: 'WELCOME10', type: 'percent', value: 10, label: '10% Welcome Discount' };
            this.save();
            showToast('Promo code <strong>WELCOME10</strong> applied (-10%)!');
            return { success: true, message: '10% discount applied!' };
        } else if (cleanCode === 'SKINELLE20') {
            this.appliedDiscount = { code: 'SKINELLE20', type: 'percent', value: 20, label: '20% VIP Ritual Discount' };
            this.save();
            showToast('Promo code <strong>SKINELLE20</strong> applied (-20%)!');
            return { success: true, message: '20% VIP discount applied!' };
        } else {
            return { success: false, message: 'Invalid promo code. Try WELCOME10 or SKINELLE20.' };
        }
    }

    removePromoCode() {
        this.appliedDiscount = null;
        this.save();
        showToast('Promo code removed.');
    }

    notifyListeners() {
        document.dispatchEvent(new CustomEvent('skinelle:cartUpdated', { detail: this }));
    }
}

// Global Cart Instance
const storeCart = new StoreCart();

// Helper: Toast Notifications
function showToast(message, duration = 3000) {
    let container = document.getElementById('skinelle-toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'skinelle-toast-container';
        container.className = 'fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'pointer-events-auto bg-stone-900 text-stone-100 text-sm font-sans px-5 py-3.5 rounded-xl shadow-2xl border border-stone-700 flex items-center justify-between gap-3 transform translate-y-4 opacity-0 transition-all duration-300 ease-out';
    toast.innerHTML = `
        <div class="flex items-center gap-3">
            <svg class="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <span class="leading-tight">${message}</span>
        </div>
        <button onclick="this.parentElement.remove()" class="text-stone-400 hover:text-stone-200">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
    `;

    container.appendChild(toast);
    requestAnimationFrame(() => {
        toast.classList.remove('translate-y-4', 'opacity-0');
    });

    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-2');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// Format Currency
function formatCurrency(amount) {
    return `₹${amount.toLocaleString('en-IN')}`;
}
