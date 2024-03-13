import setup from "@/lib/connexion";
import { NextRequest } from "next/server";
import { isSet } from "@/lib/params-helper";

export async function GET(request: NextRequest) {
    try {
        const binary = request.nextUrl.searchParams.get('binary')
        const master = request.nextUrl.searchParams.get('master');

        if (isSet(binary) && isSet(master)) {
            return Response.json({error: "You can't use both binary and master at the same time"})
        }

        if (!isSet(binary) && !isSet(master)) {
            return Response.json({error: "You must use binary or master"})
        }

        const query = await setup(`SHOW ${ isSet(binary) ? `BINARY` : '' }${ isSet(master) ? `MASTER` : '' } LOGS`)
        return Response.json(query)
    } catch (e) {
        return Response.json({error: e})
    }
}