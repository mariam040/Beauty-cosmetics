let editingId = null;
let authToken = localStorage.getItem('adminToken');

document.addEventListener("DOMContentLoaded", function () {
    if (!authToken) {
        document.getElementById('loginOverlay').style.display = 'flex';
    } else {
        document.getElementById('loginOverlay').style.display = 'none';
        document.getElementById('welcomeMessage').style.display = 'block'; // ✅ أظهر الرسالة
        document.getElementById('productForm').style.display = 'none';
        document.getElementById('editProductSection').style.display = 'none';
        document.getElementById('deleteProductSection').style.display = 'none';
        document.getElementById('productTableSection').style.display = 'none';
    }
});


function loadProducts() {
    fetch('/api/products') // ← relative path
        .then(response => response.json())
        .then(products => {
            console.log("📥 Products loaded:", products);
            updateProductTable(products);
            updateDropdowns(products);
        })
        .catch(error => {
            console.error('❌ Error loading products:', error);
        });
}

function updateProductTable(products) {
    const productItems = document.getElementById('productItems');
    productItems.innerHTML = '';

    if (!products.length) {
        productItems.innerHTML = '<tr><td colspan="7" style="text-align:center;">No products found</td></tr>';
        return;
    }

    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
           <td>${product.image ? `<img src="/images/${product.image}" style="width:50px;height:50px;">` : 'No Image'}</td>

            <td>${product.category}</td>
            <td>${product.quantity}</td>
            <td>$${product.price}</td>
            <td>${product.description}</td>
            <td>
                <button onclick="editProduct('${product._id}')">Edit</button>
                <button onclick="deleteProduct('${product._id}')">Delete</button>
            </td>
        `;
        productItems.appendChild(row);
    });

    document.getElementById('productTableSection').style.display = 'block';
}

function updateDropdowns(products) {
    console.log("🔁 Updating dropdowns:", products);
    
    const editDropdown = document.getElementById('productSelectForEdit');
    const deleteDropdown = document.getElementById('productSelectForDelete');

    editDropdown.innerHTML = '<option value="">Select a product to edit</option>';
    deleteDropdown.innerHTML = '<option value="">Select a product to delete</option>';

    products.forEach(product => {
        const editOption = document.createElement('option');
        editOption.value = product._id;
        editOption.textContent = product.name;
        editDropdown.appendChild(editOption);

        const deleteOption = document.createElement('option');
        deleteOption.value = product._id;
        deleteOption.textContent = product.name;
        deleteDropdown.appendChild(deleteOption);
    });
}

function showAddProductForm() {
  document.getElementById('productForm').style.display = 'block';
  document.getElementById('editProductSection').style.display = 'none';
  document.getElementById('deleteProductSection').style.display = 'none';
  document.getElementById('productTableSection').style.display = 'none'; 
  document.getElementById('formTitle').textContent = 'Add Product';
  document.getElementById('welcomeMessage').style.display = 'none';

  editingId = null;
  clearForm();
}


function showEditProductForm() {
    document.getElementById('editProductSection').style.display = 'block';
    document.getElementById('productForm').style.display = 'none';
    document.getElementById('deleteProductSection').style.display = 'none';
    document.getElementById('welcomeMessage').style.display = 'none';

    loadProducts(); // ✅ Ensure products are refreshed
}

function showDeleteProductForm() {
    document.getElementById('deleteProductSection').style.display = 'block';
    document.getElementById('productForm').style.display = 'none';
    document.getElementById('editProductSection').style.display = 'none';
    document.getElementById('welcomeMessage').style.display = 'none';

    loadProducts(); // ✅ Ensure products are refreshed
}

function clearForm() {
    document.getElementById('productName').value = '';
    document.getElementById('productImage').value = '';
    document.getElementById('category').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('price').value = '';
    document.getElementById('description').value = '';
    document.getElementById('successMessage').textContent = '';
}

function saveProduct() {
    const formData = new FormData();
    formData.append('name', document.getElementById('productName').value);
    formData.append('category', document.getElementById('category').value);
    formData.append('quantity', document.getElementById('quantity').value);
    formData.append('price', document.getElementById('price').value);
    formData.append('description', document.getElementById('description').value);

    const imageFile = document.getElementById('productImage').files[0];
    if (!imageFile) {
    alert("Please upload an image.");
    return;
}

    if (imageFile) {
        formData.append('image', imageFile);
    }

    const url = editingId ? `/api/products/${editingId}` : '/api/products';
    const method = editingId ? 'PUT' : 'POST';

    fetch(url, {
        method,
        headers: {
            'Authorization': `Bearer ${authToken}`
        },
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        console.log("💾 Save response:", data);
        document.getElementById('successMessage').textContent = editingId ? "Product updated" : "Product added";
        setTimeout(() => {
            clearForm();
            loadProducts();
            document.getElementById('productForm').style.display = 'none';
        }, 1500);
    })
  .catch(async (err) => {
    const resText = await err.text?.();
    alert("Error saving product:\n" + resText);
});

}

function editProduct(productId) {
    fetch('/api/products')
        .then(res => res.json())
        .then(products => {
            const product = products.find(p => p._id === productId);
            if (!product) return alert("Product not found");

            editingId = productId;
            document.getElementById('productName').value = product.name;
            document.getElementById('category').value = product.category;
            document.getElementById('quantity').value = product.quantity;
            document.getElementById('price').value = product.price;
            document.getElementById('description').value = product.description;

            document.getElementById('productForm').style.display = 'block';
            document.getElementById('editProductSection').style.display = 'none';
            document.getElementById('deleteProductSection').style.display = 'none';
            document.getElementById('formTitle').textContent = 'Edit Product';
        });
}

function loadProductForEdit() {
    const productId = document.getElementById('productSelectForEdit').value;
    if (productId) {
        editProduct(productId);
    }
}

function deleteProduct(productId) {
    if (!confirm("Are you sure?")) return;

    fetch(`/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log("🗑️ Delete response:", data);
        alert("Product deleted");
        loadProducts();
    })
    .catch(err => {
        console.error("❌ Error deleting:", err);
        alert("Error deleting product.");
    });
}

function deleteSelectedProduct() {
    const productId = document.getElementById('productSelectForDelete').value;
    if (productId) {
        deleteProduct(productId);
    }
}

function logout() {
    localStorage.removeItem('adminToken');
    location.reload();
}
