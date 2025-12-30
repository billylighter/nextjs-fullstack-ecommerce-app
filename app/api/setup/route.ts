import { sql } from "@vercel/postgres";

export async function GET() {
    await sql`
        CREATE TABLE IF NOT EXISTS todos (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            completed BOOLEAN DEFAULT false,
            created_at TIMESTAMP DEFAULT NOW()
        );
    `;

    return Response.json({ status: "ok" });
}
