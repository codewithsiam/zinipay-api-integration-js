export async function ziniPayCreatePayment(payload, apiKey) {
  try {
    const response = await fetch("https://api.zinipay.com/v1/payment/create", {
      method: "POST",
      headers: {
        "zini-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(err || "Payment create failed");
    }

    return await response.json();
  } catch (e) {
    console.error("Create Payment Error:", e.message);
    throw e;
  }
}

export async function ziniPayVerifyPayment(invoiceId, apiKey) {
  try {
    const response = await fetch("https://api.zinipay.com/v1/payment/verify", {
      method: "POST",
      headers: {
        "zini-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ invoiceId }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(err || "Payment verify failed");
    }

    return await response.json();
  } catch (e) {
    console.error("Verify Payment Error:", e.message);
    throw e;
  }
}
