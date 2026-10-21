// Backend Certificate Communication BOI
export const CERTIFICATE_ID = /^g\d{1,8}a\d{9,11}j\d{4}ec$/;

export const certificateFiles = (id) => ({
  pdf: `/certificate/${id}.pdf`,
  download: `/certificate/${id}.pdf?download=1`,
  image: `/certificate/${id}.png`,
});

async function request(path, options = {}) {
  let res;
  try {
    res = await fetch(path, {
      ...options,
      headers: { Accept: "application/json", ...options.headers },
      credentials: "omit",
      cache: "no-store",
    });
  } catch (e) {
    if (e.name === "AbortError") throw e;
    throw new Error("Couldn't reach the server. Check your connection and try again.", { cause: e });
  }
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(
      res.status === 429
        ? "Too many searches. Please wait a minute and try again."
        : body.error || "Something went wrong. Please try again.",
    );
    err.status = res.status;
    throw err;
  }
  return body;
}

export async function getCertificate(id, signal) {
  const { certificate } = await request(`/api/certificates/${encodeURIComponent(id)}`, { signal });
  return certificate;
}

export async function searchCertificates(name, signal) {
  const { results } = await request("/api/certificates/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
    signal,
  });
  return results || [];
}

// Dapat atleast First and Last Name: Same rule sa backend
export function checkName(name) {
  const words = name.normalize("NFKD").split(/[^\p{L}\p{N}]+/u).filter(Boolean);
  if (name.length > 80) return "That name is too long.";
  if (words.filter((w) => w.length >= 2).length < 2) return "Enter your first and last name.";
  if (words.length > 6) return "Use at most 6 words of your name.";
  return "";
}
