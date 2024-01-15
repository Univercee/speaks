const { db } = require('@vercel/postgres');
const bcrypt = require('bcryptjs');
const {users, posts} = require('../app/lib/placeholder-data.js')

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const insertedUsers = await Promise.all(
        users.map(async (user) => {
          const hashedPassword = await bcrypt.hash(user.password, 10);
          return client.sql`
          INSERT INTO speaks_users (id, email, password)
          VALUES (${user.id}, ${user.email}, ${hashedPassword})
          ON CONFLICT (id) DO NOTHING;
        `;
        }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
        insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedPosts(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const insertedPosts = await Promise.all(
        posts.map(async (post) => {
          return client.sql`
          INSERT INTO speaks_posts (user_id, title, description, date)
          VALUES (${post.user_id}, ${post.title}, ${post.description}, ${post.date})
          ON CONFLICT (id) DO NOTHING;
        `;
        }),
    );

    console.log(`Seeded ${insertedPosts.length} posts`);

    return {
        insertedPosts,
    };
  } catch (error) {
    console.error('Error seeding posts:', error);
    throw error;
  }
}


async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedPosts(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});

