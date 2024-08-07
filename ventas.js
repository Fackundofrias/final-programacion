let stock = JSON.parse(localStorage.getItem('stock')) || [];
let stockId = stock.length > 0 ? Math.max(stock.map(item => item.id)) + 1 : 1;

document.getElementById('stockForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const product = document.getElementById('stockProduct').value;
    const quantity = document.getElementById('stockQuantity').value;

    if (!product || quantity <= 0) {
        showAlert('Por favor ingrese un producto válido y cantidad mayor a 0');
        return;
    }

    const item = {
        id: stockId++,
        product: product,
        quantity: quantity
    };

    stock.push(item);
    localStorage.setItem('stock', JSON.stringify(stock));
    displayStock();
    document.getElementById('stockForm').reset();
    updateProductSelect();
});

function displayStock() {
    const stockTableBody = document.getElementById('stockTableBody');
    stockTableBody.innerHTML = '';

    stock.forEach(item => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.product}</td>
            <td>${item.quantity}</td>
            <td class="actions">
                <button onclick="editStock(${item.id})">Editar</button>
                <button onclick="deleteStock(${item.id})">Borrar</button>
            </td>
        `;

        stockTableBody.appendChild(row);
    });
}

function editStock(id) {
    const item = stock.find(item => item.id === id);
    document.getElementById('stockProduct').value = item.product;
    document.getElementById('stockQuantity').value = item.quantity;

    deleteStock(id);
}

function deleteStock(id) {
    stock = stock.filter(item => item.id !== id);
    localStorage.setItem('stock', JSON.stringify(stock));
    displayStock();
    updateProductSelect();
}

function updateProductSelect() {
    const productSelect = document.getElementById('product');
    productSelect.innerHTML = '<option value="" disabled selected>Seleccionar Producto</option>';
    
    stock.forEach(item => {
        const option = document.createElement('option');
        option.value = item.product;
        option.textContent = item.product;
        productSelect.appendChild(option);
    });
}

function showAlert(message) {
    document.getElementById('alertMessage').innerText = message;
    document.getElementById('customAlert').style.display = 'flex';
}

function closeAlert() {
    document.getElementById('customAlert').style.display = 'none';
}

displayStock();
updateProductSelect();