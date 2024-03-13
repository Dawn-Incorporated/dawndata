import setup from "@/lib/connexion";
import { NextRequest } from "next/server";
import { isSet } from "@/lib/params-helper";

export async function GET(request: NextRequest) {
    try {
        const characterSet = request.nextUrl.searchParams.get('character_set');
        const like = request.nextUrl.searchParams.get('like');
        const where = request.nextUrl.searchParams.get('where');
        const equals = request.nextUrl.searchParams.get('equals');

        if (isSet(like) && isSet(where)) {
            return Response.json({error: "You can't use both like and where at the same time"})
        }

        if (isSet(where) && !isSet(equals)) {
            return Response.json({error: "You must specify a value for your where clause"})
        }

        const query = await setup(`SHOW ${ isSet(characterSet) ? `CHARACTER SET` : 'CHARSET' } ${ isSet(like) ? `LIKE '${ like }%'` : '' } ${ isSet(where) ? `WHERE ${ where }='${ equals }'` : '' }`)
        return Response.json(query)
    } catch (e) {
        return Response.json({error: e})
    }
}