// Product Data Base
const productsData = {
    1: {
        name: 'Ты готов?',
        fullName: '<span class="red-text">T-Shirt</span> Ты готов?',
        price: 380,
        image: 'images/ti_gotov.png',
        description: 'ENEMY SYSTEM Hoodie - высочайшее качество пошива с использованием премиум материалов. Специально разработано для тех, кто не боится выделяться.',
        specs: {
            'Материал': '70% Хлопок, 30% Полиэстер',
            'Плотность': '320 г/м²',
            'Крой': 'Оверсайз',
            'Печать': 'Вышивка',
            'Уход': 'Машинная стирка 40°C',
            'Происхождение': 'Изготовлено в ЕС'
        }
    },
    2: {
        name: 'Я брошу...',
        fullName: '<span class="red-text">T-Shirt</span> Я брошу...',
        price: 380,
        image: 'images/ya_broshu.png',
        description: 'ENEMY SYSTEM Hoodie - вторая коллекция. Премиум качество с обновленным дизайном. Идеально для города и повседневной жизни.',
        specs: {
            'Материал': '70% Хлопок, 30% Полиэстер',
            'Плотность': '320 г/м²',
            'Крой': 'Оверсайз',
            'Печать': 'Вышивка',
            'Уход': 'Машинная стирка 40°C',
            'Происхождение': 'Изготовлено в ЕУ'
        }
    },
    3: {
        name: 'coming soon',
        fullName: '<span class="red-text">T-SHIRT</span> coming soon',
        price: 0,
        image: 'images/enemy-system-tshirt.png',
        description: 'coming soon',
        specs: {
            'Материал': '100% Хлопок',
            'Плотность': '250 г/м²',
            'Крой': 'Оверсайз',
            'Печать': 'Прямая печать',
            'Уход': 'Машинная стирка 30°C',
            'Происхождение': 'Изготовлено в ЕС'
        }
    },
    4: {
        name: 'VESPER HOODIE',
        fullName: 'VESPER HOODIE',
        price: 420,
        image: 'images/vesper-hoodie.png',
        description: 'VESPER Collection - премиум худи с особой обработкой ткани. Создано для максимального комфорта и стиля. Ограниченная серия.',
        specs: {
            'Материал': '100% Хлопок',
            'Плотность': '380 г/м²',
            'Крой': 'Оверсайз',
            'Печать': 'Вышивка',
            'Уход': 'Машинная стирка 40°C',
            'Происхождение': 'Изготовлено в ЕС'
        }
    }
};

// Get Product ID from URL
function getProductIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id')) || 3; // Default to product 3
}

// Update page content with product data
function updateProductPage() {
    const productId = getProductIdFromURL();
    const product = productsData[productId];
    
    if (!product) {
        console.error('Product not found:', productId);
        return;
    }

    // Update product image
    const productImage = document.getElementById('productImage');
    productImage.src = product.image;
    productImage.alt = product.name;

    // Update product title
    const purchaseTitle = document.querySelector('.purchase-title');
    purchaseTitle.innerHTML = product.fullName;

    // Update price
    const purchasePrice = document.querySelector('.purchase-price');
    purchasePrice.textContent = `$${product.price}`;

    // Update description
    const purchaseDescription = document.querySelector('.purchase-description p');
    purchaseDescription.textContent = product.description;

    // Update specifications
    const specsGrid = document.querySelector('.specs-grid');
    specsGrid.innerHTML = '';
    
    for (const [label, value] of Object.entries(product.specs)) {
        const specItem = document.createElement('div');
        specItem.className = 'spec-item';
        specItem.innerHTML = `
            <span class="spec-label">${label}</span>
            <span class="spec-value">${value}</span>
        `;
        specsGrid.appendChild(specItem);
    }

    // Update buy button with product price
    const buyButton = document.querySelector('.buy-button');
    buyButton.textContent = `КУПИТЬ • $${product.price}`;

    // Store basePrice for quantity calculations
    window.basePrice = product.price;
}

// Size Selection
document.addEventListener('DOMContentLoaded', function() {
    // Update product page content first
    updateProductPage();

    const sizeBtns = document.querySelectorAll('.size-btn');
    const quantityInput = document.getElementById('quantity');
    const decreaseQtyBtn = document.getElementById('decreaseQty');
    const increaseQtyBtn = document.getElementById('increaseQty');
    const buyButton = document.querySelector('.buy-button');

    let selectedSize = 'L';
    let quantity = 1;
    const basePrice = window.basePrice || 180;

    // Size selection handler
    sizeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            sizeBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            selectedSize = this.dataset.size;
            console.log('Selected size:', selectedSize);
        });
    });

    // Quantity controls
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

    // Update price based on quantity
    function updatePrice() {
        const totalPrice = (basePrice * quantity).toFixed(2);
        buyButton.textContent = `КУПИТЬ • $${totalPrice}`;
    }

    // Buy button handler
    buyButton.addEventListener('click', function() {
        const productId = getProductIdFromURL();
        const product = productsData[productId];
        const totalPrice = (basePrice * quantity).toFixed(2);
        
        // Prepare message for Telegram
        const message = `Заказ товара OVERDOSED%0A%0AТовар: ${product.name}%0AРазмер: ${selectedSize}%0AКоличество: ${quantity}%0AИтого: $${totalPrice}`;
        
        // Open Telegram with pre-filled message
        const telegramUrl = `https://t.me/share/url?url=overdosed.com&text=${message}`;
        window.open(telegramUrl, '_blank');
        
        console.log({
            productId: productId,
            product: product.name,
            size: selectedSize,
            quantity: quantity,
            price: totalPrice
        });
    });

    // Initialize first size as active
    document.querySelector('[data-size="L"]').classList.add('active');
});
