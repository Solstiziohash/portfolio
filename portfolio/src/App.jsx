import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Home", "Skills", "Progetti", "Contatti"];

const SKILLS = [
  { name: "JavaScript", level: 70 },
  { name: "React", level: 70 },
  { name: "Python", level: 70 },
  { name: "Java", level: 80 },
  { name: "PHP", level: 70 },
  { name: "SQL", level: 70 },
];

const PROJECTS = [
  {
    title: "Il Platano",
    desc: "Sito web per una realtà locale, con design responsive, gestione dei contenuti e ottimizzazione SEO per aumentare la visibilità online.",
    tags: ["HTML", "CSS", "JavaScript", "PHP"],
    year: "2026",
    link: "https://ilplatano.ch",
  },
  {
    title: "Telegram Bots",
    desc: "Raccolta di bot Telegram automatizzati per notifiche, comandi personalizzati e integrazione con API esterne.",
    tags: ["Python", "Telegram API"],
    year: "2026",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function HeroTagline() {
  const [hovered, setHovered] = useState(false);
  const [displayedVerb, setDisplayedVerb] = useState("Creo");
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (!typing) return;
    const target = hovered ? "Distruggo" : "Creo";
    let i = 0;
    // Erase first
    const eraseInterval = setInterval(() => {
      setDisplayedVerb(prev => {
        if (prev.length <= 0) {
          clearInterval(eraseInterval);
          // Then type new word
          let j = 0;
          const typeInterval = setInterval(() => {
            j++;
            setDisplayedVerb(target.slice(0, j));
            if (j >= target.length) {
              clearInterval(typeInterval);
              setTyping(false);
            }
          }, 60);
          return "";
        }
        return prev.slice(0, -1);
      });
    }, 45);
    return () => clearInterval(eraseInterval);
  }, [typing, hovered]);

  const handleEnter = () => { setHovered(true); setTyping(true); };
  const handleLeave = () => { setHovered(false); setTyping(true); };

  return (
    <p
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
        color: "#888",
        maxWidth: "520px",
        lineHeight: "1.6",
        marginBottom: "2.5rem",
        animation: "fadeUp 0.7s ease 1.5s both",
        cursor: "default",
        userSelect: "none",
      }}
    >
      <span style={{ color: hovered ? "#E06060" : "#7C6EF7", transition: "color 0.2s", fontWeight: 500 }}>
        {displayedVerb}
        <span style={{ animation: "blink 1s step-end infinite", color: hovered ? "#E06060" : "#7C6EF7" }}>|</span>
      </span>
      {" "}cose.
    </p>
  );
}

