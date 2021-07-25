const bcrypt = require('bcryptjs')
const sql = require('../../../sql')

export default async function handler(req, res) {
    const {
        body: { email, password },
        method,
    } = req

    switch (method) {
        case "POST":
            let r = await sql.query(`
                SELECT password 
                FROM auth 
                WHERE email = ?
                LIMIT 1`,
                [email])

            if (!r) return res.json({ error: 'An account with that email does not exist!' })
            if (await bcrypt.compare(password, r.password))
                return res.send(Buffer.from(email).toString('base64'))

            res.json({ error: 'Incorrect password!' })
            break
        default:
            res.setHeader('Allow', ['POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}
