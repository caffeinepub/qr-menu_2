import { Input } from "@/components/ui/input";
import {
  Clock,
  Instagram,
  MapPin,
  MessageCircle,
  Phone,
  Search,
  UtensilsCrossed,
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
        borderRadius: "18px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
        aspectRatio: "4/3",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLButtonElement;
        el.style.transform = "scale(1.02)";
        el.style.boxShadow = "0 8px 28px rgba(0,0,0,0.22)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLButtonElement;
        el.style.transform = "scale(1)";
        el.style.boxShadow = "0 4px 16px rgba(0,0,0,0.12)";
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
            el.parentElement.style.background = "#023b8a";
          }
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.28) 55%, rgba(0,0,0,0) 100%)",
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <p className="text-white font-bold uppercase tracking-wide text-sm leading-tight">
          {category.name}
        </p>
        <div
          className="h-[3px] w-8 mt-1 mb-1.5 rounded-full"
          style={{ backgroundColor: "#dda40c" }}
        />
        <p className="text-white/70 text-xs">{category.timing}</p>
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
                el.parentElement.style.background = "#023b8a";
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
              style={{ backgroundColor: "#dda40c" }}
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
                  padding: "14px 16px",
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
                        color: "#888",
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
                    fontWeight: 700,
                    fontSize: "14px",
                    color: "#dda40c",
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
        {/* Hero Banner */}
        <div className="relative" style={{ height: "280px" }}>
          <img
            src="/assets/generated/restaurant-banner.dim_1200x400.jpg"
            alt="Rocker's Pizza restaurant"
            className="w-full h-full object-cover"
            onError={(e) => {
              const el = e.currentTarget as HTMLImageElement;
              el.style.display = "none";
              if (el.parentElement) {
                el.parentElement.style.background = "#023b8a";
              }
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(2,59,138,0.92) 0%, rgba(2,59,138,0.45) 55%, rgba(0,0,0,0) 100%)",
            }}
          />
          <div className="absolute bottom-14 left-0 right-0 flex flex-col items-center gap-1.5 px-6">
            <div className="flex items-start gap-1.5 text-white/90">
              <MapPin size={13} className="shrink-0 mt-0.5" />
              <span className="text-xs leading-snug text-center">
                KH.No.-1423, Shop No.6, Delhi - Saharanpur Rd, behind Hanuman
                Mandir, Loni, Ghaziabad, UP – 201102
              </span>
            </div>
            <a
              href="tel:09711564500"
              data-ocid="header.button"
              className="flex items-center gap-1.5 text-white/90 hover:text-white transition-colors"
            >
              <Phone size={13} className="shrink-0" />
              <span className="text-xs">097115 64500</span>
            </a>
          </div>
        </div>

        {/* Logo overlap */}
        <div
          className="flex justify-center"
          style={{ marginTop: "-52px", position: "relative", zIndex: 10 }}
        >
          <div
            style={{
              width: "104px",
              height: "104px",
              borderRadius: "50%",
              background: "white",
              border: "3px solid #023b8a",
              boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
              overflow: "hidden",
            }}
          >
            <img
              src="/assets/generated/restaurant-logo-transparent.dim_200x200.png"
              alt="Rocker's Pizza logo"
              className="w-full h-full object-cover"
              onError={(e) => {
                const el = e.currentTarget as HTMLImageElement;
                el.style.display = "none";
                if (el.parentElement) {
                  el.parentElement.style.background = "#023b8a";
                }
              }}
            />
          </div>
        </div>

        {/* Info — primary blue background */}
        <div
          className="text-center px-6 pt-3 pb-5"
          style={{ background: "#023b8a" }}
        >
          <h1
            className="font-extrabold"
            style={{
              fontSize: "28px",
              letterSpacing: "-0.5px",
              color: "#ffffff",
            }}
          >
            Rocker's Pizza
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.8)",
              marginTop: "6px",
              lineHeight: 1.5,
              fontSize: "13px",
            }}
          >
            Fast food restaurant serving pizzas, burgers, pasta, snacks, and
            beverages. Suitable for casual dining, takeaways, and small
            gatherings.
          </p>
          <p className="mt-1 text-xs" style={{ color: "#dda40c" }}>
            5% GST Extra
          </p>

          {/* Business Details */}
          <div
            className="mt-4 rounded-xl px-4 py-3 flex flex-col gap-2.5 text-left"
            style={{
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.22)",
            }}
          >
            {/* Opening Time */}
            <div className="flex items-center gap-2.5">
              <Clock
                size={14}
                className="shrink-0"
                style={{ color: "#dda40c" }}
              />
              <span
                className="text-xs"
                style={{ color: "rgba(255,255,255,0.9)" }}
              >
                <span className="font-semibold">Opens Daily</span> &nbsp;·&nbsp;
                11:00 AM onwards
              </span>
            </div>

            {/* Services */}
            <div className="flex items-start gap-2.5">
              <UtensilsCrossed
                size={14}
                className="shrink-0 mt-0.5"
                style={{ color: "#dda40c" }}
              />
              <div className="flex flex-wrap gap-1.5">
                {["Dine-in", "Takeaway", "Online Ordering"].map((s) => (
                  <span
                    key={s}
                    className="text-xs font-medium px-2 py-0.5 rounded-full"
                    style={{
                      background: "rgba(255,255,255,0.18)",
                      color: "#ffffff",
                      border: "1px solid rgba(255,255,255,0.3)",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* WhatsApp */}
            <div className="flex items-center gap-2.5">
              <MessageCircle
                size={14}
                className="shrink-0"
                style={{ color: "#25D366" }}
              />
              <span
                className="text-xs"
                style={{ color: "rgba(255,255,255,0.9)" }}
              >
                <span className="font-semibold" style={{ color: "#25D366" }}>
                  WhatsApp
                </span>
                &nbsp;available
              </span>
            </div>
          </div>
        </div>

        {/* Search */}
        <div
          className="px-5"
          style={{
            background: "#012d6a",
            paddingTop: "14px",
            paddingBottom: "14px",
          }}
        >
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: "#888" }}
            />
            <Input
              data-ocid="menu.search_input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search menu items..."
              className="pl-8 rounded-full bg-white text-sm h-9"
              style={{ border: "1px solid #D9D9D9" }}
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Search Results */}
        {search.trim() ? (
          <div className="px-4 py-5" style={{ background: "#eef3fb" }}>
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
                          ? "1px solid rgba(221,164,12,0.2)"
                          : "none",
                    }}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground text-sm">
                        {item.name}
                      </p>
                      <p
                        className="text-xs mt-0.5"
                        style={{ color: "#023b8a" }}
                      >
                        {categoryName}
                      </p>
                    </div>
                    <span
                      className="font-bold shrink-0 mt-0.5 text-sm"
                      style={{ color: "#dda40c" }}
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
              style={{ background: "#023b8a" }}
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
                style={{ background: "#dda40c" }}
              />
            </div>
            <div className="px-4 py-5" style={{ background: "#eef3fb" }}>
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
            borderTop: "1px solid rgba(221,164,12,0.25)",
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