function SkillBar({ name, level, delay = 0 }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} style={{ marginBottom: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.85rem", color: "#F5F5F0" }}>{name}</span>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: "#7C6EF7" }}>{level}%</span>
      </div>
      <div style={{ height: "3px", background: "#2A2A2A", borderRadius: "2px", overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: inView ? `${level}%` : "0%",
          background: "linear-gradient(90deg, #7C6EF7, #A89CF7)",
          borderRadius: "2px",
          transition: `width 0.9s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
        }} />
      </div>
    </div>
  );
}

function ProjectCard({ title, desc, tags, year, link, delay = 0 }) {
  const { ref, inView } = useInView();
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#1E1E1E" : "#141414",
        border: `1px solid ${hovered ? "#7C6EF7" : "#242424"}`,
        borderRadius: "12px",
        padding: "2rem",
        cursor: "default",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms, background 0.2s, border 0.2s`,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
        <h3 style={{ fontFamily: "'DM Mono', monospace", fontSize: "1.1rem", color: "#F5F5F0", margin: 0 }}>{title}</h3>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: "#555", letterSpacing: "0.08em" }}>{year}</span>
      </div>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.88rem", color: "#888", lineHeight: "1.7", margin: "0 0 1.25rem" }}>{desc}</p>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {tags.map(tag => (
            <span key={tag} style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.7rem",
              color: "#7C6EF7",
              background: "rgba(124,110,247,0.1)",
              border: "1px solid rgba(124,110,247,0.2)",
              borderRadius: "4px",
              padding: "0.25rem 0.6rem",
            }}>{tag}</span>
          ))}
        </div>
        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer" style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.7rem",
            color: "#555",
            textDecoration: "none",
            transition: "color 0.2s",
            whiteSpace: "nowrap",
            marginLeft: "0.75rem",
          }}
            onMouseEnter={e => e.target.style.color = "#7C6EF7"}
            onMouseLeave={e => e.target.style.color = "#555"}
          >↗ {link.replace("https://", "")}</a>
        )}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("Home");
  const [nameDisplayed, setNameDisplayed] = useState("");
  const [nameDone, setNameDone] = useState(false);
  const { ref: contactRef, inView: contactInView } = useInView();

  // Typewriter for name
  useEffect(() => {
    const name = "Francesco Sulpizio";
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setNameDisplayed(name.slice(0, i));
        if (i >= name.length) { clearInterval(interval); setNameDone(true); }
      }, 70);
      return () => clearInterval(interval);
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "skills", "progetti", "contatti"];
      for (const s of [...sections].reverse()) {
        const el = document.getElementById(s);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(s.charAt(0).toUpperCase() + s.slice(1));
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const styles = {
    root: { background: "#0A0A0A", color: "#F5F5F0", minHeight: "100vh", fontFamily: "Inter, sans-serif", margin: 0 },
    nav: {
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "1.25rem 3rem",
      background: "rgba(10,10,10,0.85)", backdropFilter: "blur(12px)",
      borderBottom: "1px solid #1A1A1A",
    },
    logo: { fontFamily: "'DM Mono', monospace", fontSize: "0.9rem", color: "#7C6EF7", letterSpacing: "0.04em" },
    navLinks: { display: "flex", gap: "2rem", listStyle: "none", margin: 0, padding: 0 },
    section: { padding: "7rem 3rem", maxWidth: "960px", margin: "0 auto" },
    sectionLabel: {
      fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: "#7C6EF7",
      letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1rem",
    },
    sectionTitle: {
      fontFamily: "'DM Mono', monospace", fontSize: "clamp(1.4rem, 3vw, 2rem)",
      color: "#F5F5F0", fontWeight: 400, margin: "0 0 3rem",
    },
  };

  return (
    <div style={styles.root}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #0A0A0A; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        ::selection { background: rgba(124,110,247,0.3); }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0A0A0A; }
        ::-webkit-scrollbar-thumb { background: #2A2A2A; border-radius: 2px; }
      `}</style>

      {/* Nav */}
      <nav style={styles.nav}>
        <span style={styles.logo}>fs.dev</span>
        <ul style={styles.navLinks}>
          {NAV_LINKS.map(link => (
            <li key={link}>
              <button
                onClick={() => scrollTo(link.toLowerCase())}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "Inter, sans-serif", fontSize: "0.85rem",
                  color: activeSection === link ? "#F5F5F0" : "#555",
                  transition: "color 0.2s", padding: "0.25rem 0",
                  borderBottom: activeSection === link ? "1px solid #7C6EF7" : "1px solid transparent",
                }}
              >{link}</button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Hero */}
      <section id="home" style={{ ...styles.section, paddingTop: "13rem", paddingBottom: "9rem", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <p style={{ ...styles.sectionLabel, animation: "fadeIn 0.6s ease 0.2s both" }}>Sviluppatore Web & Software</p>
        <h1 style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
          fontWeight: 400, lineHeight: 1.1,
          marginBottom: "1.75rem", color: "#F5F5F0",
          animation: "fadeIn 0.6s ease 0.3s both",
        }}>
          {nameDisplayed}
          <span style={{ animation: nameDone ? "blink 1s step-end infinite" : "none", color: "#7C6EF7" }}>_</span>
        </h1>

        <HeroTagline />

        <p style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.7rem",
          color: "#3A3A3A",
          marginTop: "-1.75rem",
          marginBottom: "2.5rem",
          letterSpacing: "0.05em",
          animation: "fadeUp 0.7s ease 1.6s both",
        }}>
          ↑ passa il cursore
        </p>

        <div style={{ display: "flex", gap: "1rem", animation: "fadeUp 0.7s ease 1.7s both" }}>
          <button
            onClick={() => scrollTo("progetti")}
            style={{
              background: "#7C6EF7", border: "none", borderRadius: "6px",
              color: "#fff", fontFamily: "Inter, sans-serif", fontSize: "0.85rem",
              padding: "0.75rem 1.75rem", cursor: "pointer", transition: "opacity 0.2s",
            }}
            onMouseEnter={e => e.target.style.opacity = "0.85"}
            onMouseLeave={e => e.target.style.opacity = "1"}
          >Vedi i Progetti</button>
          <button
            onClick={() => scrollTo("contatti")}
            style={{
              background: "none", border: "1px solid #2A2A2A", borderRadius: "6px",
              color: "#888", fontFamily: "Inter, sans-serif", fontSize: "0.85rem",
              padding: "0.75rem 1.75rem", cursor: "pointer", transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={e => { e.target.style.borderColor = "#7C6EF7"; e.target.style.color = "#F5F5F0"; }}
            onMouseLeave={e => { e.target.style.borderColor = "#2A2A2A"; e.target.style.color = "#888"; }}
          >Contattami</button>
        </div>
      </section>

      {/* Divider */}
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 3rem" }}>
        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #1E1E1E, transparent)" }} />
      </div>

      {/* Skills */}
      <section id="skills" style={styles.section}>
        <p style={styles.sectionLabel}>Competenze</p>
        <h2 style={styles.sectionTitle}>Stack Tecnologico</h2>
        <div style={{ maxWidth: "580px" }}>
          {SKILLS.map((s, i) => (
            <SkillBar key={s.name} name={s.name} level={s.level} delay={i * 80} />
          ))}
        </div>
      </section>

      {/* Divider */}
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 3rem" }}>
        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #1E1E1E, transparent)" }} />
      </div>

      {/* Projects */}
      <section id="progetti" style={styles.section}>
        <p style={styles.sectionLabel}>Lavori selezionati</p>
        <h2 style={styles.sectionTitle}>Progetti</h2>
        <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} {...p} delay={i * 100} />
          ))}
        </div>
      </section>

      {/* Divider */}
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 3rem" }}>
        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #1E1E1E, transparent)" }} />
      </div>

      {/* Contact */}
      <section id="contatti" style={{ ...styles.section, paddingBottom: "9rem" }}>
        <p style={styles.sectionLabel}>Parliamoci</p>
        <div
          ref={contactRef}
          style={{
            opacity: contactInView ? 1 : 0,
            transform: contactInView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <h2 style={{ fontFamily: "'DM Mono', monospace", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 400, color: "#F5F5F0", marginBottom: "1rem", lineHeight: 1.2 }}>
            Hai un progetto<br />
            <span style={{ color: "#7C6EF7" }}>in mente?</span>
          </h2>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", color: "#666", lineHeight: "1.8", maxWidth: "400px", marginBottom: "2.5rem" }}>
            Sono disponibile per collaborazioni e nuove opportunità. Scrivimi, rispondo entro 24 ore.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              { label: "Email", value: "sulpiziofrancesco05@gmail.com", href: "mailto:sulpiziofrancesco05@gmail.com" },
              { label: "GitHub", value: "github.com/Solstiziohash", href: "https://github.com/Solstiziohash" },
              { label: "LinkedIn", value: "linkedin.com/in/francesco-s-96ab19379", href: "https://www.linkedin.com/in/francesco-s-96ab19379/" },
            ].map(({ label, value, href }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color: "#444", letterSpacing: "0.1em", textTransform: "uppercase", width: "64px" }}>{label}</span>
                <a href={href} target="_blank" rel="noopener noreferrer" style={{
                  fontFamily: "'DM Mono', monospace", fontSize: "0.85rem", color: "#888",
                  textDecoration: "none", transition: "color 0.2s",
                }}
                  onMouseEnter={e => e.target.style.color = "#7C6EF7"}
                  onMouseLeave={e => e.target.style.color = "#888"}
                >{value}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid #141414", padding: "1.75rem 3rem",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        maxWidth: "960px", margin: "0 auto",
      }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: "#333" }}>© 2026 Francesco Sulpizio</span>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: "#333" }}>Fatto con precisione</span>
      </footer>
    </div>
  );
}
