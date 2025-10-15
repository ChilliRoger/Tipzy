import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto w-full container-max px-4 sm:px-6 lg:px-8 py-12">
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight text-white">
            Seamless UPI-based tipping for India’s service workforce
          </h1>
          <p className="mt-4 text-white">
            Tipzy is a B2B2C platform enabling UPI-based tipping for waiters, parking guards, and barbers via personalized QR badges in India’s cashless economy. Partnering with restaurants, salons, and parking services, it integrates with POS systems for secure, direct tips. Transaction fees, premium subscriptions, and partnerships drive revenue while boosting staff morale and customer satisfaction.
          </p>
          <div className="mt-6 flex gap-3">
            <Link href="/signup" className="btn-primary px-5 py-3 rounded-md font-medium shadow-md">
              Sign Up as Venue
            </Link>
            <Link href="#" className="px-5 py-3 rounded-md font-medium border border-white text-white hover:bg-white/10">
              Download App
            </Link>
          </div>
        </div>
        <div className="card p-6">
          <div className="aspect-video w-full rounded-lg bg-[--color-secondary]" />
          <p className="mt-3 text-sm text-black">Demo preview area</p>
        </div>
      </section>

      <section className="mt-16 grid md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="text-xl font-semibold">Problem</h2>
          <p className="mt-2 text-black">
            Cashless payments make it hard for customers to tip service staff. Tips often get lost in pooling, and staff morale suffers.
          </p>
        </div>
        <div className="card p-6">
          <h2 className="text-xl font-semibold">Solution</h2>
          <p className="mt-2 text-black">
            Personalized QR badges linked to each staff member. Customers scan and tip instantly via UPI. Venues access analytics and manage staff.
          </p>
        </div>
      </section>

      <section className="mt-16 card p-6">
        <h2 className="text-xl font-semibold">How it works</h2>
        <ol className="mt-3 grid md:grid-cols-3 gap-4">
          <li className="p-4 rounded-lg bg-[--color-secondary]">
            Venue onboards staff and prints QR badges.
          </li>
          <li className="p-4 rounded-lg bg-[--color-secondary]">
            Customer scans QR and tips via UPI.
          </li>
          <li className="p-4 rounded-lg bg-[--color-secondary]">
            Tipzy tracks tips, analytics, and payouts (mocked).
          </li>
        </ol>
      </section>

      <section className="mt-16 grid md:grid-cols-3 gap-6">
        {["Restaurant Owner", "Salon Barber", "Parking Customer"].map((role) => (
          <div key={role} className="card p-6">
            <p className="text-black">
              “Tipzy made tipping seamless for our patrons and boosted staff morale.”
            </p>
            <p className="mt-3 text-sm text-black">— {role}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
