'use client'

import { useSearchParams } from 'next/navigation'
import useSWR from "swr";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

const fetcher = (...args: any[]) => {
    const [url, options] = args
    return fetch(url, options).then((res) => res.json())
}

export default function Page() {
    const searchParams = useSearchParams()
    const database = searchParams.get('database')
    const tableName = `Tables_in_${ database }`

    const {data, error} = useSWR(`/api/databases/${ database }/tables`, fetcher)

    return <>
        { database && data &&
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeader>Tables of { database }</TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { data[0].map((item: any, index: any) => (
                        <TableRow key={ index }>
                            <TableCell>
                                <Link href={ `/database/${ database }/table/${ item[tableName] }` }>
                                    <p>{ item[tableName] }</p>
                                </Link>
                            </TableCell>
                        </TableRow>
                    )) }
                </TableBody>
            </Table>
        }
        { error && <div>Failed to load</div> }
    </>
}