document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    loadStock();
    document.getElementById('salesForm').addEventListener('submit', function(event) {
        event.preventDefault();
        sellProduct();
    });
});

function loadProducts() {
    const stock = JSON.parse(localStorage.getItem('stock')) || [];
    const productSelect = document.getElementById('product');
    
    productSelect.innerHTML = '<option value="" disabled selected>Seleccionar Producto</option>';
    
    stock.forEach(item => {
        const option = document.createElement('option');
        option.value = item.product;
        option.textContent = item.product;
        productSelect.appendChild(option);
    });
}

function loadStock() {
    const stock = JSON.parse(localStorage.getItem('stock')) || [];
    const stockTableBody = document.getElementById('stockTableBody');
    
    stockTableBody.innerHTML = '';
    
    stock.forEach(item => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${item.product}</td>
            <td>${item.quantity}</td>
        `;
        
        stockTableBody.appendChild(row);
    });
}

function sellProduct() {
    const productSelect = document.getElementById('product');
    const price = document.getElementById('price').value;
    const quantity = document.getElementById('quantity').value;

    const selectedProduct = productSelect.value;
    const stock = JSON.parse(localStorage.getItem('stock')) || [];
    
    const item = stock.find(item => item.product === selectedProduct);

    if (!item) {
        showAlert('El producto no está disponible en stock');
        return;
    }

    if (quantity <= 0 || quantity > item.quantity) {
        showAlert('Cantidad de producto errónea');
        return;
    }

    // Actualizar stock
    item.quantity -= quantity;
    if (item.quantity <= 0) {
        deleteStock(item.product);
    } else {
        localStorage.setItem('stock', JSON.stringify(stock));
    }

    addSaleToTable(selectedProduct, price, quantity);
    document.getElementById('salesForm').reset();
    loadProducts();
    loadStock();
}

function addSaleToTable(product, price, quantity) {
    const salesTableBody = document.getElementById('salesTableBody');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${new Date().toLocaleString()}</td>
        <td>${product}</td>
        <td>${price}</td>
        <td>${quantity}</td>
    `;

    salesTableBody.appendChild(row);
}

function showAlert(message) {
    document.getElementById('alertMessage').innerText = message;
    document.getElementById('customAlert').style.display = 'flex';
}

function closeAlert() {
    document.getElementById('customAlert').style.display = 'none';
}

function deleteStock(product) {
    let stock = JSON.parse(localStorage.getItem('stock')) || [];
    stock = stock.filter(item => item.product !== product);
    localStorage.setItem('stock', JSON.stringify(stock));
}