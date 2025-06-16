let slides =document.querySelectorAll('.home .slide');
let index = 0 ;
 
function next(){
    slides[index].classList.remove('active');
    index = (index + 1 ) % slides.length;
     slides[index].classList.add('active');

}
function prev(){
    slides[index].classList.remove('active');
    index = (index - 1 + slides.length) % slides.length;
     slides[index].classList.add('active');

}

let currentSlide = 0;
const slide = document.querySelectorAll(".home .slide");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) slide.classList.add("active");
  });
}

function next() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prev() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

// Auto slide every 3 seconds
setInterval(next, 5000);

// Initialize first slide
showSlide(currentSlide);
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
                <button type="button" class="btn-buy" onclick="goToCheckout()"> buy now
                  <span><i class="fas fa-shopping-cart"></i></span>
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
// --- Open & close chat ---
document.getElementById("openChatBtn").addEventListener("click", () => {
  document.getElementById("chatContainer").style.display = "flex";
});

document.getElementById("closeChatBtn").addEventListener("click", () => {
  document.getElementById("chatContainer").style.display = "none";
});

// --- Handle chat submission ---
document.getElementById("chatForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const userInput = document.getElementById("userInput");
  const userMessage = userInput.value.trim();
  if (!userMessage) return;

  addMessage("user", userMessage);
  userInput.value = "";

  const reply = getBotReply(userMessage);
  addMessage("bot", reply);
});

// --- Add message to chat window ---
function addMessage(sender, message) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add(sender === "user" ? "user-msg" : "bot-msg");
  msgDiv.textContent = message;
  document.getElementById("chatWindow").appendChild(msgDiv);
  document.getElementById("chatWindow").scrollTop =
    document.getElementById("chatWindow").scrollHeight;
}
function addMessage(sender, message) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add(sender === "user" ? "user-msg" : "bot-msg");

  // Detect URLs in bot message and convert them to links
  if (sender === "bot") {
    msgDiv.innerHTML = message.replace(
      /(https?:\/\/[^\s]+)/g,
      '<a href="$1" target="_blank">$1</a>'
    );
  } else {
    msgDiv.textContent = message;
  }

  document.getElementById("chatWindow").appendChild(msgDiv);
  document.getElementById("chatWindow").scrollTop =
    document.getElementById("chatWindow").scrollHeight;
}
const faqs = new Map([
  [["hello", "hi", "hey"], "Hello! How can I help you today?"],
  [["how are you"], "I am good, thank you!. how about you?"],
  [["price", "cost"], "Check our shop page for more info."],
  [["contact", "support"], "Email us at angelinabeauty@gmail.com."],
  [["login", "signin", "log in", "sign in"], "You can log in here: http://localhost:3000/auth"],
  [["refund policy", "policy", "refund"], "You can find it here: http://localhost:3000/terms"],
  [["best moisturizer", "recommend cream", "dry skin cream", "moisturizer , bodycare"], 
   "For dry skin, we recommend our Hydrating Glow Cream with hyaluronic acid."],
  [["foundation shades", "shade match", "foundation color , makeup"],
   "You can use our Shade Finder tool here: http://localhost:3000/makeup"],
]);


function getBotReply(msg) {
  const text = msg.toLowerCase();
  for (let [keys, response] of faqs) {
    if (keys.some((k) => text.includes(k))) return response;
  }
  return "I am trying to help youI cannot answer this";
}

// butn left right
function scrollLeft() {
  document.getElementById("productScroll").scrollBy({
    left: -300,
    behavior: "smooth",
  });
}

function scrollRight() {
  document.getElementById("productScroll").scrollBy({
    left: 300,
    behavior: "smooth",
  });
}
