let editingIndex = null;
let products = [];

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('productTableSection').style.display = 'none';
    document.getElementById('deleteProductSection').style.display = 'none';
    document.getElementById('editProductSection').style.display = 'none';
});


function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const error = document.getElementById("loginError");

    if (username === "admin" && password === "admin123") {
        document.getElementById("loginOverlay").style.display = "none";
    } else {
        error.textContent = "Invalid username or password.";
    }
}


function showAddProductForm() {
    document.getElementById('productForm').style.display = 'block';
    document.getElementById('editProductSection').style.display = 'none';
    document.getElementById('deleteProductSection').style.display = 'none';
    editingIndex = null;
    clearForm();
}

function closeAddProductForm() {
    document.getElementById('productForm').style.display = 'none';
    clearForm();
}

function showEditProductForm() {
    document.getElementById('editProductSection').style.display = 'block';
    document.getElementById('productForm').style.display = 'none';
    document.getElementById('deleteProductSection').style.display = 'none';
    updateEditDropdown();
}

function showDeleteProductForm() {
    document.getElementById('deleteProductSection').style.display = 'block';
    document.getElementById('productForm').style.display = 'none';
    document.getElementById('editProductSection').style.display = 'none';
    updateDeleteDropdown();
}

function clearForm() {
    document.getElementById('productName').value = '';
    document.getElementById('productImage').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('price').value = '';
    document.getElementById('productNameError').textContent = '';
    document.getElementById('productImageError').textContent = '';
    document.getElementById('quantityError').textContent = '';
    document.getElementById('priceError').textContent = '';
    document.getElementById('successMessage').style.display = 'none';
}

function saveProduct() {
    document.getElementById('productNameError').textContent = '';
    document.getElementById('productImageError').textContent = '';
    document.getElementById('quantityError').textContent = '';
    document.getElementById('priceError').textContent = '';

    const productName = document.getElementById('productName').value;
    const productImage = document.getElementById('productImage').files[0];
    const quantity = document.getElementById('quantity').value;
    const price = document.getElementById('price').value;

    let valid = true;
    document.getElementById('successMessage').style.display = 'none';

    if (!productName) {
        document.getElementById('productNameError').textContent = 'Product name is required.';
        valid = false;
    }

    if (!productImage && editingIndex === null) {
        document.getElementById('productImageError').textContent = 'Product image is required.';
        valid = false;
    }

    if (!quantity || quantity <= 0) {
        document.getElementById('quantityError').textContent = 'Quantity must be a positive number.';
        valid = false;
    }

    if (!price || price <= 0) {
        document.getElementById('priceError').textContent = 'Price must be a positive number.';
        valid = false;
    }

    if (valid) {
        document.getElementById('successMessage').textContent = editingIndex === null ? 'Product added successfully' : 'Product updated successfully';

        const imageURL = productImage ? URL.createObjectURL(productImage) : (editingIndex !== null ? products[editingIndex].image : '');
        const product = {
            id: editingIndex === null ? Date.now() : products[editingIndex].id,
            name: productName,
            image: imageURL,
            quantity: parseInt(quantity),
            price: parseFloat(price)
        };

        if (editingIndex === null) {
            products.push(product);
        } else {
            products[editingIndex] = product;
        }

        updateProductList();
        updateDeleteDropdown();
        updateEditDropdown();

        document.getElementById('successMessage').style.display = 'block';
        document.getElementById('productTableSection').style.display = 'block';
        closeAddProductForm();
    }
}

function updateProductList() {
    const productItems = document.getElementById('productItems');
    productItems.innerHTML = '';

    products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td><img src="${product.image}" alt="Product Image" style="width: 50px; height: 50px;"></td>
            <td>${product.quantity}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>
                <button class="edit-btn" onclick="editProduct(${index})">Edit</button>
                <button class="delete-btn" onclick="prepareDeleteProduct(${index})">Delete</button>
            </td>
        `;
        productItems.appendChild(row);
    });
}

function updateDeleteDropdown() {
    const deleteDropdown = document.getElementById('productSelectForDelete');
    deleteDropdown.innerHTML = '<option value="">Select a product to delete</option>';

    products.forEach((product, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = product.name;
        deleteDropdown.appendChild(option);
    });

    const deleteButton = document.querySelector("#deleteProductSection button");
    deleteButton.disabled = products.length === 0;
}

function updateEditDropdown() {
    const editDropdown = document.getElementById('productSelectForEdit');
    editDropdown.innerHTML = '<option value="">Select a product to edit</option>';

    products.forEach((product, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = product.name;
        editDropdown.appendChild(option);
    });
}

function editProduct(index) {
    editingIndex = index;
    const product = products[index];
    
    document.getElementById('productForm').style.display = 'block';
    document.getElementById('editProductSection').style.display = 'none';
    document.getElementById('deleteProductSection').style.display = 'none';
    
    document.getElementById('productName').value = product.name;
    document.getElementById('quantity').value = product.quantity;
    document.getElementById('price').value = product.price;
}

function prepareDeleteProduct(index) {
    hideForm();
    const product = products[index];
    const confirmation = confirm(`Are you sure you want to delete"${product.name}"?`);

    if (confirmation) {
        deleteProduct(index);
    }
}

function deleteProduct(index) {
    products.splice(index, 1);
    updateProductList();
    updateDeleteDropdown();
    updateEditDropdown();
    
    if (products.length === 0) {
        document.getElementById('productTableSection').style.display = 'none';
    }
}

function deleteSelectedProduct() {
    const index = document.getElementById('productSelectForDelete').value;
    if (index === '') return;

    const product = products[index];
    const confirmation = confirm(`Are you sure you want to delete "${product.name}"?`);
    
    if (confirmation) {
        deleteProduct(index);
    }
}

function hideForm() {
    const productForm = document.getElementById('productForm');
    if (productForm) {
        productForm.style.display = 'none';
    }
}

function logout() {
    alert('Logging out...');
}