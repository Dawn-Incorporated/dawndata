import setup from "@/lib/connexion";

export async function GET(request: Request) {
    const query = await setup(`SHOW DATABASES`);
    return Response.json(query)
}