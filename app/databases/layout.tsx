'use client'

import "./../globals.css";
import useSWR from "swr";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable"
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger,} from "@/components/ui/accordion"

import {cn} from "@/lib/utils";
import React, {useState} from "react";
import {TooltipProvider} from "@/components/ui/tooltip";
import Link from "next/link";

const fetcher = (...args: any[]) => {
    const [url, options] = args
    return fetch(url, options).then((res) => res.json())
}

export default function RootLayout(
    {children}: Readonly<{ children: React.ReactNode; }>
) {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [dataFromDatabase, setDataFromDatabase] = useState('')
    
    const {data, error} = useSWR('/api/databases', fetcher)

    const concatTableName = async (database: string) => {
        return `Tables_in_${ database }`
    }

const getTableFromDatabase = async (database: string) => {
    try {
        setDataFromDatabase('');
        const concat = await concatTableName(database);
        const response = await fetch(`/api/databases/${database}/tables`);
        const data = await response.json();

        setDataFromDatabase(data[0].map((item: any) => (
            <li key={item[concat]}><Link href={`/databases/${database}/tables/${item[concat]}`}>{item[concat]}</Link>
            </li>
        )));
    } catch (error: any) {
        console.error('Erreur lors de la récupération des données :', error.message);
    }
};


    return (
        <>
            <TooltipProvider>
                <ResizablePanelGroup
                    direction="horizontal"
                    className="h-full max-h-[800px] items-stretch"
                >
                    <ResizablePanel
                        minSize={ 50 } maxSize={ 200 }
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
                        className={ cn(isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out") + " !overflow-scroll"}
                    >
                        <Accordion type="single" collapsible>
                        { data && (
                            data.map((item: any) => (
                            <AccordionItem value={item.Database} key={item.Database}>
                                <AccordionTrigger onClick={() => getTableFromDatabase(item.Database)} className="flex ml-4" >{item.Database}</AccordionTrigger>
                                <AccordionContent className="flex ml-4">
                                    <ul>
                                    {dataFromDatabase}
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>      
                                ))
                        ) }
                        </Accordion>
                    </ResizablePanel>
                    <ResizableHandle withHandle/>
                    <ResizablePanel>{ children }</ResizablePanel>
                </ResizablePanelGroup>
            </TooltipProvider>
        </>
    );
}