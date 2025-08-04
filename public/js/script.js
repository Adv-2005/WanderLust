// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()

// Toggle password visibility
document.addEventListener('DOMContentLoaded', function () {
  const toggleBtn = document.getElementById('togglePassword');
  const pwdInput = document.getElementById('password');

  if (toggleBtn && pwdInput) {
    toggleBtn.addEventListener('click', function () {
      const icon = this.querySelector('i');

      if (pwdInput.type === 'password') {
        pwdInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
      } else {
        pwdInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
      }
    });
  }
});



document.addEventListener('DOMContentLoaded', function () {
  const toggleBtn = document.getElementById('toggleConfirmPassword');
  const pwdInput = document.getElementById('confirmPassword');

  if (toggleBtn && pwdInput) {
    toggleBtn.addEventListener('click', function () {
      const icon = this.querySelector('i');

      if (pwdInput.type === 'password') {
        pwdInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
      } else {
        pwdInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
      }
    });
  }
});



document.addEventListener("DOMContentLoaded", function () {
  const taxSwitch = document.getElementById("switchCheckChecked");

  // 🛑 Exit early if the toggle doesn't exist on this page
  if (!taxSwitch) return;

  function updatePriceDisplay() {
    const basePrices = document.getElementsByClassName("pricewoTax");
    const taxPrices = document.getElementsByClassName("tax");

    for (let price of basePrices) {
      price.style.display = taxSwitch.checked ? "none" : "inline";
    }

    for (let tax of taxPrices) {
      tax.style.display = taxSwitch.checked ? "inline" : "none";
    }
  }

  // Initial state on page load
  updatePriceDisplay();

  // Update on toggle
  taxSwitch.addEventListener("change", updatePriceDisplay);
});
