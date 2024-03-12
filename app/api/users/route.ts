import setup from "../config/setup";

export async function GET(request: Request) {
    const query = await setup(`SELECT * FROM mysql.user`);
    return Response.json(query)
}