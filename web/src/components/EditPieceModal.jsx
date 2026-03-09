import { useState, useEffect, useRef } from "react";
import { MdClose, MdAddPhotoAlternate } from "react-icons/md";
import { getCategories } from "../connection/categories";
import { updatePiece } from "../connection/pieces";

const STATUS_OPTIONS = [
  { value: "available", label: "Disponible" },
  { value: "sold", label: "Vendido" },
];

const MAX_IMAGES = 5;

export default function EditPieceModal({ piece, onClose, onUpdated }) {
  const fileInputRef = useRef(null);

  const [name, setName] = useState(piece.name);
  const [price, setPrice] = useState(String(piece.price));
  const [description, setDescription] = useState(piece.description ?? "");
  const [status, setStatus] = useState(piece.status ?? "available");
  const [categoryIds, setCategoryIds] = useState(piece.category_ids ?? []);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Imágenes existentes (URLs) y nuevas (File objects)
  const [existingPhotos, setExistingPhotos] = useState(piece.photos ?? []);
  const [newImages, setNewImages] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getCategories();
        setCategories(res.data.categories ?? []);
      } catch {
        setCategories([]);
      }
    };
    fetch();
  }, []);

  // Limpiar previews al desmontar
  useEffect(() => {
    return () => newImages.forEach((img) => URL.revokeObjectURL(img.preview));
  }, [newImages]);

  const totalPhotos = existingPhotos.length + newImages.length;

  const handleFiles = (e) => {
    const files = Array.from(e.target.files);
    const remaining = MAX_IMAGES - totalPhotos;
    if (remaining <= 0) return;
    const added = files.slice(0, remaining).map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
    }));
    setNewImages((prev) => [...prev, ...added]);
    e.target.value = "";
  };

  const removeExisting = (idx) => {
    setExistingPhotos((prev) => prev.filter((_, i) => i !== idx));
  };

  const removeNew = (id) => {
    setNewImages((prev) => {
      const t = prev.find((img) => img.id === id);
      if (t) URL.revokeObjectURL(t.preview);
      return prev.filter((img) => img.id !== id);
    });
  };

  const toggleCategory = (id) => {
    setCategoryIds((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !price) {
      setError("El nombre y el precio son obligatorios.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("status", status);
      categoryIds.forEach((id) => formData.append("category_ids", id));

      // Fotos existentes que se conservan (URLs)
      existingPhotos.forEach((url) => formData.append("existing_photos", url));

      // Fotos nuevas (archivos)
      newImages.forEach((img) => formData.append("photos", img.file));

      const res = await updatePiece(piece.id, formData);
      onUpdated(res.data.piece ?? null);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message ?? "Error al actualizar la pieza.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `
    w-full rounded-lg border border-border bg-ivory-dark
    px-4 py-2.5 text-sm text-dark placeholder:text-muted
    focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold
    transition duration-200
  `;
  const labelClass = "block text-sm font-medium text-dark-light mb-1.5";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-dark/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-card border border-border rounded-2xl shadow-[0_8px_32px_rgba(62,47,35,0.20)] w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4 animate-fade-up">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <h2
            className="text-lg font-semibold text-dark"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Editar pieza
          </h2>
          <button
            onClick={onClose}
            className="text-muted hover:text-dark transition-colors"
          >
            <MdClose size={22} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} noValidate className="px-6 py-6 space-y-5">
          {/* Nombre */}
          <div>
            <label htmlFor="edit-name" className={labelClass}>Nombre</label>
            <input id="edit-name" type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
          </div>

          {/* Precio */}
          <div>
            <label htmlFor="edit-price" className={labelClass}>Precio (MXN)</label>
            <input id="edit-price" type="number" min="0" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} className={inputClass} />
          </div>

          {/* Descripción */}
          <div>
            <label htmlFor="edit-desc" className={labelClass}>Descripción</label>
            <textarea id="edit-desc" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} className={`${inputClass} resize-none`} />
          </div>

          {/* Estado */}
          <div>
            <label htmlFor="edit-status" className={labelClass}>Estado</label>
            <select id="edit-status" value={status} onChange={(e) => setStatus(e.target.value)} className={inputClass}>
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Categorías */}
          <div>
            <label className={labelClass}>Categorías</label>
            {categories.length === 0 ? (
              <p className="text-sm text-muted italic">Sin categorías disponibles.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => {
                  const selected = categoryIds.includes(cat.id);
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => toggleCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-150
                        ${selected
                          ? "bg-dark text-ivory border-dark"
                          : "bg-ivory-dark text-dark-light border-border hover:border-gold hover:text-gold"
                        }`}
                    >
                      {cat.name}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Imágenes */}
          <div>
            <label className={labelClass}>Imágenes ({totalPhotos}/{MAX_IMAGES})</label>

            {/* Grid de fotos existentes + nuevas */}
            <div className="grid grid-cols-3 gap-3 mb-3">
              {existingPhotos.map((url, idx) => (
                <div key={url} className="relative group">
                  <img src={url} alt={`foto-${idx}`} className="w-full aspect-square object-cover rounded-xl border border-border" />
                  <button
                    type="button"
                    onClick={() => removeExisting(idx)}
                    className="absolute top-1.5 right-1.5 bg-dark/80 hover:bg-dark text-ivory rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MdClose size={14} />
                  </button>
                </div>
              ))}
              {newImages.map((img) => (
                <div key={img.id} className="relative group">
                  <img src={img.preview} alt={img.file.name} className="w-full aspect-square object-cover rounded-xl border border-gold/50" />
                  <span className="absolute top-1.5 left-1.5 text-[10px] bg-gold text-white rounded px-1.5 py-0.5">Nueva</span>
                  <button
                    type="button"
                    onClick={() => removeNew(img.id)}
                    className="absolute top-1.5 right-1.5 bg-dark/80 hover:bg-dark text-ivory rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MdClose size={14} />
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={totalPhotos >= MAX_IMAGES}
              className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-border rounded-xl py-2.5 text-sm text-muted hover:border-gold hover:text-gold transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-border disabled:hover:text-muted"
            >
              <MdAddPhotoAlternate size={18} />
              {totalPhotos >= MAX_IMAGES ? `Límite alcanzado (${MAX_IMAGES})` : "Agregar imágenes"}
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFiles} />
          </div>

          {/* Error */}
          {error && <p className="text-sm text-red-500">{error}</p>}

          {/* Botón guardar */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-dark text-ivory font-semibold text-sm px-5 py-3 border-2 border-dark hover:bg-dark-light hover:border-dark-light active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
          >
            {loading ? "Guardando…" : "Guardar cambios"}
          </button>
        </form>
      </div>
    </div>
  );
}
