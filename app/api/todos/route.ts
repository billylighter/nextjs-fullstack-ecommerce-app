import { sql } from "@vercel/postgres";

export async function GET() {
    const { rows } = await sql`
        SELECT * FROM todos
        ORDER BY created_at DESC
    `;
    return Response.json(rows);
}

export async function POST(req: Request) {
    const {title} = await req.json();

    if (!title) {
        return new Response("Title is required", {status: 400});
    }

    const {rows} = await sql`
        INSERT INTO todos (title)
        VALUES (${title}) RETURNING *
    `;

    return Response.json(rows[0]);
}
