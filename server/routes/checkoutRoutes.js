const express = require("express");
const router = express.Router();
const addOrder = require("./../controllers/purchaseController");
const Stripe = require("stripe")(
  "sk_test_51PExeqGnJMvlUc9L4fDXw7oCeaFbgLN6AnCxFJwv79HuP9txhUjQzw4NdTEnoWZHCrLqaaI7bUHhZIOaxH9N2pAe00CD1Pk70I"
);

router.post("/create-checkout-session", async (req, res) => {
  const { products, restaurantId, userId, adress } = req.body;
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
  const send = products.map((product) => ({
    name: product.foodName,
    price: Math.round(product.foodInfo[0].price * 100),
    quantity: product.count,
    foodInfo: product.foodInfo,
  }));

  const session = await Stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `http://localhost:4000/api/purchaseAccepted?restaurantId=${restaurantId}&userId=${userId}&cartFoodList=${encodeURIComponent(
      JSON.stringify(send)
    )}&adress=${encodeURIComponent(JSON.stringify(adress))}`,

    cancel_url: "http://localhost:3000/purchaseRejected",
  });

  res.json({ id: session.id });
});
router.get("/purchaseAccepted", addOrder);

module.exports = router;
