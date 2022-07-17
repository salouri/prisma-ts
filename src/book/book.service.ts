import { db } from '../utils/db.server';
import type { Author } from '../author/author.service';
import { bookRouter } from './book.router';

type BookRead = {
  id: number;
  title: string;
  datePublished: Date;
  isFiction: boolean;
  author: Author;
  //   authorId: number,
};

export const listBooks = async (): Promise<BookRead[]> => {
  return db.book.findMany({
    select: {
      id: true,
      title: true,
      datePublished: true,
      isFiction: true,
      //   authorId: true,
      author: {
        select: { id: true, firstName: true, lastName: true },
      },
    },
  });
};

export const getBook = async (id: number): Promise<BookRead | null> => {
  return db.book.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      datePublished: true,
      isFiction: true,
      authorId: true,
      author: {
        select: { id: true, firstName: true, lastName: true },
      },
    },
  });
};

type BookWrite = {
  title: string;
  datePublished: Date;
  isFiction: boolean;
  authorId: number;
};

export const createBook = async (book: BookWrite): Promise<BookRead> => {
  const { title, datePublished, isFiction, authorId } = book;

  return db.book.create({
    data: {
      title,
      datePublished: new Date(datePublished),
      isFiction,
      authorId,
    },
    select: {
      id: true,
      title: true,
      datePublished: true,
      isFiction: true,
      author: {
        select: { id: true, firstName: true, lastName: true },
      },
    },
  });
};

export const updateBook = async (book: BookWrite, id: number): Promise<BookRead> => {
  const { title, datePublished, isFiction, authorId } = book;

  return db.book.update({
    where: { id },
    data: {
      title,
      datePublished: new Date(datePublished),
      isFiction,
      authorId,
    },
    select: {
      id: true,
      title: true,
      datePublished: true,
      isFiction: true,
      author: {
        select: { id: true, firstName: true, lastName: true },
      },
    },
  });
};

// type BookDelete = Omit<BookRead, 'author'>;

export const deleteBook = async (id: number): Promise<BookWrite | void> => {
  const goneBook = await db.book.delete({
    where: { id },
  });

  if (goneBook) {
    return goneBook;
  }
};
