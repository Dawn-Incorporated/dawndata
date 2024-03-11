'use client'

import { Inter } from "next/font/google";
import "./globals.css";
import useSWR from "swr";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"

import Link from "next/link";

const inter = Inter({subsets: ["latin"]});

const fetcher = (...args: any[]) => {
    const [url, options] = args
    return fetch(url, options).then((res) => res.json())
}

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    const {data, error} = useSWR('/api/databases', fetcher)

    return (
        <html lang="en">
        <body className={ inter.className }>
        <div>
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel minSize={ 10 } maxSize={ 20 }>
                    { data &&
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
                                            <Link href={ `/?database=${ item.Database }` }>
                                                <p>{ item.Database }</p>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                )) }
                            </TableBody>
                        </Table>
                    }
                    { error && <div>Failed to load</div> }
                </ResizablePanel>
                <ResizableHandle/>
                <ResizablePanel>{ children }</ResizablePanel>
            </ResizablePanelGroup>
        </div>


        </body>
        </html>
    );
}
