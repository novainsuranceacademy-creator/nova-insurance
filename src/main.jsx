import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const navItems = [
  ['/', 'Home'],
  ['/services', 'Services'],
  ['/about', 'About us'],
  ['/contact', 'Contact'],
];

const serviceGroups = [
  {
    number: '01',
    title: 'Auto & Home Insurance',
    intro: 'Protect what matters most with reliable coverage for your car and home.',
    body:
      'We work with top-rated carriers to find the best protection for your property, vehicles, and liability needs, always at a competitive rate.',
    items: ['Auto coverage', 'Home protection', 'Property coverage', 'Liability guidance'],
  },
  {
    number: '02',
    title: 'Health & Life Insurance',
    intro:
      'Safeguard your family’s well-being and future with affordable health and life insurance options.',
    body:
      'We help you choose the right plan, from individual and family health coverage to life insurance that provides long-term security and peace of mind.',
    items: ['Individual health plans', 'Family health coverage', 'Life insurance', 'Long-term security'],
  },
  {
    number: '03',
    title: 'Financial & Tax Services',
    intro: 'Beyond insurance, we help you strengthen your financial foundation.',
    body:
      'Our tax preparation and financial consulting services ensure accuracy, maximize your refund, and guide you toward smarter financial decisions all year long.',
    items: ['Tax preparation', 'Refund strategy', 'Financial consulting', 'Year-round planning'],
  },
  {
    number: '04',
    title: 'Personalized Support',
    intro: 'Our team provides continuous guidance, policy management, and claim assistance.',
    body:
      'We believe in long-term relationships built on trust, service, and real results, so clients have a clear point of contact as their needs change.',
    items: ['Policy management', 'Claim assistance', 'Plan reviews', 'Ongoing client care'],
  },
];

const trustPillars = [
  ['Protection', 'Coverage that supports the people, property, and plans you value most.'],
  ['Planning', 'Financial and tax guidance designed to help every decision fit the bigger picture.'],
  ['Peace of mind', 'A team that keeps the process clear, personal, and grounded in your goals.'],
];

function useRoute() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (href) => {
    if (href === window.location.pathname) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.history.pushState({}, '', href);
    setPath(href);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return [path, navigate];
}

function useReveal(path) {
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
      { threshold: 0.15 },
    );

    revealTargets.forEach((target) => revealObserver.observe(target));
    return () => revealObserver.disconnect();
  }, [path]);
}

function Link({ href, navigate, children, className = '', ...props }) {
  return (
    <a
      className={className}
      href={href}
      onClick={(event) => {
        event.preventDefault();
        navigate(href);
      }}
      {...props}
    >
      {children}
    </a>
  );
}

function Layout({ path, navigate, children }) {
  return (
    <main>
      <div className="background-grid" aria-hidden="true" />
      <header className="site-header">
        <Link className="brand" href="/" navigate={navigate} aria-label="Nova home">
          <img src="/logo.webp" alt="Nova Insurance & Financial Group" />
        </Link>
        <nav aria-label="Primary navigation">
          {navItems.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              navigate={navigate}
              className={path === href ? 'active' : ''}
            >
              {label}
            </Link>
          ))}
        </nav>
      </header>
      {children}
      <Footer navigate={navigate} />
    </main>
  );
}

function HeroVisual() {
  return (
    <div className="hero-visual reveal" aria-label="Nova brand presentation">
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
  );
}

