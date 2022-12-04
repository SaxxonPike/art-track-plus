import React, {HTMLAttributes, memo, PropsWithChildren, ReactElement} from "react";
import CrumbIcon from "../icons/crumb-icon";

export interface Props extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {
    crumbs: ReactElement[],
    title: string
}

function BasePanel({crumbs, title, children, className, ...props}: Props) {
    const newClassName = `${className || ""} my-3`.trim();
    const newCrumbs = [];

    // Populates the crumbs section with separators.
    crumbs.forEach(crumb => {
        if (newCrumbs.length > 0) {
            newCrumbs.push(" ", <CrumbIcon key={`crumb${newCrumbs.length}`} />, " ");
        }
        newCrumbs.push(crumb);
    });

    return (
        <div className={newClassName} {...props}>
            <h1 className={"text-center"}>
                {newCrumbs}
                {` ${title}`}
            </h1>
            <hr/>
            {children}
        </div>
    );
}

export default memo(BasePanel);
