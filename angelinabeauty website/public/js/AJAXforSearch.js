
  console.log(document.getElementById('searchBtn'));

  document.getElementById('searchBtn').addEventListener('click', async () => {
    const query = document.getElementById('searchInput').value.trim();
    if (!query) return;

    try {
      const res = await fetch(`/api/products/search?q=${encodeURIComponent(query)}`);
      const products = await res.json();

      const container = document.getElementById('productItems');
      container.innerHTML = '';

      if (products.length === 0) {
        container.innerHTML = '<p style="padding: 20px;">No products found.</p>';
        return;
      }

      products.forEach(product => {
        const productHTML = `
          <div class="product">
            <div class="product-content">
              <div class="product-img">
                <img src="/images/${product.image}" height="200" alt="product image">
              </div>
              <div class="product-btns">
                <button type="button" class="btn-cart"> add to cart
                  <span><i class="fas fa-plus"></i></span>
                </button>
               
              </div>
            </div>
            <div class="product-info">
              <a href="/product/${product._id}" class="product-name">${product.name}</a>
              <p class="product-price">$ ${product.price.toFixed(2)}</p>
            </div>
          </div>
        `;
        container.innerHTML += productHTML;
      });

    } catch (err) {
      console.error(err);
    }
  });

