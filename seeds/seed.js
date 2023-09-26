const sequelize = require('../config/connection');
const { User, Book } = require('../models');

const userData = require('./userData.json');
const projectData = require('./bookData.jsonn');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const book of bookData) {
    await Book.create({
      ...book,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
// project need review to change to books or something else.
