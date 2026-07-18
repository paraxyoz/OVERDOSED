// ===== OVERDOSED Internationalization System =====

const LANGUAGES = [
  { code: 'ru', name: 'Русский', native: 'Русский' },
  { code: 'en', name: 'English', native: 'English' }
];

const TRANSLATIONS = {
  ru: {
    info: 'ИНФО',
    languages: 'ЯЗЫКИ',
    shop: 'МАГАЗИН',
    lookbook: 'ЛУКБУК',
    collections: 'КОЛЛЕКЦИИ',
    ssense: 'SSENSE',
    products: 'ТОВАРЫ',
    coming_soon: 'скоро',
    about: 'О НАС',
    contact: 'КОНТАКТЫ',
    shipping: 'ДОСТАВКА',
    returns: 'ВОЗВРАТ',
    privacy_policy: 'КОНФИДЕНЦИАЛЬНОСТЬ',
    terms_of_service: 'УСЛОВИЯ',
    site_creator: 'СОЗДАТЕЛЬ',
    instagram: 'INSTAGRAM',
    email: 'EMAIL',
    copyright: '© 2026 OVERDOSED. Все права защищены.',
    size: 'РАЗМЕР',
    quantity: 'КОЛИЧЕСТВО',
    buy: 'КУПИТЬ',
    worldwide_shipping: 'Доставка по РФ',
    returns_14days: 'БЕЗВОЗВРАТНО',
    secure_payments: 'Безопасные платежи',
    specs_heading: 'МАТЕРИАЛ И ХАРАКТЕРИСТИКИ',
    material: 'Материал',
    density: 'Плотность',
    cut: 'Крой',
    print: 'Печать',
    care: 'Уход',
    origin: 'Происхождение',
    oversize: 'Оверсайз',
    oversize1: 'Рубашка блять',
    cotton100: '100% Хлопок',
    cotton70poly30: '100% Хлопок',
    cottonhz: '100% хуй пойми чего',
    density250: '250 г/м²',
    density320: 'Хуй его знает г/м²',
    density380: '380 г/м²',
    direct_print: 'Прямая печать',
    embroidery: 'Шелкография (ручная работа)',
    wash40: 'Машинная стирка',
    wash30: 'Машинная стирка',
    made_in_eu: 'Изготовлено в РФ',
    made_in_eu_alt: 'Изготовлено в РФ',
    currency: '₽',
    product_1_name: 'ИЗДЕЛИЕ №1',
    product_1_fullname: '<span class="red-text">ФУТБОЛКА</span> ИЗДЕЛИЕ №1',
    product_1_desc: 'Футболка ТЫ ГОТОВ?',
    product_2_name: 'ИЗДЕЛИЕ №2',
    product_2_fullname: '<span class="red-text">РУБАШКА</span> ИЗДЕЛИЕ №2',
    product_2_desc: 'Рубашка OVERDOSED.',
    product_3_name: 'coming soon',
    product_3_fullname: '<span class="red-text">ФУТБОЛКА</span> coming soon',
    product_3_desc: 'coming soon',
    product_4_name: 'VESPER HOODIE',
    product_4_fullname: 'VESPER HOODIE',
    product_4_desc: 'VESPER Collection - премиум худи с особой обработкой ткани. Ограниченная серия.',
    order_message: 'Заказ товара OVERDOSED',
    product_label: 'Товар',
    size_label: 'Размер',
    quantity_label: 'Количество',
    total_label: 'Итого',
    // Index page specific
    availability: '<span class="av-line-1">Рано или поздно —</span> <span class="red-text av-line-2">он до вас доберётся...</span>',
    hero_title: 'ПИВЧАНСКИЙ —',
    xxx: 'XXX',
    header_tagline: '// ПЕРЕДОЗИРОВКА // OVERDOSE // OVERDOSED //',
    select_language: 'Выберите язык',
    view_product: 'СМОТРЕТЬ'
  },
  en: {
    info: 'INFO',
    languages: 'LANGUAGES',
    shop: 'SHOP',
    lookbook: 'LOOKBOOK',
    collections: 'COLLECTIONS',
    ssense: 'SSENSE',
    products: 'PRODUCTS',
    coming_soon: 'coming soon',
    about: 'ABOUT',
    contact: 'CONTACT',
    shipping: 'SHIPPING',
    returns: 'RETURNS',
    privacy_policy: 'PRIVACY',
    terms_of_service: 'TERMS',
    site_creator: 'SITE CREATOR',
    instagram: 'INSTAGRAM',
    email: 'EMAIL',
    copyright: '© 2026 OVERDOSED. All rights reserved.',
    size: 'SIZE',
    quantity: 'QUANTITY',
    buy: 'BUY',
    worldwide_shipping: 'Delivery in Russia',
    returns_14days: 'Irrevocably',
    secure_payments: 'Secure payments',
    specs_heading: 'MATERIAL & SPECS',
    material: 'Material',
    density: 'Density',
    cut: 'Cut',
    print: 'Print',
    care: 'Care',
    origin: 'Origin',
    oversize: 'Oversize',
    oversize1: 'Fucking shirt',
    cotton100: '100% Cotton',
    cotton70poly30: '100% ',
    cottonhz: '100% fuck knows',
    density250: '250 g/m²',
    density320: 'Fuck knows g/m²',
    density380: '380 g/m²',
    direct_print: 'Direct print',
    embroidery: 'Silkscreen printing (handmade)',
    wash40: 'Machine wash',
    wash30: 'Machine wash',
    made_in_eu: 'Made in EU',
    made_in_eu_alt: 'Made in RU',
    currency: '$',
    product_1_name: 'PRODUCT №1',
    product_1_fullname: '<span class="red-text">T-SHIRT</span> PRODUCT №1',
    product_1_desc: 'T-Shirt OVERDOSED.',
    product_2_name: 'PRODUCT №2',
    product_2_fullname: '<span class="red-text">SHIRT</span> PRODUCT №2',
    product_2_desc: 'Shirt OVERDOSED',
    product_3_name: 'coming soon',
    product_3_fullname: '<span class="red-text">T-SHIRT</span> coming soon',
    product_3_desc: 'coming soon',
    product_4_name: 'VESPER HOODIE',
    product_4_fullname: 'VESPER HOODIE',
    product_4_desc: 'VESPER Collection - premium hoodie with special fabric treatment. Limited series.',
    order_message: 'Order OVERDOSED product',
    product_label: 'Product',
    size_label: 'Size',
    quantity_label: 'Quantity',
    total_label: 'Total',
    availability: '<span class="av-line-1">Sooner or later —</span> <span class="red-text av-line-2">it will get to you</span>',
    hero_title: 'PIVCHANSKY —',
    xxx: 'XXX',
    header_tagline: '// OVERDOSE // OVERDOSE // OVERDOSE //',
    select_language: 'Select language',
    view_product: 'VIEW'
  }
};

