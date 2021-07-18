const bcrypt = require('bcryptjs')
const sql = require('../../../../sql')

export default async function handler(req, res) {
    if (!req.query) return res.status(500)
    const {
        query: { id },
        method,
    } = req

    switch (method) {
        case "GET":
            const email = Buffer.from(id, 'base64').toString()
            let r = await sql.query(`
                SELECT *
                FROM todo
                WHERE email = ?`,
                [email])

            res.send(r || [])
            break
        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}
