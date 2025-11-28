/**
 * @openapi
 * tags:
 *   name: Books
 *   description: API for managing books in the system
 */

/**
 * @openapi
 * /books:
 *   get:
 *     summary: Get a list of books with pagination, search and sorting
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by title or author
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           default: createdAt
 *         description: Field to sort by
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Sort order
 *     responses:
 *       200:
 *         description: List of books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 books:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
 *                 results:
 *                   type: integer
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 */

/**
 * @openapi
 * /books/{id}:
 *   get:
 *     summary: Get details of a single book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 */

/**
 * @openapi
 * /books:
 *   post:
 *     summary: Create a new book (authenticated users only)
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               description:
 *                 type: string
 *               publishedYear:
 *                 type: integer
 *               category:
 *                 type: string
 *                 enum: [fiction, non-fiction, history, technology, education, other]
 *               state:
 *                 type: string
 *                 enum: [available, reserved]
 *             example:
 *               title: The Pragmatic Programmer
 *               author: Andrew Hunt
 *               description: A classic book for software developers
 *               publishedYear: 1999
 *               category: technology
 *               state: available
 *     responses:
 *       201:
 *         description: Book created successfully
 *       400:
 *         description: Validation error or book already exists
 */

/**
 * @openapi
 * /books/{id}:
 *   put:
 *     summary: Update a book by ID (authenticated users only)
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               description:
 *                 type: string
 *               publishedYear:
 *                 type: integer
 *               category:
 *                 type: string
 *                 enum: [fiction, non-fiction, history, technology, education, other]
 *               state:
 *                 type: string
 *                 enum: [available, reserved]
 *     responses:
 *       200:
 *         description: Updated book
 *       404:
 *         description: Book not found
 *       409:
 *         description: Another book with the same title and author already exists
 */

/**
 * @openapi
 * /books/{id}:
 *   delete:
 *     summary: Delete a book by ID (authenticated users only)
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         author:
 *           type: string
 *         description:
 *           type: string
 *         publishedYear:
 *           type: integer
 *         category:
 *           type: string
 *           enum: [fiction, non-fiction, history, technology, education, other]
 *         state:
 *           type: string
 *           enum: [available, reserved]
 *         createdBy:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             name:
 *               type: string
 *             email:
 *               type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
