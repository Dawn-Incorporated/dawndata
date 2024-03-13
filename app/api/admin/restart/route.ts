import setup from "@/lib/connexion";
import { isSet } from "@/lib/params-helper";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const confirm = request.nextUrl.searchParams.get('confirm');

        if (!isSet(confirm)) {
            return Response.json({error: 'confirm is required'});
        }

        const query = await setup(`RESTART`);
        return Response.json(query)
    } catch (e) {
        return Response.json({error: e});
    }
}