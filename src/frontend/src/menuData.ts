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
      { name: "Onino Capsicum Pizza", price: 219 },
      { name: "Plain Margarita", price: 209 },
      { name: "Fresh Veggie Pizza", price: 229 },
      { name: "Corn & Cheese Pizza", price: 229 },
      { name: "Veg. Cheese Burst Pizza", price: 259 },
      { name: "Paneer Tikka Pizza", price: 289 },
      { name: "Tandoori Chaap Pizza", price: 279 },
    ],
  },
  {
    id: "sandwiches",
    name: "Sandwiches",
    image:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&h=400&fit=crop",
    timing: "All Day",
    items: [
      { name: "Grilled Veg. Cheese Sandwich", price: 120 },
      { name: "Tandoori Paneer Cheese Sandwich", price: 130 },
      { name: "Tandoori Paneer Cheese Sandwich (Open)", price: 150 },
      { name: "Bombay Sandwich", price: 150 },
      { name: "Club Sandwich", price: 160 },
    ],
  },
  {
    id: "momos",
    name: "Momos",
    image:
      "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=600&h=400&fit=crop",
    timing: "All Day",
    items: [
      { name: "Steam Veg. Momos", price: 109 },
      { name: "Steam Paneer Momos", price: 129 },
      { name: "Fried Veg. Momos", price: 119 },
      { name: "Crispy Momos Veg", price: 129 },
      { name: "Fried Paneer Momos", price: 139 },
      { name: "Crispy Momos Paneer", price: 149 },
    ],
  },
  {
    id: "chinese-starters",
    name: "Chinese Starters",
    image:
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&h=400&fit=crop",
    timing: "All Day",
    items: [
      { name: "Chilli Paneer Dry", price: 249 },
      { name: "Honey Chilli Patato", price: 159 },
      { name: "Veg Manchurian Dry", price: 209 },
      { name: "Crispy Salt & Pepper", price: 180 },
      { name: "Dragon Paneer", price: 249 },
      { name: "Mushroom Funky", price: 249 },
      { name: "Chilli Patato", price: 149 },
      { name: "Chilli Mushroom", price: 249 },
      { name: "Chilli Paneer Combo (Rice / Noodles)", price: 259 },
      { name: "Corn Chilli", price: 139 },
      { name: "Baby Corn Crispy", price: 199 },
      { name: "Chilli Garlic Rice", price: 199 },
    ],
  },
  {
    id: "pasta",
    name: "Pasta",
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&h=400&fit=crop",
    timing: "All Day",
    items: [
      { name: "Red Sauce Pasta", price: 149 },
      { name: "White Sauce Pasta", price: 149 },
      { name: "Mix Sauce Pasta", price: 159 },
    ],
  },
  {
    id: "burgers",
    name: "Burgers",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop",
    timing: "All Day",
    items: [
      { name: "Veg Burger", price: 74 },
      { name: "Aloo Tikki Burger", price: 84 },
      { name: "Crispy Veg Burger", price: 99 },
      { name: "Paneer Burger", price: 99 },
      { name: "Paneer Cheese Burger", price: 109 },
      { name: "Veg Cheese Burger", price: 129 },
    ],
  },
  {
    id: "burgers-combo",
    name: "Burgers Combo",
    image:
      "https://images.unsplash.com/photo-1550317138-10000687a72b?w=600&h=400&fit=crop",
    timing: "All Day",
    items: [
      {
        name: "Veg Burger + Fries + S. Drink",
        price: 139,
        description: "Combo meal",
      },
      {
        name: "Aloo Tikki Burger + Fries + S. Drink",
        price: 149,
        description: "Combo meal",
      },
      {
        name: "Veg Cheese Burger + Fries + S. Drink",
        price: 149,
        description: "Combo meal",
      },
      {
        name: "Crispy Veg Burger + Fries + S. Drink",
        price: 149,
        description: "Combo meal",
      },
      {
        name: "Paneer Burger + Fries + S. Drink",
        price: 159,
        description: "Combo meal",
      },
      {
        name: "Paneer Cheese Burger + Fries + S. Drink",
        price: 169,
        description: "Combo meal",
      },
    ],
  },
  {
    id: "continental-sides",
    name: "Continental Sides",
    image:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&h=400&fit=crop",
    timing: "All Day",
    items: [
      { name: "French Fries", price: 110 },
      { name: "Peri Peri Fries", price: 119 },
      { name: "Cheese Garlic Bread", price: 119 },
    ],
  },
  {
    id: "soup",
    name: "Soup",
    image:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop",
    timing: "All Day",
    items: [
      { name: "Hot & Sour Soup", price: 104 },
      { name: "Veg. Manchow Soup", price: 117 },
      { name: "Tomato Soup", price: 128 },
      { name: "Tail Man Soup", price: 104 },
      { name: "Lemon Coriander Soup", price: 130 },
      { name: "Sweet Corn Soup", price: 104 },
    ],
  },
  {
    id: "roll",
    name: "Roll",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&h=400&fit=crop",
    timing: "All Day",
    items: [
      { name: "Veg Spring Roll", price: 129 },
      { name: "Curd Garlic Roll", price: 149 },
    ],
  },
];
