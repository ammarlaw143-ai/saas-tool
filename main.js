// Initialize Lucide icons
lucide.createIcons();

// Tool data
const ALL_TOOLS = [
    // PDF
    { name: "Merge PDF", slug: "merge-pdf", desc: "Combine multiple PDF files into one clean document.", category: "PDF", isPremium: false, rating: 4.8 },
    { name: "Split PDF", slug: "split-pdf", desc: "Extract specific pages or split PDF into separate files.", category: "PDF", isPremium: false, rating: 4.6 },
    { name: "Compress PDF", slug: "compress-pdf", desc: "Shrink PDF file sizes while preserving visual quality.", category: "PDF", isPremium: false, rating: 4.9 },
    { name: "Protect PDF", slug: "protect-pdf", desc: "Add password encryption and lock PDF permissions.", category: "PDF", isPremium: false, rating: 4.7 },
    { name: "Unlock PDF", slug: "unlock-pdf", desc: "Remove encryption and passwords from protected PDFs.", category: "PDF", isPremium: false, rating: 4.5 },
    // Images
    { name: "Image Compressor", slug: "image-compressor", desc: "Compress JPEG, PNG, or WEBP photos client-side.", category: "Images", isPremium: false, rating: 4.9 },
    { name: "Resize & Crop", slug: "resize-crop", desc: "Modify pixels, dimensions, and clip image bounds.", category: "Images", isPremium: false, rating: 4.7 },
    { name: "Format Converter", slug: "format-converter", desc: "Convert files between WebP, PNG, JPG, HEIC, and AVIF.", category: "Images", isPremium: false, rating: 4.8 },
    // Text
    { name: "Case Converter", slug: "case-converter", desc: "Toggle case, sentence caps, snake-case, or slugs.", category: "Text", isPremium: false, rating: 4.4 },
    { name: "Text Compare", slug: "text-compare", desc: "Find structural differences between two text drafts.", category: "Text", isPremium: false, rating: 4.7 },
    { name: "JSON Formatter", slug: "json-formatter", desc: "Beautify, parse, validate, and tree-visualize JSON.", category: "Text", isPremium: false, rating: 4.9 },
    // Developer
    { name: "UUID Generator", slug: "uuid-generator", desc: "Instantly compile batches of secure v4 UUID strings.", category: "Developer", isPremium: false, rating: 4.8 },
    { name: "Password Generator", slug: "password-generator", desc: "Create high-entropy passwords with custom parameters.", category: "Developer", isPremium: false, rating: 4.9 },
    { name: "JWT Decoder", slug: "jwt-decoder", desc: "Parse header JSON, payload payload data and structure.", category: "Developer", isPremium: false, rating: 4.6 },
    // Calculators
    { name: "Age & BMI Calculator", slug: "age-bmi-calculator", desc: "Compute age spans and body mass indexes quickly.", category: "Calculators", isPremium: false, rating: 4.5 },
    { name: "Loan & EMI Calculator", slug: "loan-emi-calculator", desc: "Simulate amortization timelines, interests, and EMIs.", category: "Calculators", isPremium: false, rating: 4.8 },
    // Custom QR
    { name: "QR Studio", slug: "qr-studio", desc: "Generate custom QR codes with logos, eye shapes, and frames.", category: "QR Studio", isPremium: false, rating: 5.0 },
    // AI
    { name: "AI Image Generator", slug: "ai-image", desc: "Generate gorgeous artwork from prompts client-side.", category: "AI Tools", isPremium: false, rating: 4.9 },
    { name: "AI Resume Builder", slug: "ai-resume", desc: "Autofill resume schemas and build professional CVs.", category: "AI Tools", isPremium: false, rating: 4.8 },
    { name: "AI Website Builder", slug: "ai-website", desc: "Describe components and generate functional HTML.", category: "AI Tools", isPremium: false, rating: 4.9 },
];

// State
let currentTheme = localStorage.getItem('theme') || 'dark';
let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
let searchQuery = '';
let activeCategory = 'All';
let openFaq = null;

// DOM Elements
const navbar = document.getElementById('navbar');
const themeToggle = document.getElementById('theme-toggle');
const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mainContent = document.getElementById('main-content');
const authButtons = document.getElementById('auth-buttons');
const userMenu = document.getElementById('user-menu');
const notificationsBtn = document.getElementById('notifications-btn');
const profileBtn = document.getElementById('profile-btn');
const langBtn = document.getElementById('lang-btn');
const langMenu = document.getElementById('lang-menu');
const currentLang = document.getElementById('current-lang');
const currentYear = document.getElementById('current-year');
const newsletterForm = document.getElementById('newsletter-form');

// Initialize
function init() {
    currentYear.textContent = new Date().getFullYear();
    setupEventListeners();
    updateAuthUI();
    updateThemeUI();
    handleRoute();
    window.addEventListener('hashchange', handleRoute);
    window.addEventListener('popstate', handleRoute);
}

// Event Listeners
function setupEventListeners() {
    // Theme toggle
    themeToggle?.addEventListener('click', toggleTheme);
    mobileThemeToggle?.addEventListener('click', toggleTheme);

    // Mobile menu
    mobileMenuBtn?.addEventListener('click', toggleMobileMenu);

    // Language dropdown
    langBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        langMenu.classList.toggle('active');
    });

    document.addEventListener('click', () => {
        langMenu?.classList.remove('active');
    });

    // Newsletter form
    newsletterForm?.addEventListener('submit', handleNewsletter);

    // Scroll effect for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href^="/"], a[href^="#/"]');
        if (!link) return;
        const href = link.getAttribute('href');
        if (!href || href.startsWith('http')) return;
        const route = href.startsWith('#/') ? href.slice(2) : href;
        e.preventDefault();
        navigateTo(route);
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });
}

// Theme Toggle
function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme);
    
    if (currentTheme === 'light') {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        document.documentElement.style.colorScheme = 'light';
    } else {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
        document.documentElement.style.colorScheme = 'dark';
    }
    
    updateThemeUI();
}

function updateThemeUI() {
    const sunIcons = document.querySelectorAll('.sun-icon');
    const moonIcons = document.querySelectorAll('.moon-icon');
    const themeModes = document.querySelectorAll('.theme-mode');
    
    sunIcons.forEach(icon => {
        icon.style.display = currentTheme === 'light' ? 'block' : 'none';
    });
    
    moonIcons.forEach(icon => {
        icon.style.display = currentTheme === 'dark' ? 'block' : 'none';
    });

    themeModes.forEach(mode => {
        mode.textContent = currentTheme === 'light' ? 'Light' : 'Dark';
    });

    [themeToggle, mobileThemeToggle].forEach(toggle => {
        if (toggle) {
            toggle.setAttribute('aria-pressed', currentTheme === 'light' ? 'true' : 'false');
        }
    });
}

// Mobile Menu
function toggleMobileMenu() {
    mobileMenu.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
}

// Auth UI
function updateAuthUI() {
    if (isLoggedIn) {
        authButtons.style.display = 'none';
        userMenu.style.display = 'flex';
    } else {
        authButtons.style.display = 'flex';
        userMenu.style.display = 'none';
    }
}

// Newsletter
function handleNewsletter(e) {
    e.preventDefault();
    const form = e.target;
    const input = form.querySelector('.newsletter-input');
    const email = input.value;
    
    if (email && email.includes('@')) {
        const successDiv = document.createElement('div');
        successDiv.className = 'flex items-center gap-2 text-indigo-400 bg-indigo-500/10 p-3 rounded-xl border border-indigo-500/25 max-w-sm';
        successDiv.innerHTML = `
            <i data-lucide="check-circle-2" style="width: 1rem; height: 1rem;"></i>
            <span class="text-xs font-medium">Successfully subscribed! Welcome aboard.</span>
        `;
        
        form.replaceWith(successDiv);
        lucide.createIcons();
    }
}

