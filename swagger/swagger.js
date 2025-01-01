const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Inventory System API',
            version: '1.0.0',
            description: `
        Esta API permite gestionar un sistema de inventarios, proporcionando funcionalidades 
        para consultar, crear, actualizar y eliminar productos. Cada producto tiene los siguientes atributos:
        - **id**: Identificador único del producto.
        - **name**: Nombre del producto.
        - **description**: Descripción detallada del producto.
        - **price**: Precio del producto.
        - **quantity**: Cantidad disponible en inventario.
      `,
            contact: {
                name: 'Nicolas Andrade Perdomo',
                email: 'niko.andrade.p@gmail.com',
            },
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor local',
            },
        ],
        components: {
            schemas: {
                Product: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1,
                            description: 'Identificador único del producto',
                        },
                        name: {
                            type: 'string',
                            example: 'Laptop',
                            description: 'Nombre del producto',
                        },
                        description: {
                            type: 'string',
                            example: 'Gaming laptop',
                            description: 'Descripción detallada del producto',
                        },
                        price: {
                            type: 'number',
                            format: 'decimal',
                            example: 1200.00,
                            description: 'Precio del producto',
                        },
                        quantity: {
                            type: 'integer',
                            example: 10,
                            description: 'Cantidad disponible en inventario',
                        },
                    },
                    required: ['name', 'price', 'quantity'],
                },
                Products: {
                    type: 'array',
                    items: {
                        $ref: '#/components/schemas/Product',
                    },
                    example: [
                        {
                            id: 1,
                            name: 'Laptop',
                            description: 'Gaming laptop',
                            price: 1200.00,
                            quantity: 10,
                        },
                        {
                            id: 2,
                            name: 'Mouse',
                            description: 'Wireless mouse',
                            price: 25.99,
                            quantity: 50,
                        },
                    ],
                },
            },
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [{ bearerAuth: [] }],
    },
    apis: ['./swagger/swagger.js'], // Ajusta según la ubicación de tus archivos.
};

const specs = swaggerJsdoc(options);

module.exports = specs;

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtiene la lista de productos
 *     description: Devuelve un array con todos los productos en el inventario.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de productos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Products'
 *       401:
 *         description: Token no proporcionado o inválido.
 *       500:
 *         description: Error interno del servidor.
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Crea un nuevo producto
 *     description: Permite agregar un nuevo producto al inventario.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Producto creado exitosamente.
 *       400:
 *         description: Error en los datos enviados.
 *       401:
 *         description: Token no proporcionado o inválido.
 *       500:
 *         description: Error interno del servidor.
 */

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Actualiza un producto existente
 *     description: Actualiza la información de un producto por su ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente.
 *       400:
 *         description: Error en los datos enviados.
 *       401:
 *         description: Token no proporcionado o inválido.
 *       404:
 *         description: Producto no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Elimina un producto
 *     description: Elimina un producto existente por su ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto a eliminar.
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente.
 *       401:
 *         description: Token no proporcionado o inválido.
 *       404:
 *         description: Producto no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
