import setup from "@/lib/connexion";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, {params}: { params: { databases: string, tables: string } }) {
    await setup(`USE ${ params.databases }`)

    let response_data: Record<string, any>;

    switch (request.nextUrl.searchParams.get('type')) {
        case "data":
            const data = await setup(`SELECT * FROM ${ params.tables }`);
            response_data = {"data": data}
            break;
        case "structure":
            const structure = await setup(`SHOW COLUMNS FROM ${ params.tables }`);
            response_data = {"structure": structure}
            break;
        default:
            const defaultStructure = await setup(`SHOW COLUMNS FROM ${ params.tables }`);
            const defaultData = await setup(`SELECT * FROM ${ params.tables }`);
            response_data = {"structure": defaultStructure, "data": defaultData}
            break;
    }
    return Response.json(response_data)
}