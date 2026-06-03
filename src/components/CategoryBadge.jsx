import { useNavigate } from "react-router";

function CategoryBadge({ name }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/?q=${encodeURIComponent(name)}`)}
      className="
        border border-bronze text-bronze text-xs font-medium
        px-3 py-1 rounded-full
        transition-all duration-200
        hover:bg-bronze hover:text-white cursor-pointer bg-transparent
      "
    >
      {name}
    </button>
  );
}

export default CategoryBadge;
