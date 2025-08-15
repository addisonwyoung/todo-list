export function today() {
  const d = new Date();                  // local time
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0'); // 01-12
  const dd = String(d.getDate()).padStart(2, '0');      // 01-31
  return `${yyyy}-${mm}-${dd}`;
}