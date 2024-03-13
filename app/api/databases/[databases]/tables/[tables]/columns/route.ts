import setup from "@/lib/connexion";
import { NextRequest } from "next/server";
import { isSet, addParametersToQuery } from "@/lib/params-helper";

/**
 * SHOW [EXTENDED] [FULL] {COLUMNS | FIELDS}
    {FROM | IN} tbl_name
    [{FROM | IN} db_name]
    [LIKE 'pattern' | WHERE expr]
 */
export async function GET(request: NextRequest, {params}: {params: { databases: string, tables: string }}) {
    try {
        const extended = request.nextUrl.searchParams.get('extended');
        const full = request.nextUrl.searchParams.get('full');

        const columns = request.nextUrl.searchParams.get('columns');
        const fields = request.nextUrl.searchParams.get('fields');

        const from = request.nextUrl.searchParams.get('from');
        const inOption = request.nextUrl.searchParams.get('in');

        const like = request.nextUrl.searchParams.get('like');
        const where = request.nextUrl.searchParams.get('where');
        const equals = request.nextUrl.searchParams.get('equals');

        if (isSet(columns) && isSet(fields)) {
            return Response.json({error: "You can't use both columns and fields at the same time"})
        }

        if (isSet(where) && !isSet(equals)) {
            return Response.json({error: "You must specify a value for your where clause"})
        }

        const query = await setup(`SHOW ${isSet(extended) ? 'EXTENDED' : ''} ${isSet(full) ? 'FULL' : ''} ${isSet(fields) ? 'FIELDS' : 'COLUMNS'} FROM ${params.databases}.${params.tables} ${ isSet(like) ? `LIKE '${ like }%'` : '' } ${ isSet(where) ? `WHERE ${ where }='${ equals }'` : '' }`)
        return Response.json(query)
    } catch (e) {
        return Response.json({error: e})
    }
}