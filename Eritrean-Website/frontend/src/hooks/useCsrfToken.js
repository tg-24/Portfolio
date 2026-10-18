export async function useCsrfToken() {
  let csrfToken = await fetch("http://localhost:8000/api/csrf/", {
    method: "GET",
    credentials: "include",
  });
  csrfToken = await csrfToken.json();
  csrfToken = csrfToken.csrfToken;
  return csrfToken;
}
