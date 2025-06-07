        function toggleSection(sectionId) {
            // Hide all sections
            const sections = document.querySelectorAll('.hidden-section');
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show selected section
            const selectedSection = document.getElementById(sectionId);
            if (selectedSection) {
                selectedSection.classList.add('active');
            }
        }

        function togglePasswordVisibility(inputId) {
            const input = document.getElementById(inputId);
            const toggleBtn = input.nextElementSibling;
            
            if (input.type === 'password') {
                input.type = 'text';
                toggleBtn.textContent = 'Hide';
            } else {
                input.type = 'password';
                toggleBtn.textContent = 'Show';
            }
        }

        function saveDetails() {
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const address = document.getElementById('address').value;
            
            
            document.getElementById('welcome-name').textContent = name;
            
            alert('Details saved successfully!');
        }

        function changePassword() {
            const oldPassword = document.getElementById('old-password').value;
            const newPassword = document.getElementById('new-password').value;
            
            if (oldPassword && newPassword) {
                alert('Password changed successfully!');
                document.getElementById('old-password').value = '';
                document.getElementById('new-password').value = '';
            } else {
                alert('Please fill in both password fields.');
            }
        }

        document.addEventListener('DOMContentLoaded', function() {
            
        });
   
   
   document.addEventListener("DOMContentLoaded", function () {
            const quantityInputs = document.querySelectorAll(".quantity-input");
            const removeButtons = document.querySelectorAll(".remove-btn");
            const applyCouponBtn = document.getElementById("apply-coupon");
            const cartSubtotal = document.getElementById("cart-subtotal");
            const cartDiscount = document.getElementById("cart-discount");
            const cartTotal = document.getElementById("cart-total");

            
            quantityInputs.forEach(input => {
                input.addEventListener("change", updateSubtotal);
            });

           
            removeButtons.forEach(button => {
                button.addEventListener("click", function () {
                    this.closest("tr").remove();
                    updateSubtotal();
                });
            });

            
            applyCouponBtn.addEventListener("click", function () {
                let couponCode = document.getElementById("coupon-code").value;
                let discount = 0;

                if (couponCode === "BEAUTY10") {
                    discount = 0.1; 
                }

                let subtotal = calculateSubtotal();
                let discountAmount = subtotal * discount;
                let total = subtotal - discountAmount;

                cartDiscount.innerText = `-$${discountAmount.toFixed(2)}`;
                cartTotal.innerText = `$${total.toFixed(2)}`;
            });

            
            function calculateSubtotal() {
                let subtotal = 0;
                document.querySelectorAll(".quantity-input").forEach((input, index) => {
                    let price = parseFloat(document.querySelectorAll(".cart-table td:nth-child(2)")[index].innerText.replace("$", ""));
                    let quantity = parseInt(input.value);
                    let itemSubtotal = price * quantity;
                    document.querySelectorAll(".subtotal")[index].innerText = `$${itemSubtotal.toFixed(2)}`;
                    subtotal += itemSubtotal;
                });
                return subtotal;
            }

            
            function updateSubtotal() {
                let subtotal = calculateSubtotal();
                cartSubtotal.innerText = `$${subtotal.toFixed(2)}`;
                cartTotal.innerText = `$${total.toFixed(2)}`;
                cartDiscount.innerText = "$0.00"; 
            }
        });     
     
     
     
     document.addEventListener("DOMContentLoaded", function () {
    const quantityInputs = document.querySelectorAll(".quantity-input");
    const removeButtons = document.querySelectorAll(".remove-btn");
    const applyCouponBtn = document.getElementById("apply-coupon");
    const cartSubtotal = document.getElementById("cart-subtotal");
    const cartDiscount = document.getElementById("cart-discount");
    const cartTotal = document.getElementById("cart-total");

    
    quantityInputs.forEach(input => {
        input.addEventListener("change", updateSubtotal);
    });


    removeButtons.forEach(button => {
        button.addEventListener("click", function () {
            this.closest("tr").remove();
            updateSubtotal();
        });
    });

    
    applyCouponBtn.addEventListener("click", function () {
        let couponCode = document.getElementById("coupon-code").value;
        let discount = 0;

        if (couponCode === "BEAUTY10") {
            discount = 0.1; // 10% discount
        }

        let subtotal = calculateSubtotal();
        let discountAmount = subtotal * discount;
        let total = subtotal - discountAmount;

        cartDiscount.innerText = `-$${discountAmount.toFixed(2)}`;
        cartTotal.innerText = `$${total.toFixed(2)}`;
    });


    function calculateSubtotal() {
        let subtotal = 0;
        document.querySelectorAll(".quantity-input").forEach((input, index) => {
            let price = parseFloat(document.querySelectorAll(".cart-table td:nth-child(2)")[index].innerText.replace("$", ""));
            let quantity = parseInt(input.value);
            let itemSubtotal = price * quantity;
            document.querySelectorAll(".subtotal")[index].innerText = `$${itemSubtotal.toFixed(2)}`;
            subtotal += itemSubtotal;
        });
        return subtotal;
    }

    
    function updateSubtotal() {
        let subtotal = calculateSubtotal();
        cartSubtotal.innerText = `$${subtotal.toFixed(2)}`;
        cartTotal.innerText = `$${total.toFixed(2)}`;
        cartDiscount.innerText = "$0.00"; 
    }
});