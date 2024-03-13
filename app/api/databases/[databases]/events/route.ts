import setup from "@/lib/connexion";

export async function GET(request: Request, {params}: { params: { databases: string } }) {
    await setup(`USE ${ params.databases }`)
    const query = await setup(`SHOW EVENTS`);
    return Response.json(query)
}