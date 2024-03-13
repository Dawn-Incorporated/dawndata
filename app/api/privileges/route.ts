import setup from "@/lib/connexion";

export async function GET(request: Request) {
    const query = await setup(`SHOW PRIVILEGES`);
    return Response.json(query)
}