// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    login: 'admin',
    password: 'admin',
  },
];

const posts = [
  {
    user_id: users[0].id,
    title: 'test_1',
    description: 'this is a test post',
    date: '2023-12-06',
  },
  {
    user_id: users[0].id,
    title: 'test_2',
    description: 'this is a test post',
    date: '2023-11-14',
  },
  {
    user_id: users[0].id,
    title: 'test_3',
    description: 'this is a test post',
    date: '2023-10-29',
  }
];

module.exports = {
  users,
  posts
};
