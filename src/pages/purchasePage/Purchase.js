import React, { useState } from "react";
import styles from "./PurchasePage.module.css";
import Navbar from "../../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Elements, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("your_publishable_key");

// Custom Hook to handle payment submission
const usePaymentSubmission = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (formData, data) => {
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmCardPayment(
      "sk_test_51PExeqGnJMvlUc9L4fDXw7oCeaFbgLN6AnCxFJwv79HuP9txhUjQzw4NdTEnoWZHCrLqaaI7bUHhZIOaxH9N2pAe00CD1Pk70I",
      {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: formData.title,
            address: {
              line1: formData.address,
            },
          },
        },
      }
    );

    if (result.error) {
      console.error(result.error.message);
      // Show error to your customer
    } else {
      if (result.paymentIntent.status === "succeeded") {
        console.log("Payment successful!");
        // Redirect or show success message to the user
      }
    }
  };

  return handleSubmit;
};
const Purchase = () => {
  const location = useLocation();
  const data = location.state?.cart;
  const totalPrice = data ? parseFloat(data.totalPrice) : 0; // Parse totalPrice as a float

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    address: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle payment submission
    // For example, you can use stripe.confirmCardPayment
  };

  return (
    <div className={styles.mainContainer}>
      <Navbar />
      <div className={styles.contentContainer}>
        <div className={styles.mealAndressCart}>
          <div className={styles.mealContainer}>
            <div className={styles.titleMeals}>Orders</div>
            {data &&
              data.cartFoodList.map((mealItem, index) => (
                <div key={index} className={styles.mealCart}>
                  <img
                    src={mealItem.image}
                    alt=""
                    className={styles.mealImage}
                  />
                  <div className={styles.mealContent}>
                    <div className={styles.mealTitle}>{mealItem.name}</div>
                    <div className={styles.mealDescription}>
                      {mealItem.description}
                    </div>
                  </div>
                  <div className={styles.mealPrice}>{mealItem.price}$</div>
                </div>
              ))}
            <div className={styles.totalPrice}>Total Price: {totalPrice}$</div>
          </div>
          <div className={styles.addressContainer}>
            <label className={styles.inputLabel}>
              <div className={styles.inputTitle}>Address Title:</div>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={styles.inputFill}
              />
            </label>
            <label className={styles.inputLabel}>
              <div className={styles.inputTitle}>Address:</div>
              <textarea
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={styles.inputFillAddress}
              />
            </label>
          </div>
        </div>

        <div className={styles.transectionCart}></div>
      </div>
    </div>
  );
};

export default Purchase;
