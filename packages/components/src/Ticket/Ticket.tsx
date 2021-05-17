import { Box, Paper, PaperProps, Typography } from '@material-ui/core'
import { BasicProps, lowLevelStyles, MergeMuiElementProps } from '@smartb/archetypes-ui-themes'
import clsx from 'clsx'
import React from 'react'

const useStyles = lowLevelStyles()({
    root: {
        padding: "10px 30px",
        display: "inline-block",
        background: "transparent",
        borderRadius: "0px",
        boxSizing: "border-box",
        maxWidth: "250px"
    },
    rootLongText: {
        maxWidth: "300px",
        padding: "10px 15px",
    },
    composedRoot: {
        background: "white",
        borderRadius: "9px"
    },
    content: {
        fontWeight: 600,
        fontSize: "18px",
        lineHeight: "25px",
        color: "#808A9D",
    },
    title: {
        color: "#808A9D",
        fontSize: "14px",
        lineHeight: "19px"
    }
})


interface TicketClasses {
    baseContainer?: string
    textContainer?: string
    title?: string
    content?: string
}

interface TicketStyles {
    baseContainer?: React.CSSProperties
    textContainer?: React.CSSProperties
    title?: React.CSSProperties
    content?: React.CSSProperties
}

export interface TicketBasicProps extends BasicProps {
    /**
     * The title displayed in the component
     */
    title?: React.ReactNode
    /**
     * The content displayed in the component
     */
    content?: React.ReactNode
    /**
     * The icon displayed in the component
     */
    icon?: React.ReactNode
    /**
     * The different variants of the component
     * 
     * @default "normal"
     */
    variant?: "normal" | "composed" | "elevated"
    /**
     * Reverse the styles between the title and the content
     * 
     * @default false
     */
    reversed?: boolean
    /**
     * Define if the text in the ticket is long 
     * 
     * @default false
     */
    longText?: boolean
    /**
     * The classes applied to the different part of the component
     */
    classes?: TicketClasses
    /**
     * The styles applied to the different part of the component
     */
    styles?: TicketStyles
}

export type TicketProps = MergeMuiElementProps<PaperProps, TicketBasicProps>

export const Ticket = (props: TicketProps) => {
    const { title, content, icon, variant = "normal", className, style, id, reversed = false, classes, styles, longText = false, ...other } = props
    const defaultClasses = useStyles()
    return (
        <Paper
            id={id}
            style={style}
            className={clsx(className, defaultClasses.root, variant !== "normal" && defaultClasses.composedRoot, longText && defaultClasses.rootLongText, "AruiTicket-root")}
            elevation={variant === "elevated" ? 1 : 0}
            {...other}
        >
            <Box className={clsx(classes?.baseContainer, "AruiTicket-baseContainer")} style={styles?.baseContainer} display="flex" justifyContent="center" alignItems="center">
                {icon}
                <Box className={clsx(classes?.textContainer, "AruiTicket-textContainer")} style={styles?.textContainer} marginLeft={icon ? longText ? "15px" : "20px" : undefined} display="flex" flexDirection="column">
                    <Typography
                        className={clsx(!reversed ? defaultClasses.title : defaultClasses.content, classes?.title, "AruiTicket-title")}
                        style={styles?.title}
                    >
                        {title}
                    </Typography>
                    <Typography
                        className={clsx(!reversed ? defaultClasses.content : defaultClasses.title, classes?.content, "AruiTicket-content")}
                        style={styles?.content}
                    >
                        {content}
                    </Typography>
                </Box>
            </Box>
        </Paper>
    )
}

