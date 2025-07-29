// Import the 'create' function from the 'zustand' library to create a store.
import { create } from "zustand";

/**
 * Compares two arrays of customizations to see if they are identical, ignoring order.
 * @param {Array} a - The first array of customizations. Defaults to an empty array.
 * @param {Array} b - The second array of customizations. Defaults to an empty array.
 * @returns {boolean} - True if the customizations are the same, false otherwise.
 */
function areCustomizationsEqual(a = [], b = []) {
  // If the number of customizations is different, they can't be equal.
  if (a.length !== b.length) return false;

  // Create a sorted copy of the first customizations array based on item ID.
  const aSorted = [...a].sort((x, y) => x.id.localeCompare(y.id));
  // Create a sorted copy of the second customizations array based on item ID.
  const bSorted = [...b].sort((x, y) => x.id.localeCompare(y.id));

  // Check if every item in the sorted 'a' array has a matching ID at the same position in the sorted 'b' array.
  return aSorted.every((item, idx) => item.id === bSorted[idx].id);
}

// Create the Zustand store for the shopping cart.
export const useCartStore = create((set, get) => ({
  // The array that will hold all items in the cart.
  items: [],

  // Action to add a new item to the cart or increase its quantity if it already exists.
  addItem: (item) => {
    // Get the current state of the cart items.
    const currentItems = get().items;
    // Ensure customizations is an array, even if it's undefined on the incoming item.
    const customizations = item.customizations ?? [];

    // Find the index of an existing item in the cart that matches the new item's ID and customizations.
    const existingItemIndex = currentItems.findIndex(
      (i) =>
        // Check if the item ID matches.
        i.id === item.id &&
        // Check if the customizations are identical.
        areCustomizationsEqual(i.customizations, customizations)
    );

    // If a matching item is found in the cart (index is not -1).
    if (existingItemIndex > -1) {
      // Create a new array by mapping over the current items.
      const updatedItems = currentItems.map((i, index) =>
        // If the current item is the one we want to update.
        index === existingItemIndex
          // Create a new object for the item with its quantity increased by 1.
          ? { ...i, quantity: i.quantity + 1 }
          // Otherwise, return the item as is.
          : i
      );
      // Update the state with the new items array.
      set({ items: updatedItems });
    } else {
      // If the item is not in the cart, add it as a new entry.
      // Update the state by creating a new array with the old items plus the new one, with quantity set to 1.
      set({ items: [...currentItems, { ...item, quantity: 1, customizations }] });
    }
  },

  // Action to completely remove an item from the cart, identified by its ID and customizations.
  removeItem: (id, customizations = []) => {
    // Update the state by filtering the items array.
    set({
      // The new items array will contain only the items that do NOT match the given id and customizations.
      items: get().items.filter(
        (i) =>
          // The filter condition: returns true for items to keep.
          !(
            // Check if the item ID matches.
            i.id === id &&
            // Check if the customizations are identical.
            areCustomizationsEqual(i.customizations, customizations)
          )
      ),
    });
  },

  // Action to increase the quantity of a specific item in the cart.
  increaseQty: (id, customizations = []) => {
    // Update the state by mapping over the items array.
    set({
      // Create a new array with the updated quantities.
      items: get().items.map((i) =>
        // If the current item in the map matches the target id and customizations.
        i.id === id && areCustomizationsEqual(i.customizations, customizations)
          // Return a new object for this item with the quantity incremented.
          ? { ...i, quantity: i.quantity + 1 }
          // Otherwise, return the item unchanged.
          : i
      ),
    });
  },

  // Action to decrease the quantity of a specific item, removing it if quantity becomes 0.
  decreaseQty: (id, customizations = []) => {
    // Update the state.
    set({
      // The final items array is the result of a map followed by a filter.
      items: get()
        .items.map((i) =>
          // If the current item in the map matches the target id and customizations.
          i.id === id && areCustomizationsEqual(i.customizations, customizations)
            // Return a new object for this item with the quantity decremented.
            ? { ...i, quantity: i.quantity - 1 }
            // Otherwise, return the item unchanged.
            : i
        )
        // After mapping, filter out any items whose quantity has dropped to 0 or less.
        .filter((i) => i.quantity > 0),
    });
  },

  // Action to remove all items from the cart.
  clearCart: () => set({ items: [] }),

  // Selector to get the total number of individual items in the cart.
  getTotalItems: () =>
    // Access the current items array.
    get().items.reduce(
      // Use reduce to sum up the quantities of all items.
      (total, item) => total + item.quantity,
      // The starting value for the total is 0.
      0
    ),

  // Selector to calculate the total price of all items in the cart, including customizations.
  getTotalPrice: () =>
    // Access the current items array.
    get().items.reduce((total, item) => {
      // Get the base price of the item.
      const basePrice = item.price;
      // Calculate the total price of all customizations for this item.
      const customPrice =
        // If customizations exist, reduce them to a single price value.
        item.customizations?.reduce((sum, c) => sum + c.price, 0) ?? 0;
      // Add the price of the current item stack (item price + customizations price) * quantity to the total.
      return total + item.quantity * (basePrice + customPrice);
      // The starting value for the total is 0.
    }, 0),
}));
