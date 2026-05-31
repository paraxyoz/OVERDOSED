const productsData = {
  1: {
    price: 2500,
    priceUSD: 50,
    image: 'images/ti_gotov.png',
    nameKey: 'product_1_name',
    fullNameKey: 'product_1_fullname',
    descKey: 'product_1_desc',
    specs: {
      materialKey: 'cotton70poly30',
      densityKey: 'density250',
      cutKey: 'oversize',
      printKey: 'embroidery',
      careKey: 'wash40',
      originKey: 'made_in_eu'
    }
  },
  2: {
    price: 3500,
    priceUSD: 65,
    image: 'images/rubashka.png',
    nameKey: 'product_2_name',
    fullNameKey: 'product_2_fullname',
    descKey: 'product_2_desc',
    specs: {
      materialKey: 'cottonhz',
      densityKey: 'density320',
      cutKey: 'oversize1',
      printKey: 'embroidery',
      careKey: 'wash40',
      originKey: 'made_in_eu_alt'
    }
  },

};

const SPEC_LABEL_KEYS = ['material', 'density', 'cut', 'print', 'care', 'origin'];

function getProductIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get('id')) || 3;
}

function getEffectivePrice(product) {
  return t('currency') === '₽' ? product.price : product.priceUSD;
}

function updateProductPage() {
  const productId = getProductIdFromURL();
  const product = productsData[productId];

  if (!product) return;

  const productImage = document.getElementById('productImage');
  productImage.src = product.image;
  productImage.alt = t(product.nameKey);

  const purchaseTitle = document.querySelector('.purchase-title');
  purchaseTitle.innerHTML = t(product.fullNameKey);

  const purchasePrice = document.querySelector('.purchase-price');
  const effectivePrice = getEffectivePrice(product);
  purchasePrice.textContent = formatPrice(effectivePrice);

  const purchaseDescription = document.querySelector('.purchase-description p');
  purchaseDescription.textContent = t(product.descKey);

  const specsGrid = document.querySelector('.specs-grid');
  specsGrid.innerHTML = '';

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

  const buyButton = document.querySelector('.buy-button');
  const currentPrice = (window.basePrice || effectivePrice) * (parseInt(document.getElementById('quantity')?.value || '1'));
  buyButton.innerHTML = `${t('buy')} • ${formatPrice(currentPrice)}`;

  window.basePrice = effectivePrice;
}

document.addEventListener('DOMContentLoaded', function() {
  updateProductPage();

  const sizeBtns = document.querySelectorAll('.size-btn');
  const quantityInput = document.getElementById('quantity');
  const decreaseQtyBtn = document.getElementById('decreaseQty');
  const increaseQtyBtn = document.getElementById('increaseQty');
  const buyButton = document.querySelector('.buy-button');

  let selectedSize = 'L';
  let quantity = 1;

  sizeBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      sizeBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      selectedSize = this.dataset.size;
    });
  });

  decreaseQtyBtn.addEventListener('click', function() {
    if (quantity > 1) {
      quantity--;
      quantityInput.value = quantity;
      updatePrice();
    }
  });

  increaseQtyBtn.addEventListener('click', function() {
    if (quantity < 10) {
      quantity++;
      quantityInput.value = quantity;
      updatePrice();
    }
  });

  quantityInput.addEventListener('change', function() {
    let value = parseInt(this.value) || 1;
    if (value < 1) value = 1;
    if (value > 10) value = 10;
    quantity = value;
    this.value = quantity;
    updatePrice();
  });

  function updatePrice() {
    const productId = getProductIdFromURL();
    const product = productsData[productId];
    const totalPrice = (getEffectivePrice(product) * quantity).toFixed(2);
    buyButton.innerHTML = `${t('buy')} • ${formatPrice(totalPrice)}`;
  }

  buyButton.addEventListener('click', function() {
    const productId = getProductIdFromURL();
    const product = productsData[productId];
    const totalPrice = (getEffectivePrice(product) * quantity).toFixed(2);

    const message = `${t('order_message')}%0A%0A${t('product_label')}: ${t(product.nameKey)}%0A${t('size_label')}: ${selectedSize}%0A${t('quantity_label')}: ${quantity}%0A${t('total_label')}: ${formatPrice(totalPrice)}`;

    const telegramUrl = `https://t.me/overdosed_manager?text=${message}`;
    window.open(telegramUrl, '_blank');
  });

  document.querySelector('[data-size="L"]')?.classList.add('active');
});

document.addEventListener('languageChanged', function() {
  updateProductPage();
  const buyButton = document.querySelector('.buy-button');
  const qty = parseInt(document.getElementById('quantity')?.value || '1');
  const productId = getProductIdFromURL();
  const product = productsData[productId];
  const price = getEffectivePrice(product) * qty;
  buyButton.innerHTML = `${t('buy')} • ${formatPrice(price)}`;
});
