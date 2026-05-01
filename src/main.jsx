import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const services = [
  {
    kicker: '01',
    title: 'Auto & Home Insurance',
    description:
      'Protect your car, home, property, and liability with reliable coverage from top-rated carriers at competitive rates.',
  },
  {
    kicker: '02',
    title: 'Health & Life Insurance',
    description:
      'Safeguard your family with affordable health plans and life insurance strategies built for long-term peace of mind.',
  },
  {
    kicker: '03',
    title: 'Financial & Tax Services',
    description:
      'Strengthen your financial foundation with accurate tax preparation, refund-focused planning, and year-round guidance.',
  },
  {
    kicker: '04',
    title: 'Personalized Support',
    description:
      'Count on continuous policy management, claims assistance, and real support from a team that knows your goals.',
  },
];

const stats = [
  ['Globe', 'Coverage guidance for individuals, families, and businesses'],
  ['4+', 'Core service areas in one trusted group'],
  ['1:1', 'Personalized attention for every client'],
];

function App() {
  const [activeSection, setActiveSection] = useState('home');

  const navItems = useMemo(
    () => [
      ['home', 'Home'],
      ['services', 'Services'],
      ['about', 'About us'],
      ['contact', 'Contact'],
    ],
    [],
  );

  useEffect(() => {
    const revealTargets = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.18 },
    );

    revealTargets.forEach((target) => revealObserver.observe(target));
    return () => revealObserver.disconnect();
  }, []);

  useEffect(() => {
    const sections = navItems
      .map(([id]) => document.getElementById(id))
      .filter(Boolean);

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActiveSection(visible.target.id);
        }
      },
      { threshold: [0.35, 0.6] },
    );

    sections.forEach((section) => sectionObserver.observe(section));
    return () => sectionObserver.disconnect();
  }, [navItems]);

  return (
    <main>
      <div className="background-grid" aria-hidden="true" />
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Nova home">
          <img src="/logo.webp" alt="Nova Insurance & Financial Group" />
        </a>
        <nav aria-label="Primary navigation">
          {navItems.map(([id, label]) => (
            <a
              key={id}
              className={activeSection === id ? 'active' : ''}
              href={`#${id}`}
            >
              {label}
            </a>
          ))}
        </nav>
      </header>

      <section id="home" className="hero page-section">
        <div className="hero-glow hero-glow-one" aria-hidden="true" />
        <div className="hero-glow hero-glow-two" aria-hidden="true" />
        <div className="hero-copy reveal">
          <p className="eyebrow">Insurance, financial, and tax services</p>
          <h1>Protecting your present, securing your future.</h1>
          <p className="hero-intro">
            Welcome to Nova Insurance & Financial Group, your trusted partner
            for protection, planning, and peace of mind across the globe.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#contact">
              Start your plan <span aria-hidden="true">{'->'}</span>
            </a>
            <a className="secondary-button" href="#services">
              Explore services
            </a>
          </div>
        </div>

        <div className="hero-visual reveal" aria-label="Nova brand shield">
          <div className="logo-stage">
            <span className="scan-line" aria-hidden="true" />
            <img src="/logo.webp" alt="" />
          </div>
          <div className="signal-card signal-card-left">
            <span>Licensed professionals</span>
            <strong>Reliable guidance</strong>
          </div>
          <div className="signal-card signal-card-right">
            <span>Top carriers</span>
            <strong>Tailored coverage</strong>
          </div>
        </div>
      </section>

      <section className="intro-band page-section">
        <div className="intro-text reveal">
          <p>
            At Nova, financial security begins with personalized attention and
            dependable guidance. Our licensed professionals work with leading
            insurance carriers and financial institutions to match your coverage
            and strategies with your real goals.
          </p>
        </div>
        <div className="stats-grid reveal">
          {stats.map(([value, label]) => (
            <div className="stat" key={value}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="services page-section">
        <div className="section-heading reveal">
          <p className="eyebrow">Services</p>
          <h2>Protection and planning that move with your life.</h2>
          <p>
            From health and life insurance to auto and home protection, tax
            preparation, and financial consulting, Nova helps you build a
            stronger future one clear decision at a time.
          </p>
        </div>
        <div className="service-grid">
          {services.map((service, index) => (
            <article
              className="service-card reveal"
              style={{ '--delay': `${index * 90}ms` }}
              key={service.title}
            >
              <span className="service-number">{service.kicker}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <span className="card-line" aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="about page-section">
        <div className="about-panel reveal">
          <p className="eyebrow">Who we are</p>
          <h2>Built on trust, transparency, and long-term relationships.</h2>
          <p>
            Nova Insurance & Financial Group was founded with a single purpose:
            to empower individuals, families, and businesses to protect their
            present and secure their future.
          </p>
          <p>
            We are dedicated insurance and financial professionals committed to
            personalized solutions in health, life, auto, home, financial
            services, tax preparation, and strategic advisory.
          </p>
        </div>
        <div className="orbit reveal" aria-hidden="true">
          <div className="orbit-ring ring-one" />
          <div className="orbit-ring ring-two" />
          <div className="orbit-core">N</div>
          <span className="orbit-dot dot-one" />
          <span className="orbit-dot dot-two" />
          <span className="orbit-dot dot-three" />
        </div>
      </section>

      <section id="contact" className="contact page-section">
        <div className="contact-copy reveal">
          <p className="eyebrow">Contact us</p>
          <h2>Peace of mind starts with a conversation.</h2>
          <p>
            Have questions about insurance, financial planning, or taxes? Send
            us a note and our team will contact you shortly with personalized
            guidance.
          </p>
          <div className="contact-details">
            <a href="mailto:info@novainsurancefinancialgroup.com">
              info@novainsurancefinancialgroup.com
            </a>
            <a href="tel:+15122398816">(512) 239-8816</a>
          </div>
        </div>

        <form className="contact-form reveal">
          <div className="form-row">
            <label>
              <span>First Name</span>
              <input name="firstName" type="text" required />
            </label>
            <label>
              <span>Last Name</span>
              <input name="lastName" type="text" required />
            </label>
          </div>
          <label>
            <span>Email</span>
            <input name="email" type="email" required />
          </label>
          <label className="checkbox-label">
            <input name="updates" type="checkbox" />
            <span>Sign up for news and updates</span>
          </label>
          <label>
            <span>Message</span>
            <textarea name="message" rows="5" required />
          </label>
          <button type="submit">
            Request guidance <span aria-hidden="true">{'->'}</span>
          </button>
        </form>
      </section>

      <footer className="footer">
        <div className="footer-top">
          <a href="#services">Services</a>
          <a href="#about">About us</a>
          <a href="#contact">Contact</a>
          <a href="#terms">Terms & Conditions</a>
        </div>
        <div className="footer-info">
          <div>
            <h2>Location</h2>
            <p>11011 Richmond Ave, Suite 732 Houston, TX 77042</p>
            <p>11601 N Lamar Blvd suite 3 Austin TX 78753</p>
          </div>
          <div>
            <h2>Hours</h2>
            <p>Monday - Friday<br />10:00am - 6:00pm</p>
            <p>Saturday<br />10:00am - 5:00pm</p>
          </div>
          <div>
            <h2>Contact</h2>
            <p>
              <a href="mailto:info@novainsurancefinancialgroup.com">
                info@novainsurancefinancialgroup.com
              </a>
              <br />
              <a href="tel:+15122398816">(512) 239-8816</a>
            </p>
          </div>
        </div>
        <div id="terms" className="footer-bottom">
          <span>Nova Insurance & Financial Group</span>
          <span>Protection. Planning. Peace of mind.</span>
        </div>
      </footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