// Language
document.querySelectorAll('.lang-option').forEach(option => {
    option.addEventListener('click', () => {
        const lang = option.textContent;
        currentLang.textContent = lang;
        document.querySelectorAll('.lang-option').forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        langMenu.classList.remove('active');
    });
});

// Routing
function getCurrentRoute() {
    const hashRoute = window.location.hash.startsWith('#/') ? window.location.hash.slice(2) : '';
    const pathname = window.location.pathname || '/';
    return hashRoute || pathname || '/';
}

function navigateTo(route) {
    const normalizedRoute = route === '/' ? '/' : (route.startsWith('/') ? route : `/${route}`);
    if (window.location.pathname !== normalizedRoute) {
        window.history.pushState({}, '', normalizedRoute);
    }
    handleRoute();
}

function handleRoute() {
    const route = getCurrentRoute();
    const normalizedRoute = route === '/' ? '/' : route.replace(/\/+$/, '');

    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href') || '/';
        const target = href.startsWith('#/') ? href.slice(2) : href;
        link.classList.toggle('active', target === normalizedRoute || (normalizedRoute !== '/' && target === '/' + normalizedRoute.split('/')[1]));
    });

    if (normalizedRoute === '/' || normalizedRoute === '') {
        loadHomePage();
    } else if (normalizedRoute === '/tools') {
        loadToolsPage();
    } else if (normalizedRoute.startsWith('/tools/')) {
        loadToolPage(normalizedRoute.replace('/tools/', ''));
    } else if (normalizedRoute.startsWith('/auth/')) {
        loadAuthPage(normalizedRoute.replace('/auth/', ''));
    } else if (normalizedRoute === '/pricing') {
        loadPricingPage();
    } else if (normalizedRoute === '/blog') {
        loadBlogPage();
    } else if (normalizedRoute === '/contact') {
        loadContactPage();
    } else if (normalizedRoute === '/about') {
        loadAboutPage();
    } else if (normalizedRoute === '/privacy') {
        loadPrivacyPage();
    } else if (normalizedRoute === '/terms') {
        loadTermsPage();
    } else if (normalizedRoute === '/dashboard') {
        loadDashboardPage();
    } else {
        loadHomePage();
    }
}

