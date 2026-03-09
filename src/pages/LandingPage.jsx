import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import EmptyState from "../components/EmptyState";
import PieceCard from "../components/PieceCard";
import SearchBar from "../components/SearchBar";
import SkeletonCard from "../components/SkeletonCard";
import { getAllPieces } from "../connection/pieces";

export default function LandingPage() {
  const navigate = useNavigate();

  const [allPieces, setAllPieces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getAllPieces();
        setAllPieces(res.data.pieces ?? []);
      } catch (err) {
        console.error("Error cargando piezas:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Filtrar por búsqueda
  const filtered = query.trim()
    ? allPieces.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
    : allPieces;

  // Separar por status
  const available = filtered.filter((p) => p.status === "available");
  const sold = filtered.filter((p) => p.status !== "available");

  const goToDetail = (id) => navigate(`/piece/${id}`);

  const SectionHeader = ({ title, count }) => (
    <div className="flex items-center gap-4 mb-8">
      <h2 className="font-display text-2xl text-dark font-semibold whitespace-nowrap">
        {title}
      </h2>
      {!loading && (
        <span className="text-muted text-sm">
          {count} {count === 1 ? "pieza" : "piezas"}
        </span>
      )}
      <div className="flex-1 h-px bg-linear-to-r from-gold/50 to-transparent" />
    </div>
  );

  const PieceGrid = ({ pieces }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {pieces.map((piece, i) => (
        <PieceCard
          key={piece.id}
          piece={piece}
          index={i}
          onClick={() => goToDetail(piece.id)}
        />
      ))}
    </div>
  );

  return (
    <main className="flex-1">
      {/* Buscador */}
      <section className="pt-10 px-6">
        <div className="max-w-7xl mx-auto">
          <SearchBar value={query} onChange={setQuery} />
        </div>
      </section>

      {/* Piezas disponibles */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <SectionHeader title="Piezas disponibles" count={available.length} />

        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {loading &&
              Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>

          {!loading && available.length === 0 && <EmptyState query={query} />}

          {!loading && <PieceGrid pieces={available} />}
        </div>
      </section>

      {/* Piezas no disponibles */}
      {!loading && sold.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pb-10">
          <SectionHeader title="Piezas no disponibles" count={sold.length} />
          <PieceGrid pieces={sold} />
        </section>
      )}
    </main>
  );
}