// ===== I18N Engine =====
let currentLang = localStorage.getItem('overdosed_lang') || 'ru';

function t(key) {
  if (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key] !== undefined) {
    return TRANSLATIONS[currentLang][key];
  }
  if (TRANSLATIONS['ru'][key] !== undefined) {
    return TRANSLATIONS['ru'][key];
  }
  return key;
}

function formatPrice(amount) {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  const currency = t('currency');
  if (currency === '₽') {
    const rounded = Math.round(num);
    return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + '₽';
  }
  return '$' + num.toFixed(2);
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const inline = el.getAttribute(`data-i18n-${currentLang}`);
    if (inline !== null) {
      if (el.getAttribute('data-i18n-html') === 'true') {
        el.innerHTML = inline;
      } else {
        el.textContent = inline;
      }
      return;
    }
    const translation = t(key);
    if (el.getAttribute('data-i18n-html') === 'true') {
      el.innerHTML = translation;
    } else {
      el.textContent = translation;
    }
  });
}

function showLanguageContent(langCode) {
  document.querySelectorAll('[data-show-lang]').forEach(el => {
    el.style.display = el.getAttribute('data-show-lang') === langCode ? '' : 'none';
  });
}

function setLanguage(langCode) {
  if (!TRANSLATIONS[langCode]) return;
  currentLang = langCode;
  localStorage.setItem('overdosed_lang', langCode);
  document.documentElement.lang = langCode;
  applyTranslations();
  showLanguageContent(langCode);
  document.querySelectorAll('.lang-item').forEach(el => {
    el.classList.toggle('active', el.getAttribute('data-lang') === langCode);
  });
  closeLanguageModal();
  document.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: langCode } }));
}

function openLanguageModal() {
  const modal = document.getElementById('languageModal');
  if (modal) modal.classList.add('active');
}

function closeLanguageModal() {
  const modal = document.getElementById('languageModal');
  if (modal) modal.classList.remove('active');
}

function openContactModal() {
  const modal = document.getElementById('contactModal');
  if (modal) modal.classList.add('active');
}

function closeContactModal() {
  const modal = document.getElementById('contactModal');
  if (modal) modal.classList.remove('active');
}

