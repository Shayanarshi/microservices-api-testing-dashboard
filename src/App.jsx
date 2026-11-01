import { useState } from "react";
import Sidebar from "./components/Sidebar";
import StatsCards from "./components/StatsCards";
import ServiceList from "./components/ServiceList";
import TestCases from "./components/TestCases";

function App() {
  const [stats, setStats] = useState({
    passed: 0,
    failed: 0,
    executed: 0,
  });

  function handleTestResult(success) {
    setStats((current) => ({
      passed: current.passed + (success ? 1 : 0),
      failed: current.failed + (success ? 0 : 1),
      executed: current.executed + 1,
    }));
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 md:flex">
      <Sidebar />
      <main className="min-w-0 flex-1 p-5 md:p-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold md:text-3xl">
            Microservices Test Dashboard
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Monitor your services and test APIs from one place.
          </p>
        </header>

        <StatsCards stats={stats} />
        <ServiceList />
        <TestCases onTestResult={handleTestResult} />
      </main>
    </div>
  );
}

export default App;