function EmptyState({ query, label }) {
  return (
    <div className="col-span-4 flex flex-col items-center justify-center py-20 text-center animate-[fadeIn_0.35s_ease]">
      <span className="text-5xl mb-5 select-none">🏺</span>
      {query ? (
        <p className="font-display text-xl text-dark-light italic mb-2">
          {label ?? `Sin resultados para "${query}"`}
        </p>
      ) : (
        <p className="font-display text-xl text-dark-light italic mb-2">
          No hay piezas disponibles
        </p>
      )}
      <p className="text-muted text-sm">Intenta con otro nombre o categoría</p>
    </div>
  );
}
export default EmptyState;
