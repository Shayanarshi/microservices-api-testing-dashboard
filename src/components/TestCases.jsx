
import { useState } from "react";

const operations = [
  {
    id: "allPlans",
    service: "Plan Service",
    label: "View All Plans",
    description: "Retrieve all available plans.",
    method: "GET",
    path: "/api/p/plans",
    fields: [],
  },
  {
    id: "planById",
    service: "Plan Service",
    label: "Find a Plan",
    description: "Retrieve a plan using its ID.",
    method: "GET",
    path: "/api/p/plans/{planId}",
    fields: [
      { name: "planId", label: "Plan ID", placeholder: "Enter plan ID", required: true },
    ],
  },
  {
    id: "addFriend",
    service: "Friend Service",
    label: "Add a Friend",
    description: "Save a friend's contact details.",
    method: "POST",
    path: "/api/f/friend/add",
    fields: [
      { name: "phoneNumber", label: "Your Phone Number", placeholder: "Enter your phone number", required: true, type: "tel" },
      { name: "friendNumber", label: "Friend's Phone Number", placeholder: "Enter friend's phone number", required: true, type: "tel" },
      { name: "friendName", label: "Friend's Name", placeholder: "Enter friend's name", required: true },
    ],
  },
  {
    id: "friendsByPhone",
    service: "Friend Service",
    label: "Find My Friends",
    description: "Retrieve friends saved under a phone number.",
    method: "GET",
    path: "/api/f/friend/{phoneNumber}",
    fields: [
      { name: "phoneNumber", label: "Your Phone Number", placeholder: "Enter your phone number", required: true, type: "tel" },
    ],
  },
  {
    id: "register",
    service: "Customer Service",
    label: "Register Customer",
    description: "Create a customer account.",
    method: "POST",
    path: "/api/c/customer/register",
    fields: [
      { name: "phoneNumber", label: "Phone Number", placeholder: "Enter phone number", required: true, type: "tel" },
      { name: "userName", label: "Full Name", placeholder: "Enter full name", required: true },
      { name: "password", label: "Password", placeholder: "Create a password", required: true, type: "password" },
      { name: "email", label: "Email Address", placeholder: "Enter email address", required: true, type: "email" },
      { name: "planId", label: "Plan ID", placeholder: "Enter an existing plan ID", required: true },
    ],
  },
  {
    id: "login",
    service: "Customer Service",
    label: "Customer Login",
    description: "Check customer login credentials.",
    method: "POST",
    path: "/api/c/customer/login",
    fields: [
      { name: "phoneNumber", label: "Phone Number", placeholder: "Enter phone number", required: true, type: "tel" },
      { name: "password", label: "Password", placeholder: "Enter password", required: true, type: "password" },
    ],
  },
  {
    id: "profile",
    service: "Customer Service",
    label: "View Customer Profile",
    description: "Retrieve customer, plan, and friend information.",
    method: "GET",
    path: "/api/c/customer/profile/{phoneNumber}",
    fields: [
      { name: "phoneNumber", label: "Customer Phone Number", placeholder: "Enter phone number", required: true, type: "tel" },
    ],
  },
];

function formatResponse(data) {
  if (data == null) return "(Empty response)";

  if (typeof data === "string") {
    try {
      return JSON.stringify(JSON.parse(data), null, 2);
    } catch {
      return data;
    }
  }

  return JSON.stringify(data, null, 2);
}

