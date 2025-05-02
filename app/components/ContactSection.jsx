"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import GraffitiText from "./GraffitiText";
import Button from "./Button";

const VhsInput = ({
  label,
  type = "text",
  value,
  onChange,
  name,
  required = false,
}) => {
  return (
    <div className="mb-6 relative border-2 border-neon-pink shadow-retro-sm bg-black/30 transform -rotate-1">
      <label className="absolute -top-3 left-4 bg-black px-2 text-sm uppercase tracking-wider text-neon-green font-bold">
        {label} {required && <span className="text-neon-orange">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-transparent px-4 py-3 text-white focus:outline-none"
        required={required}
      />
      <div className="absolute -bottom-1 left-0 w-full h-1 bg-static"></div>
    </div>
  );
};

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);

      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSent(false);
        setFormData({ name: "", email: "", message: "" });
      }, 3000);
    }, 1500);
  };

  return (
    <SectionWrapper id="contact" className="bg-vintage-purple pattern-dots">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        <div className="md:col-span-5 text-white animate-in">
          <div className="inline-block px-3 py-1 bg-neon-green text-black border-2 border-black transform rotate-2 mb-4">
            <p className="text-sm uppercase tracking-widest font-bold">
              Get In Touch
            </p>
          </div>

          <GraffitiText
            element="h2"
            className="text-3xl md:text-5xl mb-8"
            color="text-neon-orange"
          >
            Join the Movement
          </GraffitiText>

          <div className="space-y-6 bg-black p-6 border-2 border-white shadow-retro transform -rotate-1">
            <p className="text-base font-bold text-neon-pink mb-6 leading-relaxed">
              Whether you're looking to cop some gear, collaborate on a project,
              or just say what's up — we're always down to connect with the
              community.
            </p>

            <p className="text-base text-white mb-4 leading-relaxed">
              Drop us a line and become part of the ThriftHood movement. No
              corporate BS, just real people keeping it 100.
            </p>
          </div>

          <div className="mt-8 space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 flex items-center justify-center bg-neon-green border-2 border-black shadow-retro transform rotate-3">
                <svg
                  className="w-5 h-5 text-black"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-neon-orange font-bold">Email</p>
                <p className="text-base text-white">crew@thrifthood.cy</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 flex items-center justify-center bg-neon-pink border-2 border-black shadow-retro transform -rotate-3">
                <svg
                  className="w-5 h-5 text-black"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-neon-orange font-bold">Find Us</p>
                <p className="text-base text-white">The Streets, Anytown USA</p>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-7 relative animate-in">
          {/* Graffiti paint splatter effect with CSS instead of Lottie */}
          <div className="absolute -top-12 -left-12 w-24 h-24">
            <motion.div
              className="w-full h-full bg-neon-pink rounded-full opacity-20"
              initial={{ scale: 0, opacity: 0 }}
              animate={
                isSent ? { scale: 4, opacity: 0.2 } : { scale: 1, opacity: 0.2 }
              }
              transition={{ duration: 0.8 }}
            />
            <motion.div
              className="absolute top-5 left-8 w-12 h-12 bg-neon-green rounded-full opacity-30"
              initial={{ scale: 0, opacity: 0 }}
              animate={
                isSent ? { scale: 3, opacity: 0.3 } : { scale: 1, opacity: 0.3 }
              }
              transition={{ duration: 0.5, delay: 0.1 }}
            />
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-black border-4 border-neon-green p-6 shadow-retro-xl transform rotate-1"
          >
            <VhsInput
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <VhsInput
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <div className="mb-6 relative border-2 border-neon-pink shadow-retro-sm bg-black/30 transform rotate-1">
              <label className="absolute -top-3 left-4 bg-black px-2 text-sm uppercase tracking-wider text-neon-green font-bold">
                Message <span className="text-neon-orange">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full bg-transparent px-4 py-3 text-white focus:outline-none resize-none"
                required
              />
              <div className="absolute -bottom-1 left-0 w-full h-1 bg-static"></div>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                type="submit"
                variant="primary"
                className="min-w-[150px] flex justify-center items-center transform -rotate-1"
                disabled={isSending || isSent}
              >
                {isSending ? (
                  <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></span>
                ) : isSent ? (
                  "Message Sent!"
                ) : (
                  "Send It!"
                )}
              </Button>

              {isSent && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-neon-pink font-bold"
                >
                  Respect! We'll hit you back ASAP!
                </motion.p>
              )}
            </div>
          </form>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ContactSection;
