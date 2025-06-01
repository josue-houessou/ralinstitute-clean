// LANGUAGE SELECTION LOGIC
const originalLanguageSelect = document.getElementById('originalLanguage');
const targetLanguageSelect = document.getElementById('targetLanguage');

originalLanguageSelect.addEventListener('change', () => {
  const selectedOriginal = originalLanguageSelect.value;
  const languages = ["English", "French", "Spanish", "Russian", "Arabic", "Chinese"];
  targetLanguageSelect.innerHTML = '<option value="" disabled selected>Select Target Language</option>';
  languages.forEach(language => {
    if (language !== selectedOriginal) {
      const option = document.createElement('option');
      option.value = language;
      option.textContent = language;
      targetLanguageSelect.appendChild(option);
    }
  });
});

// ORDER SUMMARY HANDLING
const certifiedButton = document.getElementById("certified-translator");
const professionalButton = document.getElementById("professional-translator");
const fastButton = document.getElementById("fast");
const standardButton = document.getElementById("standard");
const expertiseTable = document.querySelectorAll(".table td");
const deliveryRadio = document.getElementById("same-format");
const additionalDocInput = document.getElementById("additional-doc");

const orderSummary = {
  category: "None",
  duration: "None",
  expertise: [],
  deliveryFormat: "Not selected",
  additionalDocument: "Not uploaded"
};

function updateSummary() {
  const summaryDiv = document.getElementById("order-summary");
  summaryDiv.innerHTML = `
    <h4>Order Summary</h4>
    <ul>
      <li><strong>Category:</strong> ${orderSummary.category}</li>
      <li><strong>Duration:</strong> ${orderSummary.duration}</li>
      <li><strong>Expertise:</strong> ${orderSummary.expertise.join(", ") || "None selected"}</li>
      <li><strong>Delivery Format:</strong> ${orderSummary.deliveryFormat}</li>
      <li><strong>Additional Document:</strong> ${orderSummary.additionalDocument}</li>
    </ul>
  `;
}

// Category buttons
certifiedButton.addEventListener("click", () => {
  orderSummary.category = "Certified Translator";
  certifiedButton.classList.add("btn-primary");
  professionalButton.classList.remove("btn-primary");
  professionalButton.classList.add("btn-outline-primary");
  updateSummary();
});

professionalButton.addEventListener("click", () => {
  orderSummary.category = "Professional Translator";
  professionalButton.classList.add("btn-primary");
  certifiedButton.classList.remove("btn-primary");
  certifiedButton.classList.add("btn-outline-primary");
  updateSummary();
});

// Duration buttons
fastButton.addEventListener("click", () => {
  orderSummary.duration = "Fast";
  fastButton.classList.add("btn-success");
  standardButton.classList.remove("btn-success");
  standardButton.classList.add("btn-outline-success");
  updateSummary();
});

standardButton.addEventListener("click", () => {
  orderSummary.duration = "Standard";
  standardButton.classList.add("btn-success");
  fastButton.classList.remove("btn-success");
  fastButton.classList.add("btn-outline-success");
  updateSummary();
});

// Expertise cells
expertiseTable.forEach(cell => {
  cell.addEventListener("click", () => {
    const expertise = cell.textContent.trim();
    const index = orderSummary.expertise.indexOf(expertise);

    if (index === -1) {
      orderSummary.expertise.push(expertise);
      cell.style.backgroundColor = "#007bff";
      cell.style.color = "#fff";
    } else {
      orderSummary.expertise.splice(index, 1);
      cell.style.backgroundColor = "";
      cell.style.color = "#333";
    }
    updateSummary();
  });
});

// Delivery format checkbox
deliveryRadio.addEventListener("change", () => {
  orderSummary.deliveryFormat = deliveryRadio.checked ? "Same format" : "Not selected";
  updateSummary();
});

// File input change
additionalDocInput.addEventListener("change", () => {
  const file = additionalDocInput.files[0];
  orderSummary.additionalDocument = file ? file.name : "Not uploaded";
  updateSummary();
});

// Initialize summary
updateSummary();

// FORM SUBMISSION HANDLING
const form = document.getElementById('translation-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = {
    first_name: document.getElementById('first_name').value,
    last_name: document.getElementById('last_name').value,
    email: document.getElementById('email').value,
    client_type: document.getElementById('client_type').value,
    source_language: originalLanguageSelect.value,
    target_language: targetLanguageSelect.value,
    document_details: document.getElementById('document_details').value,
    translator_type: orderSummary.category,
    delivery_speed: orderSummary.duration,
    expertise: orderSummary.expertise,
    same_format: deliveryRadio.checked,
    additional_doc_name: orderSummary.additionalDocument
  };

  try {
    const response = await fetch('/api/translation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (response.ok) {
      alert('Thank you! We will contact you shortly via email.');
      form.reset();
      orderSummary.category = "None";
      orderSummary.duration = "None";
      orderSummary.expertise = [];
      orderSummary.deliveryFormat = "Not selected";
      orderSummary.additionalDocument = "Not uploaded";
      updateSummary();
    } else {
      alert(data.message || 'Submission failed');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred');
  }
});
