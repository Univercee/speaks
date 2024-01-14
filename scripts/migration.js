const { db } = require('@vercel/postgres');

async function migrateUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS speaks_users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
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
    CREATE TABLE IF NOT EXISTS speaks_posts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    date DATE NOT NULL
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

  await migratePosts(client);
  await migrateUsers(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});

