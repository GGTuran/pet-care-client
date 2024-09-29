import Link from "next/link";

type LinkItem = {
  href: string;
  label: string;
};

export const SidebarOptions = ({ links }: { links: LinkItem[] }) => {
  return (
    <div className="flex flex-col gap-1 sm:gap-2 md:gap-3 lg:gap-4">
      {links?.map((link) => (
        <Link
          key={link.href}
          className="
        block w-full rounded-md 
        px-2 py-2 
        sm:px-3 sm:py-3 
        md:px-4 md:py-4
        hover:bg-default-200 text-base
        sm:text-lg md:text-xl lg:text-2xl
      "
          href={link.href}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};
