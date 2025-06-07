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
            
            // Update welcome name
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

        // Show welcome section by default
        document.addEventListener('DOMContentLoaded', function() {
           
        });