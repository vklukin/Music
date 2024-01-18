import { ElementType, ComponentProps } from "react";
import classNames from "classnames/bind";

import styles from "./styles.module.css";

const cn = classNames.bind(styles);

type TButtonOwnProps<E extends ElementType = ElementType> = {
    children: React.ReactNode;
    className?: string | string[];
    as?: E;
};

type TButtonProps<E extends ElementType> = TButtonOwnProps<E> &
    Omit<ComponentProps<E>, keyof TButtonOwnProps>;

const defaultElement = "button";

export function Button<E extends ElementType = typeof defaultElement>({
    children,
    className,
    as,
    ...otherProps
}: TButtonProps<E>) {
    const TagName = as || defaultElement;

    return (
        <TagName className={cn("button", className)} {...otherProps}>
            {children}
        </TagName>
    );
}
