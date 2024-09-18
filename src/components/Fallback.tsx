// @ts-ignore
export function Fallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Что-то пошло не так:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}
