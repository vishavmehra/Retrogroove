import Link from "next/link";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface SidebarItemProps{
    icon: IconType;
    label: string;
    active?: boolean;
    href: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    icon: Icon,
    label,
    active,
    href
}) => {
    return (  
    
    <Link 
        href={href}
        className={twMerge(`
             flex
             flex-row
             h-auto
             items-center
             rounded-md
             w-full
             gap-x-2
             text-md
             font-medium
             cursor-pointer
             text-nautral-700
             dark:text-[#EAC56A]
             p-3
             px-2
             py-1
        `,
            active && 'dark:bg-[#5a493b] bg-[#D66375]')}>
        <Icon size={26}/>
        <p className="truncate w-full">{label}</p>
    </Link>);
}
 
export default SidebarItem;