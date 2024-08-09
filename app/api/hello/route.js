/**
 * @swagger
 * /api/hello:
 *   get:
 *     summary: Returns a greeting message.
 *     description: Returns a personalized greeting message.
 *     tags: [Test]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the person to greet.
 *     responses:
 *       200:
 *         description: A JSON object with a personalized greeting message.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Привет, имя!
 *       400:
 *         description: Bad Request - The name parameter is missing.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Parameter 'name' is required."
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An unexpected error occurred."
 */

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const name = searchParams.get('name')

    if (!name) {
      return new Response(JSON.stringify({ error: "Parameter 'name' is required." }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ message: `Hi, ${name}!` }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'An unexpected error occurred.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
