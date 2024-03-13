import setup from "@/lib/connexion";
import { isSet } from "@/lib/params-helper";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, {params}: {params: {databases: string}}) {
    try {
        const like = request.nextUrl.searchParams.get('like');
        const where = request.nextUrl.searchParams.get('where');
        const equals = request.nextUrl.searchParams.get('equals');

        if (isSet(where) && !isSet(equals)) {
            return Response.json({error: "You must specify a value for your where clause"})
        }

        if (isSet(like) && !isSet(where)) {
            return Response.json({error: "You must specify a where clause when using like"})
        }

        const query = await setup(`SHOW TRIGGERS FROM ${params.databases} ${ isSet(like) ? `LIKE '${ like }%'` : '' } ${ isSet(where) ? `WHERE ${ where }='${ equals }'` : '' }`);
        return Response.json(query)
    } catch (e) {
        return Response.json({error: e});
    }
}