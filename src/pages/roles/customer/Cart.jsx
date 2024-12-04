import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  ChevronLeft,
  Plus,
  Minus,
  Trash2,
  Heart,
} from "lucide-react";
import useCartStore from "../../../store/cartStore";

const CartScreen = () => {
  const navigate = useNavigate();
  const cart = useCartStore((state) => state.cart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const totalPrice = useCartStore((state) => state.getTotalPrice());

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-white p-4 md:p-8">
      <div className="container mx-auto max-w-4xl">
        <button
          onClick={() => navigate("/customer/dashboard")}
          className="flex items-center text-green-700 hover:text-green-900 mb-6 transition-colors"
        >
          <ChevronLeft size={24} className="mr-2" />
          <span className="font-medium">Continue Shopping</span>
        </button>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-white rounded-2xl shadow-xl p-6 border border-green-50">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <ShoppingCart size={32} className="mr-4 text-green-600" />
              Your Cart
            </h2>

            {cart.length === 0 ? (
              <div className="text-center py-12 bg-green-50 rounded-lg">
                <ShoppingCart
                  size={64}
                  className="mx-auto text-green-300 mb-4"
                />
                <p className="text-gray-600 text-xl">Your cart feels lonely</p>
                <button
                  onClick={() => navigate("/customer/dashboard")}
                  className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Shop Now
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.plant_id}
                    className="flex items-center justify-between bg-green-50 rounded-lg p-4 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={`http://localhost:8000/api${item.image_url}`}
                        alt={item.name}
                        className="w-24 h-24 rounded-xl object-cover border-2 border-green-100"
                      />
                      <div>
                        <p className="font-semibold text-xl text-gray-800">
                          {item.name}
                        </p>
                        <p className="text-green-600 font-medium">
                          Rs. {item.price}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center bg-white rounded-full shadow-sm">
                        <button
                          onClick={() =>
                            updateQuantity(item.plant_id, item.quantity - 1)
                          }
                          className="p-2 rounded-l-full hover:bg-green-50 transition"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={16} className="text-green-600" />
                        </button>
                        <span className="px-4 text-lg font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.plant_id, item.quantity + 1)
                          }
                          className="p-2 rounded-r-full hover:bg-green-50 transition"
                        >
                          <Plus size={16} className="text-green-600" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.plant_id)}
                        className="text-red-500 hover:text-red-700 transition"
                        title="Remove from cart"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="md:col-span-1 bg-white rounded-2xl shadow-xl p-6 border border-green-50 h-fit">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Order Summary
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">
                  Rs. {totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="border-t border-green-100 pt-4 flex justify-between">
                <span className="text-xl font-bold">Total</span>
                <span className="text-2xl font-bold text-green-700">
                  Rs. {totalPrice.toFixed(2)}
                </span>
              </div>
              <button
                onClick={() =>
                  navigate("/checkout", {
                    state: {
                      cart,
                      totalPrice: totalPrice > 50 ? totalPrice : totalPrice + 5,
                    },
                  })
                }
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 active:scale-95 transition transform"
                disabled={cart.length === 0}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
