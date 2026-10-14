"use client";

import Image from "next/image";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  Bath,
  BedDouble,
  Building2,
  ChevronRight,
  Clock3,
  Mail,
  MapPin,
  Menu,
  Phone,
  Quote,
  Ruler,
  Sparkles,
  Trees,
  X,
} from "lucide-react";
import {
  FormEvent,
  KeyboardEvent,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const features = [
  ["Modern living upgrades", "Voice and app controls place light, climate, privacy, and security within effortless reach.", Sparkles],
  ["Considered architecture", "Long sightlines, honest materials, and carefully framed daylight make every room feel composed.", Building2],
  ["A private city retreat", "Thoughtful landscaping and acoustic insulation create calm without disconnecting you from New York.", Trees],
] as const;

const rooms = [
  ["Living room", "The living room is the heart of the home—a space designed for comfort, relaxation, and gathering.", "250 m²", "Living", "White", "/media/property-03.avif"],
  ["Dining room", "The dining room serves as the home’s centerpiece—a place crafted for comfort, ease, and time together.", "300 m²", "Dining", "Brown", "/media/property-04.avif"],
  ["Kitchen", "The heart of every home is the kitchen—a generous space for cooking, unwinding, and connecting.", "200 m²", "Kitchen", "Cream", "/media/property-06.avif"],
  ["Playground", "A garden room made for movement, warmth, rest, and unhurried moments shared with loved ones.", "350 m²", "Garden", "Green", "/media/property-09.avif"],
  ["Swimming pool", "The pool anchors the home—offering a private haven for comfort, calm, and meaningful conversation.", "150 m²", "Pool", "Stone", "/media/property-10.avif"],
] as const;

const plans = [
  ["Apartment", "4", "2,200 sq ft", "/media/property-13.avif"],
  ["Simplex", "2", "1,860 sq ft", "/media/property-14.avif"],
  ["Duplex", "2", "3,240 sq ft", "/media/property-15.avif"],
  ["Studio", "6", "980 sq ft", "/media/property-16.avif"],
] as const;

const reviews = [
  ["Working with OneArc feels like a partnership; every detail was met with care, clarity, and genuine respect for how we wanted to live.", "Alonso D. Dowson", "House owner"],
  ["The process felt unusually calm. We always knew what came next, and the finished home is even more considered than the drawings promised.", "Miranda Lee", "Resident"],
  ["OneArc balances character and restraint beautifully. It is rare to find a home that photographs well and lives even better.", "Nelson M.", "Property investor"],
] as const;

function ArcMark() {
  return <span className="arc-mark" aria-hidden="true"><span /></span>;
}

function Button({
  children,
  href = "#contact",
  variant = "dark",
}: {
  children: ReactNode;
  href?: string;
  variant?: "dark" | "light" | "outline";
}) {
  return (
    <a className={"button button--" + variant} href={href}>
      <span className="button__mask">
        <span className="button__inner">
          <span>{children}</span>
          <span aria-hidden="true">{children}</span>
        </span>
      </span>
      <ArrowRight size={15} aria-hidden="true" />
    </a>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow fade-up"><span />{children}</p>;
}

function Heading({
  children,
  className = "",
  level = 2,
}: {
  children: string;
  className?: string;
  level?: 1 | 2 | 3;
}) {
  const content = <span className="reveal-line"><span>{children}</span></span>;
  if (level === 1) return <h1 className={"reveal-heading " + className}>{content}</h1>;
  if (level === 3) return <h3 className={"reveal-heading " + className}>{content}</h3>;
  return <h2 className={"reveal-heading " + className}>{content}</h2>;
}

function Neighbourhood() {
  const pins = [
    ["5 star hotel", "1.3 km", "15%", "30%"],
    ["Hospital", "1.2 km", "69%", "22%"],
    ["Park", "1 km", "80%", "66%"],
    ["Shopping mall", "1 km", "31%", "70%"],
    ["School", "1.5 km", "54%", "82%"],
    ["Restaurant", ".5 km", "10%", "78%"],
  ];
  return (
    <div className="map-visual image-reveal" data-view="true">
      <Image src="/media/property-12.avif" alt="Neighbourhood surrounding OneArc Residence" fill sizes="100vw" />
      <div className="map-wash" />
      {pins.map(function (pin) {
        return (
          <div className="map-pin" style={{ left: pin[2], top: pin[3] }} key={pin[0]}>
            <MapPin size={14} aria-hidden="true" /><span>{pin[0]}</span><small>{pin[1]}</small>
          </div>
        );
      })}
      <div className="map-pin map-pin--home">
        <span className="pulse" /><Building2 size={17} aria-hidden="true" /><span>OneArc property</span>
      </div>
    </div>
  );
}

export function OneArcSite() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [feature, setFeature] = useState(0);
  const [plan, setPlan] = useState(0);
  const [review, setReview] = useState(0);
  const [paused, setPaused] = useState(false);
  const [sent, setSent] = useState(false);

  const planDetails = useMemo(function () {
    return [
      ["Residences", plans[plan][1]],
      ["Address", "1/A, Booston Tower, NYC"],
      ["Architecture", "Ronald Dowson"],
      ["Available", "Kitchen, balcony, dining, bedroom, storage"],
      ["Size", plans[plan][2]],
    ];
  }, [plan]);

  useEffect(function () {
    if (paused) return;
    const timer = window.setInterval(function () {
      setReview(function (current) { return (current + 1) % reviews.length; });
    }, 5000);
    return function () { window.clearInterval(timer); };
  }, [paused]);

  useEffect(function () {
    const track = rootRef.current?.querySelector<HTMLElement>(".review-track");
    const card = rootRef.current?.querySelector<HTMLElement>(".review-card");
    if (!track || !card) return;
    gsap.to(track, { x: -review * (card.offsetWidth + 20), duration: 0.8, ease: "power3.out" });
  }, [review]);

  useEffect(function () {
    gsap.registerPlugin(ScrollTrigger);
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cursor = root.querySelector<HTMLElement>(".cursor");
    const progress = root.querySelector<HTMLElement>(".scroll-progress");
    const header = root.querySelector<HTMLElement>(".site-header");
    let context: gsap.Context | null = null;
    let lenis: Lenis | null = null;
    let lastScroll = window.scrollY;
    let resizeTimer = 0;

    function updateChrome() {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progress) gsap.set(progress, { scaleX: max > 0 ? y / max : 0 });
      if (header) {
        header.classList.toggle("is-scrolled", y > 80);
        header.classList.toggle("is-hidden", y > lastScroll && y > 180);
      }
      lastScroll = y;
    }

    function initAnimations() {
      context?.revert();
      ScrollTrigger.getAll().forEach(function (trigger) { trigger.kill(); });
      const isReduced = reduced.matches;

      context = gsap.context(function () {
        const lines = gsap.utils.toArray<HTMLElement>(".reveal-line > span");
        const fades = gsap.utils.toArray<HTMLElement>(".fade-up");
        const images = gsap.utils.toArray<HTMLElement>(".image-reveal");

        gsap.set(lines, { yPercent: isReduced ? 0 : 110 });
        gsap.set(fades, { opacity: isReduced ? 1 : 0, y: isReduced ? 0 : 36, filter: isReduced ? "blur(0)" : "blur(6px)" });

        lines.forEach(function (line) {
          gsap.to(line, {
            yPercent: 0,
            duration: isReduced ? 0.2 : 0.9,
            ease: "power4.out",
            scrollTrigger: { trigger: line, start: "top 88%", once: true },
          });
        });

        fades.forEach(function (item) {
          gsap.to(item, {
            opacity: 1,
            y: 0,
            filter: "blur(0)",
            duration: isReduced ? 0.2 : 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 90%", once: true },
          });
        });

        images.forEach(function (frame) {
          if (isReduced) return;
          const image = frame.querySelector("img");
          gsap.from(frame, {
            clipPath: "inset(100% 0 0 0)",
            duration: 1.1,
            ease: "power4.out",
            scrollTrigger: { trigger: frame, start: "top 88%", once: true },
          });
          if (image) {
            gsap.from(image, {
              scale: 1.14,
              duration: 1.4,
              ease: "power3.out",
              scrollTrigger: { trigger: frame, start: "top 88%", once: true },
            });
          }
        });

        if (!isReduced) {
          gsap.timeline({
            scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.8 },
          })
            .to(".hero-copy", { y: -110, opacity: 0 }, 0)
            .to(".hero-media img", { scale: 1.12, yPercent: -7 }, 0)
            .fromTo(".hero-stats", { y: 70 }, { y: 0 }, 0);

          gsap.to(".marquee-row--one", {
            xPercent: -18,
            ease: "none",
            scrollTrigger: { trigger: ".marquee", start: "top bottom", end: "bottom top", scrub: 1 },
          });
          gsap.fromTo(".marquee-row--two", { xPercent: -18 }, {
            xPercent: 2,
            ease: "none",
            scrollTrigger: { trigger: ".marquee", start: "top bottom", end: "bottom top", scrub: 1 },
          });

          gsap.to(".dark-shell", {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            scrollTrigger: { trigger: ".dark-shell", start: "top bottom", end: "top top", scrub: true },
          });

          gsap.utils.toArray<HTMLElement>(".room-card").forEach(function (card) {
            const image = card.querySelector("img");
            if (!image) return;
            gsap.fromTo(image, { scale: 1.08 }, {
              scale: 1,
              ease: "none",
              scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: 1 },
            });
          });
        }

        gsap.utils.toArray<HTMLElement>(".counter").forEach(function (node) {
          const state = { value: 0 };
          const value = Number(node.dataset.value || 0);
          const decimals = Number(node.dataset.decimals || 0);
          gsap.to(state, {
            value,
            duration: isReduced ? 0.2 : 1.6,
            ease: "power2.out",
            scrollTrigger: { trigger: node, start: "top 90%", once: true },
            onUpdate: function () {
              let text = state.value.toFixed(decimals);
              if (node.dataset.comma === "true") text = text.replace(".", ",");
              node.textContent = text + (node.dataset.suffix || "");
            },
          });
        });

        gsap.from(".map-pin", {
          opacity: 0,
          scale: 0.6,
          stagger: 0.1,
          duration: 0.55,
          ease: "back.out(1.8)",
          scrollTrigger: { trigger: ".map-visual", start: "top 72%", once: true },
        });
      }, root);

      ScrollTrigger.refresh();
    }

    if (!reduced.matches) {
      lenis = new Lenis({
        duration: 1.2,
        easing: function (t) { return Math.min(1, 1.001 - 2 ** (-10 * t)); },
      });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = function (time: number) { lenis?.raf(time * 1000); };
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      (lenis as Lenis & { __tick?: (time: number) => void }).__tick = tick;
    }

    function pointerMove(event: PointerEvent) {
      if (!cursor) return;
      gsap.to(cursor, { x: event.clientX, y: event.clientY, duration: 0.18, ease: "power3.out" });
      const target = (event.target as HTMLElement).closest("[data-view='true']");
      cursor.classList.toggle("is-view", Boolean(target));
    }

    function resize() {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(initAnimations, 180);
    }

    initAnimations();
    updateChrome();
    window.addEventListener("scroll", updateChrome, { passive: true });
    window.addEventListener("pointermove", pointerMove, { passive: true });
    window.addEventListener("resize", resize);

    return function () {
      context?.revert();
      ScrollTrigger.getAll().forEach(function (trigger) { trigger.kill(); });
      if (lenis) {
        const tick = (lenis as Lenis & { __tick?: (time: number) => void }).__tick;
        if (tick) gsap.ticker.remove(tick);
        lenis.destroy();
      }
      window.clearTimeout(resizeTimer);
      window.removeEventListener("scroll", updateChrome);
      window.removeEventListener("pointermove", pointerMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  function switchPlan(next: number) {
    const panel = rootRef.current?.querySelector(".plan-content");
    if (!panel) {
      setPlan(next);
      return;
    }
    gsap.to(panel, {
      opacity: 0,
      y: -16,
      duration: 0.25,
      onComplete: function () {
        setPlan(next);
        window.requestAnimationFrame(function () {
          gsap.fromTo(panel, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" });
        });
      },
    });
  }

  function tabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    const next = (index + (event.key === "ArrowDown" ? 1 : -1) + plans.length) % plans.length;
    switchPlan(next);
    window.requestAnimationFrame(function () {
      rootRef.current?.querySelectorAll<HTMLButtonElement>("[role='tab']")[next]?.focus();
    });
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  const nav = [["Home", "home"], ["About", "about"], ["Rooms", "property"], ["Contact", "contact"]];
  const CurrentFeatureIcon = features[feature][2];

  return (
    <div ref={rootRef} className="site-shell">
      <div className="scroll-progress" aria-hidden="true" />
      <div className="cursor" aria-hidden="true"><span>View</span></div>

      <header className="site-header">
        <a href="#home" className="wordmark" aria-label="OneArc home"><ArcMark />OneArc</a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {nav.map(function (item) { return <a href={"#" + item[1]} key={item[0]}>{item[0]}</a>; })}
        </nav>
        <div className="header-actions">
          <Button href="#contact">Schedule a visit</Button>
          <button className="menu-button" type="button" onClick={function () { setMenuOpen(true); }} aria-label="Open menu"><Menu size={22} /></button>
        </div>
      </header>

      <div className={"mobile-menu " + (menuOpen ? "is-open" : "")} aria-hidden={!menuOpen}>
        <button type="button" onClick={function () { setMenuOpen(false); }} aria-label="Close menu"><X /></button>
        <nav aria-label="Mobile navigation">
          {nav.map(function (item, index) {
            return <a href={"#" + item[1]} key={item[0]} style={{ transitionDelay: String(index * 70) + "ms" }} onClick={function () { setMenuOpen(false); }}>{item[0]}</a>;
          })}
        </nav>
        <p>320 40th Street B4<br />New York, NY 10019</p>
      </div>

      <main>
        <section className="hero section" id="home">
          <div className="container hero-copy">
            <p className="hero-address fade-up">320 40th Street B4, New York, NY 10019</p>
            <Heading level={1} className="hero-title">OneArc Residence</Heading>
            <div className="hero-buttons fade-up"><Button href="#property">Discover more</Button><Button href="tel:+12345678900" variant="outline">Call us now</Button></div>
          </div>
          <div className="container hero-media image-reveal" data-view="true">
            <Image src="/media/property-01.avif" alt="OneArc Residence exterior" fill priority sizes="(max-width: 700px) 100vw, 1300px" />
            <div className="hero-index"><span>OneArc</span><span>Residence 01</span></div>
          </div>
          <div className="container hero-stats fade-up">
            {[
              ["3,665", "sq ft", "Property size", Ruler],
              ["8+", "", "Bedrooms", BedDouble],
              ["4+", "", "Bathrooms", Bath],
              ["2+", "", "Lower levels", Building2],
            ].map(function (stat) {
              const Icon = stat[3] as typeof Ruler;
              return <div className="hero-stat" key={String(stat[2])}><p>{String(stat[0])} <small>{String(stat[1])}</small></p><span>{String(stat[2])}</span><Icon size={19} aria-hidden="true" /></div>;
            })}
          </div>
        </section>

        <section className="section story" id="about">
          <div className="container">
            <Eyebrow>Why choose our property?</Eyebrow>
            <div className="story-grid">
              <div className="story-copy">
                <Heading>Discover the story behind this beautiful and considered property.</Heading>
                <p className="body-large fade-up">A quiet New York residence where architecture, technology, and daily life move together with ease.</p>
                <p className="fade-up">Voice and app-based automation keeps the home responsive while tactile materials and generous natural light make every room feel unmistakably human.</p>
                <Button href="#overview" variant="outline">Gallery overview</Button>
              </div>
              <div className="story-visual image-reveal" data-view="true">
                <Image src="/media/property-02.avif" alt="OneArc Residence interior" fill sizes="(max-width: 800px) 100vw, 50vw" />
                <span className="image-note">Natural light, from first coffee to last conversation.</span>
              </div>
              <article className="feature-card fade-up">
                <div className="feature-icon"><CurrentFeatureIcon size={23} /></div>
                <div className="feature-copy" key={feature}><h3>{features[feature][0]}</h3><p>{features[feature][1]}</p></div>
                <div className="feature-controls">
                  <button type="button" aria-label="Previous feature" onClick={function () { setFeature((feature - 1 + features.length) % features.length); }}><ArrowLeft size={17} /></button>
                  <button type="button" aria-label="Next feature" onClick={function () { setFeature((feature + 1) % features.length); }}><ArrowRight size={17} /></button>
                </div>
                <span className="feature-count">0{feature + 1} / 0{features.length}</span>
              </article>
            </div>
          </div>
        </section>

        <section className="marquee" aria-label="Property qualities">
          {["one", "two"].map(function (row) {
            return <div className={"marquee-row marquee-row--" + row} key={row}>
              {["Cutting-Edge Architecture", "Next-Gen Living", "Quality Living", "Cutting-Edge Architecture", "Next-Gen Living", "Quality Living"].map(function (label, index) {
                return <span key={label + String(index)}>{label}<ArrowDownRight size={22} /></span>;
              })}
            </div>;
          })}
        </section>

        <section className="section property" id="property">
          <div className="container section-intro centered"><Heading className="display-heading">Property</Heading><p className="fade-up">Room overview with a composed, livable point of view.</p></div>
          <div className="container room-stack">
            {rooms.map(function (room, index) {
              return (
                <article className={"room-card " + (index % 2 ? "is-reversed" : "")} style={{ top: String(86 + index * 12) + "px" }} key={room[0]}>
                  <div className="room-copy">
                    <span className="room-number">0{index + 1}</span><h3>{room[0]}</h3><p>{room[1]}</p>
                    <div className="chips">{[room[2], room[3], room[4]].map(function (chip) { return <span key={chip}>{chip}</span>; })}</div>
                    <a href="#floor-plans">Explore room <ArrowRight size={16} /></a>
                  </div>
                  <div className="room-image" data-view="true"><Image src={room[5]} alt={room[0] + " at OneArc Residence"} fill sizes="(max-width: 800px) 100vw, 55vw" /></div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="section overview" id="overview">
          <div className="container overview-head">
            <div><Eyebrow>Property overview</Eyebrow><Heading>Take a detailed look at this stunning property.</Heading></div>
            <p className="fade-up">Follow the residence from its bright social rooms to the quiet, private spaces below.</p>
          </div>
          <div className="container overview-stage">
            <aside className="overview-aside fade-up"><span>Video tour</span><p>A concise walkthrough and three perspectives reveal the home’s material palette and changing light.</p><div><span>01</span><i /><span>03</span></div></aside>
            <div className="overview-device" data-view="true">
              <div className="device-bar"><span /><span>OneArc walkthrough</span><span>•••</span></div>
              <video className="overview-video" autoPlay muted loop playsInline poster="/media/property-08.avif"><source src="/media/walkthrough.mp4" type="video/mp4" /></video>
            </div>
            <div className="overview-gallery">
              {["05", "07", "08"].map(function (number) {
                return <div className="image-reveal" data-view="true" key={number}><Image src={"/media/property-" + number + ".avif"} alt={"OneArc interior detail " + number} fill sizes="(max-width: 800px) 100vw, 30vw" /></div>;
              })}
            </div>
          </div>
        </section>

        <section className="section neighbourhood">
          <div className="container split-heading"><div><Eyebrow>Neighbourhood</Eyebrow><Heading>Everything you need, close enough to feel effortless.</Heading></div><p className="fade-up">Green space, culture, dining, and everyday essentials form a walkable extension of home.</p></div>
          <div className="container"><Neighbourhood /></div>
        </section>

        <section className="section floor-plans" id="floor-plans">
          <div className="container split-heading"><div><Eyebrow>Floor planning</Eyebrow><Heading>Explore every level with our detailed floor planning.</Heading></div><p className="fade-up">Compare four considered layouts, each balancing privacy, daylight, and everyday flow.</p></div>
          <div className="container plans-layout">
            <div className="plan-tabs" role="tablist" aria-label="Floor plan types" aria-orientation="vertical">
              {plans.map(function (item, index) {
                return <button type="button" role="tab" aria-selected={plan === index} aria-controls="plan-panel" tabIndex={plan === index ? 0 : -1} className={plan === index ? "is-active" : ""} onClick={function () { switchPlan(index); }} onKeyDown={function (event) { tabKey(event, index); }} key={item[0]}>{item[0]}<ArrowRight size={18} /></button>;
              })}
            </div>
            <div className="plan-content" id="plan-panel" role="tabpanel">
              <div className="plan-graphic" data-view="true"><Image src={plans[plan][3]} alt={plans[plan][0] + " floor plan"} fill sizes="(max-width: 800px) 100vw, 40vw" /></div>
              <div className="plan-details">
                <span className="plan-label">Plan 0{plan + 1}</span><h3>{plans[plan][0]}</h3>
                <dl>{planDetails.map(function (detail) { return <div key={detail[0]}><dt>{detail[0]}</dt><dd>{detail[1]}</dd></div>; })}</dl>
                <div className="plan-actions"><Button href="#contact">Book a visit</Button><Button href="tel:+12345678900" variant="outline">Call us now</Button></div>
              </div>
            </div>
          </div>
        </section>

        <section className="section contact" id="contact">
          <div className="container section-intro centered"><Heading className="display-heading">Any inquiry</Heading><p className="fade-up">Get in touch.</p></div>
          <div className="container contact-grid">
            <div className="contact-info">
              <Eyebrow>Catch us here</Eyebrow><h3 className="fade-up">A conversation is the best place to begin.</h3>
              {[
                [Mail, "Email", "info@onearc.com", "mailto:info@onearc.com"],
                [Phone, "Phone", "+123 456 789 00", "tel:+12345678900"],
                [MapPin, "Address", "14960 Florence Trail, Apple Valley, MN 55124", "#contact"],
                [Clock3, "Hours", "Monday – Sunday, 9am – 7pm EST", "#contact"],
              ].map(function (row) {
                const Icon = row[0] as typeof Mail;
                return <a className="contact-row fade-up" href={String(row[3])} key={String(row[1])}><Icon size={20} /><span><small>{String(row[1])}</small>{String(row[2])}</span><ChevronRight size={18} /></a>;
              })}
            </div>
            <form className="contact-form fade-up" onSubmit={submit}>
              <label><input name="name" required placeholder=" " /><span>Name</span></label>
              <label><input name="email" required type="email" placeholder=" " /><span>Email</span></label>
              <label><input name="subject" required placeholder=" " /><span>Subject</span></label>
              <label className="select-label"><select name="budget" defaultValue=""><option value="" disabled>Choose budget</option><option>$9,200 – $10,200</option><option>$10,200 – $15,000</option><option>$15,000+</option></select><span>Budget</span></label>
              <label className="form-message"><textarea name="message" required placeholder=" " rows={5} /><span>Message</span></label>
              <button className="form-submit" type="submit"><span>{sent ? "Thank you — we’ll be in touch" : "Get a free quote"}</span><ArrowRight size={18} /></button>
            </form>
          </div>
        </section>

        <section className="section facts">
          <div className="container"><Eyebrow>Some more fun facts about the company</Eyebrow>
            <div className="facts-grid">
              {[
                [1, 0, "k+", "Properties delivered"],
                [2.3, 1, "k+", "Clients served worldwide"],
                [5, 0, "+", "Design awards"],
                [12, 0, "+", "Daily quote messages"],
                [4.9, 1, "", "Rating out of 5.0"],
              ].map(function (fact) {
                return <div className="fact fade-up" key={String(fact[3])}><strong className="counter" data-value={fact[0]} data-decimals={fact[1]} data-suffix={fact[2]}>0{String(fact[2])}</strong><span>{String(fact[3])}</span></div>;
              })}
            </div>
          </div>
        </section>

        <section className="section reviews">
          <div className="container reviews-head"><Eyebrow>Property review</Eyebrow><div><Heading>Home—a space designed for comfort.</Heading><p><strong>4.9</strong> / 5.0</p></div></div>
          <div className="container review-stage" onMouseEnter={function () { setPaused(true); }} onMouseLeave={function () { setPaused(false); }}>
            <div className="review-track">
              {reviews.map(function (item, index) {
                return <article className={"review-card " + (index % 2 ? "review-card--light" : "")} key={item[1]}><p>“{item[0]}”</p><div><span>{item[1]}</span><small>{item[2]}</small></div><Quote size={54} /></article>;
              })}
            </div>
            <div className="review-controls"><button type="button" aria-label="Previous review" onClick={function () { setReview((review - 1 + reviews.length) % reviews.length); }}><ArrowLeft /></button><span>0{review + 1} / 0{reviews.length}</span><button type="button" aria-label="Next review" onClick={function () { setReview((review + 1) % reviews.length); }}><ArrowRight /></button></div>
          </div>
          <div className="container review-list">
            {["Alonso D.", "Miranda", "Nelson M.", "Alvon B."].map(function (name, index) {
              return <div className="fade-up" key={name}><span>0{index + 1}</span><strong>{name}</strong><p>{["A rare sense of calm.", "Thoughtful at every turn.", "Quietly exceptional.", "Feels made for real life."][index]}</p><ArrowDownRight /></div>;
            })}
          </div>
          <div className="container savings-card">
            <Image src="/media/property-11.avif" alt="OneArc private interior" fill sizes="100vw" />
            <div><Eyebrow>Quality house solutions</Eyebrow><p>On average for home owner cost savings.</p><strong className="counter" data-value="98.8" data-decimals="1" data-comma="true" data-suffix="%">0%</strong></div>
          </div>
        </section>

        <section className="dark-shell">
          <div className="container cta-grid">
            <div className="cta-copy">
              <a href="#home" className="wordmark wordmark--light"><ArcMark />OneArc</a>
              <Heading>Let’s help you find the perfect property—or top value for the one you own.</Heading>
              <div className="contact-lines"><a href="tel:+12345678900"><span>+123 456 789 00</span><ArrowDownRight /></a><a href="mailto:info@onearc.com"><span>info@onearc.com</span><ArrowDownRight /></a></div>
            </div>
            <div className="cta-image" data-view="true"><Image src="/media/property-11.avif" alt="OneArc private interior" fill sizes="(max-width: 800px) 100vw, 50vw" /></div>
          </div>
          <footer className="container footer">
            <div className="socials"><span>Follow us.</span>{[["𝕏", "X"], ["◎", "Instagram"], ["in", "LinkedIn"], ["▶", "YouTube"]].map(function (social) { return <a href="#home" aria-label={social[1]} key={social[1]}><b>{social[0]}</b></a>; })}</div>
            <div className="footer-bottom"><p>Copyright and design by @YourStudio — 2026</p><nav><a href="#about">About us</a><a href="#property">Properties</a><a href="#floor-plans">Planning</a><a href="#home">Top</a></nav></div>
          </footer>
        </section>
      </main>
    </div>
  );
}
