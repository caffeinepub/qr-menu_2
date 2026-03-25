import { Input } from "@/components/ui/input";
import { Instagram, Search, Star, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { CATEGORIES, type Category, type MenuItem } from "./menuData";

function CategoryCard({
  category,
  onClick,
  index,
}: {
  category: Category;
  onClick: (c: Category) => void;
  index: number;
}) {
  return (
    <button
      type="button"
      data-ocid={`menu.item.${index + 1}`}
      onClick={() => onClick(category)}
      className="relative w-full overflow-hidden text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      style={{
        borderRadius: "14px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
        height: "120px",
        border: "2px solid rgba(255,215,0,0.0)",
        transition:
          "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLButtonElement;
        el.style.transform = "scale(1.02)";
        el.style.boxShadow = "0 8px 28px rgba(0,0,0,0.22)";
        el.style.borderColor = "rgba(255,215,0,0.55)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLButtonElement;
        el.style.transform = "scale(1)";
        el.style.boxShadow = "0 4px 16px rgba(0,0,0,0.12)";
        el.style.borderColor = "rgba(255,215,0,0.0)";
      }}
    >
      <img
        src={category.image}
        alt={category.name}
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => {
          const el = e.currentTarget as HTMLImageElement;
          el.style.display = "none";
          if (el.parentElement) {
            el.parentElement.style.background = "#0B3B8A";
          }
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.0) 100%)",
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 p-2.5">
        <p
          className="text-white leading-tight"
          style={{
            fontSize: "13px",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "1.2px",
          }}
        >
          {category.name}
        </p>
        <div
          className="mt-1 mb-1 rounded-full"
          style={{ backgroundColor: "#FFD700", width: "32px", height: "3px" }}
        />
      </div>
    </button>
  );
}

