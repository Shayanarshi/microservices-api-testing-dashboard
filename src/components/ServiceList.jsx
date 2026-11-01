
import { useState } from "react";

const services = [
  {
    name: "API Gateway + PlanApp",
    port: 8080,
    url: "/api/p/plans",
    description: "Checks plan retrieval through the Gateway.",
  },
  {
    name: "FriendApp",
    port: 8080,
    url: "/api/f/friend/9999999999",
    description: "Checks the friends endpoint through the Gateway.",
  },
  {
    name: "CustomerApp",
    port: 8080,
    url: "/api/c/health",
    description: "Checks CustomerApp's health endpoint.",
  },
];

export default function ServiceList() {
  const [results, setResults] = useState({});
  const [checking, setChecking] = useState(false);

  async function checkServices() {
    setChecking(true);

    const updated = {};

    await Promise.all(
      services.map(async (service) => {
        try {
          const response = await fetch(service.url, {
            headers: { Accept: "application/json" },
          });

          updated[service.name] = {
            reachable: response.ok,
            status: response.ok
              ? "Reachable"
              : `HTTP ${response.status}`,
          };
        } catch (error) {
          updated[service.name] = {
            reachable: false,
            status: "Request failed",
            error: error.message,
          };
        }
      })
    );

    setResults(updated);
    setChecking(false);
  }

  return (
    <section
      id="services"
      className="mb-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-6"
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Services</h2>
          <p className="mt-1 text-sm text-slate-500">
            Check whether your applications respond through the Gateway.
          </p>
        </div>

        <button
          type="button"
          onClick={checkServices}
          disabled={checking}
          className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {checking ? "Checking..." : "Check Services"}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {services.map((service) => {
          const result = results[service.name];

          return (
            <div
              key={service.name}
              className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 p-4"
            >
              <div className="min-w-0">
                <h3 className="font-semibold text-slate-900">
                  {service.name}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Gateway port {service.port}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {service.description}
                </p>
              </div>

              <span
                title={result?.error || ""}
                className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${
                  !result
                    ? "bg-slate-100 text-slate-500"
                    : result.reachable
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {result?.status || "Not checked"}
              </span>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-slate-500">
        An HTTP error may indicate an endpoint or routing problem rather
        than a stopped service.
      </p>
    </section>
  );
}
