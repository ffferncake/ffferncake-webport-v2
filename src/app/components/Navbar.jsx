"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Orbit } from "lucide-react";

const links = [["Profile", "#about"], ["Projects", "#projects"], ["Contact", "#contact"]];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="site-nav">
      <div className="nav-inner">
        <Link className="brand" href="#top" onClick={() => setOpen(false)}>
          <span className="brand-mark"><Orbit size={19} /></span>
          <span className="brand-copy"><b>FERN NICHANUN<span className="brand-dot">.</span></b><small>GEOSPATIAL FRONT-END</small></span>
        </Link>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}>{open ? <X /> : <Menu />}</button>
        <div className={`nav-links ${open ? "is-open" : ""}`}>
          {links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
          <Link className="nav-cta" href="#contact" onClick={() => setOpen(false)}>Let&apos;s work together</Link>
        </div>
      </div>
    </nav>
  );
}