function ItemModal({
  category,
  onClose,
}: { category: Category | null; onClose: () => void }) {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (category) {
      setClosing(false);
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, [category]);

  const handleClose = () => {
    setClosing(true);
    setVisible(false);
    closeTimerRef.current = setTimeout(() => {
      onClose();
      setClosing(false);
    }, 400);
  };

  if (!category && !closing) return null;

  return (
    <div
      data-ocid="items.modal"
      className="fixed inset-0 z-50"
      style={{ backgroundColor: "#eef3fb" }}
    >
      <div
        className="relative flex flex-col h-full mx-auto"
        style={{
          maxWidth: "480px",
          background: "#eef3fb",
          transform: visible ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.4s cubic-bezier(0.32,0.72,0,1)",
        }}
      >
        {/* Banner Header */}
        <div className="relative flex-shrink-0" style={{ height: "220px" }}>
          <img
            src={category?.image}
            alt={category?.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const el = e.currentTarget as HTMLImageElement;
              el.style.display = "none";
              if (el.parentElement) {
                el.parentElement.style.background = "#0B3B8A";
              }
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.15) 100%)",
            }}
          />
          <div className="absolute bottom-5 left-5">
            <p className="text-white font-bold uppercase tracking-widest text-2xl leading-tight">
              {category?.name}
            </p>
            <div
              className="h-[3px] w-10 mt-1 rounded-full"
              style={{ backgroundColor: "#FFD700" }}
            />
          </div>
          <button
            type="button"
            data-ocid="items.close_button"
            onClick={handleClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Items list */}
        <div
          className="overflow-y-auto flex-1"
          style={{ background: "#eef3fb", paddingBottom: "80px" }}
        >
          <div style={{ padding: "16px" }}>
            {category?.items.map((item, i) => (
              <div
                key={item.name}
                data-ocid={`items.row.${i + 1}`}
                style={{
                  background: "white",
                  borderRadius: "12px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  padding: "14px 20px 0px",
                  marginBottom: "10px",
                  display: "flex",
                  flexDirection: "column",
                  animation: "fadeInUp 0.3s ease both",
                  animationDelay: `${i * 40}ms`,
                  overflow: "hidden",
                }}
              >
                {/* Content row: name/desc left, price badge right */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontWeight: 700,
                        fontSize: "14px",
                        color: "#1a1a1a",
                        margin: 0,
                      }}
                    >
                      {item.name}
                    </p>
                    {item.description && (
                      <p
                        style={{
                          fontSize: "12px",
                          color: "#555",
                          margin: "3px 0 0",
                          lineHeight: 1.4,
                        }}
                      >
                        {item.description}
                      </p>
                    )}
                  </div>
                  <span
                    style={{
                      background: "#0B3B8A",
                      color: "#FFD700",
                      padding: "3px 10px",
                      borderRadius: "999px",
                      fontWeight: 700,
                      fontSize: "13px",
                      flexShrink: 0,
                      marginTop: "1px",
                    }}
                  >
                    ₹{item.price}
                  </span>
                </div>
                {/* Brand accent line */}
                <div
                  style={{
                    height: "3px",
                    backgroundColor: "#FFD700",
                    width: "100%",
                    borderRadius: "0 0 12px 12px",
                    marginTop: "12px",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

type SearchResult = {
  item: MenuItem;
  categoryName: string;
  categoryId: string;
};

export default function App() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [searchFocused, setSearchFocused] = useState(false);

  const searchResults = useMemo<SearchResult[]>(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    const results: SearchResult[] = [];
    for (const cat of CATEGORIES) {
      for (const item of cat.items) {
        if (
          item.name.toLowerCase().includes(q) ||
          cat.name.toLowerCase().includes(q)
        ) {
          results.push({ item, categoryName: cat.name, categoryId: cat.id });
        }
      }
    }
    return results;
  }, [search]);

  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "",
  );

  return (
    <div
      className="min-h-screen flex justify-center sm:py-8"
      style={{ backgroundColor: "#e8eef8" }}
    >
      <div
        className="w-full flex flex-col"
        style={{
          maxWidth: "480px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          borderRadius: "0 0 12px 12px",
          backgroundColor: "#eef3fb",
          paddingBottom: "80px",
        }}
      >
        {/* ── COMPACT HEADER ── */}
        <div
          style={{
            background: "#0B3B8A",
            padding: "44px 16px 14px",
            position: "relative",
          }}
        >
          {/* PURE VEG badge — top right */}
          <div className="absolute" style={{ top: "12px", right: "14px" }}>
            <div
              className="flex items-center gap-1 px-2 py-0.5 rounded-full"
              style={{
                background: "#FFFFFF",
                boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
              }}
            >
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 800,
                  color: "#00A859",
                  letterSpacing: "0.5px",
                  lineHeight: 1,
                }}
              >
                PURE VEG 🟩
              </span>
            </div>
          </div>

          {/* Brand name */}
          <h1
            className="font-extrabold text-center"
            style={{
              fontSize: "30px",
              color: "#FFFFFF",
              fontFamily: "Arial Black, Arial, sans-serif",
              lineHeight: 1.1,
              letterSpacing: "-0.5px",
              textShadow:
                "0 0 18px rgba(255,215,0,0.55), 0 2px 4px rgba(0,0,0,0.3)",
              marginBottom: "2px",
            }}
          >
            <span style={{ color: "#FFD700" }}>R</span>ocker's{" "}
            <span style={{ color: "#FFD700" }}>P</span>izza
          </h1>

          {/* Tagline */}
          <p
            className="text-center font-medium"
            style={{
              fontSize: "12px",
              color: "#FFD700",
              opacity: 0.88,
              letterSpacing: "0.3px",
              marginBottom: "10px",
            }}
          >
            Fresh Dough · Fresh Ingredients
          </p>

          {/* Search bar */}
          <div className="relative">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: "#888" }}
            />
            <Input
              data-ocid="menu.search_input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder="Search menu items..."
              className="pl-9 rounded-full bg-white text-sm h-10"
              style={{
                border: searchFocused
                  ? "2px solid #FFD700"
                  : "1.5px solid #D9D9D9",
                boxShadow: searchFocused
                  ? "0 0 0 3px rgba(255,215,0,0.18)"
                  : "none",
                transition: "border 0.15s ease, box-shadow 0.15s ease",
                outline: "none",
              }}
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
        {/* ── END COMPACT HEADER ── */}

        {/* Search Results */}
        {search.trim() ? (
          <div className="px-4 py-5" style={{ background: "#f5f7fa" }}>
            {searchResults.length === 0 ? (
              <div
                data-ocid="menu.empty_state"
                className="text-center py-16 text-muted-foreground text-sm"
              >
                No items found for &ldquo;{search}&rdquo;
              </div>
            ) : (
              <div>
                <p className="text-xs text-muted-foreground mb-3">
                  {searchResults.length} result
                  {searchResults.length !== 1 ? "s" : ""} found
                </p>
                {searchResults.map(({ item, categoryName }, idx) => (
                  <div
                    key={`${categoryName}-${item.name}-${idx}`}
                    data-ocid={`search.row.${idx + 1}`}
                    className="flex items-start justify-between gap-4 py-3.5 last:border-0"
                    style={{
                      borderBottom:
                        idx < searchResults.length - 1
                          ? "1px solid rgba(255,215,0,0.2)"
                          : "none",
                    }}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground text-sm">
                        {item.name}
                      </p>
                      <p
                        className="text-xs mt-0.5"
                        style={{ color: "#0B3B8A" }}
                      >
                        {categoryName}
                      </p>
                    </div>
                    <span
                      className="font-bold shrink-0 mt-0.5 text-sm"
                      style={{ color: "#d4a800" }}
                    >
                      ₹{item.price}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Category Grid — starts immediately after search bar */
          <div>
            {/* Our Menu header bar */}
            <div
              className="px-5 py-2 flex items-center gap-2"
              style={{
                background: "#0B3B8A",
                borderBottom: "3px solid #FFD700",
              }}
            >
              <span
                style={{
                  fontWeight: 700,
                  fontSize: "12px",
                  color: "#ffffff",
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                }}
              >
                Our Menu
              </span>
              <div
                className="h-[1.5px] flex-1 rounded-full"
                style={{ background: "rgba(255,255,255,0.25)" }}
              />
            </div>
            <div className="px-3 pt-3 pb-6" style={{ background: "#f5f7fa" }}>
              <div className="grid grid-cols-2 gap-2.5">
                {CATEGORIES.map((cat, i) => (
                  <CategoryCard
                    key={cat.id}
                    category={cat}
                    onClick={setActiveCategory}
                    index={i}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer
          className="mt-auto px-5 py-6"
          style={{
            background: "#eef3fb",
            borderTop: "1px solid rgba(255,215,0,0.25)",
          }}
        >
          <div className="flex items-center justify-center gap-4 mb-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="footer.link"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Instagram size={18} />
            </a>
          </div>
          <p
            className="text-center text-muted-foreground mb-1"
            style={{ fontSize: "12px" }}
          >
            &copy; {year} Rocker's Pizza. All rights reserved.
          </p>
          <p
            className="text-center"
            style={{ fontSize: "11px", color: "#bdbdbd" }}
          >
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </div>

      {/* ── FLOATING REVIEW BUTTON ── */}
      <a
        href="https://www.google.com/search?q=Rocker%27s+Pizza+loni"
        target="_blank"
        rel="noopener noreferrer"
        data-ocid="review.floating_button"
        style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 60,
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: "#FFFFFF",
          borderRadius: "999px",
          padding: "11px 22px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.18), 0 1px 6px rgba(0,0,0,0.10)",
          textDecoration: "none",
          animation: "reviewPulse 2.4s ease-in-out infinite",
          border: "1.5px solid rgba(11,59,138,0.10)",
          whiteSpace: "nowrap",
        }}
      >
        {/* Google-style G icon */}
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "22px",
            height: "22px",
            borderRadius: "50%",
            background: "#0B3B8A",
            flexShrink: 0,
          }}
        >
          <Star size={12} fill="#FFD700" color="#FFD700" />
        </span>
        <span
          style={{
            fontWeight: 700,
            fontSize: "14px",
            color: "#0B3B8A",
            letterSpacing: "0.2px",
          }}
        >
          Review on Google
        </span>
      </a>
      {/* ── END FLOATING REVIEW BUTTON ── */}

      <ItemModal
        category={activeCategory}
        onClose={() => setActiveCategory(null)}
      />
    </div>
  );
}
