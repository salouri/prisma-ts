import { db } from '../utils/db.server';

export type Author = {
  id: number;
  firstName: string;
  lastName: string;
};

export const listAuthors = async (): Promise<Author[]> => {
  return db.author.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  });
};

export const getAuthor = async (id: number): Promise<Author | null> => {
  return db.author.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  });
};

export const createAuthor = async (author: Omit<Author, 'id'>): Promise<Author> => {
  const { firstName, lastName } = author;

  return db.author.create({
    data: {
      firstName,
      lastName,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  });
};

export const updateAuthor = async (
  id: number,
  author: Partial<Author>
): Promise<Author | null> => {
  return db.author.update({
    where: {
      id,
    },
    data: {
      ...author,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  });
};

//
export const deleteAuthor = async (id: number): Promise<Author | void> => {
  const goneAuthor = await db.author.delete({
    where: {
      id,
    },
  });

  if (goneAuthor) {
    return goneAuthor;
  }
};
