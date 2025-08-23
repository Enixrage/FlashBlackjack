import type { FormEvent } from "react";
import { useState } from "react";


const ContactPage: React.FC = () => {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xzzeozoj", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-32 px-4
                    bg-gradient-to-b from-gray-800 via-green-700/70 to-gray-800/40 min-h-screen font-sans">
      <div className="max-w-2xl text-center mb-12 text-white">
        <p className="text-lg leading-relaxed">
          Have a suggestion or some feedback for us? Whether it's a tweak to the
          game, new flashcard ideas, or feature requests—we want to hear from
          you! Fill out the form below and let us know how we can make Blackjack
          BootCamp even better.
        </p>
      </div>

      <div className="bg-black bg-opacity-40 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          Contact Us
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="w-full p-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="w-full p-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="message"
            rows={6}
            placeholder="Your Message"
            required
            className="w-full p-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-300 transition"
          >
            Send Message
          </button>
        </form>

        {status === "success" && (
          <p className="mt-4 font-bold text-green-400 text-center">
            Thank you! Your message has been sent.
          </p>
        )}
        {status === "error" && (
          <p className="mt-4 font-bold text-red-500 text-center">
            Oops! Something went wrong.
          </p>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
