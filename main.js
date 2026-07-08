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
    { name: "Premium QR Studio", slug: "qr-studio", desc: "Generate custom QR codes with logos, eye shapes, and frames.", category: "QR Studio", isPremium: true, rating: 5.0 },
    // AI
    { name: "AI Image Generator", slug: "ai-image", desc: "Generate gorgeous artwork from prompts client-side.", category: "AI Tools", isPremium: true, rating: 4.9 },
    { name: "AI Resume Builder", slug: "ai-resume", desc: "Autofill resume schemas and build professional CVs.", category: "AI Tools", isPremium: true, rating: 4.8 },
    { name: "AI Website Builder", slug: "ai-website", desc: "Describe components and generate functional HTML.", category: "AI Tools", isPremium: true, rating: 4.9 },
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
function handleRoute() {
    const hash = window.location.hash.slice(1) || '/';
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === hash || (hash !== '/' && link.getAttribute('href') === '/' + hash.split('/')[0])) {
            link.classList.add('active');
        }
    });

    // Route handling
    if (hash === '/' || hash === '') {
        loadHomePage();
    } else if (hash.startsWith('/tools')) {
        if (hash === '/tools') {
            loadToolsPage();
        } else {
            loadToolPage(hash.replace('/tools/', ''));
        }
    } else if (hash.startsWith('/auth')) {
        loadAuthPage(hash.replace('/auth/', ''));
    } else if (hash === '/pricing') {
        loadPricingPage();
    } else if (hash === '/blog') {
        loadBlogPage();
    } else if (hash === '/contact') {
        loadContactPage();
    } else if (hash === '/dashboard') {
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
function loadToolPage(slug) {
    const tool = ALL_TOOLS.find(t => t.slug === slug);
    
    if (!tool) {
        mainContent.innerHTML = `
            <div class="tools-section">
                <h1>Tool Not Found</h1>
                <p>The tool you're looking for doesn't exist.</p>
                <a href="#/tools" class="explore-link">Back to Tools</a>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    mainContent.innerHTML = `
        <div class="tools-section">
            <div class="tools-header">
                <div>
                    <h1>${tool.name}</h1>
                    <p>${tool.desc}</p>
                </div>
                <span class="tag-badge">${tool.category}</span>
            </div>

            <div class="glass-panel" style="padding: 2rem; border-radius: 1rem;">
                <p style="text-align: center; color: hsl(var(--muted-foreground));">
                    This tool interface would be implemented here. 
                    For now, this is a placeholder for the ${tool.name} functionality.
                </p>
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
