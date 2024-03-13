import setup from "@/lib/connexion";
import { NextRequest } from "next/server";
import { isSet } from "@/lib/params-helper";

export async function GET(request: NextRequest, {params}: { params: { engine: string } }) {
    try {
        const status = request.nextUrl.searchParams.get('status')
        const mutex = request.nextUrl.searchParams.get('mutex');

        if (isSet(status) && isSet(mutex)) {
            return Response.json({error: "You can't use both status and mutex at the same time"})
        }

        if (!isSet(status) && !isSet(mutex)) {
            return Response.json({error: "You must use status or mutex"})
        }

        const query = await setup(`SHOW ENGINE ${ params.engine } ${ isSet(status) ? `STATUS` : '' }${ isSet(mutex) ? `MUTEX` : '' }`)
        return Response.json(query)
    } catch (e) {
        return Response.json({error: e})
    }
}