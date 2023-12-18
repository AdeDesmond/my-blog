"use strict";

//am just storing some queries

//***-------------Users with the highest 3 ids -----------------**** */
//select * from users order by id DESC limit(3)//
/*

SELECT username, caption FROM users JOIN posts ON posts.user_id = users.id  WHERE users.id = 200

SELECT *
FROM users
JOIN posts ON posts.user_id = users.id
WHERE users.id = 200

//selecting the likes for each users and then tagging 
SELECT username, COUNT(*)
FROM users
JOIN likes ON likes.user_id = users.id
GROUP BY users.username

//
SELECT username, tags.created_at
FROM users
JOIN(
	SELECT user_id, created_at FROM caption_tags
	UNION ALL
	SELECT user_id, created_at FROM photo_tags
) AS tags ON tags.user_id = users.id
WHERE tags.created_at < '2010-01-07'

//This query is the same as the one above;
WITH tags AS (
	SELECT user_id, created_at FROM caption_tags
	UNION ALL
	SELECT user_id, created_at FROM photo_tags

)
SELECT username, tags.created_at
FROM users
JOIN tags ON tags.user_id = users.id
WHERE tags.created_at < '2010-01-07'

// views are like virtual table and we can create a view ahead of time, so it like a fake table
// a view is a query that we wrap up and use later
***** notes on vies****
CREATE VIEW tags AS (
	SELECT id, created_at, user_id, post_id, 'photo_tag' AS type FROM photo_tags
	UNION ALL 
	SELECT id, created_at, user_id, post_id, 'caption_tag' AS type FROM caption_tags

);

SELECT * FROM tags WHERE type = 'caption_tag'

SELECT username COUNT(*)
FROM users 
JOIN tags ON tags.user_id = users.id
GROUP BY username
ORDER BY COUNT(*) DESC 

***** view for 10 most recent post ***************

CREATE VIEW recent_posts AS (
	SELECT *
	FROM posts
	ORDER BY created_at DESC
	LIMIT 10

);

SELECT * 
FROM recent_posts
JOIN users ON users.id = recent_posts.user_id

********* deleting and changing views ****************
CREATE OR REPLACE VIEW recent_posts AS (
	SELECT * FROM posts order by created_at DESC LIMIT 15
);

DROP VIEW recent_posts

*********  Materialised Views  *********************
// materialised views are queries that we can set for it to be use later, so we can always get the result of the query without running
// the whole query. 


CREATE MATERIALIZED VIEW weekly_likes AS (
	SELECT date_trunc('week', COALESCE(posts.created_at, comments.created_at)) AS week, COUNT(posts.id) as num_likes_for_posts, count(comments.id) as num_likes_for_comments
FROM likes
LEFT JOIN posts ON posts.id = likes.post_id
LEFT JOIN comments ON comments.id = likes.comment_id
GROUP BY week
ORDER BY week
) WITH DATA;

**----> the WITH DATA clause here means that posgress should hold on to the results of this query

**----> REFRESH MATERIALIZED VIEW weekly_likes , we use this query to refresh the data in our postgres db





// the coalesce will look at our query and give us the first non null values
//the date_trunc is build into postgres and we can use that to get some specific dates values
SELECT date_trunc('week', COALESCE(posts.created_at, comments.created_at)) AS week
FROM likes
LEFT JOIN posts ON posts.id = likes.post_id
LEFT JOIN comments ON comments.id = likes.comment_id


SELECT date_trunc('week', COALESCE(posts.created_at, comments.created_at)) AS week, COUNT(posts.id) as num_likes_for_posts, count(comments.id) as num_likes_for_comments
FROM likes
LEFT JOIN posts ON posts.id = likes.post_id
LEFT JOIN comments ON comments.id = likes.comment_id
GROUP BY week
ORDER BY week


//TRANSACTIONS

some sample data inserted
INSERT INTO account (name, balance)
VALUES ( 'GIA', 100 ),
('Alyson', 100);

some sample data updated
UPDATE account
SET balance = balance -50
WHERE name = 'GIA'

********---------**** Opening and closing transaction ****--------**************
***----> Opening Transaction
we open a transaction in postgres by using the BEGIN; keyword
we can make sure a transaction is the same across different connections by using the COMMIT; keyword
we can use a ROLLBACK keywords; to go back to a previous condition

//SCHEMA MIGRATION





//MAKING CHANGES to tables 
renaming column
ALTER TABLE comments
RENAME COLUMN contents TO body


To to use for connection
Update the schema.prisma file to look like the following
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "cockroachdb"
  url      = env("DATABASE_URL")
}

model Widget {
  id String @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
}


const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

(async () => {
  try {
    console.log(await prisma.widget.create({ data: { } }));
  } catch (err) {
    console.error("error executing query:", err);
  } finally {
    prisma.$disconnect();
  }
})();


database connections string
export DATABASE_URL="postgresql://desmondade1993:JiIq5xt8jqtRPIGEaUqcPw@my-blog-7649.8nk.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full"

**************************************load more button ******************************************
import { useState } from 'react';

// Sample data
const initialItems = [
  'Item 1',
  'Item 2',
  'Item 3',
  'Item 4',
  'Item 5',
  'Item 6',
  'Item 7',
  'Item 8',
  'Item 9',
  'Item 10',
];

const Home = () => {
  const [visibleItems, setVisibleItems] = useState<string[]>(initialItems.slice(0, 3)); // Show 3 items initially

  const loadMoreItems = () => {
    const remainingItems = initialItems.slice(visibleItems.length, visibleItems.length + 3); // Load 3 more items
    setVisibleItems(prevItems => [...prevItems, ...remainingItems]);
  };

  return (
    <div>
      <ul>
        {visibleItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button onClick={loadMoreItems}>Load More</button>
    </div>
  );
};

export default Home;

The Colorful World of Parrots: Exploring Their Fascinating Biography

Unveiling the Marvels of Parrot Species Across the Globe

Parrots, with their vibrant plumage and charismatic personalities, captivate hearts worldwide. These avian wonders belong to the Psittaciformes order, encompassing over 390 species, each boasting distinct colors, behaviors, and vocal abilities.

Diversity in Appearance
From the brilliant scarlet macaw to the tiny budgerigar, parrots display a kaleidoscope of hues. Their feathers, a canvas of reds, greens, blues, and yellows, not only serve as camouflage but also attract mates and establish species identity.

Sociable Creatures
Renowned for their intelligence and social nature, parrots thrive in flocks, exhibiting complex communication patterns. Their ability to mimic sounds and human speech astounds researchers, fostering deep connections between these birds and humans.



*/
