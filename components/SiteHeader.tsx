"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteHeader() {
  const pathname = usePathname();

  const nav = [
    { label: "Watch Search", href: "/search" },
    { label: "Market", href: "/market" },
    { label: "Articles", href: "/articles" },
    { label: "Guides", href: "/guides" },
    { label: "About", href: "/about" },
  ];

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        background: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid #eee",
      }}
    >
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "14px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            textDecoration: "none",
            color: "inherit",
            minWidth: 220,
          }}
        >
          <img
            src="/watchscout_logo_transparent_final.png"
            alt="The Watch Scout"
            style={{ height: 40, width: "auto", display: "block" }}
          />
        </Link>

        {/* Nav */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            flexWrap: "wrap",
            justifyContent: "flex-end",
          }}
        >
          {nav.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  fontSize: 13,
                  letterSpacing: 0.6,
                  textTransform: "uppercase",
                  textDecoration: "none",
                  color: active ? "#111" : "#555",
                  fontWeight: active ? 700 : 600,
                  padding: "8px 6px",
                  borderBottom: active
                    ? "2px solid #111"
                    : "2px solid transparent",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
