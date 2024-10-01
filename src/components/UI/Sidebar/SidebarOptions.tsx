import Link from "next/link";

type LinkItem = {
  href: string;
  label: string;
};

export const SidebarOptions = ({ links }: { links: LinkItem[] }) => {
  return (
    <div className="flex flex-col gap-2">
      {" "}
      {/* Reduced gap for minimalism */}
      {links?.map((link) => (
        <Link
          key={link.href}
          className="
            block w-full rounded-md 
            px-4 py-2 
            transition duration-200 
            hover:bg-gray-200 text-gray-800 
            text-base md:text-lg
          "
          href={link.href}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};
