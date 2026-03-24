import { Input } from "@/components/ui/input";
import { Instagram, MapPin, Phone, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
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
          style={{ backgroundColor: "#E53935" }}
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

  useEffect(() => {
    if (category) {
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [category]);

  if (!category) return null;

  return (
    <div
      data-ocid="items.modal"
      role="presentation"
      className="fixed inset-0 flex items-end sm:items-center justify-center z-50"
      style={{
        backgroundColor: visible ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0)",
        transition: "background-color 0.3s ease",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      <div
        className="bg-card w-full max-w-md mx-auto overflow-hidden"
        style={{
          borderRadius: "24px 24px 0 0",
          maxHeight: "85vh",
          transform: visible ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.35s cubic-bezier(0.32,0.72,0,1)",
        }}
      >
        <div className="relative" style={{ height: "180px" }}>
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 100%)",
            }}
          />
          <div className="absolute bottom-4 left-5">
            <p className="text-white font-bold uppercase tracking-wide text-lg">
              {category.name}
            </p>
            <div
              className="h-[3px] w-8 mt-1 rounded-full"
              style={{ backgroundColor: "#E53935" }}
            />
          </div>
          <button
            type="button"
            data-ocid="items.close_button"
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
            aria-label="Close"
          >
            <X size={14} />
          </button>
        </div>
        <div
          className="overflow-y-auto"
          style={{ maxHeight: "calc(85vh - 180px)" }}
        >
          <div className="p-5">
            {category.items.map((item, i) => (
              <div
                key={item.name}
                data-ocid={`items.row.${i + 1}`}
                className="flex items-start justify-between gap-4 py-4 border-b border-border last:border-0"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm">
                    {item.name}
                  </p>
                  {item.description && (
                    <p className="text-muted-foreground text-xs mt-0.5 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
                <span
                  className="font-bold shrink-0 mt-0.5 text-sm"
                  style={{ color: "#E53935" }}
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
      style={{ backgroundColor: "#f5f5f5" }}
    >
      <div
        className="w-full bg-card flex flex-col"
        style={{
          maxWidth: "480px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          borderRadius: "0 0 12px 12px",
        }}
      >
        {/* Hero Banner */}
        <div className="relative" style={{ height: "280px" }}>
          <img
            src="/assets/generated/restaurant-banner.dim_1200x400.jpg"
            alt="The Food Train restaurant"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.15) 55%, rgba(0,0,0,0) 100%)",
            }}
          />
          <div className="absolute bottom-14 left-0 right-0 flex flex-col items-center gap-1.5 px-6">
            <div className="flex items-center gap-1.5 text-white/90">
              <MapPin size={13} className="shrink-0" />
              <span className="text-xs">Pure Veg. Restaurant</span>
            </div>
            <a
              href="tel:8744000612"
              data-ocid="header.button"
              className="flex items-center gap-1.5 text-white/90 hover:text-white transition-colors"
            >
              <Phone size={13} className="shrink-0" />
              <span className="text-xs">M. 8744000612</span>
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
              border: "3px solid #e0e0e0",
              boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
              overflow: "hidden",
            }}
          >
            <img
              src="/assets/generated/restaurant-logo-transparent.dim_200x200.png"
              alt="The Food Train logo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Info */}
        <div className="text-center px-6 pt-3 pb-5">
          <h1
            className="font-extrabold text-foreground"
            style={{ fontSize: "28px", letterSpacing: "-0.5px" }}
          >
            The Food Train
          </h1>
          <p className="text-muted-foreground mt-1.5 leading-relaxed text-sm">
            Pure Veg. Restaurant — Home Delivery Available
          </p>
          <p className="mt-1 text-xs" style={{ color: "#E53935" }}>
            5% GST Extra
          </p>
        </div>

        {/* Search */}
        <div
          className="px-5"
          style={{
            background: "#F0F0F0",
            paddingTop: "14px",
            paddingBottom: "14px",
          }}
        >
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
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
          <div className="px-4 py-5">
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
                    className="flex items-start justify-between gap-4 py-3.5 border-b border-border last:border-0"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground text-sm">
                        {item.name}
                      </p>
                      <p
                        className="text-xs mt-0.5"
                        style={{ color: "#E53935" }}
                      >
                        {categoryName}
                      </p>
                    </div>
                    <span
                      className="font-bold shrink-0 mt-0.5 text-sm"
                      style={{ color: "#E53935" }}
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
          <div className="px-4 py-5">
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
        )}

        {/* Footer */}
        <footer className="mt-auto border-t border-border px-5 py-6">
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
            &copy; {year} The Food Train. All rights reserved.
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
