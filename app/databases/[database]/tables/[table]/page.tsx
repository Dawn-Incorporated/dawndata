'use client'

import useSWR from "swr";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

const fetcher = (...args: any[]) => {
    const [url, options] = args
    return fetch(url, options).then((res) => res.json())
}

export default function Page({params}: { params: { database: string, table: string } }) {
    console.log(params.database, params.table)
    const {data, error} = useSWR(`/api/databases/${params.database}/tables/${params.table}/`, fetcher)

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
        { error && <div>Failed to load data in { params.database }.{ params.table }</div> }
    </>
}