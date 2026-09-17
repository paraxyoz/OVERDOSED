const defaultProductsData = {
  1: {
    price: 2500,
    priceUSD: 50,
    image: 'images/ti_gotov.png',
    nameKey: 'product_1_name',
    fullNameKey: 'product_1_fullname',
    descKey: 'product_1_desc',
    name_ru: '<span class="red-text">ФУТБОЛКА</span> ИЗДЕЛИЕ №1',
    name_en: '<span class="red-text">T-SHIRT</span> PRODUCT №1',
    desc_ru: 'Футболка ТЫ ГОТОВ? Фирменный оверсайз крой с шелкографией ручной работы.',
    desc_en: 'T-Shirt OVERDOSED. Oversized fit with handmade silkscreen printing.',
    specs_ru: {
      material: '100% Хлопок',
      density: '250 г/м²',
      cut: 'Оверсайз',
      print: 'Шелкография (ручная работа)',
      care: 'Машинная стирка 30°C',
      origin: 'Изготовлено в РФ'
    },
    specs_en: {
      material: '100% Cotton',
      density: '250 g/m²',
      cut: 'Oversize',
      print: 'Silkscreen printing (handmade)',
      care: 'Machine wash 30°C',
      origin: 'Made in RU'
    }
  },
  2: {
    price: 3500,
    priceUSD: 65,
    image: 'images/rubashka.png',
    nameKey: 'product_2_name',
    fullNameKey: 'product_2_fullname',
    descKey: 'product_2_desc',
    name_ru: '<span class="red-text">РУБАШКА</span> ИЗДЕЛИЕ №2',
    name_en: '<span class="red-text">SHIRT</span> PRODUCT №2',
    desc_ru: 'Рубашка OVERDOSED. Плотная премиум ткань, тактический стиль.',
    desc_en: 'Shirt OVERDOSED. Premium heavyweight fabric, tactical aesthetic.',
    specs_ru: {
      material: '100% Хлопок',
      density: '320 г/м²',
      cut: 'Свободный крой',
      print: 'Вышивка и шелкография',
      care: 'Машинная стирка 40°C',
      origin: 'Изготовлено в РФ'
    },
    specs_en: {
      material: '100% Cotton',
      density: '320 g/m²',
      cut: 'Loose fit',
      print: 'Embroidery & silkscreen',
      care: 'Machine wash 40°C',
      origin: 'Made in RU'
    }
  },
  3: {
    price: 5500,
    priceUSD: 85,
    image: 'images/ti_gotov.png',
    nameKey: 'product_3_name',
    fullNameKey: 'product_3_fullname',
    descKey: 'product_3_desc',
    name_ru: '<span class="red-text">ХУДИ</span> ENEMY HOODIE',
    name_en: '<span class="red-text">HOODIE</span> ENEMY HOODIE',
    desc_ru: 'ENEMY SYSTEM HOODIE. Премиальное худи плотной вязки с глубоким капюшоном.',
    desc_en: 'ENEMY SYSTEM HOODIE. Premium heavy knit hoodie with deep hood.',
    specs_ru: {
      material: '100% Хлопок',
      density: '380 г/м²',
      cut: 'Глубокий оверсайз',
      print: 'Шелкография (ручная работа)',
      care: 'Машинная стирка 30°C',
      origin: 'Изготовлено в РФ'
    },
    specs_en: {
      material: '100% Cotton',
      density: '380 g/m²',
      cut: 'Deep oversize',
      print: 'Silkscreen printing',
      care: 'Machine wash 30°C',
      origin: 'Made in RU'
    }
  }
};

// Объединяем данные из базы данных MySQL с дефолтными
const productsData = Object.assign({}, defaultProductsData, window.productsFromDB || {});

const SPEC_LABEL_KEYS = ['material', 'density', 'cut', 'print', 'care', 'origin'];

function getProductIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  const idFromUrl = parseInt(params.get('id'));
  if (idFromUrl && productsData[idFromUrl]) return idFromUrl;
  if (window.currentProductId && productsData[window.currentProductId]) return window.currentProductId;
  const firstId = Object.keys(productsData)[0];
  return parseInt(firstId) || 1;
}

function getEffectivePrice(product) {
  if (!product) return 0;
  return t('currency') === '₽' ? (product.price || product.price_rub) : (product.priceUSD || product.price_usd);
}

