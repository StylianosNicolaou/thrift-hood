export default function ContactPage() {
  return (
    <section className="p-8 max-w-2xl mx-auto text-center">
      <h1 className="text-5xl font-heading text-street-yellow mb-8">
        Get In Touch
      </h1>
      <form className="space-y-6">
        <input
          type="text"
          placeholder="Name"
          className="w-full p-4 bg-asphalt-black border-2 border-street-yellow rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-4 bg-asphalt-black border-2 border-street-yellow rounded-lg focus:outline-none focus:ring-2 focus:ring-spray-red"
        />
        <textarea
          placeholder="Your Message"
          className="w-full p-4 bg-asphalt-black border-2 border-street-yellow rounded-lg focus:outline-none focus:ring-2 focus:ring-toxic-green h-40"
        />
        <button
          type="submit"
          className="bg-street-yellow text-asphalt-black font-bold py-3 px-6 rounded-full hover:bg-electric-blue transition"
        >
          Send Message
        </button>
      </form>
    </section>
  );
}
