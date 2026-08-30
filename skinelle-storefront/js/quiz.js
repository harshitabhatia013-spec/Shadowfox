/**
 * SKINELLE — Interactive Skincare Routine Matcher Quiz Engine
 */

document.addEventListener('DOMContentLoaded', () => {
    initSkinQuiz();
});

function initSkinQuiz() {
    const quizContainer = document.getElementById('skinelle-quiz-container');
    if (!quizContainer) return;

    let currentStep = 1;
    const answers = {
        concern: '',
        texture: '',
        complexity: ''
    };

    const steps = [
        {
            step: 1,
            title: "What is your primary skin concern?",
            subtitle: "Select the main goal you'd like your ritual to solve.",
            options: [
                { value: 'redness', label: 'Redness & Sensitivity', icon: '🌸', desc: 'Calm irritation and strengthen barrier' },
                { value: 'dryness', label: 'Dryness & Dehydration', icon: '💧', desc: 'Replenish moisture and cushion skin' },
                { value: 'dullness', label: 'Dullness & Texture', icon: '✨', desc: 'Boost radiance and refine tone' },
                { value: 'oiliness', label: 'Blemishes & Oil Control', icon: '🍃', desc: 'Balance sebum and clear pores' }
            ]
        },
        {
            step: 2,
            title: "How does your skin feel by mid-day?",
            subtitle: "Understanding your daily skin balance helps us choose textures.",
            options: [
                { value: 'tight', label: 'Tight or Flaky', icon: '🍂', desc: 'Needs rich, soothing hydration' },
                { value: 'reactive', label: 'Flushed or Easily Stung', icon: '⚡', desc: 'Needs ultra-gentle barrier support' },
                { value: 'shiny', label: 'Shiny in T-Zone', icon: '🌊', desc: 'Needs lightweight breathable hydration' },
                { value: 'balanced', label: 'Comfortable & Balanced', icon: '🌿', desc: 'Needs preventive antioxidants' }
            ]
        },
        {
            step: 3,
            title: "What is your ideal ritual commitment?",
            subtitle: "Pick the routine style that fits your lifestyle best.",
            options: [
                { value: 'essential', label: 'Minimalist 2-Step', icon: '⏱️', desc: 'Quick & efficient everyday care' },
                { value: 'complete', label: 'Complete 3-Step Ritual', icon: '👑', desc: 'Optimal serum + moisturizer + sunscreen balance' }
            ]
        }
    ];

    function renderStep(stepIndex) {
        const data = steps[stepIndex - 1];
        quizContainer.innerHTML = `
            <div class="space-y-6 transition-all duration-300">
                <div class="flex items-center justify-between border-b border-stone-200/80 pb-4">
                    <span class="text-xs font-bold tracking-widest uppercase text-stone-400">Step ${data.step} of 3</span>
                    <div class="flex gap-1.5">
                        ${[1, 2, 3].map(s => `<div class="h-1.5 rounded-full transition-all duration-300 ${s === stepIndex ? 'w-8 bg-stone-900' : 'w-3 bg-stone-200'}"></div>`).join('')}
                    </div>
                </div>
                <div>
                    <h3 class="font-serif text-2xl md:text-3xl font-medium text-stone-900 mb-2">${data.title}</h3>
                    <p class="text-sm text-stone-600">${data.subtitle}</p>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    ${data.options.map(opt => `
                        <button type="button" data-val="${opt.value}" class="quiz-option-btn text-left p-5 rounded-2xl border-2 border-stone-200 hover:border-stone-900 bg-white hover:bg-stone-50 transition-all duration-200 group flex items-start gap-4">
                            <span class="text-2xl">${opt.icon}</span>
                            <div>
                                <h4 class="font-semibold text-stone-900 group-hover:text-stone-900 text-sm mb-1">${opt.label}</h4>
                                <p class="text-xs text-stone-500">${opt.desc}</p>
                            </div>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        quizContainer.querySelectorAll('.quiz-option-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const val = btn.getAttribute('data-val');
                if (stepIndex === 1) answers.concern = val;
                if (stepIndex === 2) answers.texture = val;
                if (stepIndex === 3) answers.complexity = val;

                if (stepIndex < 3) {
                    currentStep++;
                    renderStep(currentStep);
                } else {
                    renderResult();
                }
            });
        });
    }

    function renderResult() {
        let recommendedProducts = [];
        let recommendationTitle = "";
        let recommendationDesc = "";

        if (answers.concern === 'redness' || answers.texture === 'reactive') {
            recommendationTitle = "The Barrier Soothing Ritual";
            recommendationDesc = "Designed to calm inflammation, soothe sensitivity, and rebuild a resilient moisture barrier.";
            recommendedProducts = [PRODUCTS[0], PRODUCTS[1], PRODUCTS[2]]; // Serum, Cream, Sunscreen
        } else if (answers.concern === 'dryness' || answers.texture === 'tight') {
            recommendationTitle = "The Deep Moisture Cushion Ritual";
            recommendationDesc = "Deeply nourishing botanical oils and multi-depth hyaluronic acid to lock in continuous hydration.";
            recommendedProducts = [PRODUCTS[1], PRODUCTS[4], PRODUCTS[2]]; // Cream, Midnight Elixir, Sunscreen
        } else {
            recommendationTitle = "The Radiant Glass-Skin Ritual";
            recommendationDesc = "Balancing active botanicals and broad-spectrum protection for luminous, smooth skin tone.";
            recommendedProducts = [PRODUCTS[0], PRODUCTS[1], PRODUCTS[2]]; // Serum, Cream, Sunscreen
        }

        const bundlePrice = recommendedProducts.reduce((sum, p) => sum + p.price, 0);
        const discountedPrice = Math.round(bundlePrice * 0.85); // 15% Bundle Discount

        quizContainer.innerHTML = `
            <div class="bg-gradient-to-br from-stone-100 to-amber-50/50 p-6 md:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6 animate-fade-in">
                <div class="flex items-center gap-3">
                    <span class="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Your Personalized Match</span>
                    <span class="text-xs text-stone-500">Formulated for ${answers.concern.toUpperCase() || 'CALM'}</span>
                </div>

                <div>
                    <h3 class="font-serif text-3xl font-medium text-stone-900 mb-2">${recommendationTitle}</h3>
                    <p class="text-stone-600 text-sm leading-relaxed">${recommendationDesc}</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 py-2">
                    ${recommendedProducts.map(p => `
                        <div class="bg-white p-4 rounded-2xl border border-stone-200 flex items-center gap-3 shadow-xs">
                            <img src="${p.homepageImage || p.image}" alt="${p.name}" class="w-14 h-14 object-cover rounded-xl bg-stone-100" />
                            <div>
                                <span class="text-xs text-stone-400 font-semibold uppercase tracking-wider">${p.category}</span>
                                <h5 class="text-xs font-bold text-stone-900 leading-tight">${p.name}</h5>
                                <p class="text-xs text-stone-600 font-medium">${formatCurrency(p.price)}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-stone-200">
                    <div>
                        <span class="text-xs text-stone-500 block">Bundle Price (15% Savings Included)</span>
                        <div class="flex items-baseline gap-2">
                            <span class="text-2xl font-bold text-stone-900">${formatCurrency(discountedPrice)}</span>
                            <span class="text-sm text-stone-400 line-through">${formatCurrency(bundlePrice)}</span>
                        </div>
                    </div>
                    <div class="flex items-center gap-3 w-full sm:w-auto">
                        <button type="button" id="quiz-reset-btn" class="px-4 py-3 rounded-xl border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-white transition-all">Retake Quiz</button>
                        <button type="button" id="quiz-add-bundle-btn" class="flex-grow sm:flex-grow-0 px-6 py-3 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-all shadow-md">Add Full Ritual to Bag</button>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('quiz-reset-btn').addEventListener('click', () => {
            currentStep = 1;
            renderStep(currentStep);
        });

        document.getElementById('quiz-add-bundle-btn').addEventListener('click', () => {
            recommendedProducts.forEach(p => {
                storeCart.addItem(p.id, null, 1, true);
            });
            if (window.openCartDrawer) window.openCartDrawer();
        });
    }

    // Initialize first step
    renderStep(1);
}
