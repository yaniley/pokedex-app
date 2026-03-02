export default function Layout({ children }) {
  return (
    <div className="app-container">
      <h1>Pokédex App</h1>
      {children}
    </div>
  );
}