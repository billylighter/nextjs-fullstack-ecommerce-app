import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

interface RouteParams {
    params: { id: string };
}

// PATCH → toggle completed
export async function PATCH(_req: Request, { params }: RouteParams) {
    const { id } = await params;

    const { rows } = await sql`
    UPDATE todos
    SET completed = NOT completed
    WHERE id = ${id}
    RETURNING *
  `;

    if (!rows.length) {
        return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
}

// DELETE → remove todo
export async function DELETE(_req: Request, { params }: RouteParams) {
    const { id } = await params;

    await sql`
    DELETE FROM todos
    WHERE id = ${id}
  `;

    return NextResponse.json({ success: true });
}
