import { Tab, Tabs, TabsProps } from '@material-ui/core'
import { BasicProps, lowLevelStyles, MergeMuiElementProps, Theme, useTheme } from '@smartb/g2-themes'
import clsx from 'clsx'
import React, { forwardRef, useCallback, useMemo } from 'react'

const useStyles = lowLevelStyles<Theme>()({
    indicator: {
        height: "100%",
        borderRadius: "20px",
        opacity: "0.15"
    },
    tabs: {
        minHeight: 0,
    },
    tab: {
        minHeight: 0,
        minWidth: 0,
        borderRadius: "20px",
        padding: "0px 8px",
        textTransform: "unset",
        color: "#808A9D",
        "&:hover": {
            color: theme => theme.colors.primary
        }
    }
})

interface LabelSwitchClasses {
    indicator?: string
    tab?: string
}

interface LabelSwitchStyles {
    indicator?: React.CSSProperties
    tab?: React.CSSProperties
}


export interface Label {
    key: string
    name: string
    value: string
}

export interface LabelSwitchBasicProps extends BasicProps {
    /**
     * The labels switched by the component
     */
    labels: Label[]
    /**
     * The event called when the current selected label change
     */
    onLabelChange?: (value: string) => void
    /**
     * The value of the currently selected label
     */
    selectedLabelValue: string
    /**
     * The classes applied to the different part of the component
     */
    classes?: LabelSwitchClasses
    /**
     * The styles applied to the different part of the component
     */
    styles?: LabelSwitchStyles
}

export type LabelSwitchProps = MergeMuiElementProps<TabsProps, LabelSwitchBasicProps>

const LabelSwitchBase = (props: LabelSwitchProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
    const { labels, onLabelChange, selectedLabelValue, className, style, id, classes, styles, ...other } = props
    const theme = useTheme()
    const defaultClasses = useStyles(theme)

    const handleChange = useCallback(
        //@ts-ignore
        (event: React.ChangeEvent<{}>, newValue: string) => {
            onLabelChange && onLabelChange(newValue);
        },
        [onLabelChange],
    )

    const tabs = useMemo(() => labels.map((label) => (
        <Tab key={label.key} className={clsx(defaultClasses.tab, classes?.tab, 'AruiLabelSwitch-tab')} style={styles?.tab} label={label.name} value={label.value} />
    )), [labels, defaultClasses.tab, classes?.tab, styles?.tab])

    return (
        <Tabs ref={ref} value={selectedLabelValue} classes={{ indicator: clsx(classes?.indicator, defaultClasses.indicator, 'AruiLabelSwitch-indicator')}} TabIndicatorProps={{style: styles?.indicator}} id={id} indicatorColor="primary" textColor="primary" className={clsx(className, defaultClasses.tabs, 'AruiLabelSwitch-root')} style={style} onChange={handleChange} {...other}>
            {tabs}
        </Tabs>
    )
}

export const LabelSwitch = forwardRef(LabelSwitchBase) as typeof LabelSwitchBase
