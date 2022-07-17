import express from 'express';
import type { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import * as BookService from './book.service';

export const bookRouter = express.Router();

//Get: List all the books
bookRouter.get('/', async (req: Request, res: Response) => {
  try {
    const books = await BookService.listBooks();
    return res.status(200).json(books);
  } catch (err: any) {
    return res.status(500).json(err.message);
  }
});

//Get: One book
bookRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const book = await BookService.getBook(parseInt(req.params.id));
    return res.status(200).json(book);
  } catch (err: any) {
    return res.status(500).json(err.message);
  }
});

//Get: create a book
bookRouter.post(
  '/',
  body('title').isString(),
  body('authorId').isInt(),
  body('datePublished').isDate().toDate(),
  body('isFiction').isBoolean(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const newBook = await BookService.createBook(req.body);
      return res.status(201).json(newBook);
    } catch (err: any) {
      return res.status(500).json(err.message);
    }
  }
);

// PUT: Update book
bookRouter.put(
  '/:id',
  body('title').isString(),
  body('authorId').isInt(),
  body('datePublished').isDate().toDate(),
  body('isFiction').isBoolean(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id: number = parseInt(req.params.id, 10);
    try {
      const updatedBook = await BookService.updateBook(req.body, id);
      return res.status(201).json(updatedBook);
    } catch (error: any) {
      return res.status(500).json(error.message);
    }
  }
);

// DELETE: Delete book
bookRouter.delete('/:id', async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const deletedBook = await BookService.deleteBook(id);
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    return res.status(204).json(deletedBook);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});
