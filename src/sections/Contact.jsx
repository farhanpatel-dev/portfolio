import { useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { FaLinkedinIn } from 'react-icons/fa6';
import { SiGithub } from 'react-icons/si';
import { LuCheck, LuLoaderCircle, LuMail, LuMapPin, LuPhone, LuSend } from 'react-icons/lu';
import { contact, profile, sections } from '../data/portfolio';
import { SectionHeading } from '../components/SectionHeading';
import { rise, stagger } from '../components/Reveal';
import { external } from '../components/SocialLinks';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function Contact() {
  const s = sections.contact;

  // Contact cards, built from portfolio.js and skipping anything empty.
  const cards = [
    contact.email && { label: 'Email', value: contact.email, href: `mailto:${contact.email}`, Icon: LuMail },
    contact.showPhone && contact.phone && { label: 'Phone', value: contact.phoneDisplay, href: `tel:${contact.phone}`, Icon: LuPhone },
    contact.location && { label: 'Location', value: contact.location, href: contact.mapsUrl, Icon: LuMapPin, ext: true },
    contact.linkedin && { label: 'LinkedIn', value: contact.linkedin.replace(/^https?:\/\/(www\.)?/, ''), href: contact.linkedin, Icon: FaLinkedinIn, ext: true },
    contact.github && { label: 'GitHub', value: contact.github.replace(/^https?:\/\//, ''), href: contact.github, Icon: SiGithub, ext: true },
  ].filter(Boolean);

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative overflow-hidden bg-linear-to-b from-bg via-bg-alt to-bg-alt py-24 md:py-32"
    >
      <div aria-hidden="true" className="animate-drift-b absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-champagne/20 blur-[120px]" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading id="contact-title" eyebrow={s.eyebrow} title={s.title} accent={s.accent} intro={s.intro} />

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <m.ul
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid content-start gap-4"
          >
            {cards.map(({ label, value, href, Icon, ext }) => (
              <m.li key={label} variants={rise}>
                <a href={href} {...(ext ? external : {})} className="glass lift group flex items-center gap-5 rounded-2xl p-5">
                  <span className="gold-ring grid h-12 w-12 shrink-0 place-items-center rounded-xl p-[1.5px]">
                    <span className="grid h-full w-full place-items-center rounded-xl bg-bg text-muted transition-colors group-hover:text-accent">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </span>
                  <span className="min-w-0">
                    <span className="eyebrow block text-[0.65rem]">{label}</span>
                    <span className="block truncate text-base font-medium text-ink">{value}</span>
                  </span>
                  {ext && <span className="sr-only"> (opens in a new tab)</span>}
                </a>
              </m.li>
            ))}
          </m.ul>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}

/**
 * Contact form with validation.
 * - With a Formspree id in portfolio.js: posts to Formspree and shows a
 *   success message.
 * - Without one: opens the visitor's email app with the message pre-filled,
 *   so the form always works.
 */
function ContactForm() {
  const [values, setValues] = useState({ name: '', email: '', message: '', _gotcha: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | mailto | error

  const update = (e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors((er) => ({ ...er, [e.target.name]: undefined }));
  };

  const validate = () => {
    const er = {};
    if (values.name.trim().length < 2) er.name = 'Please enter your name.';
    if (!EMAIL_RE.test(values.email.trim())) er.email = 'Please enter a valid email address.';
    if (values.message.trim().length < 10) er.message = 'Please write a message of at least 10 characters.';
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (values._gotcha) return; // honeypot: bots fill hidden fields
    if (!validate()) return;

    if (!contact.formspreeId) {
      const subject = encodeURIComponent(`Portfolio enquiry from ${values.name.trim()}`);
      const body = encodeURIComponent(`${values.message.trim()}\n\n${values.name.trim()}\n${values.email.trim()}`);
      window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
      setStatus('mailto');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${contact.formspreeId}`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: values.name, email: values.email, message: values.message }),
      });
      if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
      setStatus('success');
      setValues({ name: '', email: '', message: '', _gotcha: '' });
    } catch {
      setStatus('error');
    }
  };

  const field = 'w-full rounded-xl border border-line bg-bg/70 px-4 py-3 text-ink placeholder:text-ink/45 transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30';

  return (
    <m.form
      noValidate
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="glass relative rounded-[2rem] p-7 sm:p-10"
      aria-describedby="form-status"
    >
      <h3 className="font-display text-3xl text-ink">
        Send a <em className="text-gradient italic">message</em>
      </h3>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" error={errors.name}>
          <input id="name" name="name" type="text" autoComplete="name" value={values.name} onChange={update}
            aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined}
            className={field} placeholder="Your name" />
        </Field>
        <Field id="email" label="Email" error={errors.email}>
          <input id="email" name="email" type="email" autoComplete="email" value={values.email} onChange={update}
            aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined}
            className={field} placeholder="you@example.com" />
        </Field>
      </div>
      <div className="mt-5">
        <Field id="message" label="Message" error={errors.message}>
          <textarea id="message" name="message" rows={5} value={values.message} onChange={update}
            aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined}
            className={`${field} resize-y`} placeholder={`Hi ${profile.name.split(' ')[0]}, ...`} />
        </Field>
      </div>

      {/* honeypot (hidden from people and screen readers) */}
      <input type="text" name="_gotcha" value={values._gotcha} onChange={update} tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <button type="submit" disabled={status === 'sending'} className="btn-lux mt-8 inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold tracking-wide disabled:opacity-70">
        {status === 'sending' ? <LuLoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : <LuSend className="h-4 w-4" aria-hidden="true" />}
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>

      <div id="form-status" role="status" aria-live="polite" className="mt-5 min-h-6">
        <AnimatePresence mode="wait">
          {status === 'success' && (
            <Status key="ok">Thank you, your message has been sent. I&apos;ll reply soon.</Status>
          )}
          {status === 'mailto' && (
            <Status key="mail">Your email app should now open with the message ready to send.</Status>
          )}
          {status === 'error' && (
            <Status key="err" error>
              Something went wrong. Please email me directly at{' '}
              <a href={`mailto:${contact.email}`} className="underline underline-offset-4">{contact.email}</a>.
            </Status>
          )}
        </AnimatePresence>
      </div>
    </m.form>
  );
}

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow mb-2 block text-[0.68rem]">{label}</label>
      {children}
      {error && <p id={`${id}-error`} className="mt-1.5 text-sm text-[#9a3b2a] dark:text-[#f0a08f]">{error}</p>}
    </div>
  );
}

function Status({ children, error = false }) {
  return (
    <m.p
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className={`flex items-start gap-2 text-sm ${error ? 'text-[#9a3b2a] dark:text-[#f0a08f]' : 'text-ink'}`}
    >
      {!error && <LuCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />}
      <span>{children}</span>
    </m.p>
  );
}
