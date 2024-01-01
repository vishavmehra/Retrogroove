import { twMerge } from "tailwind-merge";


interface BoxProps {
    children: React.ReactNode;
    className?: string,
}


const Box: React.FC<BoxProps> = ({
    children,
    className
}) => {
    return (  
    <div className={twMerge(`
           bg-[#E0D5B3]
           dark:bg-[#3D3228]
           rounded-lg
           h-fit
           w-full
        `, className)}>
        {children}
    </div>);
}
 
export default Box;