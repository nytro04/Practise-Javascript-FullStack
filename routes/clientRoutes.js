const express = require('express')

const {
  createClient,
  getAllClients,
  updateClient,
  deleteClient,
  getClient
} = require('../controllers/clientController')

const router = express.Router()

router.route('/').get(getAllClients).post(createClient)

router.route('/:id').get(getClient).patch(updateClient).delete(deleteClient)

module.exports = router

//API swagger documentation

/**
 * @swagger
 * components:
 *   schemas:
 *     Client:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - email
 *         - phone
 *         - providers
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: d290f1ee-6c54-4b01-90e6-d701748f0851
 *         name:
 *           type: string
 *           example: Apple Inc.
 *           description: The name of the client
 *         email:
 *           type: string
 *           example: Apple Inc.
 *           description: The email address of the client
 *         phone:
 *           type: string
 *           example: 0244444444.
 *           description: The phone number of the client
 *         providers:
 *           type: Array of provider ids
 *           example: ['607f10d9a9687a31a9508027', '607f10e7a9687a31a9508028']
 *           description: The list of clients providers
 *       example:
 *         id: d8elado02kdlouee
 *         name: Apple
 *         email: apple@email.com
 *         phone: 0244556677
 *         providers: ['607f10d9a9687a31a9508027', '607f10e7a9687a31a9508028']
 */

/**
 * @swagger
 * tags:
 *    name: Clients
 *    description: The API for managing Clients - ProTranslating
 */

/** GET - Get list of clients
 * @swagger
 * /api/v1/clients:
 *  get:
 *    summary: Returns the list of all the clients
 *    tags: [Clients]
 *    responses:
 *      200:
 *        description: The list of clients
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Client'
 *      404:
 *        description: Routes unavailable
 *      500:
 *        description: Server error
 */

/** POST - Create new Client
 * @swagger
 * /api/v1/clients:
 *  post:
 *    summary: Create a new Client
 *    tags: [Clients]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *             $ref: '#/components/schemas/Client'
 *    responses:
 *      201:
 *        description: The Client was successfully created
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Client'
 *      500:
 *        description: Server error
 */

/** GET - Get client by id
 * @swagger
 * /api/v1/clients/{id}:
 *  get:
 *    summary: Get the client by id
 *    tags: [Clients]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The client id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *             $ref: '#/components/schemas/Client'
 *    responses:
 *      200:
 *        description: The client by id
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Client'
 *      404:
 *        description: The client with {id} was not found
 *      500:
 *        description: Server error
 */

/** PATCH - Update client by id
 * @swagger
 * /api/v1/clients/{id}:
 *  patch:
 *    summary: Update client by id
 *    tags: [Clients]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The client id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/Client'
 *    responses:
 *      200:
 *        description: The client was successfully updated
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Client'
 *      404:
 *        description: The client with {id} was not found
 *      500:
 *        description: Server error
 */

/** DELETE - Delete client by id
 * @swagger
 * /api/v1/clients/{id}:
 *  delete:
 *    summary: Delete client by id
 *    tags: [Clients]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The client id
 *    responses:
 *      200:
 *        description: The client was successfully Deleted
 *      404:
 *        description: The client with {id} was not found
 *      500:
 *        description: Server error
 */
