import { useEffect, useState } from "react";
import "../assets/styles/components/CertificatePages.css";
import Button from "../components/UI/Button";
import { CERTIFICATE_ID, certificateFiles, getCertificate } from "../lib/certificates";

const CertificatePage = ({ id }) => {
  const valid = CERTIFICATE_ID.test(id);
  const [state, setState] = useState(valid ? { status: "loading" } : { status: "missing" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!valid) return undefined;
    const ctrl = new AbortController();
    getCertificate(id, ctrl.signal)
      .then((cert) => setState({ status: "ok", cert }))
      .catch((e) => {
        if (e.name === "AbortError") return;
        setState(e.status === 404 ? { status: "missing" } : { status: "error", message: e.message });
      });
    return () => ctrl.abort();
  }, [id, valid, attempt]);

  useEffect(() => {
    document.title =
      state.status === "ok"
        ? `${state.cert.name} · Certificate of Completion · GAJEC`
        : state.status === "missing"
          ? "Certificate not found · GAJEC"
          : "Certificate · GAJEC";
  }, [state]);

  return (
    <section className="section certpage">
      <div className="container">
        <div className={`certpage__card ${state.status === "ok" ? "certpage__card--wide" : ""}`} aria-live="polite">
          {state.status === "loading" && (
            <>
              <div className="certpage__figure certpage__figure--skeleton" aria-hidden="true" />
              <p className="eyebrow">Certificate of Completion</p>
              <p className="certpage__text">Loading certificate…</p>
            </>
          )}

          {state.status === "ok" && <Certificate cert={state.cert} />}

          {state.status === "missing" && (
            <>
              <div className="certpage__code gradient-text">404</div>
              <p className="eyebrow">Certificate</p>
              <h1>Certificate not found</h1>
              <p className="certpage__text">
                We couldn&apos;t find a certificate at this link. Check that it was copied in full. New
                certificates are added a few days after each event.
              </p>
              {valid && <p className="certpage__detail mono">gajec.org/certificate/{id}</p>}
              <div className="certpage__actions">
                <Button href="/certificates" icon="arrow">Search by name</Button>
                <Button href="/" variant="ghost">Back to gajec.org</Button>
              </div>
            </>
          )}

          {state.status === "error" && (
            <>
              <p className="eyebrow">Certificate</p>
              <h1>Please try again</h1>
              <p className="certpage__text">{state.message}</p>
              <div className="certpage__actions">
                <Button
                  onClick={() => {
                    setState({ status: "loading" });
                    setAttempt((n) => n + 1);
                  }}
                >
                  Try again
                </Button>
                <Button href="/" variant="ghost">Back to gajec.org</Button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

const Certificate = ({ cert }) => {
  const files = certificateFiles(cert.id);
  return (
    <>
      <a className="certpage__figure" href={files.pdf} target="_blank" rel="noopener noreferrer">
        <img
          src={files.image}
          alt={`Certificate of Completion for ${cert.name}`}
          width="1200"
          height="630"
        />
      </a>
      <p className="eyebrow">Certificate of Completion</p>
      <h1>{cert.name}</h1>
      <p className="certpage__text">
        completed {cert.course} on {cert.issuedOn}.
      </p>
      <p className="certpage__detail mono">
        Certificate No. {cert.number} · {cert.id}
      </p>
      <div className="certpage__actions">
        <Button href={files.pdf} icon="arrow" target="_blank" rel="noopener noreferrer">
          Open certificate
        </Button>
        <Button href={files.download} variant="ghost" download>
          Download PDF
        </Button>
      </div>
      <a className="certpage__more" href="/certificates">
        Find other certificates by name
      </a>
    </>
  );
};

export default CertificatePage;
