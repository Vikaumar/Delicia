// src/Context/StoreContext.jsx
import { createContext, useEffect, useState } from "react";
import { food_list as menu_list } from "../assets/assets";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = import.meta.env.VITE_API_URL || "http://localhost:4000";

  const [food_list, setFoodList] = useState(menu_list);

  // Cart + auth
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");

  // Promo states
  const [appliedPromo, setAppliedPromo] = useState(null); // { code, type: 'percentage'|'fixed', discount: number, ... }
  const [promoDiscount, setPromoDiscount] = useState(0);

  // ─── Cart helpers ──────────────────────────────
  const addToCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    try {
      if (token) {
        await axios.post(
          `${url}/api/cart/add`,
          { itemId },
          { headers: { token } }
        );
      }
    } catch (err) {
      console.error("addToCart backend error:", err);
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 1) - 1, 0),
    }));
    try {
      if (token) {
        await axios.post(
          `${url}/api/cart/remove`,
          { itemId },
          { headers: { token } }
        );
      }
    } catch (err) {
      console.error("removeFromCart backend error:", err);
    }
  };

  const clearCart = async () => {
    setCartItems({});
    try {
      if (token) {
        // adjust endpoint if your backend expects a different route/method
        await axios.post(`${url}/api/cart/clear`, {}, { headers: { token } });
      }
    } catch (err) {
      console.error("clearCart backend error:", err);
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((p) => p._id === item);
        if (itemInfo) totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  // ─── Cart load ─────────────────────────────────
  const loadCartData = async (tok) => {
    try {
      const resp = await axios.post(
        `${url}/api/cart/get`,
        {},
        { headers: { token: tok } }
      );
      setCartItems(resp.data.cartData || {});
    } catch (err) {
      console.error("Failed to load cart:", err);
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem("token");
    if (stored) {
      setToken(stored);
      loadCartData(stored);
    }
    // we intentionally do not fetch food list here to preserve your prior behavior
  }, []);

  // ─── Promo helpers ──────────────────────────────

  // Internal: calculate discount for a given promo object and subtotal
  const calcDiscountFromPromo = (promo, subtotal) => {
    if (!promo || subtotal <= 0) return 0;

    let discount = 0;
    if (promo.type === "percentage") {
      // promo.discount expected like 10 for 10%
      discount = (subtotal * (promo.discount || 0)) / 100;
    } else if (promo.type === "fixed") {
      // promo.discount expected as fixed currency amount
      discount = Math.min(promo.discount || 0, subtotal);
    }
    // safety: don't exceed subtotal
    discount = Math.min(discount, subtotal);
    // round to 2 decimals
    return Math.round(discount * 100) / 100;
  };

  // Apply promo by passing a promo object (no backend validation)
  const applyPromoCode = (promoData) => {
    if (!promoData) return false;
    setAppliedPromo(promoData);

    const subtotal = getTotalCartAmount();
    const discount = calcDiscountFromPromo(promoData, subtotal);
    setPromoDiscount(discount);
    return true;
  };

  // Validate promo code with backend and apply if valid.
  // This function returns { success: boolean, message?, promo? }
// inside StoreContextProvider (replace the old validateAndApplyPromo)
const validateAndApplyPromo = async (code) => {
  if (!code) return { success: false, message: "No code provided" };

  const endpoint = `${url}/api/promo/validate`;
  console.log("Validating promo at:", endpoint, "with token:", token);

  try {
    const resp = await axios.post(endpoint, { code }, { headers: { token } });
    console.log("promo validate response:", resp?.data);

    // normalize response handling (adjust keys if your backend uses different names)
    if (resp.data && resp.data.success && resp.data.promo) {
      const promo = resp.data.promo;
      setAppliedPromo(promo);
      const subtotal = getTotalCartAmount();
      setPromoDiscount(calcDiscountFromPromo(promo, subtotal));
      return { success: true, promo };
    } else {
      // backend returned success=false or no promo object
      const message = resp.data?.message || "Invalid promo";
      setAppliedPromo(null);
      setPromoDiscount(0);
      return { success: false, message };
    }
  } catch (err) {
    // Network/backend or CORS error — show readable message
    console.error("validateAndApplyPromo error:", err);

    // try to surface backend message if available
    const backendMsg = err?.response?.data?.message || err?.message || "Promo validation failed";
    return { success: false, message: backendMsg };
  }
};

  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoDiscount(0);
  };

  const getDeliveryFee = () => {
    const subtotal = getTotalCartAmount();
    // adjust delivery fee logic to match your app (0 if empty, otherwise $5)
    return subtotal === 0 ? 0 : 5;
  };

  const getFinalTotal = () => {
    const subtotal = getTotalCartAmount();
    const deliveryFee = getDeliveryFee();
    const final = Math.max(0, subtotal + deliveryFee - promoDiscount);
    // round to 2 decimals
    return Math.round(final * 100) / 100;
  };

  // keep promoDiscount consistent when cart changes or appliedPromo changes
  useEffect(() => {
    if (!appliedPromo) {
      setPromoDiscount(0);
      return;
    }
    const subtotal = getTotalCartAmount();
    setPromoDiscount(calcDiscountFromPromo(appliedPromo, subtotal));
  }, [cartItems, appliedPromo, food_list]);

  // ─── Order helper example (use in your PlaceOrder component) ─────────────────
  const placeOrder = async (orderData) => {
    try {
      const originalAmount = getTotalCartAmount() + getDeliveryFee();
      const finalAmount = getFinalTotal();

      const orderPayload = {
        ...orderData,
        promoCode: appliedPromo?.code || null,
        promoDiscount: promoDiscount || 0,
        originalAmount,
        finalAmount,
      };

      const response = await axios.post(`${url}/api/order/place`, orderPayload, {
        headers: { token },
      });

      if (response.data?.success) {
        // clear cart + promo after success
        await clearCart();
        removePromoCode();
      }
      return response.data;
    } catch (error) {
      console.error("Order placement failed:", error);
      return { success: false, message: "Order failed" };
    }
  };

  // ─── Context value ──────────────────────────────
  const contextValue = {
    url,
    food_list,
    menu_list,
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalCartAmount,
    token,
    setToken,
    loadCartData,
    setCartItems,

    // promo
    appliedPromo,
    promoDiscount,
    applyPromoCode, // accepts promo object
    validateAndApplyPromo, // accepts promo code string, validates with backend then applies
    removePromoCode,
    getDeliveryFee,
    getFinalTotal,

    // order
    placeOrder,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
