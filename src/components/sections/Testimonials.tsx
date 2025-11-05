import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  location: string;
  age: number;
}

const testimonials: Testimonial[] = [
  {
    quote: "My grandchild asks the avatar for my pasta recipe anytime. She feels like I'm cooking with her. I've never felt more present in her life.",
    author: 'Margaret',
    age: 72,
    location: 'Austin, TX',
  },
  {
    quote: "When my dad passed, I thought I'd lost his advice forever. Now my kids ask his avatar. He's still guiding them. It's like he never left.",
    author: 'James',
    age: 58,
    location: 'Seattle, WA',
  },
  {
    quote: "This isn't just about recording. It's about staying present. My grandmother asks me questions about my life the same way she always did. I feel her with me.",
    author: 'Sarah',
    age: 24,
    location: 'Boston, MA',
  },
];

const StarRating: React.FC = () => (
  <div className="flex gap-1 mb-4">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="w-5 h-5 fill-accent text-accent" />
    ))}
  </div>
);

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-text-dark mb-4">
            Stories From Our Community
          </h2>
          <p className="text-lg sm:text-xl text-text-light">
            Real families preserving precious memories and connections.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-neutral rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow"
            >
              <StarRating />
              <blockquote className="text-text-light italic text-lg mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              <div className="text-text-dark font-medium">
                - {testimonial.author}, {testimonial.age}, {testimonial.location}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
