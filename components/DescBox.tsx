import { twMerge } from "tailwind-merge";


interface DescBoxProps {
    children: React.ReactNode;
    className?: string,
}


const DescBox: React.FC<DescBoxProps> = ({
    children,
    className
}) => {
    return (  
    <div className={twMerge(`
         bg-[#D0C195]
         dark:bg-[#4c4032]
        text-[#372133]
        dark:text-[#EAC56A]
           rounded-lg
           h-fit
           w-full
        `, className)}>
        {children}
    </div>);
}
 DescBox
export default DescBox;