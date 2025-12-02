import { ziniPayCreatePayment } from "./zinipay.js";

document.addEventListener("DOMContentLoaded", () => {
  const productDetailsContainer = document.getElementById("product-details");
  const productIdInput = document.getElementById("product-id");
  const demoForm = document.getElementById("demo-form");
  const formResponse = document.getElementById("form-response");

  // Fetch product data and display it
  fetch("product.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((product) => {
      // Populate the product details
      productDetailsContainer.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
            `;

      // Set the product ID in the hidden form field
      productIdInput.value = product.id;
    })
    .catch((error) => {
      console.error("Error fetching product data:", error);
      productDetailsContainer.innerHTML =
        "<p>Sorry, the product could not be loaded.</p>";
    });

  // Handle form submission
  demoForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Get form values individually
    const productId = document.getElementById("product-id").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    // database save simulation
    console.log("Saving to database...");
    const orderId = 1234;

    const payload = {
      amount: 100,
      redirect_url: "http://127.0.0.1:5500/payment-verify.html",
      cancel_url: "http://127.0.0.1:5500",
      cus_name: name,
      cus_email: email,
      metadata: { product_id: productId, order_id: orderId, phone },
      return_type: "GET",
      webhook_url: "http://127.0.0.1:5500/payment-verify.html",
    };

    console.log("Creating payment with payload:", payload);

    const apiKey = "185b43d2e0dfc0160ddaa454aa606ff481742f3c31fcbce7";

    const response = await ziniPayCreatePayment(payload, apiKey);

    console.log("response from create payment:", response);
    if (response.status === true && response.payment_url) {
      window.location.href = response.payment_url;
    }

    // In a real scenario, you would now make an API call to your backend to
    // initiate the payment and get a transaction ID.
    // For this demo, we'll simulate it and redirect to the verification page.

    formResponse.textContent = "Processing your request...";
    formResponse.style.color = "blue";
  });
});
