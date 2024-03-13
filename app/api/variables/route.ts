import setup from "../config/setup";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const query = await setup("SHOW VARIABLES")
        return Response.json(query)
    } catch (e) {
        return Response.json({error: e})
    }
}