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


document.addEventListener("DOMContentLoaded", () => {
    // --- Tax Toggle Logic (from before) ---
    const taxSwitch = document.getElementById("switchCheckChecked");
    if (taxSwitch) {
        // ... your existing tax toggle code ...
    }

    // --- Theme Switcher Logic ---
    const themeCheckbox = document.getElementById("theme-checkbox");
    const currentTheme = localStorage.getItem("theme");
    const htmlElement = document.documentElement; // Get the <html> element

    // Apply the saved theme on page load
    if (currentTheme) {
        htmlElement.setAttribute("data-theme", currentTheme);
        if (currentTheme === "dark") {
            themeCheckbox.checked = true;
        }
    }

    // Listen for toggle change
    themeCheckbox.addEventListener("change", () => {
        if (themeCheckbox.checked) {
            htmlElement.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
        } else {
            htmlElement.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");
        }
    });
});