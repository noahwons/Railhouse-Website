const express = require('express');
const router = express.Router();

const menuData = {
  wings: [
    { id: 1, name: 'Classic Buffalo Wings', description: 'Crispy wings tossed in our signature buffalo sauce', price: 14.99, sizes: ['6 pc', '12 pc', '24 pc'] },
    { id: 2, name: 'BBQ Smoked Wings', description: 'Slow-smoked and glazed with house BBQ sauce', price: 14.99, sizes: ['6 pc', '12 pc', '24 pc'] },
    { id: 3, name: 'Honey Garlic Wings', description: 'Sweet honey garlic glaze with a hint of heat', price: 14.99, sizes: ['6 pc', '12 pc', '24 pc'] },
    { id: 4, name: 'Lemon Pepper Wings', description: 'Zesty lemon pepper dry rub, crispy and bold', price: 14.99, sizes: ['6 pc', '12 pc', '24 pc'] },
    { id: 5, name: 'Nashville Hot Wings', description: 'Extra spicy Nashville-style with pickles', price: 15.99, sizes: ['6 pc', '12 pc', '24 pc'] },
  ],
  appetizers: [
    { id: 6, name: 'Loaded Nachos', description: 'House chips with queso, jalapeños, sour cream, pico de gallo', price: 12.99 },
    { id: 7, name: 'Mozzarella Sticks', description: 'Golden fried, served with marinara', price: 9.99 },
    { id: 8, name: 'Fried Pickles', description: 'Southern-style battered pickles with ranch dipping sauce', price: 8.99 },
    { id: 9, name: 'Onion Rings', description: 'Beer-battered thick-cut onion rings', price: 8.99 },
  ],
  burgers: [
    { id: 10, name: 'Railhouse Classic', description: 'Half-pound beef patty, lettuce, tomato, onion, pickles', price: 13.99 },
    { id: 11, name: 'BBQ Bacon Burger', description: 'Smoked bacon, cheddar, BBQ sauce, crispy onions', price: 15.99 },
    { id: 12, name: 'Mushroom Swiss Burger', description: 'Sautéed mushrooms, Swiss cheese, garlic aioli', price: 14.99 },
    { id: 13, name: 'Spicy Jalapeño Burger', description: 'Fresh jalapeños, pepper jack, chipotle mayo', price: 14.99 },
  ],
  drinks: [
    { id: 14, name: 'Domestic Beer', description: 'Ask your server for current selection', price: 4.00 },
    { id: 15, name: 'Craft Beer', description: 'Rotating local and craft selections', price: 6.00 },
    { id: 16, name: 'House Cocktails', description: 'Ask your bartender for today\'s specials', price: 8.00 },
    { id: 17, name: 'Soft Drinks', description: 'Pepsi products, lemonade, iced tea', price: 3.00 },
  ],
};

router.get('/', (req, res) => {
  res.json(menuData);
});

router.get('/:category', (req, res) => {
  const { category } = req.params;
  if (menuData[category]) {
    res.json(menuData[category]);
  } else {
    res.status(404).json({ error: 'Category not found' });
  }
});

module.exports = router;
