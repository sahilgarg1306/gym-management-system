const bcrypt = require('bcryptjs');

async function generateHash() {
  const hash = await bcrypt.hash('instructor1234', 10);
  console.log(hash);
}

generateHash();