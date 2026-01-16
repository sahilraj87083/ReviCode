import React from 'react'

function Home() {
  return (
    <main className="bg-black text-white">

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Practice. Compete. Improve.
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto mb-8">
          ReviCode helps you collect problems, create contests, and compete with friends —
          all while tracking real performance stats.
        </p>

        <div className="flex justify-center gap-4">
          <a
            href="/signup"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-md font-medium"
          >
            Get Started
          </a>
          <a
            href="/contests"
            className="px-6 py-3 border border-gray-600 rounded-md hover:border-white"
          >
            Explore Contests
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
          <Feature
            title="Smart Practice"
            desc="Save problems from LeetCode, Codeforces, GFG and practice them anytime."
          />
          <Feature
            title="Timed Contests"
            desc="Create real contests from your collections and challenge friends."
          />
          <Feature
            title="Deep Stats"
            desc="Track accuracy, speed, topics, and improvement over time."
          />
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-gray-800 py-20 text-center">
        <h2 className="text-3xl font-bold mb-10">How it works</h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          <Step number="1" text="Save coding problems" />
          <Step number="2" text="Create or join contests" />
          <Step number="3" text="Analyze performance" />
        </div>
      </section>

    </main>
  );
}

function Feature({ title, desc }) {
  return (
    <div className="p-6 border border-gray-800 rounded-lg">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{desc}</p>
    </div>
  );
}

function Step({ number, text }) {
  return (
    <div>
      <div className="text-indigo-500 text-4xl font-bold mb-2">{number}</div>
      <p className="text-gray-300">{text}</p>
    </div>
  );
}

export default Home;
