import express, { response } from 'express';
import type { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import * as AuthorService from './author.service';

export const authorRouter = express.Router();

// GET: list of all Authors
authorRouter.get('/', async (req: Request, res: Response) => {
  try {
    const authors = await AuthorService.listAuthors();
    return res.status(200).json(authors);
  } catch (err: any) {
    return res.status(500).json(err.message);
  }
});

// Get: one Author by id
authorRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const author = await AuthorService.getAuthor(parseInt(req.params.id));
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }
    return res.status(200).json(author);
  } catch (err: any) {
    return res.status(500).json(err.message);
  }
});

// POST: create a new Author
authorRouter.post(
  '/',
  body('firstName').isString(),
  body('lastName').isString(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // isEmpty() is validationResult object method, same thing .array()
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const author = await AuthorService.createAuthor(req.body);
      if (!author) {
        return res.status(424).json({ message: 'Author not created' });
      }
      return res.status(201).json(author);
    } catch (error: any) {
      return res.status(500).json(error.message);
    }
  }
);

// Put: Update a new Author
authorRouter.put('/:id', async (req: Request, res: Response) => {
  const errors: string[] = [];
  // check if firstName and lastName are strings

  if (req.body.firstName && typeof req.body.firstName != 'string') {
    errors.push('firstName must be a string');
  }
  if (req.body.lastName  && typeof req.body.lastName != 'string') {
    errors.push('lastName must be a string');
  }
  if (!req.body.lastName && !req.body.firstname) {
    errors.push('body can not be empty');
  }
  console.log(`errors: ${JSON.stringify(errors, null, 2)}`);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const author = await AuthorService.updateAuthor(
      parseInt(req.params.id),
      req.body
    );
    if (!author) {
      return res.status(424).json({ message: 'Author not updated' });
    }
    return res.status(200).json(author);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});

// Delete: Delete a new Author

authorRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const author = await AuthorService.deleteAuthor(parseInt(req.params.id));
    if (!author) {
      return res.status(404).json({ message: 'Author not deleted' });
    }
    return res.status(204).json(author);
  } catch (error: any) {
    console.log(`error: ${JSON.stringify(error, null,2) }`);
    return res.status(500).json(error.meta.cause);
  }
});
