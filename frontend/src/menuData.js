const menuData = [
  {
    category: "Starters",
    items: [
      {
        id: 1,
        name: "Paneer Tikka",
        description: "Grilled paneer cubes marinated in spices",
        price: 180,
        veg: true,
        image: "/images/paneer tikka.jpg"
      },
      {
        id: 2,
        name: "Chicken 65",
        description: "Spicy deep-fried chicken bites",
        price: 200,
        veg: false,
        image: "/images/chicken 65.jpg"
      },
      {
        id: 3,
        name: "Veg Manchurian",
        description: "Fried vegetable balls in spicy Indo-Chinese sauce",
        price: 160,
        veg: true,
        image: "/images/veg-manchurian.jpg"
      }
    ]
  },

  {
    category: "Main Course",
    items: [
      {
        id: 4,
        name: "Butter Chicken",
        description: "Creamy tomato-based chicken curry",
        price: 250,
        veg: false,
        image: "/images/Butter Chicken.jpg"
      },
      {
        id: 5,
        name: "Paneer Butter Masala",
        description: "Paneer cubes in a rich buttery gravy",
        price: 220,
        veg: true,
        image: "/images/Paneer Butter Masal.jpg"
      },
      {
        id: 6,
        name: "Veg Kolhapuri",
        description: "Spicy mixed vegetable curry from Maharashtra",
        price: 190,
        veg: true,
        image: "/images/Veg-Kolhapuri.jpg"
      }
    ]
  },

  {
    category: "Breads",
    items: [
      {
        id: 7,
        name: "Butter Naan",
        description: "Soft tandoori naan brushed with butter",
        price: 40,
        veg: true,
        image: "/images/butter-naan.jpg"
      },
      {
        id: 8,
        name: "Tandoori Roti",
        description: "Whole wheat roti cooked in tandoor",
        price: 30,
        veg: true,
        image: "/images/tandoori-roti.jpg"
      },
      {
        id: 9,
        name: "Stuffed Paratha",
        description: "Paratha stuffed with spiced potato filling",
        price: 50,
        veg: true,
        image: "/images/stuffed-paratha.jpg"
      }
    ]
  },

  {
    category: "Rice & Biryani",
    items: [
      {
        id: 10,
        name: "Veg Biryani",
        description: "Aromatic basmati rice cooked with vegetables and spices",
        price: 180,
        veg: true,
        image: "/images/veg-biryani.jpg"
      },
      {
        id: 11,
        name: "Chicken Biryani",
        description: "Fragrant rice cooked with spiced chicken",
        price: 220,
        veg: false,
        image: "/images/chicken-biryani.jpg"
      },
      {
        id: 12,
        name: "Jeera Rice",
        description: "Simple cumin-flavored basmati rice",
        price: 100,
        veg: true,
        image: "/images/jeera-rice.jpg"
      }
    ]
  },

  {
    category: "Desserts",
    items: [
      {
        id: 13,
        name: "Gulab Jamun",
        description: "Soft milk-solid balls soaked in sugar syrup",
        price: 60,
        veg: true,
        image: "/images/gulab-jamun.jpg"
      },
      {
        id: 14,
        name: "Rasgulla",
        description: "Spongy white balls soaked in light syrup",
        price: 60,
        veg: true,
        image: "/images/rasgulla.jpg"
      },
      {
        id: 15,
        name: "Kulfi",
        description: "Traditional Indian frozen dessert",
        price: 80,
        veg: true,
        image: "/images/kulfi.jpg"
      }
    ]
  },

  {
    category: "Beverages",
    items: [
      {
        id: 16,
        name: "Masala Chai",
        description: "Spiced Indian tea with milk",
        price: 25,
        veg: true,
        image: "/images/masala-chai.jpg"
      },
      {
        id: 17,
        name: "Sweet Lassi",
        description: "Refreshing yogurt-based drink",
        price: 40,
        veg: true,
        image: "/images/sweet-lassi.jpg"
      },
      {
        id: 18,
        name: "Cold Coffee",
        description: "Chilled coffee with milk and ice cream",
        price: 70,
        veg: true,
        image: "/images/cold-coffee.jpg"
      }
    ]
  }
];

export default menuData;
