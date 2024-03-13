import setup from "@/lib/connexion";

export async function GET(request: Request) {
    const query = await setup(`SELECT * FROM mysql.user`);
    return Response.json(query)
}