function Home({ navigate }) {
  return (
    <>
      <section className="hero page-section">
        <div className="hero-glow hero-glow-one" aria-hidden="true" />
        <div className="hero-glow hero-glow-two" aria-hidden="true" />
        <div className="hero-copy reveal">
          <p className="eyebrow">Insurance, financial, and tax services across the globe</p>
          <h1>Protecting your present, securing your future.</h1>
          <p className="hero-intro">
            Welcome to Nova Insurance & Financial Group, your trusted partner for
            protection, planning, and peace of mind.
          </p>
          <p className="hero-intro">
            We support individuals, families, and businesses with insurance,
            financial, and tax services built around practical guidance and
            personalized attention.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" href="/contact" navigate={navigate}>
              Request guidance <span aria-hidden="true">{'->'}</span>
            </Link>
            <Link className="secondary-button" href="/services" navigate={navigate}>
              Explore services
            </Link>
          </div>
        </div>
        <HeroVisual />
      </section>

      <section className="statement-section page-section">
        <div className="large-statement reveal">
          <p>
            At Nova, we believe that financial security begins with personalized
            attention and reliable guidance.
          </p>
        </div>
        <div className="statement-copy reveal">
          <p>
            Our licensed professionals work with top insurance carriers and
            financial institutions to ensure you get the coverage and strategies
            that truly fit your goals.
          </p>
          <p>
            From health and life insurance to auto and home protection, and from
            tax preparation to financial planning, we help you build a stronger,
            safer future one decision at a time.
          </p>
        </div>
      </section>

      <section className="pillar-section page-section">
        {trustPillars.map(([title, copy], index) => (
          <article className="pillar-card reveal" style={{ '--delay': `${index * 80}ms` }} key={title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h2>{title}</h2>
            <p>{copy}</p>
          </article>
        ))}
      </section>

      <section className="cta-band page-section reveal">
        <div>
          <p className="eyebrow">A stronger, safer future</p>
          <h2>One trusted group for coverage, planning, taxes, and support.</h2>
        </div>
        <Link className="primary-button" href="/about" navigate={navigate}>
          Meet Nova <span aria-hidden="true">{'->'}</span>
        </Link>
      </section>
    </>
  );
}

function Services({ navigate }) {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Coverage and financial guidance designed around real life."
        copy="Nova brings insurance, financial, and tax services together so clients can make confident decisions with one trusted team."
        action={<Link className="primary-button" href="/contact" navigate={navigate}>Start a conversation <span aria-hidden="true">{'->'}</span></Link>}
      />
      <section className="service-page-grid page-section">
        {serviceGroups.map((service, index) => (
          <article
            className="service-detail reveal"
            style={{ '--delay': `${index * 70}ms` }}
            key={service.title}
          >
            <div className="service-detail-number">{service.number}</div>
            <div>
              <h2>{service.title}</h2>
              <p className="lead">{service.intro}</p>
              <p>{service.body}</p>
              <ul>
                {service.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>
      <section className="process-section page-section reveal">
        <p className="eyebrow">How we support you</p>
        <h2>Clear answers before, during, and after your policy decisions.</h2>
        <div className="process-grid">
          <div>
            <strong>Review</strong>
            <p>We listen to your needs, risks, family situation, business needs, and financial goals.</p>
          </div>
          <div>
            <strong>Compare</strong>
            <p>We look across carriers, plans, and financial options to help you understand practical choices.</p>
          </div>
          <div>
            <strong>Support</strong>
            <p>We stay available for policy management, claim questions, tax support, and plan updates.</p>
          </div>
        </div>
      </section>
    </>
  );
}

function About({ navigate }) {
  return (
    <>
      <PageHero
        eyebrow="Who we are"
        title="A team founded to protect your present and secure your future."
        copy="Nova Insurance & Financial Group was founded with a single purpose: to empower individuals, families, and businesses with protection, planning, and peace of mind."
        action={<Link className="primary-button" href="/contact" navigate={navigate}>Work with us <span aria-hidden="true">{'->'}</span></Link>}
      />
      <section className="about-story page-section">
        <div className="about-panel reveal">
          <h2>Dedicated professionals. Personalized solutions.</h2>
          <p>
            We are a team of dedicated insurance and financial professionals
            committed to providing personalized solutions in health, life, auto,
            home, and financial services, including tax preparation and strategic
            advisory.
          </p>
          <p>
            Our approach is built on trust, transparency, and long-term
            relationships. Whether you’re seeking coverage, financial guidance, or
            tax support, Nova offers a seamless experience that blends expertise,
            integrity, and genuine care for every client.
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
      <section className="values-section page-section">
        {['Trust', 'Transparency', 'Long-term relationships', 'Real results'].map((value, index) => (
          <article className="value-card reveal" style={{ '--delay': `${index * 80}ms` }} key={value}>
            <span>{value}</span>
            <p>
              We keep guidance clear, practical, and aligned with the client’s
              present needs and future priorities.
            </p>
          </article>
        ))}
      </section>
    </>
  );
}

function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="We’d love to hear from you."
        copy="Have questions about insurance, financial planning, or taxes? Fill out the form and our team will contact you shortly with personalized guidance."
      />
      <section className="contact page-section">
        <div className="contact-copy reveal">
          <h2>Your peace of mind is our priority.</h2>
          <p>
            At Nova Insurance & Financial Group, every conversation begins with
            listening. Tell us what you need help with and we’ll guide you toward
            the right next step.
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
              <span>First Name <em>(required)</em></span>
              <input name="firstName" type="text" required />
            </label>
            <label>
              <span>Last Name <em>(required)</em></span>
              <input name="lastName" type="text" required />
            </label>
          </div>
          <label>
            <span>Email <em>(required)</em></span>
            <input name="email" type="email" required />
          </label>
          <label className="checkbox-label">
            <input name="updates" type="checkbox" />
            <span>Sign up for news and updates</span>
          </label>
          <label>
            <span>Message <em>(required)</em></span>
            <textarea name="message" rows="6" required />
          </label>
          <button type="submit">
            Send message <span aria-hidden="true">{'->'}</span>
          </button>
        </form>
      </section>
    </>
  );
}

function Terms() {
  return (
    <section className="plain-page page-section reveal">
      <p className="eyebrow">Terms & Conditions</p>
      <h1>Website terms and service information.</h1>
      <p>
        Information on this website is provided for general informational
        purposes and does not replace personalized insurance, financial, tax, or
        legal advice. Coverage, eligibility, rates, and services may vary based
        on individual circumstances, carrier requirements, and applicable rules.
      </p>
      <p>
        For guidance specific to your situation, contact Nova Insurance &
        Financial Group directly.
      </p>
    </section>
  );
}

function PageHero({ eyebrow, title, copy, action }) {
  return (
    <section className="page-hero page-section">
      <div className="page-hero-copy reveal">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{copy}</p>
        {action ? <div className="hero-actions">{action}</div> : null}
      </div>
      <div className="page-hero-mark reveal" aria-hidden="true">
        <img src="/logo.webp" alt="" />
      </div>
    </section>
  );
}

function Footer({ navigate }) {
  return (
    <footer className="footer">
      <div className="footer-top">
        <Link href="/services" navigate={navigate}>Services</Link>
        <Link href="/about" navigate={navigate}>About us</Link>
        <Link href="/contact" navigate={navigate}>Contact</Link>
        <Link href="/terms" navigate={navigate}>Terms & Conditions</Link>
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
      <div className="footer-bottom">
        <span>Nova Insurance & Financial Group</span>
        <span>Protection. Planning. Peace of mind.</span>
      </div>
    </footer>
  );
}

function App() {
  const [path, navigate] = useRoute();
  const normalizedPath = useMemo(() => {
    if (path === '/services' || path === '/about' || path === '/contact' || path === '/terms') {
      return path;
    }
    return '/';
  }, [path]);

  useReveal(normalizedPath);

  const pages = {
    '/': <Home navigate={navigate} />,
    '/services': <Services navigate={navigate} />,
    '/about': <About navigate={navigate} />,
    '/contact': <Contact />,
    '/terms': <Terms />,
  };

  return (
    <Layout path={normalizedPath} navigate={navigate}>
      {pages[normalizedPath]}
    </Layout>
  );
}

createRoot(document.getElementById('root')).render(<App />);
