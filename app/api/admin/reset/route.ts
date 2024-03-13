import setup from "@/lib/connexion";
import { isSet } from "@/lib/params-helper";
import { NextRequest } from "next/server";

/**
 * RESET reset_option [, reset_option] ...

reset_option: {
    MASTER
  | REPLICA
  | SLAVE
}
 */
export async function GET(request: NextRequest) {
    try {
        const confirm = request.nextUrl.searchParams.get('confirm');

        if (!isSet(confirm)) {
            return Response.json({error: 'confirm is required'});
        }

        const master = request.nextUrl.searchParams.get('master');
        const replica = request.nextUrl.searchParams.get('replica');
        const slave = request.nextUrl.searchParams.get('slave');

        const resetOption = [master, replica, slave].filter(Boolean).join(',');

        const query = await setup(`RESET ${resetOption}`);
        return Response.json(query)
    } catch (e) {
        return Response.json({error: e});
    }
}