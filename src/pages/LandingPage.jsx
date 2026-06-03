import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router";
import EmptyState from "../components/EmptyState";
import PieceCard from "../components/PieceCard";
import SearchBar from "../components/SearchBar";
import SkeletonCard from "../components/SkeletonCard";
import PriceFilter from "../components/PriceFilter";
import { FiChevronLeft } from "react-icons/fi";
import { searchPieceCategory, getAllPieces } from "../connection/pieces.js";

export default function LandingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [allPieces, setAllPieces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [searchResults, setSearchResults] = useState(null);
  const [searching, setSearching] = useState(false);
  const debounceRef = useRef(null);

  // Filtro de precio (client-side)
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Carga inicial
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

  // Búsqueda con debounce al backend
  useEffect(() => {
    clearTimeout(debounceRef.current);

    if (!query.trim()) {
      setSearchResults(null);
      setSearching(false);
      return;
    }

    setSearching(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await searchPieceCategory(encodeURIComponent(query.trim()));
        setSearchResults({
          byName: res.data.pieces_by_name ?? [],
          byCategory: res.data.pieces_by_category ?? [],
          matchedCategories: res.data.matched_categories ?? [],
        });
      } catch (err) {
        console.error("Error en búsqueda:", err);
        setSearchResults({ byName: [], byCategory: [], matchedCategories: [] });
      } finally {
        setSearching(false);
      }
    }, 400);

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  // Aplica el filtro de precio a un array de piezas
  const applyPriceFilter = (pieces) => {
    return pieces.filter((p) => {
      const price = Number(p.price);
      if (minPrice !== "" && price < Number(minPrice)) return false;
      if (maxPrice !== "" && price > Number(maxPrice)) return false;
      return true;
    });
  };

  const showSkeletons = loading || searching;
  const isSearching = !!query.trim();

  // Vista normal — todas las piezas con filtro de precio
  const allAvailable = applyPriceFilter(allPieces.filter((p) => p.status === "available"));
  const allSold = applyPriceFilter(allPieces.filter((p) => p.status !== "available"));

  // Vista búsqueda — resultados con filtro de precio
  const byName = applyPriceFilter(searchResults?.byName ?? []);
  const byCategory = applyPriceFilter(searchResults?.byCategory ?? []);

  const goToDetail = (id) => navigate(`/piece/${id}`);

  const SectionHeader = ({ title, count, subtitle }) => (
    <div className="flex items-center gap-4 mb-8">
      <div className="shrink-0">
        <h2 className="font-display text-2xl text-dark font-semibold">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs text-gold mt-0.5">{subtitle}</p>
        )}
      </div>
      {!showSkeletons && (
        <span className="text-muted text-sm shrink-0">
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

  const SkeletonGrid = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
    </div>
  );

  return (
    <main className="flex-1">
      {/* Buscador + Filtro de precio */}
      <section className="pt-10 px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <div className="flex-1">
            <SearchBar value={query} onChange={setQuery} />
          </div>
          <PriceFilter
            minPrice={minPrice}
            maxPrice={maxPrice}
            onChange={(min, max) => { setMinPrice(min); setMaxPrice(max); }}
          />
        </div>
      </section>

      {/* ── Vista de BÚSQUEDA ── */}
      {isSearching && (
        <div className="max-w-7xl mx-auto px-6 py-10 space-y-14">
          {searchParams.get("q") && (
            <button
              onClick={() => navigate(-1)}
              className="
                          inline-flex items-center gap-1.5 text-bronze text-sm font-medium
                          hover:text-gold transition-colors duration-200
                          mb-8 cursor-pointer bg-transparent border-none
                        ">
              <FiChevronLeft size={16} />
              Volver
            </button>
          )}

          {/* Por nombre */}
          <section>
            <SectionHeader
              title="Resultados por nombre"
              count={byName.length}
            />
            {showSkeletons && <SkeletonGrid />}
            {!showSkeletons && byName.length === 0 && (
              <EmptyState query={query} />
            )}
            {!showSkeletons && byName.length > 0 && (
              <PieceGrid pieces={byName} />
            )}
          </section>

          {/* Por categoría */}
          <section>
            <SectionHeader
              title="Resultados por categoría"
              count={byCategory.length}
              subtitle={
                searchResults?.matchedCategories.length > 0
                  ? `Categorías: ${searchResults.matchedCategories.map((c) => c.name).join(", ")}`
                  : undefined
              }
            />
            {showSkeletons && <SkeletonGrid />}
            {!showSkeletons && byCategory.length === 0 && (
              <EmptyState query={query} label="Sin piezas en esta categoría" />
            )}
            {!showSkeletons && byCategory.length > 0 && (
              <PieceGrid pieces={byCategory} />
            )}
          </section>
        </div>
      )}

      {/* ── Vista NORMAL (sin búsqueda) ── */}
      {!isSearching && (
        <>
          <section className="max-w-7xl mx-auto px-6 py-10">
            <SectionHeader title="Piezas disponibles" count={allAvailable.length} />
            {loading ? <SkeletonGrid /> : (
              allAvailable.length === 0
                ? <EmptyState />
                : <PieceGrid pieces={allAvailable} />
            )}
          </section>

          {!loading && allSold.length > 0 && (
            <section className="max-w-7xl mx-auto px-6 pb-10">
              <SectionHeader title="Piezas no disponibles" count={allSold.length} />
              <PieceGrid pieces={allSold} />
            </section>
          )}
        </>
      )}
    </main>
  );
}
