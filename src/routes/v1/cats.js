const { catApiHttpClient } = require('../../services/httpClient');
const { buildResponse } = require('../../services/responseBuilder');
const {
  buildCatApiRequestConfig,
} = require('../../services/httpParamsBuilder');
const catchApiError = require('../../services/catchApiError');
const { DEFAULT_PAGINATION_LIMIT } = require('../../constants');

/**
 * @openapi
 * /v1/cats:
 *   get:
 *     summary: Finds cats's image
 *     tags:
 *        - cat
 *     parameters:
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *            default: 1
 *          description: The number of current page.
 *        - in: query
 *          name: limit
 *          schema:
 *            type: integer
 *            default: 8
 *          description: The item's limit of page. Default value is 8.
 *     description: Fetches lists of cat's image.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CatsResponse'
 *       400:
 *         description: Not found
 *       500:
 *         description: internal error.
 *
 * components:
 *   schemas:
 *     CatsResponse:
 *        type: object
 *        properties:
 *           cats:
 *                type: array
 *                items:
 *                    type: object
 *                    properties:
 *                        name:
 *                            type: string
 *                        thumbnail:
 *                            type: string
 *           perPage:
 *                type: integer
 *           currentPage:
 *                type: integer
 *
 * tags:
 *    - name: Cat
 *      description: Cat api
 */
module.exports = catchApiError(async (req, res) => {
  const { page = 1, limit = DEFAULT_PAGINATION_LIMIT } = req.query;
  const data = await catApiHttpClient(buildCatApiRequestConfig(page, limit));

  res.json(buildResponse(data, page));
});
