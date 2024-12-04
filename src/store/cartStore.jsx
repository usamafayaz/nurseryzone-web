import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (plant, quantity = 1) => {
        set((state) => {
          const existingItem = state.cart.find(
            (item) => item.plant_id === plant.plant_id
          );

          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.plant_id === plant.plant_id
                  ? { ...item, quantity: Math.max(item.quantity, quantity) }
                  : item
              ),
            };
          }

          return {
            cart: [...state.cart, { ...plant, quantity }],
          };
        });
      },

      updateQuantity: (plantId, newQuantity) => {
        set((state) => {
          if (newQuantity === 0) {
            return {
              cart: state.cart.filter((item) => item.plant_id !== plantId),
            };
          }

          return {
            cart: state.cart.map((item) =>
              item.plant_id === plantId
                ? { ...item, quantity: newQuantity }
                : item
            ),
          };
        });
      },

      removeFromCart: (plantId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.plant_id !== plantId),
        }));
      },

      clearCart: () => {
        set({ cart: [] });
      },

      getTotalItems: () => {
        return get().cart.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    })
    // {
    //   name: "plant-cart-storage", // unique name
    //   // storage: createJSONStorage(() => localStorage), // persist in localStorage
    //   partialize: (state) => ({ cart: state.cart }), // Only store cart in localStorage
    // }
  )
);

export default useCartStore;
