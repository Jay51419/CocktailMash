import React, {ReactNode, useCallback, useEffect, useRef, useState,} from "react";
import {useMediaQuery} from "@mantine/hooks";

interface ScrollerProps {
    children: ReactNode
}
export default function Scroller({children}: ScrollerProps) {
    const isMobile = useMediaQuery("(pointer:none), (pointer:coarse)")
    const ref = useRef<HTMLDivElement>(null)
    const [transform3D, setTransform3D] = useState<string>(`translate3d(0px,0px, 0px)`)

    const easeScroll = useCallback(()=> {
        const x = window.scrollX
        const y = window.scrollY;
        setTransform3D(`translate3d(-${x}px, -${y}px, 0px)`)
    },[setTransform3D])


    useEffect(() => {
        window.addEventListener('scroll', easeScroll);
        return () => {
            window.removeEventListener("scroll", easeScroll)
        }
    }, [easeScroll])


    return <div
        onLoad={() => {
            const body = document.body;
            body.style.height = ref.current?.clientHeight + 'px'
        }
        }
        ref={ref}
        style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            transform: transform3D,
            transition:`transform ${isMobile?0:0.3}s linear`
        }}>
        {children}
    </div>
}


