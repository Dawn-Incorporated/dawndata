import setup from "@/lib/connexion";
import { NextRequest } from "next/server";
import isSet from "@/lib/params-helper";

export async function GET(request: NextRequest) {
    try {
        const storage = request.nextUrl.searchParams.get('storage')

        const query = await setup(`SHOW ${ isSet(storage) ? `STORAGE` : '' } ENGINES`)
        return Response.json(query)

    } catch (e) {
        return Response.json({error: e})
    }
}