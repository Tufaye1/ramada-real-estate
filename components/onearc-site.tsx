"use client";

import Image from "next/image";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
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
  ["Trust", "The price, delivery expectations, and partnership terms are made clear before work begins.", Sparkles],
  ["Transparency", "Landowners and investors see how the project is structured, costed, and delivered.", Building2],
  ["Community", "Every Ramada project is designed to create lasting value for families and neighbourhoods.", Trees],
] as const;

const rooms = [
  ["Land share", "Turn your plot into a share of the finished building, with ownership, profit-share terms, and Shariah review handled before you sign.", "Keep ownership", "Asset share", "Shariah-reviewed", "/media/property-03.avif"],
  ["Property development", "We co-develop with landowners and investors on terms agreed upfront, including unit split, cost sharing, and timeline.", "Unit split", "Open-book", "Approvals", "/media/property-04.avif"],
  ["Construction service", "One quote, one schedule, and one point of contact—from planning and procurement through finishing.", "Fixed price", "Milestones", "Site reporting", "/media/property-06.avif"],
  ["Ready flat sale", "See the actual residence and receive the full price, payment schedule, and ownership documents on the same visit.", "Real unit", "Full price", "Clean title", "/media/property-09.avif"],
  ["Halal investment", "Asset-backed real estate investment with interest-free structuring, investor reporting, and independent Shariah oversight.", "No riba", "Reporting", "Asset-backed", "/media/property-10.avif"],
] as const;

const plans = [
  ["Land Share", "Landowner", "Keep ownership while sharing in the completed asset", "/media/property-13.avif"],
  ["Development", "Partner", "Co-develop with terms and costs agreed upfront", "/media/property-14.avif"],
  ["Construction", "Client", "Fixed-price delivery with milestone reporting", "/media/property-15.avif"],
  ["Ready Flats", "Buyer", "View the real unit and full ownership documents", "/media/property-16.avif"],
  ["Investment", "Investor", "Interest-free, asset-backed real estate participation", "/media/property-13.avif"],
] as const;

const reviews = [
  ["We build a great relation with them, due to their...", "Mr. Hamid", "Land owner"],
  ["The communication was exceptional...", "Mahmud H", "Land owner partner"],
  ["Three projects in...", "Rashid M", "Investor since 2019"],
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
    ["Schools", "Bashundhara", "15%", "30%"],
    ["Healthcare", "Bashundhara", "69%", "22%"],
    ["Green space", "Bashundhara", "80%", "66%"],
    ["Shopping", "Bashundhara", "31%", "70%"],
    ["Community", "Bashundhara", "54%", "82%"],
    ["Dining", "Bashundhara", "10%", "78%"],
  ];
  return (
    <div className="map-visual image-reveal" data-view="true">
      <Image src="/media/property-12.avif" alt="Neighbourhood surrounding Ramada Dream House" fill sizes="100vw" />
      <div className="map-wash" />
      {pins.map(function (pin) {
        return (
          <div className="map-pin" style={{ left: pin[2], top: pin[3] }} key={pin[0]}>
            <MapPin size={14} aria-hidden="true" /><span>{pin[0]}</span><small>{pin[1]}</small>
          </div>
        );
      })}
      <div className="map-pin map-pin--home">
        <span className="pulse" /><Building2 size={17} aria-hidden="true" /><span>Ramada Dream House</span>
      </div>
    </div>
  );
}

