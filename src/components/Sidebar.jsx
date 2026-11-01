
function Sidebar() {
  const menuItems = [
    "Dashboard",
    "Services",
    "Test Cases",

  ];

  return (
    <aside className="w-full bg-slate-900 p-6 text-white md:min-h-screen md:w-64">
      <h1 className="mb-8 text-2xl font-bold">
        MicroTest
      </h1>

      <nav className="flex flex-wrap gap-2 md:flex-col">
        {menuItems.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(" ", "-")}`}
            className="rounded-lg px-4 py-3 text-slate-300 hover:bg-slate-700 hover:text-white"
          >
            {item}
          </a>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
