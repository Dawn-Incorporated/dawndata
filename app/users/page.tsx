'use client'

import useSWR from "swr";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const fetcher = (...args: any[]) => {
    const [url, options] = args
    return fetch(url, options).then((res) => res.json())
}

export default function Users() {
    const {data, error} = useSWR(`/api/users`, fetcher)

    return (
        <>
            { data &&
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeader>Users</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { data.map((item: any, index: any) => (
                            <TableRow key={ index }>
                                <TableCell>
                                    <p>{ item.User }</p>
                                </TableCell>
                            </TableRow>
                        )) }
                    </TableBody>
                </Table>
            }
            { error && <div>Failed to load users.</div> }
        </>
    )
}