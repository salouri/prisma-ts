import { db } from '../src/utils/db.server';

type Author = {
  firstName: string;
  lastName: string;
};

type Book = {
  title: string;
  isFiction: boolean;
  datePublished: Date;
};

function getAuthors(): Array<Author> {
  // or Author[]
  return [
    {
      firstName: 'John',
      lastName: 'Doe',
    },
    {
      firstName: 'Jane',
      lastName: 'Doe',
    },
    {
      firstName: 'Yubal Noah',
      lastName: 'James',
    },
  ];
}

function getBooks(): Array<Book> {
  return [
    {
      title: 'Sapiens',
      isFiction: false,
      datePublished: new Date(),
    },
    {
      title: 'Homo Deus',
      isFiction: false,
      datePublished: new Date(),
    },
    {
      title: 'The Ugly Duckling',
      isFiction: true,
      datePublished: new Date(),
    },
  ];
}

async function seed() {
  await Promise.all(
    getAuthors().map((author) => {
      return db.author.create({
        data: {
          firstName: author.firstName,
          lastName: author.lastName,
        },
      }); // end create
    }) // end of map
  ); // end of Promise.all

  const author = await db.author.findFirst({
    where: {
      firstName: 'Yubal Noah',
    },
  });

  await Promise.all(
    getBooks().map((book) => {
      const { title, isFiction, datePublished } = book;

      return db.book.create({
        data: {
          title,
          isFiction,
          datePublished,
          authorId: author.id,
        },
      }); // end create
    }) // end of map
  ); // end of Promise.all
} // end of seed()

seed();
