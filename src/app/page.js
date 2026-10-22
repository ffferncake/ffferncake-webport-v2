"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowUpRight, BriefcaseBusiness, GraduationCap, Mail, Orbit, Send, X } from "lucide-react";
import Github from "lucide-react/dist/esm/icons/github.js";
import Instagram from "lucide-react/dist/esm/icons/instagram.js";
import Linkedin from "lucide-react/dist/esm/icons/linkedin.js";
import Navbar from "./components/navbar";
import GeoWorld from "./components/geo-world";

const projects = [
  { title: "Disaster & Weather Monitor", type: "Web GIS · Real-time", image: "/images/portfolio/web-monitoring.png", text: "Live environmental layers for temperature, pressure, wind, and hazard awareness." },
  { title: "Obstacle Avoidance", type: "Spatial routing · Web", image: "/images/portfolio/web-direction-1.png", text: "A map-first route planning experience built around safe, understandable directions." },
  { title: "Fire Hotspot Explorer", type: "Satellite data · Web", image: "/images/portfolio/hotspot-check-1.png", text: "Filter and inspect fire hotspots through a focused geospatial interface.", github: "https://github.com/ffferncake/fire-hotspot-check" },
  { title: "Forest Boundary Check", type: "Mobile GIS", image: "/images/portfolio/forest-mobile.png", text: "Field-ready mobile experience for checking protected forest overlap and location context." },
  { title: "3D Model Viewer", type: "Three.js · Web", image: "/images/portfolio/gltf-model-viewer.png", text: "Browser-based glTF exploration with a compact, approachable 3D interface.", github: "https://github.com/ffferncake/gltf-visualization-app", link: "https://gltf-visualization-fern.netlify.app" },
  { title: "University Map", type: "Campus GIS · Web", image: "/images/portfolio/ku-webmap-1.png", text: "Searchable campus mapping and building information for everyday navigation." },
  { title: "Weather App", type: "Weather · Web", image: "/images/portfolio/weather-app.png", text: "Daily and weekly weather forecasts.", github: "https://github.com/ffferncake/weather-app", link: "https://weather-fern.netlify.app" },
  { title: "Working Status Monitor", type: "Monitoring · Mobile", image: "/images/portfolio/mwa-mobile.png", text: "Real-time working status monitoring for mobile teams." },
  { title: "Beer3D Mock-up", type: "3D · Web", image: "/images/portfolio/beer-3d.png", text: "Interactive 3D beer product mock-up.", github: "https://github.com/ffferncake/3D-Beer", link: "https://3d-beer-fern.netlify.app" },
  { title: "Direction App Design", type: "UI/UX · Design", image: "/images/portfolio/web-direction-design.png", text: "Interface exploration for a spatial direction experience." },
  { title: "Monitoring App Design I", type: "Dashboard · Design", image: "/images/portfolio/web-monitoring-design-1.png", text: "Environmental monitoring dashboard concept." },
  { title: "Monitoring App Design II", type: "Dashboard · Design", image: "/images/portfolio/web-monitoring-design-2.png", text: "Alternative monitoring interface and visual system." },
  { title: "Web Service API Design", type: "API · Design", image: "/images/portfolio/api-service-design.png", text: "Interface design for discovering and using web services." },
  { title: "Web Portfolio", type: "Portfolio · Web", image: "/images/portfolio/web-port-v1.png", text: "The first generation of my personal portfolio.", github: "https://github.com/ffferncake/ffferncake-webport", link: "https://ferncake.netlify.app/" },
  { title: "Baram Travel Agency", type: "Travel · Design", image: "/images/portfolio/baram-design.png", text: "Travel agency website design concept.", link: "https://www.figma.com/file/nM9qKrxwrmxnX1GCUUxPp8/travel-app-design" },
  { title: "Ah-Chim Coffee Shop", type: "Mobile UI · Design", image: "/images/portfolio/ah-chim-coffee-shop.png", text: "Coffee shop mobile ordering interface.", link: "https://www.figma.com/proto/mG1JDAtrenAyoRgBBP4bIO/" },
];
const education = [
  { period: "2005.05 — 2017.02", logo: "/images/education/kus.gif", title: "Kasetsart University Laboratory School (KUS)", detail: "Science–Math" },
  { period: "2017.07 — 2021.04", logo: "/images/education/ku-modified.png", title: "Kasetsart University (KU)", detail: "Survey Engineering and Geographic Information · 3.37/4.0 · Second honors" },
  { period: "2022.03 — 2024.02", logo: "/images/education/yonsei-university-emblem.png", title: "Yonsei University", detail: "Civil and Environmental Engineering (Survey and Geographic Information) · 4.00/4.30 · SCSI Laboratory" },
];

