import setup from "@/lib/connexion";
import { NextRequest } from "next/server";
import { addParametersToQuery, isSet } from "@/lib/params-helper";

export async function GET(request: NextRequest) {
    try {
        const logName = request.nextUrl.searchParams.get('log_name')
        const fromPosition = request.nextUrl.searchParams.get('from')
        const limit = request.nextUrl.searchParams.get('limit')
        const offset = request.nextUrl.searchParams.get('offset')

        const query = await setup(`SHOW BINLOG EVENTS ${ addParametersToQuery('IN', logName, '\'') } ${ addParametersToQuery('FROM', fromPosition) } ${ isSet(limit) ? (isSet(offset) ? `LIMIT ${ offset }, ${ limit }` : `LIMIT ${ limit }`) : '' }`)
        return Response.json(query)
    } catch (e) {
        return Response.json({error: e})
    }
}