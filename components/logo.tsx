import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href={"/"}>
      <div className="cursor-pointer">
        <Image
          src={"/logo.svg"}
          alt="a logo"
          height={50}
          width={50}
          className="object-cover"
        />
      </div>
    </Link>
  );
};
