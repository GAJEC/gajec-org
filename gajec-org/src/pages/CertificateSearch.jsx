import { useEffect, useRef, useState } from "react";
import "../assets/styles/components/CertificatePages.css";
import SectionTitle from "../components/UI/SectionTitle";
import Button from "../components/UI/Button";
import Icon from "../components/UI/Icon";
import { checkName, searchCertificates } from "../lib/certificates";

const CertificateSearch = () => {
  const [name, setName] = useState("");
  const [state, setState] = useState({ status: "idle" });
  const pending = useRef(null);

  useEffect(() => {
    document.title = "Find your certificate · GAJEC";
    return () => pending.current?.abort();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const query = name.trim().replace(/\s+/g, " ");
    const problem = checkName(query);
    if (problem) return setState({ status: "invalid", message: problem });

    pending.current?.abort();
    const ctrl = new AbortController();
    pending.current = ctrl;
    setState({ status: "loading" });
    searchCertificates(query, ctrl.signal)
      .then((results) => setState({ status: "done", query, results }))
      .catch((err) => {
        if (err.name !== "AbortError") setState({ status: "error", message: err.message });
      });
  };

  const busy = state.status === "loading";

  return (
    <section className="section certsearch">
      <div className="container">
        <SectionTitle
          index="—"
          label="Certificates"
          title="Find Your Certificate"
          subtitle="Search with your full name."
        />

        <form className="certsearch__form" onSubmit={onSubmit} noValidate role="search">
          <label htmlFor="cert-name" className="certsearch__label mono">
            Name on the certificate
          </label>
          <div className="certsearch__row">
            <input
              id="cert-name"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Juan Dela Cruz"
              autoComplete="name"
              maxLength={80}
              spellCheck={false}
              aria-invalid={state.status === "invalid"}
              aria-describedby="cert-name-hint"
              required
            />
            <Button type="submit" icon="arrow" disabled={busy}>
              {busy ? "Searching…" : "Search"}
            </Button>
          </div>
          <p id="cert-name-hint" className="certsearch__hint">
            Type at least your first and last name. Only certificates whose name contains every word you
            type are shown.
          </p>
        </form>

        <div className="certsearch__results" aria-live="polite">
          {(state.status === "invalid" || state.status === "error") && (
            <p className="certsearch__message certsearch__message--error">{state.message}</p>
          )}

          {state.status === "done" && state.results.length === 0 && (
            <p className="certsearch__message">
              No certificates found for &ldquo;{state.query}&rdquo;. Check the spelling, or use your name as it
              was written when you registered.
            </p>
          )}

          {state.status === "done" && state.results.length > 0 && (
            <>
              <p className="certsearch__count mono">
                {state.results.length} certificate{state.results.length === 1 ? "" : "s"} found
              </p>
              <ul className="certsearch__list">
                {state.results.map((c) => (
                  <li key={c.id}>
                    <a className="certsearch__item" href={`/certificate/${c.id}`}>
                      <span className="certsearch__item-main">
                        <strong>{c.name}</strong>
                        <span>{c.course}</span>
                      </span>
                      <span className="certsearch__item-meta mono">
                        <span>{c.issuedOn}</span>
                        <span>No. {c.number}</span>
                      </span>
                      <Icon name="right" size={18} />
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default CertificateSearch;
