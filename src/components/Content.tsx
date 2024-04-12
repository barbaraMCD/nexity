import {ReactElement, ReactNode} from "react";

interface ContentProps {
    icon: ReactElement;
    children: ReactNode;
}
const ContentBox = ({children, icon}: ContentProps) => {
    return (
        <div className="flex flex-row items-center">
            {icon}
            {children}
        </div>
    )
}

export default ContentBox;
