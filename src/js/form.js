// Web3Forms submission handling
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  const WEB3FORMS_KEY = "ffc72496-1720-4340-8bfe-c03ed308be1e";

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      const formData = new FormData(contactForm);
      formData.append("access_key", WEB3FORMS_KEY);
      
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        
        if (data.success) {
          alert("Message sent successfully! We will get back to you soon.");
          contactForm.reset();
        } else {
          alert("Error sending message: " + (data.message || "Unknown error."));
        }
      } catch (error) {
        console.error(error);
        alert("Network error. Please try again later.");
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }
});