function TestCases({ onTestResult }) {
  const [selectedId, setSelectedId] = useState("allPlans");
  const [values, setValues] = useState({});
  const [response, setResponse] = useState(null);
  const [responseTab, setResponseTab] = useState("body");
  const [loading, setLoading] = useState(false);

  const selected = operations.find((item) => item.id === selectedId);

  function changeOperation(id) {
    setSelectedId(id);
    setValues({});
    setResponse(null);
    setResponseTab("body");
  }

  function updateField(name, value) {
    setValues((current) => ({ ...current, [name]: value }));
  }

  async function runOperation(event) {
    event.preventDefault();
    if (loading) return;

    setLoading(true);
    setResponse(null);
    setResponseTab("body");

    const started = performance.now();
    let path = selected.path;
    const requestHeaders = { Accept: "application/json" };

    try {
      // Replace URL parameters, such as {planId} or {phoneNumber}.
      for (const field of selected.fields) {
        const placeholder = `{${field.name}}`;

        if (path.includes(placeholder)) {
          const value = String(values[field.name] ?? "").trim();

          path = path.replace(
            placeholder,
            encodeURIComponent(value)
          );
        }
      }

      const options = {
        method: selected.method,
        headers: requestHeaders,
      };

      // Build JSON for POST requests.
      if (selected.method === "POST") {
        const requestBody = {};

        for (const field of selected.fields) {
          const value = String(values[field.name] ?? "").trim();

          requestBody[field.name] =
            field.name === "phoneNumber" ||
            field.name === "friendNumber"
              ? Number(value)
              : value;
        }

        requestHeaders["Content-Type"] = "application/json";
        options.body = JSON.stringify(requestBody);
      }

      const result = await fetch(path, options);
      const text = await result.text();

      let data = text;

      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        // Keep plain-text responses unchanged.
      }

      setResponse({
        ok: result.ok,
        status: result.status,
        statusText: result.statusText,
        time: Math.round(performance.now() - started),
        data,
        headers: Object.fromEntries(result.headers.entries()),
      });

      // Update dashboard statistics: HTTP 2xx/3xx = success.
      onTestResult?.(result.ok);
    } catch (error) {
      setResponse({
        ok: false,
        status: "Network Error",
        statusText: error.message,
        time: Math.round(performance.now() - started),
        data: error.message,
        headers: {},
      });

      onTestResult?.(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="test-cases" className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
        <h2 className="text-xl font-bold text-slate-900">
          API Request
        </h2>

        <p className="mb-6 mt-2 text-sm text-slate-500">
          Select an operation, enter the required details, and send your request through the API Gateway.
        </p>

        <form onSubmit={runOperation} className="space-y-5">
          <div>
            <label
              htmlFor="operation"
              className="mb-2 block text-sm font-semibold"
            >
              Operation
            </label>

            <select
              id="operation"
              value={selectedId}
              onChange={(event) => changeOperation(event.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm outline-none focus:border-blue-500"
            >
              {["Plan Service", "Friend Service", "Customer Service"].map(
                (service) => (
                  <optgroup key={service} label={service}>
                    {operations
                      .filter((item) => item.service === service)
                      .map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.label}
                        </option>
                      ))}
                  </optgroup>
                )
              )}
            </select>

            <p className="mt-2 text-sm text-slate-500">
              {selected.description}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
              <span
                className={`rounded px-2 py-1 font-bold ${
                  selected.method === "GET"
                    ? "bg-green-100 text-green-700"
                    : "bg-orange-100 text-orange-700"
                }`}
              >
                {selected.method}
              </span>
              <code className="break-all text-slate-600">
                {selected.path}
              </code>
            </div>
          </div>

          {selected.fields.length > 0 && (
            <div className="rounded-lg border border-slate-200 p-4">
              <h3 className="mb-4 font-semibold">Request Parameters</h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {selected.fields.map((field) => (
                  <div key={field.name}>
                    <label
                      htmlFor={field.name}
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      {field.label}
                    </label>

                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type || "text"}
                      value={values[field.name] || ""}
                      onChange={(event) =>
                        updateField(field.name, event.target.value)
                      }
                      placeholder={field.placeholder}
                      required={field.required}
                      inputMode={
                        field.type === "tel" ? "numeric" : undefined
                      }
                      pattern={
                        field.type === "tel" ? "[0-9]{1,19}" : undefined
                      }
                      className="w-full rounded-lg border border-slate-300 p-3 text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Sending Request..." : "Send Request"}
          </button>
        </form>
      </div>

      {response && (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-center gap-4 border-b border-slate-200 p-4">
            <h3 className="font-semibold text-slate-900">Response</h3>

            <span
              className={`rounded-md px-2.5 py-1 text-sm font-semibold ${
                response.ok
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {response.status} {response.statusText}
            </span>

            <span className="text-sm text-slate-500">
              Time: {response.time} ms
            </span>
          </div>

          <div className="flex gap-5 border-b border-slate-200 px-4">
            {["body", "headers"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setResponseTab(tab)}
                className={`border-b-2 py-3 text-sm font-medium ${
                  responseTab === tab
                    ? "border-orange-500 text-orange-600"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                {tab === "body" ? "Body" : "Headers"}
              </button>
            ))}
          </div>

          <div className="p-4">
            {responseTab === "body" ? (
              <pre className="max-h-[500px] overflow-auto whitespace-pre-wrap break-words rounded-lg bg-slate-950 p-4 text-sm leading-6 text-green-300">
                {formatResponse(response.data)}
              </pre>
            ) : (
              <div className="overflow-x-auto">
                {Object.keys(response.headers).length === 0 ? (
                  <p className="text-sm text-slate-500">
                    No response headers available.
                  </p>
                ) : (
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500">
                        <th className="p-3 font-medium">Key</th>
                        <th className="p-3 font-medium">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(response.headers).map(([key, value]) => (
                        <tr key={key} className="border-b border-slate-100">
                          <td className="break-all p-3 font-medium">{key}</td>
                          <td className="break-all p-3">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default TestCases;
