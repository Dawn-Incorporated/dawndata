'use client'

import "./../globals.css";
import useSWR from "swr";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"

import { Nav } from "@/components/custom/nav";
import { Database } from "lucide-react";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";

const fetcher = (...args: any[]) => {
    const [url, options] = args
    return fetch(url, options).then((res) => res.json())
}

export default function RootLayout(
    {children}: Readonly<{ children: React.ReactNode; }>
) {
    const {data, error} = useSWR('/api/databases', fetcher)

    const [isCollapsed, setIsCollapsed] = useState(false)

    return (
        <>
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
                                    data.map((item: any) => (
                                        {
                                            title: item.Database,
                                            icon: Database,
                                            variant: "ghost",
                                            url: `/databases/${ item.Database }/tables`
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
    );
}