function updateProductPage() {
  const productId = getProductIdFromURL();
  const product = productsData[productId];

  if (!product) return;

  const currentLang = localStorage.getItem('overdosed_lang') || 'ru';

  const productImage = document.getElementById('productImage');
  if (productImage) {
    productImage.src = product.image;
    productImage.alt = product.name_ru || t(product.nameKey || 'product_label');
  }

  const purchaseTitle = document.querySelector('.purchase-title');
  if (purchaseTitle) {
    const title = currentLang === 'en' ? (product.name_en || product.name_ru) : (product.name_ru || t(product.fullNameKey));
    purchaseTitle.innerHTML = title;
  }

  const purchasePrice = document.querySelector('.purchase-price');
  const effectivePrice = getEffectivePrice(product);
  if (purchasePrice) {
    purchasePrice.textContent = formatPrice(effectivePrice);
  }

  const purchaseDescription = document.querySelector('.purchase-description p');
  if (purchaseDescription) {
    const desc = currentLang === 'en' ? (product.desc_en || product.description_en || t(product.descKey)) : (product.desc_ru || product.description_ru || t(product.descKey));
    purchaseDescription.textContent = desc;
  }

  const specsGrid = document.querySelector('.specs-grid');
  if (specsGrid) {
    specsGrid.innerHTML = '';
    const specs = currentLang === 'en' ? (product.specs_en || product.specs_ru) : (product.specs_ru || product.specs_en);

    if (specs) {
      Object.keys(specs).forEach((key) => {
        const specItem = document.createElement('div');
        specItem.className = 'spec-item';
        specItem.innerHTML = `
          <span class="spec-label">${t(key)}</span>
          <span class="spec-value">${specs[key]}</span>
        `;
        specsGrid.appendChild(specItem);
      });
    } else if (product.specs) {
      const specKeys = Object.keys(product.specs);
      specKeys.forEach((specKey, index) => {
        const labelKey = SPEC_LABEL_KEYS[index] || specKey;
        const valueKey = product.specs[specKey];
        const specItem = document.createElement('div');
        specItem.className = 'spec-item';
        specItem.innerHTML = `
          <span class="spec-label">${t(labelKey)}</span>
          <span class="spec-value">${t(valueKey)}</span>
        `;
        specsGrid.appendChild(specItem);
      });
    }
  }

  const buyButton = document.querySelector('.buy-button');
  const qty = parseInt(document.getElementById('quantity')?.value || '1');
  const currentPrice = effectivePrice * qty;
  if (buyButton) {
    buyButton.innerHTML = `${t('buy')} • ${formatPrice(currentPrice)}`;
  }

  window.basePrice = effectivePrice;
}

document.addEventListener('DOMContentLoaded', function() {
  updateProductPage();

  const sizeBtns = document.querySelectorAll('.size-btn');
  const quantityInput = document.getElementById('quantity');
  const decreaseQtyBtn = document.getElementById('decreaseQty');
  const increaseQtyBtn = document.getElementById('increaseQty');
  const buyButton = document.querySelector('.buy-button');

  let selectedSize = '4';
  let quantity = 1;

  sizeBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      sizeBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      selectedSize = this.dataset.size || this.textContent.trim();
    });
  });

  if (decreaseQtyBtn && quantityInput) {
    decreaseQtyBtn.addEventListener('click', function() {
      if (quantity > 1) {
        quantity--;
        quantityInput.value = quantity;
        updatePrice();
      }
    });
  }

  if (increaseQtyBtn && quantityInput) {
    increaseQtyBtn.addEventListener('click', function() {
      if (quantity < 10) {
        quantity++;
        quantityInput.value = quantity;
        updatePrice();
      }
    });
  }

  if (quantityInput) {
    quantityInput.addEventListener('change', function() {
      let value = parseInt(this.value) || 1;
      if (value < 1) value = 1;
      if (value > 10) value = 10;
      quantity = value;
      this.value = quantity;
      updatePrice();
    });
  }

  function updatePrice() {
    const productId = getProductIdFromURL();
    const product = productsData[productId];
    if (!product) return;
    const totalPrice = (getEffectivePrice(product) * quantity).toFixed(2);
    if (buyButton) {
      buyButton.innerHTML = `${t('buy')} • ${formatPrice(totalPrice)}`;
    }
  }

  if (buyButton) {
    buyButton.addEventListener('click', function() {
      const productId = getProductIdFromURL();
      const product = productsData[productId];
      if (!product) return;
      const totalPrice = (getEffectivePrice(product) * quantity).toFixed(2);
      const currentLang = localStorage.getItem('overdosed_lang') || 'ru';
      const productName = currentLang === 'en' ? (product.name_en || product.name_ru) : product.name_ru;
      const cleanName = productName.replace(/<[^>]*>/g, '').trim();

      const message = `${t('order_message')}%0A%0A${t('product_label')}: ${cleanName}%0A${t('size_label')}: ${selectedSize}%0A${t('quantity_label')}: ${quantity}%0A${t('total_label')}: ${formatPrice(totalPrice)}`;

      const telegramUrl = `https://t.me/overdosed_manager?text=${message}`;
      window.open(telegramUrl, '_blank');
    });
  }
});

document.addEventListener('languageChanged', function() {
  updateProductPage();
  const buyButton = document.querySelector('.buy-button');
  const qty = parseInt(document.getElementById('quantity')?.value || '1');
  const productId = getProductIdFromURL();
  const product = productsData[productId];
  if (product && buyButton) {
    const price = getEffectivePrice(product) * qty;
    buyButton.innerHTML = `${t('buy')} • ${formatPrice(price)}`;
  }
});
