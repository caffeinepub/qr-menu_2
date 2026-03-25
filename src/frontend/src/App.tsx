import { Input } from "@/components/ui/input";
import {
  Clock,
  Instagram,
  MapPin,
  MessageCircle,
  Phone,
  Search,
  X,
} from "lucide-react";
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
        borderRadius: "16px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
        aspectRatio: "3/2",
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
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <p
          className="text-white leading-tight"
          style={{
            fontSize: "15px",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "1.5px",
          }}
        >
          {category.name}
        </p>
        <div
          className="mt-1 mb-1.5 rounded-full"
          style={{ backgroundColor: "#FFD700", width: "40px", height: "4px" }}
        />
        {category.timing && (
          <p className="text-white/70 text-xs">{category.timing}</p>
        )}
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
      {/* Constrained inner container matching app width */}
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
          style={{ background: "#eef3fb" }}
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
                  padding: "20px 20px",
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: "12px",
                  animation: "fadeInUp 0.3s ease both",
                  animationDelay: `${i * 40}ms`,
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
        }}
      >
        {/* ── NEW HEADER ── */}
        <div
          className="relative px-6 pt-10 pb-6"
          style={{ background: "#0B3B8A" }}
        >
          {/* PURE VEG badge */}
          <div
            className="absolute top-3 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full"
            style={{
              background: "#FFFFFF",
              boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
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

          {/* Restaurant name — glowing storefront sign */}
          <h1
            className="font-extrabold text-center"
            style={{
              fontSize: "36px",
              color: "#FFD700",
              lineHeight: 1.1,
              letterSpacing: "-0.5px",
              textShadow:
                "0 0 20px rgba(255,215,0,0.6), 0 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            Rocker's Pizza
          </h1>

          {/* Tagline */}
          <p
            className="text-center font-medium mt-1.5"
            style={{
              fontSize: "13px",
              color: "#FFD700",
              opacity: 0.9,
              letterSpacing: "0.3px",
            }}
          >
            Fresh Dough · Fresh Ingredients
          </p>

          {/* Golden divider */}
          <div className="flex justify-center mt-3">
            <div
              style={{
                width: "40px",
                height: "2px",
                borderRadius: "2px",
                background: "#FFD700",
                opacity: 0.85,
              }}
            />
          </div>

          {/* Address */}
          <div className="flex items-start justify-center gap-1.5 mt-3 px-2">
            <MapPin
              size={12}
              className="shrink-0 mt-0.5"
              style={{ color: "#ffffff" }}
            />
            <p
              className="text-center"
              style={{
                fontSize: "11.5px",
                color: "rgba(255,255,255,0.85)",
                lineHeight: 1.5,
              }}
            >
              KH.No.-1423, Shop No.6, Delhi - Saharanpur Rd, behind Hanuman
              Mandir, Loni, Ghaziabad, UP – 201102
            </p>
          </div>

          {/* Phone — prominent */}
          <div className="flex justify-center mt-3">
            <a
              href="tel:09711564500"
              data-ocid="header.button"
              className="flex items-center gap-2 px-4 py-2 rounded-full transition-opacity hover:opacity-80 active:opacity-70"
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.2)",
                textDecoration: "none",
              }}
            >
              <Phone size={15} style={{ color: "#FFD700" }} />
              <span
                style={{
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#ffffff",
                  letterSpacing: "0.3px",
                }}
              >
                097115 64500
              </span>
            </a>
          </div>
        </div>
        {/* ── END HEADER ── */}

        {/* ── INFO CARD ── */}
        <div
          className="px-4 pb-4"
          style={{ background: "#0B3B8A", paddingTop: "12px" }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "14px",
              padding: "20px 20px",
            }}
          >
            {/* Short description */}
            <p
              className="text-center"
              style={{
                fontSize: "12px",
                color: "#222",
                lineHeight: 1.55,
                marginBottom: "10px",
              }}
            >
              Fast food restaurant serving pizzas, burgers, pasta, snacks &amp;
              beverages. Casual dining, takeaways &amp; small gatherings.
            </p>

            {/* Opening time */}
            <div
              className="flex items-center justify-center gap-1.5"
              style={{ marginBottom: "10px" }}
            >
              <Clock
                size={14}
                className="shrink-0"
                style={{ color: "#0B3B8A" }}
              />
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#1a1a1a",
                }}
              >
                Opens Daily &nbsp;·&nbsp; 11:00 AM onwards
              </span>
            </div>

            {/* Service tags */}
            <div
              className="flex items-center justify-center gap-2"
              style={{ marginBottom: "12px" }}
            >
              {["Dine-in", "Takeaway"].map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: "#e8f0ff",
                    color: "#0B3B8A",
                    fontSize: "11.5px",
                    fontWeight: 600,
                    padding: "4px 12px",
                    borderRadius: "999px",
                    border: "1px solid #c7d9ff",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* WhatsApp badge */}
            <div className="flex justify-center">
              <div
                className="flex items-center gap-2 px-5 py-2 rounded-full"
                style={{
                  background: "#25D366",
                  boxShadow: "0 3px 10px rgba(37,211,102,0.35)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "fit-content",
                }}
              >
                <MessageCircle size={16} style={{ color: "#ffffff" }} />
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#ffffff",
                    letterSpacing: "0.2px",
                  }}
                >
                  WhatsApp Available
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* ── END INFO CARD ── */}

        {/* ── SEARCH BAR ── */}
        <div
          className="px-4"
          style={{
            background: "#0B3B8A",
            paddingTop: "12px",
            paddingBottom: "16px",
          }}
        >
          <div className="relative">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: "#888" }}
            />
            <Input
              data-ocid="menu.search_input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder="Search menu items..."
              className="pl-10 rounded-full bg-white text-sm h-11"
              style={{
                border: searchFocused
                  ? "2px solid #FFD700"
                  : "1.5px solid #D9D9D9",
                boxShadow: searchFocused
                  ? "0 0 0 3px rgba(255,215,0,0.15)"
                  : "none",
                transition: "border 0.15s ease, box-shadow 0.15s ease",
                outline: "none",
              }}
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>
        {/* ── END SEARCH BAR ── */}

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
          /* Category Grid */
          <div>
            {/* Our Menu header bar */}
            <div
              className="px-5 py-3 flex items-center gap-2"
              style={{
                background: "#0B3B8A",
                borderBottom: "4px solid #FFD700",
              }}
            >
              <span
                style={{
                  fontWeight: 700,
                  fontSize: "13px",
                  color: "#ffffff",
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                }}
              >
                Our Menu
              </span>
              <div
                className="h-[2px] flex-1 rounded-full"
                style={{ background: "rgba(255,255,255,0.3)" }}
              />
              <div
                className="h-[2px] w-4 rounded-full"
                style={{ background: "#FFD700" }}
              />
            </div>
            <div className="px-4 pt-5 pb-8" style={{ background: "#f5f7fa" }}>
              <div className="grid grid-cols-2 gap-3">
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

      <ItemModal
        category={activeCategory}
        onClose={() => setActiveCategory(null)}
      />
    </div>
  );
}
