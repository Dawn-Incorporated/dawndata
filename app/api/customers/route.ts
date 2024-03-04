import setup from "../config/setup";

export async function GET(request: Request) {
    const query = await setup('SELECT * FROM customers');
    return new Response(JSON.stringify(query))
}