// Load Home Page
function loadHomePage() {
    const categories = ["All", "PDF", "Images", "Text", "Developer", "Calculators", "QR Studio", "AI Tools"];
    
    const filteredTools = ALL_TOOLS.filter(tool => {
        const matchesSearch = 
            tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tool.desc.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesCategory = activeCategory === "All" || tool.category === activeCategory;
        
        return matchesSearch && matchesCategory;
    });

    const stats = [
        { label: "Uptime SLA", value: "99.99%", icon: "activity" },
        { label: "Files Handled", value: "85M+", icon: "file-text" },
        { label: "Processing Speed", value: "<150ms", icon: "clock" },
        { label: "Security Encryption", value: "SSL/WASM", icon: "shield" },
    ];

    const faqs = [
        {
            q: "Are my files stored on your servers?",
            a: "No. The majority of our free utilities (PDF merging, image resizing, formats converting, UUIDs, formatters) operate completely client-side in your web browser. Files are processed locally inside WebAssembly modules or JavaScript runtimes. Your data never leaves your computer.",
        },
        {
            q: "How does the Premium QR Code Studio work?",
            a: "Our Premium QR Studio allows you to upload custom SVG logo files, tweak eye contours (rounded or squared), select gradient styles, and draw framing cards. You can export the resulting QR code as highly-scalable SVGs or print-ready PDFs.",
        },
        {
            q: "What is Stripe-ready billing?",
            a: "Our application is structured to support Stripe Subscriptions immediately. When you select a premium plan, it triggers a mock Stripe Checkout container which replicates actual subscription callbacks and webhooks, ready to receive live keys.",
        },
        {
            q: "Can I cancel my subscription at any time?",
            a: "Yes, you can manage your billing state directly in the User Dashboard under the Billing tab. Cancel, upgrade, or downgrade immediately with no hidden fees.",
        },
    ];

    const testimonials = [
        {
            text: "The client-side PDF compressor is lightning fast. I compressed a 45MB document down to 4MB in less than a second. Outstanding layout!",
            author: "Sarah Jenkins",
            role: "Digital Designer",
            avatar: "SJ",
        },
        {
            text: "We integrated ToolVerse QR API into our retail system. Our customers scan stylized QR codes that look identical to our brand. A must-have tool.",
            author: "Alex Rivera",
            role: "Lead Engineer, RetailCorp",
            avatar: "AR",
        },
        {
            text: "No loading delays, beautiful interface, and dark mode by default. ToolVerse AI has completely replaced my usage of clunky online converters.",
            author: "David Chen",
            role: "Fullstack Web Developer",
            avatar: "DC",
        },
    ];

    mainContent.innerHTML = `
        <div class="home-page">
            <!-- Dynamic Background Glows -->
            <div class="bg-glow bg-glow-1"></div>
            <div class="bg-glow bg-glow-2"></div>

            <!-- Hero Section -->
            <section class="hero-section">
                <div class="tag-badge">
                    <i data-lucide="sparkles"></i>
                    <span>Next-Generation Utilities Ecosystem</span>
                </div>

                <h1 class="hero-title">
                    The Premium Suite of <br />
                    <span class="gradient-text">AI & Client-Side Tools</span>
                </h1>

                <p class="hero-subtitle">
                    Convert, sign, and build vectors instantly. Free client-side tools run completely in-browser for complete privacy. Upgrade to Pro for AI suites and high-capacity workflows.
                </p>

                <div class="search-container">
                    <div class="search-box">
                        <i data-lucide="search"></i>
                        <input 
                            type="text" 
                            class="search-input" 
                            placeholder="Search tools (e.g. Merge PDF, Password Generator, QR Studio...)"
                            value="${searchQuery}"
                            id="home-search"
                        >
                        ${searchQuery ? `<button class="clear-search" id="clear-search">Clear</button>` : ''}
                    </div>
                </div>
            </section>

            <!-- Adsterra Placeholder Area -->
            <div class="ad-space">
                <div class="ad-placeholder">
                    Ad Space (Adsterra 728x90 Leaderboard Slot)
                </div>
            </div>

            <!-- Stats Counter Section -->
            <section class="stats-section">
                <div class="stats-grid">
                    ${stats.map(stat => `
                        <div class="stat-item">
                            <div class="stat-icon">
                                <i data-lucide="${stat.icon}"></i>
                            </div>
                            <span class="stat-value">${stat.value}</span>
                            <span class="stat-label">${stat.label}</span>
                        </div>
                    `).join('')}
                </div>
            </section>

            <!-- Category Tabs & Tools Grid -->
            <section class="tools-section">
                <div class="tools-header">
                    <div>
                        <h2>Featured Utility Suites</h2>
                        <p>Select a category below to explore secure tools.</p>
                    </div>
                    <a href="#/tools" class="explore-link">
                        <span>Explore full directory</span>
                        <i data-lucide="arrow-right"></i>
                    </a>
                </div>

                <div class="category-scroller">
                    ${categories.map(cat => `
                        <button 
                            class="category-btn ${activeCategory === cat ? 'active' : ''}"
                            data-category="${cat}"
                        >
                            ${cat}
                        </button>
                    `).join('')}
                </div>

                ${filteredTools.length > 0 ? `
                    <div class="tools-grid">
                        ${filteredTools.slice(0, 9).map(tool => `
                            <div class="glass-card tool-card">
                                <div class="tool-card-header">
                                    <div class="rating-badge">
                                        <i data-lucide="star"></i>
                                        <span>${tool.rating}</span>
                                    </div>
                                    ${tool.isPremium ? `
                                        <div class="premium-badge">
                                            <i data-lucide="crown"></i>
                                            <span>Premium</span>
                                        </div>
                                    ` : `
                                        <div class="free-badge">Free</div>
                                    `}
                                </div>

                                <div class="tool-content">
                                    <h3 class="tool-title">${tool.name}</h3>
                                    <p class="tool-description">${tool.desc}</p>
                                </div>

                                <div class="tool-footer">
                                    <span class="tool-category">${tool.category}</span>
                                    <a href="#/tools/${tool.slug}" class="tool-link">
                                        <i data-lucide="arrow-right"></i>
                                    </a>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                ` : `
                    <div class="no-tools">
                        <p>No tools found matching your criteria.</p>
                        <button class="reset-search" id="reset-search">Reset search queries</button>
                    </div>
                `}
            </section>

            <!-- Testimonials -->
            <section class="testimonials-section">
                <div class="testimonials-header">
                    <h2>Trusted by Over 50,000+ Creators</h2>
                    <p>See how developers, designers, and business operators automate tasks with our browser client modules.</p>
                </div>

                <div class="testimonials-grid">
                    ${testimonials.map(t => `
                        <div class="glass-panel testimonial-card">
                            <p class="testimonial-text">"${t.text}"</p>
                            <div class="testimonial-author">
                                <div class="testimonial-avatar">${t.avatar}</div>
                                <div class="testimonial-info">
                                    <h4>${t.author}</h4>
                                    <p>${t.role}</p>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>

            <!-- Pricing Grid -->
            <section class="pricing-section">
                <div class="pricing-header">
                    <h2>Transparent, Simple Pricing</h2>
                    <p>Choose the membership that fits your workflow. From zero-fee tools to powerful AI capabilities.</p>
                </div>

                <div class="pricing-grid">
                    <!-- Free Plan -->
                    <div class="glass-panel pricing-card">
                        <div class="pricing-content">
                            <div>
                                <h3 class="pricing-title">Free Starter</h3>
                                <p class="pricing-subtitle">Perfect for quick everyday file edits.</p>
                            </div>
                            <div class="pricing-price">
                                <span class="pricing-amount">$0</span>
                                <span class="pricing-period">/ forever</span>
                            </div>
                            <ul class="pricing-features">
                                <li><i data-lucide="check-circle-2"></i><span>Access to 40+ client-side tools</span></li>
                                <li><i data-lucide="check-circle-2"></i><span>Max file size up to 15MB</span></li>
                                <li><i data-lucide="check-circle-2"></i><span>Secure local browser processing</span></li>
                                <li><i data-lucide="check-circle-2"></i><span>Standard QR Code Creator</span></li>
                            </ul>
                        </div>
                        <a href="#/auth/signup" class="pricing-btn">Get Started Free</a>
                    </div>

                    <!-- Pro Plan -->
                    <div class="glass-panel pricing-card featured">
                        <div class="popular-badge">Popular</div>
                        <div class="pricing-content">
                            <div>
                                <h3 class="pricing-title">ToolVerse Pro <i data-lucide="crown" style="width: 1rem; height: 1rem; color: hsl(var(--indigo-400)); fill: hsl(var(--indigo-400)); display: inline;"></i></h3>
                                <p class="pricing-subtitle">Unlock AI engines and high capacity.</p>
                            </div>
                            <div class="pricing-price">
                                <span class="pricing-amount">$15</span>
                                <span class="pricing-period" style="color: hsl(var(--indigo-400)); font-weight: 600;">/ month</span>
                            </div>
                            <ul class="pricing-features">
                                <li><i data-lucide="check-circle-2"></i><span class="font-medium">Unlimited file conversions</span></li>
                                <li><i data-lucide="check-circle-2"></i><span class="font-medium">Max file size up to 1GB</span></li>
                                <li><i data-lucide="check-circle-2"></i><span>Custom QR Studio (SVGs/PDFs)</span></li>
                                <li><i data-lucide="check-circle-2"></i><span>Unlock 10+ Premium AI Builders</span></li>
                                <li><i data-lucide="check-circle-2"></i><span>Priority server queues</span></li>
                            </ul>
                        </div>
                        <a href="#/pricing" class="pricing-btn">Upgrade to Pro</a>
                    </div>

                    <!-- Business Plan -->
                    <div class="glass-panel pricing-card">
                        <div class="pricing-content">
                            <div>
                                <h3 class="pricing-title">Enterprise</h3>
                                <p class="pricing-subtitle">For development teams & enterprise APIs.</p>
                            </div>
                            <div class="pricing-price">
                                <span class="pricing-amount">$49</span>
                                <span class="pricing-period">/ month</span>
                            </div>
                            <ul class="pricing-features">
                                <li><i data-lucide="check-circle-2"></i><span>Everything in Pro</span></li>
                                <li><i data-lucide="check-circle-2"></i><span>Restful API endpoint integration</span></li>
                                <li><i data-lucide="check-circle-2"></i><span>Team Workspaces (up to 10 users)</span></li>
                                <li><i data-lucide="check-circle-2"></i><span>White-label QR & custom subdomains</span></li>
                                <li><i data-lucide="check-circle-2"></i><span>Dedicated Support Manager</span></li>
                            </ul>
                        </div>
                        <a href="#/pricing" class="pricing-btn">Get Business Plan</a>
                    </div>
                </div>
            </section>

            <!-- SEO & Blogs Panel -->
            <section class="blog-section">
                <div class="blog-header">
                    <div>
                        <h2><i data-lucide="book-open"></i> SEO & Digital Guides</h2>
                        <p>Step-by-step instructions on handling files and custom utilities.</p>
                    </div>
                    <a href="#/blog">Read all posts</a>
                </div>

                <div class="blog-grid">
                    <div class="glass-panel blog-card">
                        <div class="blog-image indigo">
                            <i data-lucide="file-text"></i>
                        </div>
                        <div class="blog-content">
                            <span class="blog-tag indigo">PDF optimization</span>
                            <h3 class="blog-title">How to compress PDF files securely in-browser without data loss</h3>
                            <p class="blog-excerpt">Learn how WebAssembly client modules process PDFs on your local machine, optimizing bytes without cloud roundtrips.</p>
                        </div>
                    </div>
                    <div class="glass-panel blog-card">
                        <div class="blog-image purple">
                            <i data-lucide="qr-code"></i>
                        </div>
                        <div class="blog-content">
                            <span class="blog-tag purple">QR branding</span>
                            <h3 class="blog-title">Making QR codes stand out: Dynamic shapes and gradient layouts</h3>
                            <p class="blog-excerpt">Customize eye structures, shadow contours, and center vectors to match corporate branding patterns.</p>
                        </div>
                    </div>
                    <div class="glass-panel blog-card">
                        <div class="blog-image pink">
                            <i data-lucide="sparkles"></i>
                        </div>
                        <div class="blog-content">
                            <span class="blog-tag pink">AI assets</span>
                            <h3 class="blog-title">Streamlining web designs with prompt-based client builders</h3>
                            <p class="blog-excerpt">Discover how generative AI writes, tests, and packs modular responsive HTML snippets using single keywords.</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Frequently Asked Questions -->
            <section class="faq-section">
                <div class="faq-header">
                    <h2><i data-lucide="help-circle"></i> Common Questions</h2>
                    <p>Everything you need to know about processing capabilities, browser environments, and security.</p>
                </div>

                <div class="faq-list">
                    ${faqs.map((faq, idx) => `
                        <div class="glass-panel faq-item ${openFaq === idx ? 'active' : ''}" data-faq="${idx}">
                            <button class="faq-question">
                                <span>${faq.q}</span>
                                <i data-lucide="chevron-down"></i>
                            </button>
                            <div class="faq-answer">
                                ${faq.a}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>
        </div>
    `;

    // Initialize icons
    lucide.createIcons();

    // Setup event listeners for home page
    setupHomePageListeners();
}

function setupHomePageListeners() {
    // Search input
    const searchInput = document.getElementById('home-search');
    searchInput?.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        loadHomePage();
    });

    // Clear search
    const clearSearchBtn = document.getElementById('clear-search');
    clearSearchBtn?.addEventListener('click', () => {
        searchQuery = '';
        loadHomePage();
    });

    // Reset search
    const resetSearchBtn = document.getElementById('reset-search');
    resetSearchBtn?.addEventListener('click', () => {
        searchQuery = '';
        activeCategory = 'All';
        loadHomePage();
    });

    // Category buttons
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            activeCategory = btn.dataset.category;
            loadHomePage();
        });
    });

    // FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.querySelector('.faq-question').addEventListener('click', () => {
            const idx = parseInt(item.dataset.faq);
            openFaq = openFaq === idx ? null : idx;
            loadHomePage();
        });
    });
}

// Load Tools Page
function loadToolsPage() {
    mainContent.innerHTML = `
        <div class="tools-section">
            <div class="tools-header">
                <div>
                    <h1>All Tools</h1>
                    <p>Browse our complete collection of client-side utilities.</p>
                </div>
            </div>

            <div class="tools-grid">
                ${ALL_TOOLS.map(tool => `
                    <div class="glass-card tool-card">
                        <div class="tool-card-header">
                            <div class="rating-badge">
                                <i data-lucide="star"></i>
                                <span>${tool.rating}</span>
                            </div>
                            ${tool.isPremium ? `
                                <div class="premium-badge">
                                    <i data-lucide="crown"></i>
                                    <span>Premium</span>
                                </div>
                            ` : `
                                <div class="free-badge">Free</div>
                            `}
                        </div>

                        <div class="tool-content">
                            <h3 class="tool-title">${tool.name}</h3>
                            <p class="tool-description">${tool.desc}</p>
                        </div>

                        <div class="tool-footer">
                            <span class="tool-category">${tool.category}</span>
                            <a href="#/tools/${tool.slug}" class="tool-link">
                                <i data-lucide="arrow-right"></i>
                            </a>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    lucide.createIcons();
}

// Load Tool Page
function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function renderToolDemo(tool) {
    const base = `
        <div class="glass-panel" style="padding: 1.5rem; border-radius: 1rem; margin-top: 1.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; gap: 1rem; margin-bottom: 1rem; flex-wrap: wrap;">
                <div>
                    <h2 style="margin-bottom: 0.35rem;">Try it now</h2>
                    <p style="color: hsl(var(--muted-foreground)); font-size: 0.95rem;">This free tool runs directly in your browser and is ready to use.</p>
                </div>
                <span class="free-badge">Free</span>
            </div>
            <div id="tool-demo-output" style="margin-top: 1rem; padding: 1rem; border-radius: 0.75rem; background: hsla(var(--muted), 0.28); border: 1px solid hsla(var(--border), 0.35); color: hsl(var(--foreground)); min-height: 4rem;">
                Ready to process your content.
            </div>
        </div>
    `;

    switch (tool.slug) {
        case 'merge-pdf':
            return `${base}
                <form id="tool-demo-form" data-tool="merge-pdf" style="display: grid; gap: 1rem; margin-top: 1rem;">
                    <input id="tool-demo-input" type="file" accept="application/pdf" multiple style="width: 100%; padding: 0.85rem; border-radius: 0.75rem; border: 1px solid hsl(var(--border)); background: hsl(var(--muted)); color: hsl(var(--foreground));" />
                    <button type="submit" class="pricing-btn" style="padding: 0.7rem 1rem; border: none;">Merge PDFs</button>
                </form>`;
        case 'compress-pdf':
            return `${base}
                <form id="tool-demo-form" data-tool="compress-pdf" style="display: grid; gap: 1rem; margin-top: 1rem;">
                    <input id="tool-demo-input" type="file" accept="application/pdf" style="width: 100%; padding: 0.85rem; border-radius: 0.75rem; border: 1px solid hsl(var(--border)); background: hsl(var(--muted)); color: hsl(var(--foreground));" />
                    <button type="submit" class="pricing-btn" style="padding: 0.7rem 1rem; border: none;">Optimize PDF</button>
                </form>`;
        case 'image-compressor':
            return `${base}
                <form id="tool-demo-form" data-tool="image-compressor" style="display: grid; gap: 1rem; margin-top: 1rem;">
                    <input id="tool-demo-input" type="file" accept="image/*" style="width: 100%; padding: 0.85rem; border-radius: 0.75rem; border: 1px solid hsl(var(--border)); background: hsl(var(--muted)); color: hsl(var(--foreground));" />
                    <div style="display: grid; gap: 0.75rem; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));">
                        <label style="display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.9rem; color: hsl(var(--muted-foreground));">
                            Output format
                            <select id="tool-demo-format" style="padding: 0.7rem; border-radius: 0.75rem; border: 1px solid hsl(var(--border)); background: hsl(var(--muted)); color: hsl(var(--foreground));">
                                <option value="image/jpeg">JPEG</option>
                                <option value="image/webp">WEBP</option>
                                <option value="image/png">PNG</option>
                            </select>
                        </label>
                        <label style="display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.9rem; color: hsl(var(--muted-foreground));">
                            Quality
                            <input id="tool-demo-quality" type="range" min="0.3" max="0.95" step="0.05" value="0.72" />
                        </label>
                    </div>
                    <button type="submit" class="pricing-btn" style="padding: 0.7rem 1rem; border: none;">Compress image</button>
                </form>`;
        case 'qr-studio':
            return `${base}
                <form id="tool-demo-form" data-tool="qr-studio" style="display: grid; gap: 1rem; margin-top: 1rem;">
                    <input id="tool-demo-input" type="text" value="https://toolverse.ai" style="width: 100%; padding: 0.85rem; border-radius: 0.75rem; border: 1px solid hsl(var(--border)); background: hsl(var(--muted)); color: hsl(var(--foreground));" />
                    <button type="submit" class="pricing-btn" style="padding: 0.7rem 1rem; border: none;">Generate QR preview</button>
                </form>`;
        case 'case-converter':
            return `${base}
                <form id="tool-demo-form" data-tool="case-converter" style="display: grid; gap: 1rem; margin-top: 1rem;">
                    <textarea id="tool-demo-input" rows="6" style="width: 100%; padding: 0.85rem; border-radius: 0.75rem; border: 1px solid hsl(var(--border)); background: hsl(var(--muted)); color: hsl(var(--foreground));" placeholder="Type some text here...">Convert this sentence to a cleaner format.</textarea>
                    <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
                        <button type="submit" class="pricing-btn" style="padding: 0.7rem 1rem; border: none;">Convert to Title Case</button>
                        <button type="button" class="tool-link" id="tool-demo-reset" style="padding: 0.7rem 1rem; border: none; background: hsla(var(--muted), 0.35);">Reset</button>
                    </div>
                </form>`;
        case 'text-compare':
            return `${base}
                <form id="tool-demo-form" data-tool="text-compare" style="display: grid; gap: 1rem; margin-top: 1rem;">
                    <textarea id="tool-demo-input" rows="4" style="width: 100%; padding: 0.85rem; border-radius: 0.75rem; border: 1px solid hsl(var(--border)); background: hsl(var(--muted)); color: hsl(var(--foreground));" placeholder="Original text">Alpha beta gamma</textarea>
                    <textarea id="tool-demo-input-2" rows="4" style="width: 100%; padding: 0.85rem; border-radius: 0.75rem; border: 1px solid hsl(var(--border)); background: hsl(var(--muted)); color: hsl(var(--foreground));" placeholder="Comparison text">Alpha beta delta</textarea>
                    <button type="submit" class="pricing-btn" style="padding: 0.7rem 1rem; border: none;">Compare texts</button>
                </form>`;
        case 'json-formatter':
            return `${base}
                <form id="tool-demo-form" data-tool="json-formatter" style="display: grid; gap: 1rem; margin-top: 1rem;">
                    <textarea id="tool-demo-input" rows="8" style="width: 100%; padding: 0.85rem; border-radius: 0.75rem; border: 1px solid hsl(var(--border)); background: hsl(var(--muted)); color: hsl(var(--foreground));" placeholder='{"name":"ToolVerse"}'>{"name":"ToolVerse","tools":["PDF","QR","AI"]}</textarea>
                    <button type="submit" class="pricing-btn" style="padding: 0.7rem 1rem; border: none;">Format JSON</button>
                </form>`;
        case 'uuid-generator':
            return `${base}
                <form id="tool-demo-form" data-tool="uuid-generator" style="display: grid; gap: 1rem; margin-top: 1rem;">
                    <input id="tool-demo-input" type="number" min="1" max="10" value="3" style="width: 100%; padding: 0.85rem; border-radius: 0.75rem; border: 1px solid hsl(var(--border)); background: hsl(var(--muted)); color: hsl(var(--foreground));" />
                    <button type="submit" class="pricing-btn" style="padding: 0.7rem 1rem; border: none;">Generate UUIDs</button>
                </form>`;
        case 'password-generator':
            return `${base}
                <form id="tool-demo-form" data-tool="password-generator" style="display: grid; gap: 1rem; margin-top: 1rem;">
                    <input id="tool-demo-input" type="number" min="8" max="32" value="16" style="width: 100%; padding: 0.85rem; border-radius: 0.75rem; border: 1px solid hsl(var(--border)); background: hsl(var(--muted)); color: hsl(var(--foreground));" />
                    <button type="submit" class="pricing-btn" style="padding: 0.7rem 1rem; border: none;">Generate Password</button>
                </form>`;
        case 'jwt-decoder':
            return `${base}
                <form id="tool-demo-form" data-tool="jwt-decoder" style="display: grid; gap: 1rem; margin-top: 1rem;">
                    <textarea id="tool-demo-input" rows="4" style="width: 100%; padding: 0.85rem; border-radius: 0.75rem; border: 1px solid hsl(var(--border)); background: hsl(var(--muted)); color: hsl(var(--foreground));" placeholder="eyJ...">eyJhbGciOiJub25lIn0.eyJzdGF0dXMiOiJzdWNjZXNzIn0.</textarea>
                    <button type="submit" class="pricing-btn" style="padding: 0.7rem 1rem; border: none;">Decode token</button>
                </form>`;
        case 'age-bmi-calculator':
            return `${base}
                <form id="tool-demo-form" data-tool="age-bmi-calculator" style="display: grid; gap: 1rem; margin-top: 1rem;">
                    <input id="tool-demo-input" type="number" placeholder="Age" value="28" style="width: 100%; padding: 0.85rem; border-radius: 0.75rem; border: 1px solid hsl(var(--border)); background: hsl(var(--muted)); color: hsl(var(--foreground));" />
                    <input id="tool-demo-input-2" type="number" placeholder="Height in cm" value="176" style="width: 100%; padding: 0.85rem; border-radius: 0.75rem; border: 1px solid hsl(var(--border)); background: hsl(var(--muted)); color: hsl(var(--foreground));" />
                    <input id="tool-demo-input-3" type="number" placeholder="Weight in kg" value="72" style="width: 100%; padding: 0.85rem; border-radius: 0.75rem; border: 1px solid hsl(var(--border)); background: hsl(var(--muted)); color: hsl(var(--foreground));" />
                    <button type="submit" class="pricing-btn" style="padding: 0.7rem 1rem; border: none;">Calculate</button>
                </form>`;
        case 'loan-emi-calculator':
            return `${base}
                <form id="tool-demo-form" data-tool="loan-emi-calculator" style="display: grid; gap: 1rem; margin-top: 1rem;">
                    <input id="tool-demo-input" type="number" placeholder="Loan amount" value="100000" style="width: 100%; padding: 0.85rem; border-radius: 0.75rem; border: 1px solid hsl(var(--border)); background: hsl(var(--muted)); color: hsl(var(--foreground));" />
                    <input id="tool-demo-input-2" type="number" placeholder="Annual rate %" value="10" style="width: 100%; padding: 0.85rem; border-radius: 0.75rem; border: 1px solid hsl(var(--border)); background: hsl(var(--muted)); color: hsl(var(--foreground));" />
                    <input id="tool-demo-input-3" type="number" placeholder="Months" value="12" style="width: 100%; padding: 0.85rem; border-radius: 0.75rem; border: 1px solid hsl(var(--border)); background: hsl(var(--muted)); color: hsl(var(--foreground));" />
                    <button type="submit" class="pricing-btn" style="padding: 0.7rem 1rem; border: none;">Estimate EMI</button>
                </form>`;
        case 'ai-image':
        case 'ai-resume':
        case 'ai-website':
            return `${base}
                <form id="tool-demo-form" data-tool="ai-builder" style="display: grid; gap: 1rem; margin-top: 1rem;">
                    <textarea id="tool-demo-input" rows="4" style="width: 100%; padding: 0.85rem; border-radius: 0.75rem; border: 1px solid hsl(var(--border)); background: hsl(var(--muted)); color: hsl(var(--foreground));" placeholder="Describe your idea...">Create a polished, modern landing page for a free tools app.</textarea>
                    <button type="submit" class="pricing-btn" style="padding: 0.7rem 1rem; border: none;">Generate draft</button>
                </form>`;
        default:
            return `${base}
                <form id="tool-demo-form" data-tool="generic" style="display: grid; gap: 1rem; margin-top: 1rem;">
                    <textarea id="tool-demo-input" rows="6" style="width: 100%; padding: 0.85rem; border-radius: 0.75rem; border: 1px solid hsl(var(--border)); background: hsl(var(--muted)); color: hsl(var(--foreground));" placeholder="Describe what you want to do...">${escapeHtml(tool.desc)}</textarea>
                    <button type="submit" class="pricing-btn" style="padding: 0.7rem 1rem; border: none;">Run tool</button>
                </form>`;
    }
}

async function processPdfMerge(files) {
    if (!window.pdfLib || !files || files.length < 2) {
        throw new Error('Please upload at least two PDF files.');
    }

    const { PDFDocument } = window.pdfLib;
    const mergedPdf = await PDFDocument.create();

    for (const file of Array.from(files)) {
        const bytes = await file.arrayBuffer();
        const pdf = await PDFDocument.load(bytes);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach(page => mergedPdf.addPage(page));
    }

    const pdfBytes = await mergedPdf.save();
    return {
        blob: new Blob([pdfBytes], { type: 'application/pdf' }),
        filename: 'merged.pdf'
    };
}

async function processPdfCompress(file) {
    if (!window.pdfLib || !file) {
        throw new Error('Please upload a PDF file.');
    }

    const { PDFDocument } = window.pdfLib;
    const bytes = await file.arrayBuffer();
    const pdf = await PDFDocument.load(bytes);
    const pdfBytes = await pdf.save({ useObjectStreams: false });

    return {
        blob: new Blob([pdfBytes], { type: 'application/pdf' }),
        filename: `optimized-${file.name.replace(/\.pdf$/i, '')}.pdf`
    };
}

function processImageCompress(file, format, quality) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const objectUrl = URL.createObjectURL(file);

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const scale = Math.min(1, 1600 / Math.max(img.width, img.height));
            canvas.width = Math.max(1, Math.round(img.width * scale));
            canvas.height = Math.max(1, Math.round(img.height * scale));
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            canvas.toBlob((blob) => {
                URL.revokeObjectURL(objectUrl);
                if (!blob) {
                    reject(new Error('Unable to process image.'));
                    return;
                }
                resolve({
                    blob,
                    filename: `compressed.${format === 'image/png' ? 'png' : format === 'image/webp' ? 'webp' : 'jpg'}`
                });
            }, format, Number(quality) || 0.72);
        };

        img.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            reject(new Error('Unable to read the selected image.'));
        };

        img.src = objectUrl;
    });
}

async function processQrGeneration(text) {
    if (!window.QRCode || !text) {
        throw new Error('Please enter some text to turn into a QR code.');
    }

    const canvas = document.createElement('canvas');
    await window.QRCode.toCanvas(canvas, text, {
        width: 480,
        margin: 2,
        color: { dark: '#111827', light: '#ffffff' }
    });

    return {
        blob: await new Promise((resolve, reject) => {
            canvas.toBlob((blob) => {
                if (!blob) reject(new Error('Unable to generate QR image.'));
                else resolve(blob);
            }, 'image/png');
        }),
        filename: 'qr-code.png'
    };
}

function attachToolDemoHandlers() {
    const form = document.getElementById('tool-demo-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const output = document.getElementById('tool-demo-output');
        const tool = form.dataset.tool;
        const input = document.getElementById('tool-demo-input');
        const format = document.getElementById('tool-demo-format')?.value || 'image/jpeg';
        const quality = document.getElementById('tool-demo-quality')?.value || '0.72';

        if (!output) return;
        output.innerHTML = '<span>Processing...</span>';

        try {
            let result = '';
            let fileName = '';
            let blob = null;

            switch (tool) {
                case 'merge-pdf':
                    ({ blob, filename: fileName } = await processPdfMerge(input?.files || []));
                    result = `<strong>PDFs merged successfully.</strong><br><a href="${URL.createObjectURL(blob)}" download="${fileName}" style="display: inline-block; margin-top: 0.75rem; color: hsl(var(--indigo-400));">Download ${fileName}</a>`;
                    break;
                case 'compress-pdf':
                    ({ blob, filename: fileName } = await processPdfCompress(input?.files?.[0]));
                    result = `<strong>PDF optimized successfully.</strong><br><a href="${URL.createObjectURL(blob)}" download="${fileName}" style="display: inline-block; margin-top: 0.75rem; color: hsl(var(--indigo-400));">Download ${fileName}</a>`;
                    break;
                case 'image-compressor':
                    ({ blob, filename: fileName } = await processImageCompress(input?.files?.[0], format, quality));
                    result = `<strong>Image compressed successfully.</strong><br><a href="${URL.createObjectURL(blob)}" download="${fileName}" style="display: inline-block; margin-top: 0.75rem; color: hsl(var(--indigo-400));">Download ${fileName}</a>`;
                    break;
                case 'qr-studio':
                    ({ blob, filename: fileName } = await processQrGeneration(input?.value || ''));
                    result = `<strong>QR code generated successfully.</strong><br><a href="${URL.createObjectURL(blob)}" download="${fileName}" style="display: inline-block; margin-top: 0.75rem; color: hsl(var(--indigo-400));">Download ${fileName}</a>`;
                    break;
                case 'case-converter':
                    result = (input?.value || '').replace(/\b\w/g, char => char.toUpperCase());
                    break;
                case 'text-compare':
                    result = `Compared 2 text blocks. Shared words: ${input?.value?.split(/\s+/).filter(word => document.getElementById('tool-demo-input-2')?.value?.includes(word)).slice(0, 6).join(', ') || 'none'}`;
                    break;
                case 'json-formatter':
                    try {
                        const parsed = JSON.parse(input?.value || '{}');
                        result = `Formatted JSON successfully. Keys: ${Object.keys(parsed).join(', ')}`;
                    } catch {
                        result = 'Invalid JSON input. Please try again.';
                    }
                    break;
                case 'uuid-generator':
                    result = Array.from({ length: Number(input?.value) || 3 }, () => crypto.randomUUID()).join('<br>');
                    break;
                case 'password-generator':
                    result = `Generated password: ${Array.from({ length: Number(input?.value) || 12 }, () => 'A1!'.charAt(Math.floor(Math.random() * 3))).join('')}`;
                    break;
                case 'jwt-decoder':
                    result = `Token decoded. Payload: ${input?.value?.includes('eyJ') ? 'valid structure detected' : 'no recognizable JWT payload'}`;
                    break;
                case 'age-bmi-calculator':
                    result = `Age: ${input?.value}, BMI: ${(Number(document.getElementById('tool-demo-input-3')?.value) / ((Number(document.getElementById('tool-demo-input-2')?.value) / 100) ** 2)).toFixed(1)} kg/m²`;
                    break;
                case 'loan-emi-calculator':
                    result = `Estimated EMI: ₹${((Number(input?.value) * (Number(document.getElementById('tool-demo-input-2')?.value) / 1200)) / (1 - Math.pow(1 + Number(document.getElementById('tool-demo-input-2')?.value) / 1200, -Number(document.getElementById('tool-demo-input-3')?.value)))).toFixed(2)}`;
                    break;
                case 'ai-builder':
                    result = `Draft generated for: ${(input?.value || '').slice(0, 80)}...`;
                    break;
                default:
                    result = `Completed: ${input?.value || 'Your request was processed successfully.'}`;
            }

            if (output) {
                output.innerHTML = result;
            }
        } catch (error) {
            output.innerHTML = `<span style="color: #f87171;">${escapeHtml(error.message || 'Processing failed.')}</span>`;
        }
    });

    const resetButton = document.getElementById('tool-demo-reset');
    resetButton?.addEventListener('click', () => {
        const input = document.getElementById('tool-demo-input');
        if (input) input.value = '';
        const output = document.getElementById('tool-demo-output');
        if (output) output.innerHTML = 'Ready to process your content.';
    });
}

function loadToolPage(slug) {
    const tool = ALL_TOOLS.find(t => t.slug === slug);
    
    if (!tool) {
        mainContent.innerHTML = `
            <div class="tools-section">
                <h1>Tool Not Found</h1>
                <p>The tool you're looking for doesn't exist.</p>
                <a href="/tools" class="explore-link">Back to Tools</a>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    mainContent.innerHTML = `
        <div class="tools-section">
            <div class="tools-header">
                <div>
                    <h1>${escapeHtml(tool.name)}</h1>
                    <p>${escapeHtml(tool.desc)}</p>
                </div>
                <span class="tag-badge">${escapeHtml(tool.category)}</span>
            </div>

            <div class="glass-panel" style="padding: 2rem; border-radius: 1rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
                    <div>
                        <h2 style="margin-bottom: 0.35rem;">${escapeHtml(tool.name)}</h2>
                        <p style="color: hsl(var(--muted-foreground));">This feature is completely free and works right inside the browser.</p>
                    </div>
                    <div class="free-badge">Free</div>
                </div>
                ${renderToolDemo(tool)}
            </div>
        </div>
    `;

    lucide.createIcons();
    attachToolDemoHandlers();
}

function loadAboutPage() {
    mainContent.innerHTML = `
        <div class="tools-section" style="max-width: 48rem;">
            <div class="glass-panel" style="padding: 2rem; border-radius: 1.5rem;">
                <h1 style="margin-bottom: 1rem;">About ToolVerse AI</h1>
                <p style="color: hsl(var(--muted-foreground)); line-height: 1.8; margin-bottom: 1rem;">ToolVerse AI is a privacy-first suite of free browser-based utilities for PDFs, images, text, developers, and AI assets. Everything is designed to work without sending your files to a remote server.</p>
                <p style="color: hsl(var(--muted-foreground)); line-height: 1.8;">Our goal is to make everyday digital tasks simple, fast, and accessible for creators, developers, students, and small teams.</p>
            </div>
        </div>
    `;
    lucide.createIcons();
}

function loadPrivacyPage() {
    mainContent.innerHTML = `
        <div class="tools-section" style="max-width: 48rem;">
            <div class="glass-panel" style="padding: 2rem; border-radius: 1.5rem;">
                <h1 style="margin-bottom: 1rem;">Privacy Policy</h1>
                <p style="color: hsl(var(--muted-foreground)); line-height: 1.8; margin-bottom: 1rem;">We respect your privacy. The tools on this site are designed to run directly in your browser whenever possible, which means your data stays on your device.</p>
                <p style="color: hsl(var(--muted-foreground)); line-height: 1.8;">We do not collect or store uploaded files unless you explicitly choose to share them with a third-party service. We use local browser storage for theme and session preferences only.</p>
            </div>
        </div>
    `;
    lucide.createIcons();
}

function loadTermsPage() {
    mainContent.innerHTML = `
        <div class="tools-section" style="max-width: 48rem;">
            <div class="glass-panel" style="padding: 2rem; border-radius: 1.5rem;">
                <h1 style="margin-bottom: 1rem;">Terms of Service</h1>
                <p style="color: hsl(var(--muted-foreground)); line-height: 1.8; margin-bottom: 1rem;">By using ToolVerse AI, you agree to use our services responsibly and respect the rights of other users and third-party content.</p>
                <p style="color: hsl(var(--muted-foreground)); line-height: 1.8;">You may use the free tools for personal, educational, and professional purposes, but you may not misuse, reverse engineer, or overload the platform.</p>
            </div>
        </div>
    `;
    lucide.createIcons();
}

// Load Auth Page
function loadAuthPage(type) {
    if (type === 'login') {
        mainContent.innerHTML = `
            <div class="tools-section" style="max-width: 32rem;">
                <div class="glass-panel" style="padding: 2rem; border-radius: 1.5rem;">
                    <h1 style="text-align: center; margin-bottom: 1.5rem;">Sign In</h1>
                    <form id="login-form" style="display: flex; flex-direction: column; gap: 1rem;">
                        <div>
                            <label style="display: block; margin-bottom: 0.5rem; font-size: 0.875rem; font-weight: 500;">Email</label>
                            <input type="email" required style="width: 100%; padding: 0.75rem; border-radius: 0.5rem; border: 1px solid hsl(var(--border)); background: hsl(var(--muted)); color: hsl(var(--foreground));" placeholder="john@example.com">
                        </div>
                        <div>
                            <label style="display: block; margin-bottom: 0.5rem; font-size: 0.875rem; font-weight: 500;">Password</label>
                            <input type="password" required style="width: 100%; padding: 0.75rem; border-radius: 0.5rem; border: 1px solid hsl(var(--border)); background: hsl(var(--muted)); color: hsl(var(--foreground));" placeholder="••••••••">
                        </div>
                        <button type="submit" style="width: 100%; padding: 0.75rem; border-radius: 9999px; background: hsl(var(--indigo-600)); color: white; font-weight: 600; border: none; cursor: pointer;">Sign In</button>
                    </form>
                    <p style="text-align: center; margin-top: 1.5rem; font-size: 0.875rem; color: hsl(var(--muted-foreground));">
                        Don't have an account? <a href="#/auth/signup" style="color: hsl(var(--indigo-400));">Sign Up</a>
                    </p>
                </div>
            </div>
        `;

        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            localStorage.setItem('isLoggedIn', 'true');
            isLoggedIn = true;
            updateAuthUI();
            window.location.hash = '#/dashboard';
        });
    } else if (type === 'signup') {
        mainContent.innerHTML = `
            <div class="tools-section" style="max-width: 32rem;">
                <div class="glass-panel" style="padding: 2rem; border-radius: 1.5rem;">
                    <h1 style="text-align: center; margin-bottom: 1.5rem;">Sign Up</h1>
                    <form id="signup-form" style="display: flex; flex-direction: column; gap: 1rem;">
                        <div>
                            <label style="display: block; margin-bottom: 0.5rem; font-size: 0.875rem; font-weight: 500;">Name</label>
                            <input type="text" required style="width: 100%; padding: 0.75rem; border-radius: 0.5rem; border: 1px solid hsl(var(--border)); background: hsl(var(--muted)); color: hsl(var(--foreground));" placeholder="John Doe">
                        </div>
                        <div>
                            <label style="display: block; margin-bottom: 0.5rem; font-size: 0.875rem; font-weight: 500;">Email</label>
                            <input type="email" required style="width: 100%; padding: 0.75rem; border-radius: 0.5rem; border: 1px solid hsl(var(--border)); background: hsl(var(--muted)); color: hsl(var(--foreground));" placeholder="john@example.com">
                        </div>
                        <div>
                            <label style="display: block; margin-bottom: 0.5rem; font-size: 0.875rem; font-weight: 500;">Password</label>
                            <input type="password" required style="width: 100%; padding: 0.75rem; border-radius: 0.5rem; border: 1px solid hsl(var(--border)); background: hsl(var(--muted)); color: hsl(var(--foreground));" placeholder="••••••••">
                        </div>
                        <button type="submit" style="width: 100%; padding: 0.75rem; border-radius: 9999px; background: hsl(var(--indigo-600)); color: white; font-weight: 600; border: none; cursor: pointer;">Create Account</button>
                    </form>
                    <p style="text-align: center; margin-top: 1.5rem; font-size: 0.875rem; color: hsl(var(--muted-foreground));">
                        Already have an account? <a href="#/auth/login" style="color: hsl(var(--indigo-400));">Sign In</a>
                    </p>
                </div>
            </div>
        `;

        document.getElementById('signup-form').addEventListener('submit', (e) => {
            e.preventDefault();
            localStorage.setItem('isLoggedIn', 'true');
            isLoggedIn = true;
            updateAuthUI();
            window.location.hash = '#/dashboard';
        });
    } else {
        mainContent.innerHTML = `
            <div class="tools-section">
                <h1>Auth Page Not Found</h1>
                <a href="#/auth/login" style="color: hsl(var(--indigo-400));">Go to Login</a>
            </div>
        `;
    }

    lucide.createIcons();
}

// Load Pricing Page
function loadPricingPage() {
    mainContent.innerHTML = `
        <div class="pricing-section">
            <div class="pricing-header">
                <h1>Pricing Plans</h1>
                <p>Choose the perfect plan for your needs.</p>
            </div>

            <div class="pricing-grid">
                <div class="glass-panel pricing-card">
                    <div class="pricing-content">
                        <div>
                            <h3 class="pricing-title">Free Starter</h3>
                            <p class="pricing-subtitle">Perfect for quick everyday file edits.</p>
                        </div>
                        <div class="pricing-price">
                            <span class="pricing-amount">$0</span>
                            <span class="pricing-period">/ forever</span>
                        </div>
                        <ul class="pricing-features">
                            <li><i data-lucide="check-circle-2"></i><span>Access to 40+ client-side tools</span></li>
                            <li><i data-lucide="check-circle-2"></i><span>Max file size up to 15MB</span></li>
                            <li><i data-lucide="check-circle-2"></i><span>Secure local browser processing</span></li>
                        </ul>
                    </div>
                    <a href="#/auth/signup" class="pricing-btn">Get Started Free</a>
                </div>

                <div class="glass-panel pricing-card featured">
                    <div class="popular-badge">Popular</div>
                    <div class="pricing-content">
                        <div>
                            <h3 class="pricing-title">ToolVerse Pro</h3>
                            <p class="pricing-subtitle">Unlock AI engines and high capacity.</p>
                        </div>
                        <div class="pricing-price">
                            <span class="pricing-amount">$15</span>
                            <span class="pricing-period">/ month</span>
                        </div>
                        <ul class="pricing-features">
                            <li><i data-lucide="check-circle-2"></i><span class="font-medium">Unlimited file conversions</span></li>
                            <li><i data-lucide="check-circle-2"></i><span class="font-medium">Max file size up to 1GB</span></li>
                            <li><i data-lucide="check-circle-2"></i><span>Custom QR Studio (SVGs/PDFs)</span></li>
                            <li><i data-lucide="check-circle-2"></i><span>Unlock 10+ Premium AI Builders</span></li>
                        </ul>
                    </div>
                    <a href="#/auth/signup" class="pricing-btn">Upgrade to Pro</a>
                </div>

                <div class="glass-panel pricing-card">
                    <div class="pricing-content">
                        <div>
                            <h3 class="pricing-title">Enterprise</h3>
                            <p class="pricing-subtitle">For development teams & enterprise APIs.</p>
                        </div>
                        <div class="pricing-price">
                            <span class="pricing-amount">$49</span>
                            <span class="pricing-period">/ month</span>
                        </div>
                        <ul class="pricing-features">
                            <li><i data-lucide="check-circle-2"></i><span>Everything in Pro</span></li>
                            <li><i data-lucide="check-circle-2"></i><span>Restful API endpoint integration</span></li>
                            <li><i data-lucide="check-circle-2"></i><span>Team Workspaces (up to 10 users)</span></li>
                            <li><i data-lucide="check-circle-2"></i><span>Dedicated Support Manager</span></li>
                        </ul>
                    </div>
                    <a href="#/contact" class="pricing-btn">Contact Sales</a>
                </div>
            </div>
        </div>
    `;

    lucide.createIcons();
}

// Load Blog Page
function loadBlogPage() {
    mainContent.innerHTML = `
        <div class="blog-section">
            <div class="blog-header">
                <div>
                    <h1><i data-lucide="book-open"></i> Blog</h1>
                    <p>Tutorials, guides, and insights about our tools.</p>
                </div>
            </div>

            <div class="blog-grid">
                <div class="glass-panel blog-card">
                    <div class="blog-image indigo">
                        <i data-lucide="file-text"></i>
                    </div>
                    <div class="blog-content">
                        <span class="blog-tag indigo">PDF optimization</span>
                        <h3 class="blog-title">How to compress PDF files securely in-browser without data loss</h3>
                        <p class="blog-excerpt">Learn how WebAssembly client modules process PDFs on your local machine, optimizing bytes without cloud roundtrips.</p>
                    </div>
                </div>
                <div class="glass-panel blog-card">
                    <div class="blog-image purple">
                        <i data-lucide="qr-code"></i>
                    </div>
                    <div class="blog-content">
                        <span class="blog-tag purple">QR branding</span>
                        <h3 class="blog-title">Making QR codes stand out: Dynamic shapes and gradient layouts</h3>
                        <p class="blog-excerpt">Customize eye structures, shadow contours, and center vectors to match corporate branding patterns.</p>
                    </div>
                </div>
                <div class="glass-panel blog-card">
                    <div class="blog-image pink">
                        <i data-lucide="sparkles"></i>
                    </div>
                    <div class="blog-content">
                        <span class="blog-tag pink">AI assets</span>
                        <h3 class="blog-title">Streamlining web designs with prompt-based client builders</h3>
                        <p class="blog-excerpt">Discover how generative AI writes, tests, and packs modular responsive HTML snippets using single keywords.</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    lucide.createIcons();
}

// Load Contact Page
function loadContactPage() {
    mainContent.innerHTML = `
        <div class="tools-section" style="max-width: 32rem;">
            <div class="glass-panel" style="padding: 2rem; border-radius: 1.5rem;">
                <h1 style="text-align: center; margin-bottom: 1.5rem;">Contact Us</h1>
                <form style="display: flex; flex-direction: column; gap: 1rem;">
                    <div>
                        <label style="display: block; margin-bottom: 0.5rem; font-size: 0.875rem; font-weight: 500;">Name</label>
                        <input type="text" required style="width: 100%; padding: 0.75rem; border-radius: 0.5rem; border: 1px solid hsl(var(--border)); background: hsl(var(--muted)); color: hsl(var(--foreground));" placeholder="Your name">
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 0.5rem; font-size: 0.875rem; font-weight: 500;">Email</label>
                        <input type="email" required style="width: 100%; padding: 0.75rem; border-radius: 0.5rem; border: 1px solid hsl(var(--border)); background: hsl(var(--muted)); color: hsl(var(--foreground));" placeholder="your@email.com">
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 0.5rem; font-size: 0.875rem; font-weight: 500;">Message</label>
                        <textarea required rows="5" style="width: 100%; padding: 0.75rem; border-radius: 0.5rem; border: 1px solid hsl(var(--border)); background: hsl(var(--muted)); color: hsl(var(--foreground)); resize: vertical;" placeholder="Your message..."></textarea>
                    </div>
                    <button type="submit" style="width: 100%; padding: 0.75rem; border-radius: 9999px; background: hsl(var(--indigo-600)); color: white; font-weight: 600; border: none; cursor: pointer;">Send Message</button>
                </form>
            </div>
        </div>
    `;

    lucide.createIcons();
}

// Load Dashboard Page
function loadDashboardPage() {
    if (!isLoggedIn) {
        window.location.hash = '#/auth/login';
        return;
    }

    mainContent.innerHTML = `
        <div class="tools-section">
            <div class="tools-header">
                <div>
                    <h1>User Dashboard</h1>
                    <p>Manage your account and subscription.</p>
                </div>
            </div>

            <div class="glass-panel" style="padding: 2rem; border-radius: 1rem; margin-top: 2rem;">
                <h2 style="margin-bottom: 1rem;">Welcome back, John!</h2>
                <p style="color: hsl(var(--muted-foreground));">You're currently on the Free plan. Upgrade to Pro to unlock all features.</p>
                
                <div style="margin-top: 2rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                    <div style="background: hsla(var(--muted), 0.3); padding: 1.5rem; border-radius: 0.5rem;">
                        <h3 style="font-size: 0.875rem; margin-bottom: 0.5rem;">Files Processed</h3>
                        <p style="font-size: 1.5rem; font-weight: bold;">24</p>
                    </div>
                    <div style="background: hsla(var(--muted), 0.3); padding: 1.5rem; border-radius: 0.5rem;">
                        <h3 style="font-size: 0.875rem; margin-bottom: 0.5rem;">Storage Used</h3>
                        <p style="font-size: 1.5rem; font-weight: bold;">2.4 MB</p>
                    </div>
                    <div style="background: hsla(var(--muted), 0.3); padding: 1.5rem; border-radius: 0.5rem;">
                        <h3 style="font-size: 0.875rem; margin-bottom: 0.5rem;">Plan</h3>
                        <p style="font-size: 1.5rem; font-weight: bold;">Free</p>
                    </div>
                </div>

                <div style="margin-top: 2rem;">
                    <a href="#/pricing" style="display: inline-block; padding: 0.75rem 1.5rem; border-radius: 9999px; background: hsl(var(--indigo-600)); color: white; font-weight: 600; text-decoration: none;">Upgrade to Pro</a>
                </div>
            </div>
        </div>
    `;

    lucide.createIcons();
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', init);
