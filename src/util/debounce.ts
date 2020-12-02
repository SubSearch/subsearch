export default function debounce<T extends Function>(cb: T, wait = 20) {
  let h: ReturnType<typeof setTimeout>;
  let callable = (...args: unknown[]) => {
    clearTimeout(h);
    h = setTimeout(() => cb(...args), wait);
  };
  return (callable as unknown) as T;
}
