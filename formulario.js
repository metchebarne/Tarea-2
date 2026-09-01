const form = document.getElementById('gitForm');
const emailInput = document.getElementById('email');
const emailError = document.getElementById('emailError');
const submitBtn = document.getElementById('submitBtn');
const requiredFields = [
  document.getElementById('nombre'),
  document.getElementById('tema'),
  document.getElementById('mensaje')
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isFormValid() {
  const emailValue = emailInput.value.trim();
  const validEmail = emailPattern.test(emailValue);
  const allRequiredFilled = requiredFields.every((field) => field.value.trim() !== '');
  return validEmail && allRequiredFilled;
}

function validateEmail() {
  const value = emailInput.value.trim();

  if (value === '') {
    emailInput.classList.remove('invalid');
    emailError.textContent = 'El correo electrónico es obligatorio.';
    return false;
  }

  if (!emailPattern.test(value)) {
    emailInput.classList.add('invalid');
    emailError.textContent = 'Ingrese un correo válido, por ejemplo: nombre@dominio.com';
    return false;
  }

  emailInput.classList.remove('invalid');
  emailError.textContent = '';
  return true;
}

function updateFormState() {
  const emailOk = validateEmail();
  const valid = isFormValid() && emailOk;
  submitBtn.disabled = !valid;
}

emailInput.addEventListener('input', updateFormState);
requiredFields.forEach((field) => {
  field.addEventListener('input', updateFormState);
  field.addEventListener('change', updateFormState);
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!isFormValid()) {
    validateEmail();
    return;
  }

  alert('Consulta enviada correctamente.');
  form.reset();
  submitBtn.disabled = true;
});

updateFormState();
