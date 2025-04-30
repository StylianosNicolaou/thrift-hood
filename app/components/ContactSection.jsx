"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

// Form field configuration
const formFields = [
  {
    id: "name",
    label: "Your Name",
    type: "text",
    placeholder: "John Doe",
    required: true,
    pattern: ".{2,}",
  },
  {
    id: "email",
    label: "Email Address",
    type: "email",
    placeholder: "you@example.com",
    required: true,
    pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$",
  },
  {
    id: "phone",
    label: "Phone Number",
    type: "tel",
    placeholder: "(555) 123-4567",
    required: false,
  },
  {
    id: "message",
    label: "Your Message",
    type: "textarea",
    placeholder: "Tell us about your vintage find or question...",
    required: true,
    rows: 5,
  },
];

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Refs for animations and scroll
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const mapRef = useRef(null);

  // Scroll-triggered animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const isSectionInView = useInView(sectionRef, { amount: 0.2, once: false });
  const isFormInView = useInView(formRef, { amount: 0.3, once: false });
  const isMapInView = useInView(mapRef, { amount: 0.3, once: false });

  // Parallax effects for depth
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const formY = useTransform(scrollYProgress, [0.1, 0.6], [50, 0]);
  const stickerRotate = useTransform(scrollYProgress, [0.2, 0.8], [0, 15]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormState({
      ...formState,
      [id]: value,
    });

    // Clear field error when typing
    if (fieldErrors[id]) {
      setFieldErrors({
        ...fieldErrors,
        [id]: null,
      });
    }
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    const errors = {};
    let hasErrors = false;

    formFields.forEach((field) => {
      if (field.required && !formState[field.id]) {
        errors[field.id] = "This field is required";
        hasErrors = true;
      } else if (
        field.pattern &&
        formState[field.id] &&
        !new RegExp(field.pattern).test(formState[field.id])
      ) {
        errors[field.id] = `Please enter a valid ${field.label.toLowerCase()}`;
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setFieldErrors(errors);
      setIsSubmitting(false);
      return;
    }

    // Simulate form submission
    setTimeout(() => {
      setFormStatus("success");
      setIsSubmitting(false);

      // Reset form after 5 seconds
      setTimeout(() => {
        setFormStatus(null);
        setFormState({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      }, 5000);
    }, 1500);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 md:py-40 lg:py-48 overflow-hidden bg-black"
    >
      {/* Fixed position decorative elements */}
      <div className="absolute hidden lg:block top-0 right-0 h-full w-1/3 z-0 pointer-events-none bg-gradient-to-l from-purple-900/10 to-transparent"></div>
      <div className="absolute hidden lg:block top-0 left-0 h-full w-1/3 z-0 pointer-events-none bg-gradient-to-r from-orange-900/10 to-transparent"></div>

      {/* Background elements */}
      <motion.div
        className="absolute inset-0 z-0 opacity-30"
        style={{ y: bgY }}
      >
        {/* Noise texture */}
        <div className="absolute inset-0 bg-[url('/assets/textures/noise.png')] bg-repeat opacity-20"></div>

        {/* Grid lines */}
        <div className="absolute inset-0 grid-background"></div>

        {/* Retro geometric elements */}
        <motion.div
          initial={{ opacity: 0, rotate: -5, scale: 0.9 }}
          animate={{
            opacity: isSectionInView ? 0.6 : 0,
            rotate: isSectionInView ? 0 : -5,
            scale: isSectionInView ? 1 : 0.9,
          }}
          transition={{ duration: 0.8 }}
          style={{ rotate: stickerRotate }}
          className="absolute -bottom-32 -right-32 w-96 h-96 md:w-[600px] md:h-[600px] lg:w-[800px] lg:h-[800px]"
        >
          <Image
            src="/assets/shapes/crosshatch-circle.svg"
            alt="Geometric shape"
            fill
            className="object-contain opacity-30"
          />
        </motion.div>
      </motion.div>

      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-[2000px] relative z-10">
        {/* Page heading */}
        <div className="text-center mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isSectionInView ? 1 : 0,
              y: isSectionInView ? 0 : 20,
            }}
            transition={{ duration: 0.7 }}
            className="relative inline-block"
          >
            <h2 className="text-6xl md:text-7xl lg:text-9xl font-chineseRocks text-white inline-block relative z-10">
              Get In Touch
            </h2>

            {/* Spray highlight effect */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: isSectionInView ? 0.6 : 0,
                scale: isSectionInView ? 1 : 0.5,
              }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute -top-8 -left-10 -right-10 -bottom-5 md:-top-12 md:-left-16 md:-right-16 md:-bottom-8 lg:-top-16 lg:-left-20 lg:-right-20 lg:-bottom-10 -z-10"
            >
              <Image
                src="/assets/textures/spray/25.png"
                alt="Spray decoration"
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isSectionInView ? 1 : 0,
              y: isSectionInView ? 0 : 20,
            }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-pink-400 mt-6 max-w-2xl mx-auto text-xl md:text-2xl lg:text-3xl"
          >
            Questions about vintage finds? Collaboration ideas? Drop us a line
          </motion.p>
        </div>

        {/* Main content - Layout changes based on screen size */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 max-w-[1800px] mx-auto">
          {/* Contact form */}
          <motion.div
            ref={formRef}
            style={{ y: formY }}
            className="order-2 lg:order-1"
          >
            {/* Form card with VHS tape decoration */}
            <div className="relative">
              {/* VHS tape decorative element */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{
                  opacity: isFormInView ? 1 : 0,
                  x: isFormInView ? 0 : -50,
                }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="absolute -top-16 -left-8 md:-left-20 w-32 h-20 md:w-40 md:h-28 lg:w-48 lg:h-32 rotate-[-12deg] hidden sm:block"
              >
                <Image
                  src="/assets/images/vhs-tape.png"
                  alt="VHS Tape"
                  fill
                  className="object-contain"
                />
              </motion.div>

              {/* Form container */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{
                  opacity: isFormInView ? 1 : 0,
                  x: isFormInView ? 0 : -30,
                }}
                transition={{ duration: 0.7 }}
                className="bg-neutral-900/90 backdrop-blur-sm border border-white/10 p-8 md:p-10 lg:p-12 rounded-sm relative z-10 shadow-glow"
              >
                <div className="mb-8">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
                    Send us a message
                  </h3>
                  <p className="text-white/70 text-lg">
                    Fill out the form and we'll get back to you
                  </p>
                </div>

                {/* Contact form */}
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {formFields.map((field) => (
                    <div key={field.id} className="form-group">
                      <label
                        htmlFor={field.id}
                        className="block text-white font-medium mb-2 text-base md:text-lg"
                      >
                        {field.label}{" "}
                        {field.required && (
                          <span className="text-pink-500">*</span>
                        )}
                      </label>

                      {field.type === "textarea" ? (
                        <textarea
                          id={field.id}
                          rows={field.rows}
                          placeholder={field.placeholder}
                          className={`w-full bg-black border ${
                            fieldErrors[field.id]
                              ? "border-red-500 focus:border-red-500"
                              : "border-white/20 focus:border-lime-400"
                          } text-white p-4 focus:outline-none transition-colors rounded-sm text-lg`}
                          value={formState[field.id]}
                          onChange={handleInputChange}
                          required={field.required}
                        />
                      ) : (
                        <input
                          type={field.type}
                          id={field.id}
                          placeholder={field.placeholder}
                          className={`w-full bg-black border ${
                            fieldErrors[field.id]
                              ? "border-red-500 focus:border-red-500"
                              : "border-white/20 focus:border-lime-400"
                          } text-white p-4 focus:outline-none transition-colors rounded-sm text-lg`}
                          value={formState[field.id]}
                          onChange={handleInputChange}
                          required={field.required}
                        />
                      )}

                      {fieldErrors[field.id] && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm mt-1"
                        >
                          {fieldErrors[field.id]}
                        </motion.p>
                      )}
                    </div>
                  ))}

                  {/* Submit button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-8"
                  >
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-4 font-bold uppercase text-xl relative overflow-hidden ${
                        isSubmitting
                          ? "bg-neutral-700 text-white/50"
                          : "bg-lime-400 text-black"
                      }`}
                    >
                      <span
                        className={isSubmitting ? "opacity-0" : "opacity-100"}
                      >
                        Send Message
                      </span>

                      {isSubmitting && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="retro-loader"></div>
                        </div>
                      )}
                    </button>
                  </motion.div>

                  {/* Form submission status */}
                  {formStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-lime-400/10 border border-lime-400/30 text-lime-400 p-5 rounded-sm mt-6"
                    >
                      <div className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 mr-3 flex-shrink-0 mt-0.5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div>
                          <p className="font-medium text-lg">
                            Message sent successfully!
                          </p>
                          <p className="text-base mt-1">
                            We'll get back to you as soon as possible.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </form>

                {/* Form decorative corner elements */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-lime-400"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-lime-400"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-lime-400"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-lime-400"></div>
              </motion.div>
            </div>

            {/* Alternative contact methods - Mobile & tablet visible but changes position on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: isFormInView ? 1 : 0,
                y: isFormInView ? 0 : 30,
              }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-12 lg:mt-16 bg-neutral-900/60 backdrop-blur-sm border border-white/10 p-8 md:p-10 rounded-sm"
            >
              <h4 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Alternative Ways to Reach Us
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Store hours */}
                <div className="flex items-start space-x-5">
                  <div className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0 bg-pink-400/20 rounded-sm flex items-center justify-center text-pink-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-7 md:h-8 md:w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-base md:text-lg uppercase tracking-wider mb-3">
                      Store Hours
                    </h5>
                    <ul className="space-y-2 text-white/70 text-base md:text-lg">
                      <li>Monday - Friday: 11AM - 8PM</li>
                      <li>Saturday: 10AM - 9PM</li>
                      <li>Sunday: 12PM - 6PM</li>
                    </ul>
                  </div>
                </div>

                {/* Contact info */}
                <div className="flex items-start space-x-5">
                  <div className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0 bg-lime-400/20 rounded-sm flex items-center justify-center text-lime-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-7 md:h-8 md:w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-base md:text-lg uppercase tracking-wider mb-3">
                      Contact Info
                    </h5>
                    <ul className="space-y-2 text-white/70 text-base md:text-lg">
                      <li>Email: hello@thrifthood.com</li>
                      <li>Phone: (555) 123-4567</li>
                      <li>Support Hours: 9AM - 6PM EST</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Social media links */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <h5 className="font-bold text-white text-base md:text-lg uppercase tracking-wider mb-4">
                  Follow Us
                </h5>
                <div className="flex space-x-5">
                  {["instagram", "tiktok", "twitter", "facebook"].map(
                    (social) => (
                      <motion.a
                        key={social}
                        href={`#${social}`}
                        whileHover={{ scale: 1.1, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-12 h-12 md:w-14 md:h-14 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-colors duration-300"
                      >
                        <Image
                          src={`/assets/icons/${social}.svg`}
                          alt={`${social} icon`}
                          width={24}
                          height={24}
                          className="opacity-80"
                        />
                      </motion.a>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Store location section */}
          <motion.div
            ref={mapRef}
            initial={{ opacity: 0, x: 30 }}
            animate={{
              opacity: isMapInView ? 1 : 0,
              x: isMapInView ? 0 : 30,
            }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            {/* Store location title */}
            <div className="mb-6">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
                Find Our Store
              </h3>
              <p className="text-white/70 text-lg md:text-xl">
                123 Vintage Avenue, Downtown, NYC 10001
              </p>
            </div>

            {/* Styled map container - 90s-inspired TV screen */}
            <div className="relative mb-12">
              {/* TV-style frame */}
              <div className="absolute -inset-3 md:-inset-4 lg:-inset-5 border-8 border-neutral-800 rounded-lg z-10 pointer-events-none shadow-lg">
                {/* TV Scan lines */}
                <div className="absolute inset-0 scanlines pointer-events-none"></div>

                {/* TV Control knobs */}
                <div className="absolute -right-6 top-1/4 w-5 h-5 md:w-6 md:h-6 rounded-full bg-neutral-700 border border-neutral-600"></div>
                <div className="absolute -right-6 top-1/3 w-5 h-5 md:w-6 md:h-6 rounded-full bg-neutral-700 border border-neutral-600"></div>
                <div className="absolute -right-6 top-1/2 w-5 h-5 md:w-6 md:h-6 rounded-full bg-neutral-700 border border-neutral-600"></div>
              </div>

              {/* Map image/embed with VHS effect */}
              <div className="aspect-[4/3] w-full relative overflow-hidden rounded">
                <div className="absolute inset-0 vhs-effect opacity-30 z-20 pointer-events-none"></div>
                <div className="absolute top-3 left-3 bg-black/80 text-white text-sm px-3 py-1 z-20 font-mono">
                  REC 00:00:00
                </div>

                {/* Responsive map image/iframe - For a real project, replace with Google Maps or another provider */}
                <Image
                  src="/assets/images/store-map.jpg"
                  alt="Store Location Map"
                  fill
                  className="object-cover z-0"
                />

                {/* Location pin */}
                <motion.div
                  initial={{ y: -20 }}
                  animate={{ y: [-5, 0, -5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                >
                  <div className="relative flex flex-col items-center">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-lime-400 rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 md:h-7 md:w-7 text-black"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="mt-1 px-3 py-1 bg-black text-white text-sm rounded">
                      THRIFTHOOD
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Store features/bulletins */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Features list */}
              <div className="bg-neutral-900/60 backdrop-blur-sm border border-white/10 p-6 md:p-8 rounded-sm">
                <h4 className="text-xl md:text-2xl font-bold text-white mb-4">
                  Store Features
                </h4>
                <ul className="space-y-3">
                  {[
                    "Free Parking",
                    "Vintage Photo Booth",
                    "Trading Post",
                    "Custom Alterations",
                  ].map((feature, index) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{
                        opacity: isMapInView ? 1 : 0,
                        x: isMapInView ? 0 : -10,
                      }}
                      transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                      className="flex items-center text-white/80 text-base md:text-lg"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-lime-400 mr-3 flex-shrink-0"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Upcoming events */}
              <div className="bg-neutral-900/60 backdrop-blur-sm border border-white/10 p-6 md:p-8 rounded-sm relative overflow-hidden">
                <h4 className="text-xl md:text-2xl font-bold text-white mb-4">
                  Upcoming Events
                </h4>
                <ul className="space-y-4">
                  {[
                    { date: "JUL 15", title: "90s Hip-Hop Night" },
                    { date: "JUL 22", title: "Vintage Swap Meet" },
                    { date: "AUG 05", title: "Graffiti Workshop" },
                  ].map((event, index) => (
                    <motion.li
                      key={event.title}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{
                        opacity: isMapInView ? 1 : 0,
                        x: isMapInView ? 0 : -10,
                      }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                      className="flex items-center"
                    >
                      <div className="w-14 h-14 md:w-16 md:h-16 flex-shrink-0 bg-pink-500/20 flex flex-col items-center justify-center rounded-sm">
                        <span className="text-pink-400 text-sm font-bold">
                          {event.date.split(" ")[0]}
                        </span>
                        <span className="text-white text-base">
                          {event.date.split(" ")[1]}
                        </span>
                      </div>
                      <span className="ml-4 text-white/80 text-base md:text-lg">
                        {event.title}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                {/* Decorative "New" sticker */}
                <div className="absolute -top-4 -right-4 w-20 h-20 md:w-24 md:h-24 rotate-12">
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-full bg-yellow-400 rounded-full flex items-center justify-center transform rotate-[-12deg]">
                        <span className="text-black font-bold text-base md:text-lg">
                          NEW!
                        </span>
                      </div>
                    </div>
                    <div className="absolute inset-[3px] rounded-full border-2 border-dashed border-black/30"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter signup - Only visible on mobile/tablet */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isMapInView ? 1 : 0,
                y: isMapInView ? 0 : 20,
              }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 p-6 md:p-8 bg-gradient-to-r from-pink-900/40 to-purple-900/40 rounded-sm lg:hidden"
            >
              <h4 className="text-white font-bold text-xl mb-3">
                Join Our Newsletter
              </h4>
              <p className="text-white/70 text-base mb-4">
                Get updates on new arrivals and exclusive events
              </p>

              <div className="flex space-x-3">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-grow px-4 py-3 bg-black border border-white/20 focus:border-lime-400 text-white text-base rounded-sm focus:outline-none"
                />
                <button className="bg-lime-400 text-black font-bold px-6 py-3 text-base rounded-sm">
                  Sign Up
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Newsletter - Only visible on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: isMapInView ? 1 : 0,
            y: isMapInView ? 0 : 30,
          }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="hidden lg:block max-w-5xl mx-auto mt-32 p-10 bg-gradient-to-r from-pink-900/40 to-purple-900/40 rounded-sm relative"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <h4 className="text-3xl text-white font-bold mb-3">
                Stay in the Loop
              </h4>
              <p className="text-white/80 text-xl">
                Sign up for our newsletter to receive updates on new vintage
                arrivals, exclusive discounts, and upcoming events.
              </p>
            </div>

            <div>
              <div className="flex">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-grow px-5 py-4 bg-black border border-white/20 focus:border-lime-400 text-white rounded-l-sm focus:outline-none text-lg"
                />
                <button className="bg-lime-400 text-black font-bold px-6 py-4 rounded-r-sm text-lg">
                  Sign Up
                </button>
              </div>
            </div>
          </div>

          {/* Cassette tape decoration */}
          <motion.div
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute -top-12 -right-12 w-32 h-32 hidden xl:block"
          >
            <Image
              src="/assets/images/cassette.png"
              alt="Cassette tape"
              fill
              className="object-contain"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* CSS for custom effects */}
      <style jsx global>{`
        .shadow-glow {
          box-shadow: 0 0 25px rgba(0, 255, 255, 0.1),
            0 0 40px rgba(255, 0, 255, 0.05);
        }

        .scanlines::before {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background: repeating-linear-gradient(
            to bottom,
            transparent 0%,
            rgba(255, 255, 255, 0.05) 0.5%,
            transparent 1%
          );
          animation: scanlines 0.2s linear infinite;
          pointer-events: none;
          z-index: 20;
        }

        @keyframes scanlines {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(15px);
          }
        }

        .grid-background {
          background-size: 40px 40px;
          background-image: linear-gradient(
              to right,
              rgba(255, 255, 255, 0.05) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(255, 255, 255, 0.05) 1px,
              transparent 1px
            );
        }

        .vhs-effect::before {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(
            transparent 40%,
            rgba(0, 255, 255, 0.1) 45%,
            rgba(255, 0, 255, 0.1) 50%,
            transparent 55%
          );
          background-size: 100% 300%;
          animation: vhs-track 8s linear infinite;
          pointer-events: none;
        }

        @keyframes vhs-track {
          0% {
            background-position: 0 0%;
          }
          100% {
            background-position: 0 300%;
          }
        }

        .retro-loader {
          width: 28px;
          height: 28px;
          border: 4px solid rgba(255, 255, 255, 0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
}
