"use client"

import useSWR from 'swr'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json())

export default function Home() {
    const {data, error} = useSWR('/api/databases', fetcher)

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    return (
        <div>
            <h1>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeader>Database</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { data.map((item: any, index: any) => (
                            <TableRow key={ index }>
                                <TableCell>
                                    <Link href={ `/databases/${ item.Database }` }>
                                        { item.Database }
                                    </Link>
                                </TableCell>
                            </TableRow>
                        )) }
                    </TableBody>
                </Table>
            </h1>
        </div>
    )
}
