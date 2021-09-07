import React, { useCallback, useMemo, useState } from "react";

import SidePanel from "SidePanel";

export default function useSidePanel({ onOpen, onClose, onHide, content, props = {} }: useSidePanelProps = {}) {
    const [isActive, setActive] = useState(false);

    const { openSidePanel, closeSidePanel, hideSidePanel } = useMemo(() => {
        const openSidePanel = (...args: any[]) => {
            typeof onOpen === "function" && onOpen(...args);
            setActive(true);
        };

        const closeSidePanel = (...args: any[]) => {
            typeof onClose === "function" && onClose(...args);
            setActive(false);
        };

        const hideSidePanel = (...args: any[]) => {
            typeof onHide === "function" && onHide(...args);
            setActive(false);
        };

        return { openSidePanel, closeSidePanel, hideSidePanel };
    }, [onHide, onClose, onOpen]);

    const renderSidePanel = useCallback((sidePanelProps = {}) => {
        if(!isActive)
            return null;

        const SidePanelContent = content as React.ElementType;
        const sidePanelContentProps = Object.assign(props, sidePanelProps);

        return (
            <SidePanel close={ closeSidePanel } hide={ hideSidePanel } { ...sidePanelContentProps }>
                { content && (<SidePanelContent close={ closeSidePanel } hide={ hideSidePanel } { ...sidePanelContentProps }/>) }
            </SidePanel>
        );
    }, [isActive, props, closeSidePanel, hideSidePanel]);

    return { openSidePanel, closeSidePanel, hideSidePanel, renderSidePanel };
}

type useSidePanelProps = {
    onOpen?: Function,
    onClose?: Function,
    onHide?: Function,
    content?: React.ReactNode,
    props?: object,
};
