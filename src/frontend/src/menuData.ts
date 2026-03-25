export type MenuItem = { name: string; price: number; description?: string };
export type Category = {
  id: string;
  name: string;
  image: string;
  timing: string;
  items: MenuItem[];
};

export const CATEGORIES: Category[] = [
  {
    id: "pizza",
    name: "Pizza",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop",
    timing: "All Day",
    items: [
      {
        name: "Cheese Pizza",
        price: 191,
        description: "Single cheese topping",
      },
      {
        name: "Cheese & Corn Pizza",
        price: 191,
        description: "Corn + mozzarella",
      },
      {
        name: "Cheese & Onion Pizza",
        price: 191,
        description: "Onion topping",
      },
      {
        name: "Cheese & Capsicum Pizza",
        price: 191,
        description: "Capsicum topping",
      },
      { name: "Double Cheese Pizza", price: 227, description: "Extra cheese" },
      {
        name: "Cheese & Paneer Pizza",
        price: 227,
        description: "Paneer + cheese",
      },
      { name: "Garden Fresh Pizza", price: 227, description: "Onion + corn" },
      {
        name: "Veggie Fresh Pizza",
        price: 227,
        description: "Onion + capsicum + extra cheese",
      },
      {
        name: "Spicy Tango Pizza",
        price: 311,
        description: "Corn + jalapeno + red pepper",
      },
      {
        name: "Farm Fresh Pizza",
        price: 311,
        description: "Onion, capsicum, tomato, mushroom",
      },
      {
        name: "Country Feast Pizza",
        price: 311,
        description: "Mixed fresh vegetables",
      },
      {
        name: "Wonder Pizza",
        price: 311,
        description: "Onion, capsicum, tomato + jalapeno",
      },
      {
        name: "Spicy Paneer Pizza",
        price: 359,
        description: "Paneer + capsicum + red pepper",
      },
      {
        name: "Veggie Lovers Pizza",
        price: 359,
        description: "Olives + paprika + capsicum",
      },
      {
        name: "Delicious Pizza",
        price: 359,
        description: "Onion, capsicum, corn, mushroom, paneer",
      },
      {
        name: "Three Peppers Pizza",
        price: 359,
        description: "Capsicum + jalapeno + paprika",
      },
      { name: "Rockers Pizza", price: 395, description: "Fully loaded veggie" },
      {
        name: "Cloud One Pizza",
        price: 395,
        description: "Paneer + corn + veggies",
      },
      {
        name: "Chef's Veg Special Pizza",
        price: 395,
        description: "Premium veg mix",
      },
    ],
  },
  {
    id: "7inch-pizza",
    name: "7-inch Pizza",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&h=400&fit=crop",
    timing: "All Day",
    items: [
      { name: "Tomato Pizza", price: 155 },
      { name: "Onion Pizza", price: 155 },
      { name: "Capsicum Pizza", price: 155 },
      { name: "Corn Pizza", price: 155 },
      { name: "Onion & Capsicum Pizza", price: 179 },
      { name: "Tomato & Corn Pizza", price: 179 },
      { name: "Onion & Paneer Pizza", price: 179 },
      { name: "Jalapeno & Onion Pizza", price: 179 },
    ],
  },
  {
    id: "pizza-combos",
    name: "Pizza Combos",
    image:
      "https://images.unsplash.com/photo-1555072956-7758afb20e8f?w=600&h=400&fit=crop",
    timing: "All Day",
    items: [
      {
        name: "Single Topping Set (4)",
        price: 599,
        description: "Onion + Capsicum + Tomato + Corn",
      },
      {
        name: "Double Topping Set (4)",
        price: 647,
        description: "Mixed double topping pizzas",
      },
    ],
  },
  {
    id: "pasta",
    name: "Pasta",
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&h=400&fit=crop",
    timing: "All Day",
    items: [
      { name: "Veg Red Pasta", price: 155, description: "Tomato-based" },
      {
        name: "Veg White Pasta",
        price: 155,
        description: "Creamy cheese sauce",
      },
      { name: "Mix Sauce Pasta", price: 155, description: "Red + white combo" },
    ],
  },
  {
    id: "burgers",
    name: "Burgers",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop",
    timing: "All Day",
    items: [
      { name: "Potato Burger", price: 95, description: "Basic aloo tikki" },
      {
        name: "Cheese Burger",
        price: 119,
        description: "Cheese patty + veggies",
      },
      {
        name: "Onion Capsicum Burger",
        price: 119,
        description: "Onion + capsicum",
      },
      { name: "Corn Burger", price: 119, description: "Corn + aloo tikki" },
      { name: "Paneer Burger", price: 143, description: "Paneer patty" },
      {
        name: "Double Decker Burger",
        price: 167,
        description: "Double patty + cheese",
      },
    ],
  },
  {
    id: "snacks",
    name: "Snacks",
    image:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&h=400&fit=crop",
    timing: "All Day",
    items: [
      { name: "Parcel", price: 95, description: "Paneer stuffed starter" },
      { name: "French Fries", price: 143, description: "Classic fries" },
      { name: "Peri Peri Fries", price: 167, description: "Spicy fries" },
      { name: "Garlic Bread with Cheese Dip", price: 179 },
      {
        name: "Stuffed Garlic Bread",
        price: 203,
        description: "Cheese + veggies",
      },
      {
        name: "Veg Calzone Pocket",
        price: 149,
        description: "Stuffed pizza pocket",
      },
    ],
  },
  {
    id: "sides",
    name: "Sides",
    image:
      "https://images.unsplash.com/photo-1621188988909-fbef0a88dc04?w=600&h=400&fit=crop",
    timing: "All Day",
    items: [{ name: "Jalapeno Dip", price: 40 }],
  },
  {
    id: "dessert",
    name: "Dessert",
    image:
      "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600&h=400&fit=crop",
    timing: "All Day",
    items: [{ name: "Choco Lava Cake", price: 143 }],
  },
  {
    id: "beverages",
    name: "Beverages",
    image:
      "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&h=400&fit=crop",
    timing: "All Day",
    items: [
      { name: "Cold Coffee", price: 199 },
      { name: "Blue Curacao", price: 159 },
      { name: "Kala Khatta", price: 159 },
    ],
  },
  {
    id: "milkshakes",
    name: "Milkshakes",
    image:
      "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&h=400&fit=crop",
    timing: "All Day",
    items: [
      { name: "KitKat Shake", price: 199 },
      { name: "Oreo Shake", price: 199 },
      { name: "Chocolate Shake", price: 189 },
      { name: "Strawberry Shake", price: 189 },
      { name: "Pineapple Shake", price: 189 },
    ],
  },
];
