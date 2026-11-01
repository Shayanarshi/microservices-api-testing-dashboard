function StatsCards({ stats }) {
  const items = [
    { label: "Total Services", value: 3 },
    { label: "Tests Passed", value: stats.passed },
    { label: "Tests Failed", value: stats.failed },
    { label: "Tests Executed", value: stats.executed },
  ];

  return (
    <section
      id="dashboard"
      className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <p className="text-sm text-slate-500">{item.label}</p>
          <h3 className="mt-3 text-3xl font-bold">{item.value}</h3>
        </div>
      ))}
    </section>
  );
}

export default StatsCards;