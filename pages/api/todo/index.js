const bcrypt = require('bcryptjs')
const sql = require('../../../sql')

export default async function handler(req, res) {
    const {
        body: { id, name, email, description },
        method,
    } = req
    console.log({ name, email, description })

    let r;
    switch (method) {
        case "POST":
            r = await sql.query(`
                INSERT INTO todo (name, description, email)
                VALUES(?, ?, ?)`,
                [name, description, email])

            if (r.affectedRows)
                return res.send({ id: r.insertId, name, email, description })

            res.status(500).end()
            break
        case "PUT":
            r = await sql.query(`
                UPDATE todo 
                SET name = ?, description = ?
                WHERE email = ? AND id = ?`,
                [name, description, email, id])

            if (r && r.affectedRows)
                return res.status(200).end()

            res.status(500).end()
            break
        default:
            res.setHeader('Allow', ['POST', 'PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}
