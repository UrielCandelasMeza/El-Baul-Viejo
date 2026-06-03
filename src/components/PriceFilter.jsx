import { useState, useRef } from "react";
import { MdTune, MdClose } from "react-icons/md";

/**
 * PriceFilter — rango de precio mín/máx con inputs numéricos y un botón de reset.
 * Props:
 *   minPrice / maxPrice: número | ""   — valores actuales
 *   onChange(min, max): callback cuando cambia algún valor
 */
function PriceFilter({ minPrice, maxPrice, onChange }) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);

  const hasFilter = minPrice !== "" || maxPrice !== "";

  const handleMin = (e) => {
    const val = e.target.value === "" ? "" : Number(e.target.value);
    if (val <= 0 || val > 50000) {
      onChange(minPrice, maxPrice)
      return
    }
    onChange(val, maxPrice);
  };

  const handleMax = (e) => {
    const val = e.target.value === "" ? "" : Number(e.target.value);
    if (val <= 0 || val > 50000) {
      onChange(minPrice, maxPrice)
      return
    }
    onChange(minPrice, val);
  };

  const handleReset = () => {
    onChange("", "");
  };

  return (
    <div className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen((o) => !o)}
        className={`
          inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium
          border-2 transition-all duration-200 cursor-pointer bg-transparent
          ${hasFilter
            ? "border-gold text-gold"
            : "border-border text-muted hover:border-gold/60 hover:text-gold/80"
          }
        `}
      >
        <MdTune size={16} />
        Precio
        {hasFilter && (
          <span className="ml-1 bg-gold text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
            ✓
          </span>
        )}
      </button>

      {/* Panel desplegable */}
      {open && (
        <div
          ref={panelRef}
          className="
            absolute right-0 top-full mt-2 z-30
            bg-card border border-border rounded-xl shadow-lg
            p-4 w-64 animate-[fadeIn_0.15s_ease]
          "
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-dark uppercase tracking-wide">
              Rango de precio (MXN)
            </span>
            <button
              onClick={() => setOpen(false)}
              className="text-muted hover:text-dark transition-colors cursor-pointer bg-transparent border-none"
            >
              <MdClose size={16} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Min */}
            <div className="flex-1">
              <label className="text-[10px] text-muted uppercase tracking-wide mb-1 block">
                Mínimo
              </label>
              <input
                type="number"
                min={1}
                max={50000}
                placeholder="1"
                value={minPrice}
                onChange={handleMin}
                className="
                  w-full px-3 py-2 rounded-lg border border-border bg-transparent
                  text-sm text-text placeholder:text-muted
                  focus:outline-none focus:border-gold
                  transition-colors duration-150
                "
              />
            </div>

            <span className="text-muted text-sm mt-4">—</span>

            {/* Max */}
            <div className="flex-1">
              <label className="text-[10px] text-muted uppercase tracking-wide mb-1 block">
                Máximo
              </label>
              <input
                type="number"
                min={1}
                max={50000}
                placeholder="50,000"
                value={maxPrice}
                onChange={handleMax}
                className="
                  w-full px-3 py-2 rounded-lg border border-border bg-transparent
                  text-sm text-text placeholder:text-muted
                  focus:outline-none focus:border-gold
                  transition-colors duration-150
                "
              />
            </div>
          </div>

          {hasFilter && (
            <button
              onClick={handleReset}
              className="
                mt-3 w-full text-xs text-muted hover:text-gold
                transition-colors duration-150 cursor-pointer bg-transparent border-none
                text-center
              "
            >
              Limpiar filtro
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default PriceFilter;
