const { db } = require('@vercel/postgres');

async function migrateUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
      DROP TABLE IF EXISTS speaks_posts;
      DROP TABLE IF EXISTS speaks_users;
      CREATE TABLE speaks_users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "speaks_users" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error('Error migrate users:', error);
    throw error;
  }
}

async function migratePosts(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
    CREATE TABLE speaks_posts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    CONSTRAINT fk_posts_users FOREIGN KEY(user_id) REFERENCES speaks_users(id)
  );
`;

    console.log(`Created "speaks_posts" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error('Error migrate invoices:', error);
    throw error;
  }
}


async function main() {
  const client = await db.connect();

  await migrateUsers(client);
  await migratePosts(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});

