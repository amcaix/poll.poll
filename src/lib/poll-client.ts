const VOTER_KEY = "soh-voter";

function hostKey(code: string) {
  return `soh-host:${code}`;
}

export function getVoterToken(): string {
  const existing = localStorage.getItem(VOTER_KEY);
  if (existing) return existing;
  const next = crypto.randomUUID();
  localStorage.setItem(VOTER_KEY, next);
  return next;
}

export function rememberHost(code: string, hostToken: string) {
  localStorage.setItem(hostKey(code), hostToken);
}

export function readHostToken(code: string): string | null {
  return localStorage.getItem(hostKey(code));
}
