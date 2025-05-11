"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "motion/react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export const TracingBeam = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: contentRef,
        offset: ["start start", "end end"],
    });

    const [svgHeight, setSvgHeight] = useState(0);

    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";


    useEffect(() => {
        const updateHeight = () => {
            if (contentRef.current) {
                setSvgHeight(contentRef.current.offsetHeight);
            }
        };

        updateHeight();

        const resizeObserver = new ResizeObserver(updateHeight);
        if (contentRef.current) {
            resizeObserver.observe(contentRef.current);
        }

        return () => resizeObserver.disconnect();
    }, []);

    return (
        <motion.div
            ref={ref}
            className={cn("relative mx-auto h-full w-full max-w-4xl", className)}
        >
            <div className="absolute top-3 -left-4 md:-left-20">
                <motion.div
                    transition={{ duration: 0.2, delay: 0.5 }}
                    animate={{
                        boxShadow:
                            scrollYProgress.get() > 0
                                ? "none"
                                : "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                    }}
                    className="border-netural-200 ml-[27px] flex h-4 w-4 items-center justify-center rounded-full border shadow-sm"
                >
                    <motion.div
                        transition={{ duration: 0.2, delay: 0.5 }}
                        animate={{
                            backgroundColor: isDark ? "#F5E3CD" : "#151515",
                            borderColor: isDark ? "#F5E3CD" : "#151515",
                        }}
                        className="h-2 w-2 rounded-full border"
                    />
                </motion.div>

                {svgHeight > 0 && (
                    <svg
                        viewBox={`0 0 20 ${svgHeight}`}
                        width="20"
                        height={svgHeight}
                        className="ml-4 block"
                        aria-hidden="true"
                    >
                        <motion.path
                            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8
                                } l -18 24V ${svgHeight}`}
                            fill="none"
                            stroke={isDark ? "#F5E3CD" : "#151515"}
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            style={{ pathLength: scrollYProgress }}
                            className="motion-reduce:hidden"
                        />
                    </svg>
                )}
            </div>

            <div ref={contentRef}>{children}</div>
        </motion.div>
    );
};
