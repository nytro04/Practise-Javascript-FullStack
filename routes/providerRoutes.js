const express = require('express')

const {
  createProvider,
  getAllProviders,
  getProvider,
  deleteProvider,
  updateProvider
} = require('../controllers/providerController')

const router = express.Router()

//Routes for '/'
router.route('/').get(getAllProviders).post(createProvider)

// routes for :id
router
  .route('/:id')
  .get(getProvider)
  .delete(deleteProvider)
  .patch(updateProvider)

module.exports = router

//API swagger documentation

/**
 * @swagger
 * components:
 *   schemas:
 *     Provider:
 *       type: object
 *       required:
 *         - id
 *         - name

 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: d290f1ee-6c54-4b01-90e6-d701748f0851
 *         name:
 *           type: string
 *           example: Apple Inc.
 *           description: The name of the provider

 *       example:
 *         id: d8elado02kdlouee
 *         name: Algolia
 */

/**
 * @swagger
 * tags:
 *    name: Provider
 *    description: The API for managing Providers
 */

/** GET - Get list of providers
 * @swagger
 * /api/v1/providers:
 *  get:
 *    summary: Returns the list of all the providers
 *    tags: [Providers]
 *    responses:
 *      200:
 *        description: The list of providers
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Provider'
 *      404:
 *        description: Routes unavailable
 *      500:
 *        description: Server error
 */

/** POST - Create new Provider
 * @swagger
 * /api/v1/providers:
 *  post:
 *    summary: Create a new Provider
 *    tags: [Providers]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *             $ref: '#/components/schemas/Provider'
 *    responses:
 *      201:
 *        description: The Provider was successfully created
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Provider'
 *      500:
 *        description: Server error
 */

/** GET - Get Provider by id
 * @swagger
 * /api/v1/providers/{id}:
 *  get:
 *    summary: Get the Provider by id
 *    tags: [Providers]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The Provider id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *             $ref: '#/components/schemas/Provider'
 *    responses:
 *      200:
 *        description: The Provider by id
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Provider'
 *      404:
 *        description: The Provider with {id} was not found
 *      500:
 *        description: Server error
 */

/** PATCH - Update Provider by id
 * @swagger
 * /api/v1/providers/{id}:
 *  patch:
 *    summary: Update Provider by id
 *    tags: [Providers]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The Provider id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/Provider'
 *    responses:
 *      200:
 *        description: The Provider was successfully updated
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Provider'
 *      404:
 *        description: The Provider with {id} was not found
 *      500:
 *        description: Server error
 */

/** DELETE - Delete Provider by id
 * @swagger
 * /api/v1/providers/{id}:
 *  delete:
 *    summary: Delete Provider by id
 *    tags: [Providers]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The Provider id
 *    responses:
 *      200:
 *        description: The Provider was successfully Deleted
 *      404:
 *        description: The Provider with {id} was not found
 *      500:
 *        description: Server error
 */
