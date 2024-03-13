import setup from "@/lib/connexion";

export async function GET(request: Request, {params}: { params: { user: string } }) {
    const query = await setup(`SHOW GRANTS FOR ${ params.user }`);
    return Response.json(query)
}