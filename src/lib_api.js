const configured = (import.meta.env.VITE_API_URL || "http://localhost:5001").trim().replace(/\/$/, "");

export async function apiFetch(path, options = {}) {
  const target = /^https?:\/\//i.test(path)
    ? path
    : `${configured}${path.startsWith("/") ? path : `/${path}`}`;

  try {
    return await fetch(target, options);
  } catch (error) {
    throw new Error(
      `Cannot connect to the backend at ${configured}. Make sure the backend is running. Error: ${error.message}`
    );
  }
}

export const API_URL = configured;
