const bcrypt = require('bcryptjs')
const sql = require('../../../sql')

export default async function handler(req, res) {
    const {
        body: { name, email, password },
        method,
    } = req
    console.log({ name, email, password })

    switch (method) {
        case "POST":
            let r = await sql.query(`
                SELECT *
                FROM auth 
                WHERE email = ?
                LIMIT 1`,
                [email])

            if (r) return res.json({ error: 'A user already exists with the specified email ID!' })

            const salt = await bcrypt.genSalt(10)
            const encrypted_password = await bcrypt.hash(password, salt)
            let r2 = await sql.query(`
                INSERT INTO auth (name, email, password)
                VALUES (?, ?, ?)`, [
                    name,
                    email,
                    encrypted_password
                ])

            if (r2 && r2.affectedRows)
                return res.send(Buffer.from(email).toString('base64'))

            res.status(500).end()
            break
        default:
            res.setHeader('Allow', ['POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}
