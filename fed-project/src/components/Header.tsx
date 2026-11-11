"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  return (
    <header>
      <Link href="/" className={pathname === "/" ? "active" : ""}>
        Dashboard
      </Link>
      <Link href="/comics" className={pathname === "/comics" ? "active" : ""}>
        Comics
      </Link>
      <Link
        href="/customers"
        className={pathname === "/customers" ? "active" : ""}
      >
        Customers
      </Link>
      <Link href="/orders" className={pathname === "/orders" ? "active" : ""}>
        Orders
      </Link>
    </header>
  );
}
