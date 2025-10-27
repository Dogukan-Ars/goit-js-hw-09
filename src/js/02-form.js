const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

window.addEventListener('load', () => {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    const { email, message } = JSON.parse(savedData);
    form.elements.email.value = email || '';
    form.elements.message.value = message || '';
  }
});

form.addEventListener('input', () => {
  const data = {
    email: form.elements.email.value.trim(),
    message: form.elements.message.value.trim(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
});

form.addEventListener('submit', event => {
  event.preventDefault();

  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();

  if (email === '' || message === '') {
    alert('Please fill in both fields before submitting!');
    return;
  }

  console.log('✅ Form submitted:', { email, message });

  localStorage.removeItem(STORAGE_KEY);
  form.reset();
});