const experience = [
  { period: "2020.04 — 2020.06", logo: "/images/education/gis-logo.png", title: "CDG Group Thailand · GIS Co., Ltd.", detail: "Survey and Mapping Engineer Intern · Aero Department" },
  { period: "2020.12 — 2022.02", logo: "/images/education/logo-jica.png", title: "Japan International Cooperation Agency (JICA)", detail: "Research Assistant · Web map application development" },
  { period: "2021.06 — 2022.01", logo: "/images/education/maholan.png", title: "Maholan Co., Ltd.", detail: "Data Engineer / Developer · ETL, web scraping, web maps, dashboards and React Native" },
  { period: "2022.02 — 2024.01", logo: "/images/education/maholan.png", title: "Maholan Co., Ltd.", detail: "Freelance Front-End Developer · Web map and dashboard applications" },
  { period: "2024.06 — 2025.09", logo: "/images/education/mapsea.png", title: "mapsea Corporation · 주식회사 맵시", detail: "Front-End Developer · Seoul, South Korea · Real-time global vessel monitoring and weather layer development" },
  { period: "2025.09 — Now", logo: "/images/education/telepix.png", title: "TelePIX Co., Ltd · 텔레픽스(주)", detail: "Frontend Developer · Seoul, South Korea · MPS/MCS" },
];

const skills = ["React", "React Native", "Next.js", "Node.js", "PostgreSQL / MySQL / Hive", "HTML / JavaScript / CSS", "Apache Airflow / ETL / Python", "QGIS / ArcGIS Pro / ArcMap", "GeoServer / MapServer"];
const languages = ["Thai · Native", "Korean · TOPIK Level 4 (172/300)", "English · TOEIC 850/990", "English · IELTS 6.5/9.0"];
const honors = ["3rd place & GISTDA Award · Galileo Hackathon", "Galileo and Smart RTK Hackathon participant", "Outstanding Student Medal · 2020", "Highest GPA · Survey Engineering and Geographic Information · 2020", "Outstanding International Student Scholarship III · Yonsei University", "Outstanding Scholarship · Kasetsart University"];

