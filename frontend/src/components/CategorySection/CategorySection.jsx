import React, { useState, useEffect } from "react";
import menu1 from '../../assets/menu_1.png';
import menu2 from '../../assets/menu_2.png';
import menu3 from '../../assets/menu_3.png';
import menu4 from '../../assets/menu_4.png';
import menu5 from '../../assets/menu_5.png';
import menu6 from '../../assets/menu_6.png';
import menu7 from '../../assets/menu_7.png';
import menu8 from '../../assets/menu_8.png';

const categories = [
  { name: "Salad", img: menu1 },
  { name: "Rolls", img: menu2 },
  { name: "Deserts", img: menu3 },
  { name: "Sandwich", img: menu4 },
  { name: "Cake", img: menu5 },
  { name: "Pure Veg", img: menu6 },
  { name: "Pasta", img: menu7 },
  { name: "Noodles", img: menu8 },
];

export default function CategorySection({ onSelect }) {
  // default first category
  const [active, setActive] = useState(categories[0]?.name || "");

  // notify parent of initial category on mount
  useEffect(() => {
    if (categories[0]?.name) {
      onSelect?.(categories[0].name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSelect]);

  const handleClick = (name) => {
    setActive(name);
    onSelect?.(name);
  };

  return (
    <div className="w-full flex justify-center">
      <div
        className="w-full max-w-5xl border-t border-b border-[#e5ddd4] py-6 px-4"
        style={{ padding: '10px 20px' }}
      >
        <nav
          className="flex items-center justify-center gap-6 overflow-x-auto"
          role="tablist"
          aria-label="Food categories"
        >
          {categories.map((c, i) => (
            <React.Fragment key={c.name}>
              <button
                type="button"
                role="tab"
                aria-selected={active === c.name}
                onClick={() => handleClick(c.name)}
                className={
                  "uppercase text-sm tracking-wide font-semibold transition-colors duration-300 ease-in-out focus:outline-none cursor-pointer " +
                  (active === c.name
                    ? "text-[#AB162C]"
                    : "text-gray-600 hover:text-[#AB162C]")
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") e.currentTarget.click();
                }}
              >
                {c.name}
              </button>

              {i < categories.length - 1 && (
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ backgroundColor: "#AB162C" }}
                  aria-hidden="true"
                />
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </div>
  );
}
