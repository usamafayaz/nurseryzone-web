import React from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, ChevronLeft, Plus, Minus } from "lucide-react";
import useCartStore from "../../../store/cartStore";

const CartScreen = () => {
  const navigate = useNavigate();
  const cart = useCartStore((state) => state.cart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const totalPrice = useCartStore((state) => state.getTotalPrice());

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-6">
      <button
        onClick={() => navigate("/customer/dashboard")}
        className="flex items-center text-green-600 mb-4"
      >
        <ChevronLeft size={24} /> Back to Plants
      </button>

      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Cart</h2>

        {cart.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingCart size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">Your cart is empty</p>
          </div>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item.plant_id}
                className="flex items-center justify-between border-b py-4"
              >
                <div className="flex items-center">
                  <img
                    src={`http://localhost:8000/api${item.image_url}`}
                    alt={item.name}
                    className="w-20 h-20 rounded-lg mr-4 object-cover"
                  />
                  <div>
                    <p className="font-semibold text-lg">{item.name}</p>
                    <p className="text-gray-500">Rs. {item.price}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <button
                      onClick={() =>
                        updateQuantity(item.plant_id, item.quantity - 1)
                      }
                      className="bg-green-50 p-1 rounded-full"
                    >
                      <Minus size={16} className="text-green-600" />
                    </button>
                    <span className="mx-2 text-lg">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.plant_id, item.quantity + 1)
                      }
                      className="bg-green-50 p-1 rounded-full"
                    >
                      <Plus size={16} className="text-green-600" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.plant_id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-6">
              <div className="flex justify-between mb-4">
                <span className="text-xl text-gray-700">Subtotal</span>
                <span className="text-2xl font-bold">
                  Rs. {totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-lg text-gray-600">Shipping</span>
                <span className="text-lg text-gray-600">Free</span>
              </div>
              <div className="border-t pt-4 flex justify-between">
                <span className="text-xl font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-green-600">
                  Rs. {totalPrice}
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
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition mt-4"
                disabled={cart.length === 0}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartScreen;