export default function Home() {
  const [worldModal, setWorldModal] = useState(null);
  useEffect(() => {
    const closeOnEscape = (event) => { if(event.key === "Escape") setWorldModal(null); };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);
  const modalItems = worldModal === "education" ? education : experience;
  return (
    <main id="top">
      <Navbar />
      <section className="world-hero">
        <GeoWorld onZoneEnter={setWorldModal} />
        <motion.div className="world-hero-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>
          <div className="eyebrow"><span className="status-dot" /> Seoul · Bangkok · Connected</div>
          <h1>Explore my<br /><span>spatial world.</span></h1>
          <p>Drive the survey rover with WASD, arrow keys, or the controls. Discover a portfolio built around maps, satellite data, and human-friendly interfaces.</p>
          <div className="hero-actions"><Link className="button button-primary" href="#about">Enter portfolio <ArrowDownRight size={18} /></Link><Link className="button button-ghost" href="https://docs.google.com/presentation/d/1z7HzCXi2YN3cB4-aMu2r1YaA_lvp-Hnor0B5jhDNz0A/edit?usp=sharing">Download CV <ArrowUpRight size={18} /></Link></div>
        </motion.div>
        <Link className="scroll-cue" href="#about">Scroll to field notes <ArrowDownRight size={15} /></Link>
      </section>

      <AnimatePresence>
        {worldModal && <motion.div className="world-modal-backdrop" role="presentation" onMouseDown={(event)=>{if(event.target===event.currentTarget)setWorldModal(null);}} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
          <motion.section className="world-modal" role="dialog" aria-modal="true" aria-labelledby="world-modal-title" initial={{opacity:0,y:28,scale:.97}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:18,scale:.98}}>
            <header><div className="world-modal-title">{worldModal === "education" ? <GraduationCap /> : <BriefcaseBusiness />}<div><span>DESTINATION REACHED</span><h2 id="world-modal-title">{worldModal === "education" ? "Education" : "Experience"}</h2></div></div><button className="modal-close" aria-label="Close modal" onClick={()=>setWorldModal(null)}><X /></button></header>
            <div className="world-modal-list">{modalItems.map((item,index)=><article key={`${item.title}-${index}`}><div className={`logo-box ${item.logo ? "" : "telepix-logo"}`}>{item.logo ? <Image src={item.logo} alt={`${item.title} logo`} width={64} height={64} /> : <span>TELE<br/>PIX</span>}</div><div><span>{item.period}</span><h3>{item.title}</h3><p>{item.detail}</p></div></article>)}</div>
            <p className="modal-hint">Drive away and return to open this destination again.</p>
          </motion.section>
        </motion.div>}
      </AnimatePresence>

      <section className="about section-shell" id="about">
        <div className="history-grid">
          <section className="history-panel">
            <p className="kicker">EDUCATION</p>
            <div className="history-list">{education.map((item) => <article className="history-item" key={item.title}><div className="logo-box"><Image src={item.logo} alt={`${item.title} logo`} width={64} height={64} /></div><div><span>{item.period}</span><h3>{item.title}</h3><p>{item.detail}</p></div></article>)}</div>
          </section>
          <section className="history-panel">
            <p className="kicker">EXPERIENCE</p>
            <div className="history-list">{experience.map((item, index) => <article className="history-item" key={`${item.title}-${index}`}><div className={`logo-box ${item.logo ? "" : "telepix-logo"}`}>{item.logo ? <Image src={item.logo} alt={`${item.title} logo`} width={64} height={64} /> : <span>TELE<br/>PIX</span>}</div><div><span>{item.period}</span><h3>{item.title}</h3><p>{item.detail}</p></div></article>)}</div>
          </section>
        </div>
        <div className="credential-grid">
          <section><p className="kicker">SKILLS</p><div className="chip-list">{skills.map((item) => <span key={item}>{item}</span>)}</div></section>
          <section><p className="kicker">LANGUAGES</p><div className="detail-list">{languages.map((item) => <p key={item}>{item}</p>)}</div></section>
          <section><p className="kicker">CERTIFICATIONS & HONORS</p><div className="detail-list">{honors.map((item) => <p key={item}>{item}</p>)}</div></section>
        </div>
      </section>

      <section className="projects section-shell" id="projects">
        <div className="section-heading compact"><div><p className="kicker">02 / PROJECT ARCHIVE</p><h2>Work with<br />real-world coordinates.</h2></div><p>My complete project archive across environmental monitoring, routing, earth observation, mobile GIS, UI design, and spatial visualization.</p></div>
        <div className="project-grid">
          {projects.map((project, index) => <motion.article className="project-card" key={project.title} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ delay: (index % 3) * 0.08 }}>
            <div className="project-image"><Image src={project.image} alt={project.title} fill sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw" /><div className="project-scan" /><span className="project-index">{String(index + 1).padStart(2, "0")}</span><div className="project-links">{project.github && <Link href={project.github} aria-label={`${project.title} on GitHub`}><Github /></Link>}{project.link && <Link href={project.link} aria-label={`Open ${project.title}`}><ArrowUpRight /></Link>}</div></div>
            <div className="project-body"><p>{project.type}</p><h3>{project.title}</h3><span>{project.text}</span></div>
          </motion.article>)}
        </div>
      </section>

      <section className="contact section-shell" id="contact"><div className="contact-globe"><Orbit /></div><p className="kicker">03 / OPEN CHANNEL</p><h2>Have a place,<br />problem, or dataset?</h2><p className="contact-copy">Let&apos;s turn it into an experience people can navigate.</p><div className="contact-layout"><div className="contact-direct"><Link className="button button-primary contact-button" href="mailto:fernnichanun@gmail.com">fernnichanun@gmail.com <Send size={18} /></Link><div className="social-row"><Link href="https://github.com/ffferncake" aria-label="GitHub"><Github /></Link><Link href="https://www.linkedin.com/in/nichanun-trakulphudphong/" aria-label="LinkedIn"><Linkedin /></Link><Link href="https://www.instagram.com/ferncake/" aria-label="Instagram"><Instagram /></Link><Link href="https://medium.com/@fernnichanun" aria-label="Medium">M</Link><Link href="/images/sns-icon/kakao-qr.jpg" aria-label="KakaoTalk">K</Link><Link href="https://line.me/ti/p/JTehJXJst6" aria-label="Line">L</Link><Link href="mailto:fernnichanun@gmail.com" aria-label="Email"><Mail /></Link></div></div><form className="contact-form" action="mailto:fernnichanun@gmail.com" method="post" encType="text/plain"><label>Subject<input name="subject" required placeholder="Your subject" /></label><label>Message<textarea name="message" required placeholder="Let&apos;s talk about..." rows={5} /></label><label>Your email<input type="email" name="email" required placeholder="you@example.com" /></label><button className="button button-primary" type="submit">Send message <Send size={17} /></button></form></div></section>
      <footer><span>© 2026 Fern Nichanun</span><span>Building thoughtful interfaces for maps, data, and people.</span><Link href="#top">Return to the map <ArrowUpRight size={15} /></Link></footer>
    </main>
  );
}
