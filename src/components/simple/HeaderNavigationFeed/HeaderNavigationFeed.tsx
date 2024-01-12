import { useLocation } from "react-router-dom";
import classNames from "classnames/bind";

import styles from "./style.module.css";
import { INavigation } from "../../../core/types/navigation";

import { Link } from "../../ui/Link";

interface HeaderNavigationFeedProps {
    navigation: INavigation[];
    className?: string;
    linksClassname?: string;
}

const cn = classNames.bind(styles);

export const HeaderNavigationFeed: React.FC<HeaderNavigationFeedProps> = ({
    navigation,
    className,
    linksClassname
}) => {
    const { pathname } = useLocation();

    return (
        <div className={cn("feed", className)}>
            {navigation.map(({ link, title }, index) => (
                <Link
                    key={index}
                    className={cn(
                        {
                            "active-link": link === pathname
                        },
                        linksClassname
                    )}
                    to={link}
                >
                    {title}
                </Link>
            ))}
        </div>
    );
};
