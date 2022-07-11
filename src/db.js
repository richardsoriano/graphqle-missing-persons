const posts = [
  {
    id: "10",
    title: "Thor: Love and Thunder",
    body: "a new Marvel directed by Taika Waititi. Written by Taika Waititi, Jennifer Kaytin Robinson, Stan Lee ",
    published: true,
    author: "1",
  },
  {
    id: "11",
    title: "Spider-Man: No Way Home",
    body: "With Spider-Mans identity now revealed, Peter asks Doctor Strange for help",
    published: true,
    author: "1",
  },
  {
    id: "12",
    title: "The Eternals",
    body: "The saga of the Eternals, a race of immortal beings who lived on Earth and shaped its history and civlizations",
    published: true,
    author: "1",
  },
  {
    id: "13",
    title: "Avengers: Endgame",
    body: "AFter the dvastating events of Avengers: Infinity War",
    published: false,
    author: "3",
  },
]

const users = [
  {
    id: "1",
    name: "Big Foot",
    email: "big@cats.com",
    age: 3,
  },
  {
    id: "2",
    name: "Little Paw",
    email: "little@cats.com",
    age: 3,
  },
  {
    id: "3",
    name: "The Joker",
    email: "wilson@cats.com",
    age: 6,
  },
]
const comments = [
  {
    id: "101",
    text: "Avengers Infinity War is the best",
    author: "1",
    post: "10",
  },
  {
    id: "102",
    text: "Doctor Strange kicks butt",
    author: "2",
    post: "11",
  },
  {
    id: "103",
    text: "I wonder if theres Eternals 2.0?",
    author: "1",
    post: "11",
  },
  {
    id: "104",
    text: "Hawkeye starring Kate Bishop, with special guest Hawkeye ",
    author: "1",
    post: "11",
  },
]

const db = {
  comments,
  users,
  posts,
}

export { db as default }
