const productsData = {
  1: {
    price: 380,
    image: 'images/ti_gotov.png',
    nameKey: 'product_1_name',
    fullNameKey: 'product_1_fullname',
    descKey: 'product_1_desc',
    specs: {
      materialKey: 'cotton70poly30',
      densityKey: 'density320',
      cutKey: 'oversize',
      printKey: 'embroidery',
      careKey: 'wash40',
      originKey: 'made_in_eu'
    }
  },
  2: {
    price: 380,
    image: 'images/ya_broshu.png',
    nameKey: 'product_2_name',
    fullNameKey: 'product_2_fullname',
    descKey: 'product_2_desc',
    specs: {
      materialKey: 'cotton70poly30',
      densityKey: 'density320',
      cutKey: 'oversize',
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
  purchasePrice.textContent = `$${product.price}`;

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
  const currentPrice = (window.basePrice || product.price) * (parseInt(document.getElementById('quantity')?.value || '1'));
  buyButton.innerHTML = `${t('buy')} • $${currentPrice.toFixed(2)}`;

  window.basePrice = product.price;
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
  const basePrice = window.basePrice || 180;

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
    const totalPrice = (basePrice * quantity).toFixed(2);
    buyButton.innerHTML = `${t('buy')} • $${totalPrice}`;
  }

  buyButton.addEventListener('click', function() {
    const productId = getProductIdFromURL();
    const product = productsData[productId];
    const totalPrice = (basePrice * quantity).toFixed(2);

    const message = `${t('order_message')}%0A%0A${t('product_label')}: ${t(product.nameKey)}%0A${t('size_label')}: ${selectedSize}%0A${t('quantity_label')}: ${quantity}%0A${t('total_label')}: $${totalPrice}`;

    const telegramUrl = `https://t.me/share/url?url=overdosed.com&text=${message}`;
    window.open(telegramUrl, '_blank');
  });

  document.querySelector('[data-size="L"]')?.classList.add('active');
});

document.addEventListener('languageChanged', function() {
  updateProductPage();
  const buyButton = document.querySelector('.buy-button');
  const qty = parseInt(document.getElementById('quantity')?.value || '1');
  const price = (window.basePrice || 180) * qty;
  buyButton.innerHTML = `${t('buy')} • $${price.toFixed(2)}`;
});
