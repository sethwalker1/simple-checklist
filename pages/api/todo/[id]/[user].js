const bcrypt = require('bcryptjs')
const sql = require('../../../../sql')

export default async function handler(req, res) {
    if (!req.query) return res.status(500)
    console.log('DELETE', req.query)
    const {
        query: { id, user },
        method,
    } = req

    switch (method) {
        case "DELETE":
            let r = await sql.query(`
                DELETE 
                FROM todo 
                WHERE id = ? AND email = ?`,
                [id, user])

            if (!r.affectedRows)
                return res.status(500).end()
            res.status(200).end()
            break
        default:
            res.setHeader('Allow', ['DELETE'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}
