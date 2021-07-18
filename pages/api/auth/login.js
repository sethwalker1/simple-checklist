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

            if (!r) return res.status(200).send("Incorrect username or password!")
            if (await bcrypt.compare(password, r.password))
                return res.send(Buffer.from(email).toString('base64'))

            res.sendStatus(500).end()
            break
        default:
            res.setHeader('Allow', ['POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}
