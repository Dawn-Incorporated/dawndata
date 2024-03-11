'use client'

import useSWR from "swr";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const fetcher = (...args: any[]) => {
    const [url, options] = args
    return fetch(url, options).then((res) => res.json())
}

export default function Page({params}: { params: { database: string, table: string } }) {
    const {data, error} = useSWR(`/api/databases/${ params.database }/tables/${ params.table }`, fetcher)

    if (!data) return <div>Loading !</div>

    return <>
        { data &&
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeader>Data of { params.table }</TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { data.data.map((item: any, index: any) => (
                        <TableRow key={ index }>
                            { Object.keys(item).map((key, columnIndex) => (
                                <TableCell key={ columnIndex }>
                                    <p>{ item[key] }</p>
                                </TableCell>
                            )) }
                        </TableRow>
                    )) }
                </TableBody>
            </Table>
        }
        { error && <div>Failed to load</div> }
    </>
}