// TODO: проверить работоспособность
// eslint-disable-next-line import/no-unresolved
import LogoImage from "@public/images/Logo.svg";

interface LogoProps {
    width?: string;
    height?: string;
    className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className, height, width }) => {
    return (
        <img
            src={LogoImage}
            alt="Логотип сайта"
            style={{ width, height }}
            className={className}
        />
    );
};
