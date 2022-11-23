import React, { ReactNode, useCallback, useEffect, useRef, useState, } from "react";
import { useMediaQuery } from "@mantine/hooks";
import Scrollbar from 'smooth-scrollbar';

interface ScrollerProps {
    children: ReactNode
}
export default function Scroller({ children }: ScrollerProps) {
    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const scrollbar = Scrollbar.init(ref.current!, { damping: 0.07, alwaysShowTracks: true })
        return () => {
            scrollbar.destroy();
        };
    }, [])

    return <div
        ref={ref}
        data-scrollbar
        style={{
            height: "100vh",
            width: "100%",
        }}>
        <div >
            {children}
        </div>
    </div>
}



