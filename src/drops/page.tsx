import { DropCard } from "@/components/DropCard";

export default function DropsPage() {
  const drops = [
    { id: "drop1", title: "Summer Spray 2025", image: "/drops/drop1.jpg" },
    { id: "drop2", title: "Underground Kings", image: "/drops/drop2.jpg" },
    { id: "drop3", title: "Electric Chaos", image: "/drops/drop3.jpg" },
    // Add more drops here
  ];

  return (
    <section className="p-8">
      <h1 className="text-5xl font-heading text-street-yellow mb-10 text-center">
        Latest Drops
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {drops.map((drop) => (
          <DropCard key={drop.id} drop={drop} />
        ))}
      </div>
    </section>
  );
}
