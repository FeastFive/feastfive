const express = require("express");
const router = express.Router();
const Stripe = require("stripe")(
  "sk_test_51PExeqGnJMvlUc9L4fDXw7oCeaFbgLN6AnCxFJwv79HuP9txhUjQzw4NdTEnoWZHCrLqaaI7bUHhZIOaxH9N2pAe00CD1Pk70I"
);

router.post("/create-checkout-session", async (req, res) => {
  const { products } = req.body;
  console.log(products);

  const lineItems = products.map((product) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: product.foodName,
      },
      unit_amount:
        product.foodInfo[0].price !== null &&
        product.foodInfo[0].price !== undefined
          ? Math.round(product.foodInfo[0].price * 100)
          : 0,
    },
    quantity: product.count,
  }));
  console.log(lineItems);

  const session = await Stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "https://example.com/success",
    cancel_url: "https://example.com/cancel",
  });

  res.json({ id: session.id });
});

module.exports = router;
