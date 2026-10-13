import React, { useState } from "react";
import "../assets/styles/components/Contact.css";
import Icon from "./UI/Icon";

const EMAIL = "hello@gajec.dev";
const INITIAL = { name: "", email: "", subject: "", message: "" };

const Contact = () => {
  const [form, setForm] = useState(INITIAL);
  const [sent, setSent] = useState(false);

  const update = (e) => {
    setSent(false);
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const submit = (e) => {
    e.preventDefault();
    const body = `${form.message}\n\n— ${form.name} (${form.email})`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
    setForm(INITIAL);
  };

  return (
    <section id="contact" className="section contact">
      <div className="container contact__grid">
        <div className="contact__copy">
          <p className="eyebrow">06 / Start a Conversation</p>
          <h2>
            Have an Idea?
            <br />
            <span className="gradient-text">Let&apos;s Build It.</span>
          </h2>
          <p className="contact__lead">
            Whether it&apos;s a project, collaboration, or something completely
            new, we&apos;d love to hear from you.
          </p>

          <ul className="contact__links">
            <li>
              <span className="contact__icon">
                <Icon name="mail" size={15} />
              </span>
              <div>
                <small>Email us</small>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </div>
            </li>
            <li>
              <span className="contact__icon">
                <Icon name="github" size={15} />
              </span>
              <div>
                <small>Follow our code</small>
                <a
                  href="https://github.com/gajec"
                  target="_blank"
                  rel="noreferrer"
                >
                  github.com/gajec
                </a>
              </div>
            </li>
          </ul>
        </div>

        <form className="contact__form" onSubmit={submit}>
          <div className="contact__row">
            <label>
              <span>Your name</span>
              <input
                name="name"
                value={form.name}
                onChange={update}
                placeholder="Jane Smith"
                required
              />
            </label>
            <label>
              <span>Email address</span>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={update}
                placeholder="jane@studio.com"
                required
              />
            </label>
          </div>
          <label>
            <span>Subject</span>
            <input
              name="subject"
              value={form.subject}
              onChange={update}
              placeholder="What would you like to build?"
              required
            />
          </label>
          <label>
            <span>Tell us about it</span>
            <textarea
              name="message"
              rows="4"
              value={form.message}
              onChange={update}
              placeholder="Share the idea, goals, or challenge…"
              required
            />
          </label>

          <button type="submit" className="btn btn--primary btn--block">
            {sent ? (
              <>
                Opening your mail app <Icon name="check" size={16} />
              </>
            ) : (
              <>
                Send Message <Icon name="send" size={16} />
              </>
            )}
          </button>
          <p className="contact__note">
            We usually reply within two working days.
          </p>
        </form>
      </div>
    </section>
  );
};

export default Contact;