export function RamadaSite() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [feature, setFeature] = useState(0);
  const [plan, setPlan] = useState(0);
  const [review, setReview] = useState(0);
  const [paused, setPaused] = useState(false);
  const [sent, setSent] = useState(false);

  const planDetails = useMemo(function () {
    return [
      ["For", plans[plan][1]],
      ["Base", "Bashundhara R/A, Dhaka"],
      ["Terms", "Defined before work begins"],
      ["Standard", "Transparent and Shariah-conscious"],
      ["Focus", plans[plan][2]],
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

  const nav = [["Home", "home"], ["About", "about"], ["Services", "property"], ["Project", "overview"], ["Contact", "contact"]];
  const CurrentFeatureIcon = features[feature][2];

  return (
    <div ref={rootRef} className="site-shell">
      <div className="scroll-progress" aria-hidden="true" />
      <div className="cursor" aria-hidden="true"><span>View</span></div>

      <header className="site-header">
        <a href="#home" className="wordmark" aria-label="Ramada home"><ArcMark />Ramada</a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {nav.map(function (item) { return <a href={"#" + item[1]} key={item[0]}>{item[0]}</a>; })}
        </nav>
        <div className="header-actions">
          <Button href="#contact">Let&apos;s connect</Button>
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
        <p>5th Floor, Rupayan Shopping Square<br />Bashundhara R/A, Dhaka 1229</p>
      </div>

      <main>
        <section className="hero section" id="home">
          <div className="container hero-copy">
            <p className="hero-address fade-up">Halal real estate · Dhaka</p>
            <Heading level={1} className="hero-title">Your land is worth more than you&apos;ve been offered.</Heading>
            <div className="hero-buttons fade-up"><Button href="#contact">Get a free land valuation</Button><Button href="#overview" variant="outline">See our project</Button></div>
          </div>
          <div className="container hero-media image-reveal" data-view="true">
            <Image src="/media/property-01.avif" alt="Ramada Dream House exterior" fill priority sizes="(max-width: 700px) 100vw, 1300px" />
            <div className="hero-index"><span>Ramada Builders</span><span>Dream House 01</span></div>
          </div>
          <div className="container hero-stats fade-up">
            {[
              ["2026", "", "Established", Building2],
              ["4", "", "Founders", BedDouble],
              ["5", "", "Ways to work", Ruler],
              ["1", "", "Featured project", Building2],
            ].map(function (stat) {
              const Icon = stat[3] as typeof Ruler;
              return <div className="hero-stat" key={String(stat[2])}><p>{String(stat[0])} <small>{String(stat[1])}</small></p><span>{String(stat[2])}</span><Icon size={19} aria-hidden="true" /></div>;
            })}
          </div>
        </section>

        <section className="section story" id="about">
          <div className="container">
            <Eyebrow>Why Ramada</Eyebrow>
            <div className="story-grid">
              <div className="story-copy">
                <Heading>We started Ramada because we were tired of watching people get burned.</Heading>
                <p className="body-large fade-up">Four friends. Telecom, banking, global trade, and energy. 71 years of running businesses where the numbers had to add up.</p>
                <p className="fade-up">Ramada was built around trust, transparent dealings, craftsmanship, and decisions measured in decades—not quarters.</p>
                <Button href="#overview" variant="outline">Meet our project</Button>
              </div>
              <div className="story-visual image-reveal" data-view="true">
                <Image src="/media/property-02.avif" alt="Ramada residential interior" fill sizes="(max-width: 800px) 100vw, 50vw" />
                <span className="image-note">Four founders. One accountable team.</span>
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
              {["Fixed Terms", "Transparent Costing", "Halal Structure", "Fixed Terms", "Transparent Costing", "Halal Structure"].map(function (label, index) {
                return <span key={label + String(index)}>{label}<ArrowDownRight size={22} /></span>;
              })}
            </div>;
          })}
        </section>

        <section className="section property" id="property">
          <div className="container section-intro centered"><Heading className="display-heading">Five ways in</Heading><p className="fade-up">You own land. You want a flat. You want returns. Start anywhere.</p></div>
          <div className="container room-stack">
            {rooms.map(function (room, index) {
              return (
                <article className={"room-card " + (index % 2 ? "is-reversed" : "")} style={{ top: String(86 + index * 12) + "px" }} key={room[0]}>
                  <div className="room-copy">
                    <span className="room-number">0{index + 1}</span><h3>{room[0]}</h3><p>{room[1]}</p>
                    <div className="chips">{[room[2], room[3], room[4]].map(function (chip) { return <span key={chip}>{chip}</span>; })}</div>
                    <a href="#floor-plans">Discuss this service <ArrowRight size={16} /></a>
                  </div>
                  <div className="room-image" data-view="true"><Image src={room[5]} alt={room[0] + " by Ramada Builders"} fill sizes="(max-width: 800px) 100vw, 55vw" /></div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="section overview" id="overview">
          <div className="container overview-head">
            <div><Eyebrow>Featured project</Eyebrow><Heading>Ramada Dream House — Bashundhara R/A, Block N.</Heading></div>
            <p className="fade-up">Now in construction, for families who want space without leaving Dhaka&apos;s protected residential grid.</p>
          </div>
          <div className="container overview-stage">
            <aside className="overview-aside fade-up"><span>Project view</span><p>A concise look at the spaces, materials, and everyday living Ramada is building toward.</p><div><span>01</span><i /><span>03</span></div></aside>
            <div className="overview-device" data-view="true">
              <div className="device-bar"><span /><span>Ramada Dream House</span><span>•••</span></div>
              <video className="overview-video" autoPlay muted loop playsInline poster="/media/property-08.avif"><source src="/media/walkthrough.mp4" type="video/mp4" /></video>
            </div>
            <div className="overview-gallery">
              {["05", "07", "08"].map(function (number) {
                return <div className="image-reveal" data-view="true" key={number}><Image src={"/media/property-" + number + ".avif"} alt={"Ramada Dream House detail " + number} fill sizes="(max-width: 800px) 100vw, 30vw" /></div>;
              })}
            </div>
          </div>
        </section>

        <section className="section neighbourhood">
          <div className="container split-heading"><div><Eyebrow>Location</Eyebrow><Heading>A Bashundhara address shaped for family life.</Heading></div><p className="fade-up">Ramada Dream House is located in Block N, within one of Dhaka&apos;s most established residential communities.</p></div>
          <div className="container"><Neighbourhood /></div>
        </section>

        <section className="section floor-plans" id="floor-plans">
          <div className="container split-heading"><div><Eyebrow>Services</Eyebrow><Heading>Five ways in. One standard throughout.</Heading></div><p className="fade-up">Whether you&apos;re handing us land, buying a flat, or putting capital to work, the terms are made clear before you begin.</p></div>
          <div className="container plans-layout">
            <div className="plan-tabs" role="tablist" aria-label="Ramada service types" aria-orientation="vertical">
              {plans.map(function (item, index) {
                return <button type="button" role="tab" aria-selected={plan === index} aria-controls="plan-panel" tabIndex={plan === index ? 0 : -1} className={plan === index ? "is-active" : ""} onClick={function () { switchPlan(index); }} onKeyDown={function (event) { tabKey(event, index); }} key={item[0]}>{item[0]}<ArrowRight size={18} /></button>;
              })}
            </div>
            <div className="plan-content" id="plan-panel" role="tabpanel">
              <div className="plan-graphic" data-view="true"><Image src={plans[plan][3]} alt={plans[plan][0] + " planning by Ramada"} fill sizes="(max-width: 800px) 100vw, 40vw" /></div>
              <div className="plan-details">
                <span className="plan-label">Service 0{plan + 1}</span><h3>{plans[plan][0]}</h3>
                <dl>{planDetails.map(function (detail) { return <div key={detail[0]}><dt>{detail[0]}</dt><dd>{detail[1]}</dd></div>; })}</dl>
                <div className="plan-actions"><Button href="#contact">Discuss this service</Button><Button href="tel:+8801711481155" variant="outline">Call us now</Button></div>
              </div>
            </div>
          </div>
        </section>

        <section className="section contact" id="contact">
          <div className="container section-intro centered"><Heading className="display-heading">Let&apos;s connect</Heading><p className="fade-up">Tell us what you&apos;re thinking. We&apos;ll tell you straight.</p></div>
          <div className="container contact-grid">
            <div className="contact-info">
              <Eyebrow>Ramada Builders Ltd.</Eyebrow><h3 className="fade-up">A real person from the Ramada team replies within one working day.</h3>
              {[
                [Mail, "Email", "info@ramadabuildersltd.com", "mailto:info@ramadabuildersltd.com"],
                [Phone, "Phone", "+880 1711 48 11 55", "tel:+8801711481155"],
                [MapPin, "Address", "5th Floor, Rupayan Shopping Square, Plot 2, Block G, Bashundhara R/A, Dhaka 1229", "#contact"],
                [Clock3, "Hours", "Saturday – Thursday, 9:00 AM – 5:00 PM", "#contact"],
              ].map(function (row) {
                const Icon = row[0] as typeof Mail;
                return <a className="contact-row fade-up" href={String(row[3])} key={String(row[1])}><Icon size={20} /><span><small>{String(row[1])}</small>{String(row[2])}</span><ChevronRight size={18} /></a>;
              })}
            </div>
            <form className="contact-form fade-up" onSubmit={submit}>
              <label className="select-label"><select name="inquiry" required defaultValue=""><option value="" disabled>Select one</option><option>Buyer / Investor</option><option>Landowner</option></select><span>I am a...</span></label>
              <label><input name="name" required placeholder=" " /><span>Full name</span></label>
              <label><input name="phone" required type="tel" placeholder=" " /><span>Phone (WhatsApp preferred)</span></label>
              <label><input name="email" type="email" placeholder=" " /><span>Email</span></label>
              <label><input name="budget" placeholder=" " /><span>Budget or plot size (optional)</span></label>
              <label className="form-message"><textarea name="message" required placeholder=" " rows={5} /><span>What are you considering?</span></label>
              <button className="form-submit" type="submit"><span>{sent ? "Thank you — we’ll be in touch" : "Send my inquiry"}</span><ArrowRight size={18} /></button>
            </form>
          </div>
        </section>

        <section className="section facts">
          <div className="container"><Eyebrow>Ramada at a glance</Eyebrow>
            <div className="facts-grid">
              {[
                [4, 0, "", "Founders"],
                [71, 0, "+", "Combined years in business"],
                [5, 0, "", "Ways to work with us"],
                [1, 0, "", "Featured project"],
                [2026, 0, "", "Established"],
              ].map(function (fact) {
                return <div className="fact fade-up" key={String(fact[3])}><strong className="counter" data-value={fact[0]} data-decimals={fact[1]} data-suffix={fact[2]}>0{String(fact[2])}</strong><span>{String(fact[3])}</span></div>;
              })}
            </div>
          </div>
        </section>

        <section className="section reviews">
          <div className="container reviews-head"><Eyebrow>Landowner and investor voices</Eyebrow><div><Heading>Relationships built for the long view.</Heading><p><strong>3</strong> voices</p></div></div>
          <div className="container review-stage" onMouseEnter={function () { setPaused(true); }} onMouseLeave={function () { setPaused(false); }}>
            <div className="review-track">
              {reviews.map(function (item, index) {
                return <article className={"review-card " + (index % 2 ? "review-card--light" : "")} key={item[1]}><p>“{item[0]}”</p><div><span>{item[1]}</span><small>{item[2]}</small></div><Quote size={54} /></article>;
              })}
            </div>
            <div className="review-controls"><button type="button" aria-label="Previous review" onClick={function () { setReview((review - 1 + reviews.length) % reviews.length); }}><ArrowLeft /></button><span>0{review + 1} / 0{reviews.length}</span><button type="button" aria-label="Next review" onClick={function () { setReview((review + 1) % reviews.length); }}><ArrowRight /></button></div>
          </div>
          <div className="container review-list">
            {["Fixed terms", "Transparent costing", "Halal structure", "Leadership access"].map(function (name, index) {
              return <div className="fade-up" key={name}><span>0{index + 1}</span><strong>{name}</strong><p>{["Agreed before work begins.", "A clear view of project costs.", "Reviewed with independent oversight.", "Direct accountability from the team."][index]}</p><ArrowDownRight /></div>;
            })}
          </div>
          <div className="container savings-card">
            <Image src="/media/property-11.avif" alt="Ramada residential interior" fill sizes="100vw" />
            <div><Eyebrow>Four founders</Eyebrow><p>Combined experience across telecom, banking, global trade, and energy.</p><strong className="counter" data-value="71" data-decimals="0" data-suffix="+">0+</strong></div>
          </div>
        </section>

        <section className="dark-shell">
          <div className="container cta-grid">
            <div className="cta-copy">
              <a href="#home" className="wordmark wordmark--light"><ArcMark />Ramada</a>
              <Heading>Tell us what you&apos;re considering. We&apos;ll tell you straight.</Heading>
              <div className="contact-lines"><a href="tel:+8801711481155"><span>+880 1711 48 11 55</span><ArrowDownRight /></a><a href="mailto:info@ramadabuildersltd.com"><span>info@ramadabuildersltd.com</span><ArrowDownRight /></a></div>
            </div>
            <div className="cta-image" data-view="true"><Image src="/media/property-11.avif" alt="Ramada residential interior" fill sizes="(max-width: 800px) 100vw, 50vw" /></div>
          </div>
          <footer className="container footer">
            <div className="socials"><span>Follow us.</span>{[["𝕏", "X"], ["◎", "Instagram"], ["in", "LinkedIn"], ["▶", "YouTube"]].map(function (social) { return <a href="#home" aria-label={social[1]} key={social[1]}><b>{social[0]}</b></a>; })}</div>
            <div className="footer-bottom"><p>© Ramada Builders Ltd. — 2026</p><nav><a href="#about">About us</a><a href="#property">Services</a><a href="#overview">Project</a><a href="#home">Top</a></nav></div>
          </footer>
        </section>
      </main>
    </div>
  );
}
