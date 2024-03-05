import setup from "../../../../config/setup";

export async function GET(request: Request, {params}: { params: { databases: string, tables: string } }) {
    const database = await setup(`USE ${ params.databases }`)
    const query = await setup(`SELECT *
                               FROM ${ params.tables }`);
    return Response.json([params.databases, params.tables, query])
}