function buildContactModal() {
  const existing = document.getElementById('contactModal');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.className = 'lang-modal-overlay';
  overlay.id = 'contactModal';
  overlay.addEventListener('click', function(e) {
    if (e.target === this) closeContactModal();
  });

  const modal = document.createElement('div');
  modal.className = 'lang-modal';

  const header = document.createElement('div');
  header.className = 'lang-modal-header';

  const title = document.createElement('h3');
  title.className = 'lang-modal-title';
  title.textContent = 'CONTACTS';

  const closeBtn = document.createElement('button');
  closeBtn.className = 'lang-modal-close';
  closeBtn.innerHTML = '&times;';
  closeBtn.addEventListener('click', closeContactModal);

  header.appendChild(title);
  header.appendChild(closeBtn);
  modal.appendChild(header);

  const content = document.createElement('div');
  content.style.cssText = 'display:flex;flex-direction:column;gap:12px;';

  const email = document.createElement('a');
  email.href = 'mailto:overdosed.shop@gmail.com';
  email.innerHTML = '<i class="fas fa-envelope" style="width:20px;text-align:center;"></i> overdosed.shop@gmail.com';
  email.style.cssText = 'display:block;padding:16px 20px;border:1px solid #333;color:#aaa;font-size:16px;letter-spacing:1px;text-decoration:none;transition:all 0.3s;cursor:pointer;';
  email.addEventListener('mouseenter', function() { this.style.borderColor = '#ff0000'; this.style.color = '#ff0000'; });
  email.addEventListener('mouseleave', function() { this.style.borderColor = '#333'; this.style.color = '#aaa'; });

  const telegram = document.createElement('a');
  telegram.href = 'https://t.me/overdosed_manager';
  telegram.target = '_blank';
  telegram.innerHTML = '<i class="fab fa-telegram-plane" style="width:20px;text-align:center;"></i> @overdosed_manager';
  telegram.style.cssText = 'display:block;padding:16px 20px;border:1px solid #333;color:#aaa;font-size:16px;letter-spacing:1px;text-decoration:none;transition:all 0.3s;cursor:pointer;';
  telegram.addEventListener('mouseenter', function() { this.style.borderColor = '#ff0000'; this.style.color = '#ff0000'; });
  telegram.addEventListener('mouseleave', function() { this.style.borderColor = '#333'; this.style.color = '#aaa'; });

  content.appendChild(email);
  content.appendChild(telegram);
  modal.appendChild(content);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}

function buildLanguageModal() {
  const existing = document.getElementById('languageModal');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.className = 'lang-modal-overlay';
  overlay.id = 'languageModal';
  overlay.addEventListener('click', function(e) {
    if (e.target === this) closeLanguageModal();
  });

  const modal = document.createElement('div');
  modal.className = 'lang-modal';

  const header = document.createElement('div');
  header.className = 'lang-modal-header';

  const title = document.createElement('h3');
  title.className = 'lang-modal-title';
  title.textContent = 'SELECT LANGUAGE';

  const closeBtn = document.createElement('button');
  closeBtn.className = 'lang-modal-close';
  closeBtn.innerHTML = '&times;';
  closeBtn.addEventListener('click', closeLanguageModal);

  header.appendChild(title);
  header.appendChild(closeBtn);
  modal.appendChild(header);

  const grid = document.createElement('div');
  grid.className = 'lang-grid';

  LANGUAGES.forEach(lang => {
    const item = document.createElement('button');
    item.className = 'lang-item';
    if (lang.code === currentLang) item.classList.add('active');
    item.setAttribute('data-lang', lang.code);
    item.textContent = lang.native;
    item.addEventListener('click', function() {
      setLanguage(lang.code);
    });
    grid.appendChild(item);
  });

  modal.appendChild(grid);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}

function buildMarquee() {
  const marquee = document.getElementById('headerMarquee');
  if (!marquee) return;
  const words = [
    'ПЕРЕДОЗИРОВКА',
    'przedawkować',
    'перадазіроўка',
    'supradozat',
    'предозиран',
    'předávkovaný',
    'perdozuotas',
    'pārdozēts',
    'üledoosi saanud'
  ];
  const content = words.join(' // ');
  marquee.innerHTML = '<div class="marquee-track" style="animation: marqueeScroll 40s linear infinite; will-change: transform;">' + content + ' // ' + content + ' // ' + content + ' // ' + content + '</div>';
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
  buildLanguageModal();
  buildContactModal();
  currentLang = localStorage.getItem('overdosed_lang') || 'ru';
  applyTranslations();
  showLanguageContent(currentLang);
  buildMarquee();

  // Setup language toggle button
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', function(e) {
      e.preventDefault();
      openLanguageModal();
    });
  }

  // Setup contact link
  document.querySelectorAll('.contact-link').forEach(el => {
    el.addEventListener('click', function(e) {
      e.preventDefault();
      openContactModal();
    });
  });
});
