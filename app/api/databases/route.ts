import setup from "../config/setup";

export async function GET(request: Request) {
    const query = await setup(`SHOW DATABASES`);
    return Response.json(query)
}