import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartItem } from '@/types';

interface CartState {
  items: CartItem[];
  deliveryMode: 'delivery' | 'pickup';
  couponCode: string;
  discount: number;
  tip: number;

  // Actions
  addItem: (item: CartItem) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, qty: number) => void;
  clearCart: () => void;
  setDeliveryMode: (mode: 'delivery' | 'pickup') => void;
  setCoupon: (code: string, discount: number) => void;
  setTip: (tip: number) => void;

  // Computed
  itemCount: () => number;
  subtotal: () => number;
  deliveryFee: () => number;
  total: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      deliveryMode: 'delivery',
      couponCode: '',
      discount: 0,
      tip: 0,

      addItem: (newItem) => {
        set((state) => {
          const existing = state.items.find((i) => i.key === newItem.key);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.key === newItem.key
                  ? { ...i, quantity: i.quantity + 1, totalPrice: (i.quantity + 1) * (i.sizePrice + i.extras.reduce((s, e) => s + e.price, 0)) }
                  : i
              ),
            };
          }
          return { items: [...state.items, newItem] };
        });
      },

      removeItem: (key) =>
        set((state) => ({ items: state.items.filter((i) => i.key !== key) })),

      updateQuantity: (key, qty) => {
        if (qty <= 0) {
          get().removeItem(key);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.key === key
              ? { ...i, quantity: qty, totalPrice: qty * (i.sizePrice + i.extras.reduce((s, e) => s + e.price, 0)) }
              : i
          ),
        }));
      },

      clearCart: () => set({ items: [], couponCode: '', discount: 0, tip: 0 }),

      setDeliveryMode: (mode) => set({ deliveryMode: mode }),

      setCoupon: (code, discount) => set({ couponCode: code, discount }),

      setTip: (tip) => set({ tip }),

      itemCount: () => get().items.reduce((s, i) => s + i.quantity, 0),

      subtotal: () => get().items.reduce((s, i) => s + i.totalPrice, 0),

      deliveryFee: () => 0,

      total: () => {
        const sub = get().subtotal();
        const fee = get().deliveryFee();
        const { discount, tip } = get();
        return parseFloat((sub - sub * discount + fee + tip).toFixed(2));
      },
    }),
    {
      name: 'milano-cart',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined' ? localStorage : { getItem: () => null, setItem: () => {}, removeItem: () => {} }
      ),
      skipHydration: true,
      partialize: (state) => ({
        items: state.items,
        deliveryMode: state.deliveryMode,
        couponCode: state.couponCode,
        discount: state.discount,
        tip: state.tip,
      }),
    }
  )
);
