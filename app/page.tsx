'use client'

import { useSearchParams } from 'next/navigation'
import useSWR from "swr";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json())

export default function SearchBar() {
    const searchParams = useSearchParams()
    const database = searchParams.get('database')
    const tableName = `Tables_in_${ database }`

    const {data, error} = useSWR(`/api/databases/${ database }/tables`, fetcher)

    return <>
        { data &&
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
                                <p>{ item[tableName] }</p>
                            </TableCell>
                        </TableRow>
                    )) }
                </TableBody>
            </Table>
        }
        { error && <div>Failed to load</div> }
    </>
}