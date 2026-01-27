# Task: Shopping Cart State Management

## Objective
Build a comprehensive shopping cart with Redux Toolkit including complex state logic.

## Requirements

1. **Cart Operations**
   - Add to cart (with variants)
   - Update quantity
   - Remove item
   - Clear cart

2. **Advanced Features**
   - Product variants (size, color)
   - Quantity limits (stock check)
   - Saved items / wishlist
   - Recently viewed

3. **Pricing**
   - Dynamic pricing updates
   - Coupon codes
   - Shipping calculation
   - Tax calculation

4. **Persistence**
   - Local storage sync
   - Merge on login
   - Handle expired items

## Redux Structure
```typescript
interface CartState {
  items: CartItem[];
  savedItems: CartItem[];
  coupon: Coupon | null;
  shipping: ShippingOption | null;
}
```

## Files to Create
- `store/cartSlice.ts` - Cart slice
- `store/selectors.ts` - Memoized selectors
- `components/Cart/CartProvider.tsx` - Provider
- `components/Cart/CartItem.tsx` - Item component
- `hooks/useCart.ts` - Cart hook

## Success Criteria
- [ ] Add/remove/update works
- [ ] Variants handled correctly
- [ ] Coupons apply correctly
- [ ] Totals calculate correctly
- [ ] Persists across sessions
