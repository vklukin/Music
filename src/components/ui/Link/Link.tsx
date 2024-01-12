import { Link as RouterLink, To } from "react-router-dom";
import classNames from "classnames/bind";

import styles from "./style.module.css";

interface LinkProps {
    to: To;
    children: React.ReactNode;
    className?: string;
}

const cn = classNames.bind(styles);

export const Link: React.FC<LinkProps> = ({ to, children, className }) => {
    return (
        <RouterLink to={to} className={cn("link", className)}>
            {children}
        </RouterLink>
    );
};
