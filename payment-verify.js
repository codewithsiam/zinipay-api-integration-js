import { ziniPayVerifyPayment } from "./zinipay.js";

document.addEventListener("DOMContentLoaded", async () => {
  const verificationStatusContainer = document.getElementById(
    "verification-status"
  );

  // In a real application, you would get the transaction ID from the URL query parameters.
  const urlParams = new URLSearchParams(window.location.search);
  const invoiceId = urlParams.get("invoiceId");

  if (invoiceId) {
    verificationStatusContainer.innerHTML = `<p>Verifying payment for Invoice ID: <strong>${invoiceId}</strong>...</p>`;
    const apiKey = "185b43d2e0dfc0160ddaa454aa606ff481742f3c31fcbce7";
    
    const response = await ziniPayVerifyPayment(invoiceId, apiKey);
    
    console.log("response from verify payment:", response);

    if (response.status === "COMPLETED"){
      verificationStatusContainer.innerHTML = `<p>verified payment for Invoice ID: <strong>${invoiceId}</strong> Transaction ID: ${response?.transaction_id}</p>`;
      // DATABASE UPDATE SIMULATION
      
    }

  } else {
    verificationStatusContainer.innerHTML = `<p style="color: red;">No Invoice ID found. Unable to verify payment.</p>`;
  }
});
