import setup from "../../../config/setup";

export async function GET(request: Request, {params}: { params: { databases: string } }) {
    await setup(`USE ${ params.databases }`)
    const query = await setup(`SHOW TABLES`);
    return Response.json([query])
}