'use client'

import useSWR from "swr";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { cn } from "@/lib/utils";
import { Nav } from "@/components/custom/nav";
import { TableIcon } from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import React, { useState } from "react";

const fetcher = (...args: any[]) => {
    const [url, options] = args
    return fetch(url, options).then((res) => res.json())
}

export default function Page({params}: { params: { database: string, table: string } }, {children}: Readonly<{ children: React.ReactNode; }>) {
    const database = params.database
    const tableName = `Tables_in_${ database }`
    const [isCollapsed, setIsCollapsed] = useState(false)

    const {data, error} = useSWR(`/api/databases/${ database }/tables`, fetcher)

    return <>
        <TooltipProvider>
            <ResizablePanelGroup
                direction="horizontal"
                className="h-full max-h-[800px] items-stretch"
            >
                <ResizablePanel
                    minSize={ 15 } maxSize={ 20 }
                    collapsible={ true }
                    collapsedSize={ 5 }
                    onCollapse={ () => {
                        setIsCollapsed(true)
                        document.cookie = `react-resizable-panels:collapsed=${ JSON.stringify(
                            true
                        ) }`
                    } }
                    onExpand={ () => {
                        setIsCollapsed(false)
                        document.cookie = "react-resizable-panels:collapsed=false"
                    } }
                    className={ cn(isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out") }
                >
                    { data && (
                        <Nav
                            isCollapsed={ isCollapsed }
                            links={
                                data[0]?.map((item: any) => (
                                    {
                                        title: item[tableName],
                                        icon: TableIcon,
                                        variant: "ghost",
                                        url: `/databases/${ database }/tables/${ item[tableName] }`
                                    }
                                ))
                            }
                        />
                    ) }
                </ResizablePanel>

                <ResizableHandle withHandle/>

                <ResizablePanel>{ children }</ResizablePanel>
            </ResizablePanelGroup>
        </TooltipProvider>
    </>
}