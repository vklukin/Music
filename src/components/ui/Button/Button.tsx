import classNames from "classnames/bind";

import styles from "./styles.module.css";

interface ButtonProps {
    children?: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    disabled?: boolean;
    className?: string;
    title?: string;
}

const cn = classNames.bind(styles);

export const Button: React.FC<ButtonProps> = ({
    children,
    className,
    disabled,
    onClick,
    title
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={cn("button", className)}
            title={title}
        >
            {children}
        </button>
    );
};
