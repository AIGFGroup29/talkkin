import React from 'react';
import { motion } from 'framer-motion';
import { Accordion } from '../ui/Accordion';

const faqCategories = [
  {
    category: 'Getting Started',
    questions: [
      {
        question: 'How do I create my avatar?',
        answer: 'Upload your photos, record your voice, share your knowledge. It happens in minutes. Your avatar is ready to interact immediately.',
      },
      {
        question: 'Is it really this simple?',
        answer: 'Yes. No technical knowledge needed. If you can take a phone photo and record a voice message, you can create your avatar.',
      },
      {
        question: 'How long until my family can interact?',
        answer: 'Minutes from upload. The moment your avatar is created, your family can start asking questions.',
      },
      {
        question: 'Do you offer refunds?',
        answer: 'We don\'t offer refunds, but we invite you to explore our 14-day free trial to see if it\'s the right fit for you. The trial gives you full access to our features so you can experience everything firsthand and make an informed decision before upgrading to a paid plan.',
      },
    ],
  },
  {
    category: 'Technology & Privacy',
    questions: [
      {
        question: 'How do you keep my data safe?',
        answer: 'HIPAA Compliant. Military grade encryption (AES 256). Bank-level security. Your data is stored in secure U.S. data centers. We never sell, share, or train AI on your content.',
      },
      {
        question: 'Will my avatar really sound like me?',
        answer: '99% of families say yes. We use your actual voice recordings, enhanced for clarity. Your accent, tone, and personality are preserved.',
      },
      {
        question: 'Who can access my avatar?',
        answer: 'Only family members you invite. You control everything. Add or remove access anytime.',
      },
    ],
  },
  {
    category: 'Family & Interaction',
    questions: [
      {
        question: 'Can my avatar answer questions my family asks?',
        answer: 'Yes. Your avatar responds based on your knowledge and wisdom. It\'s like having you always available to help.',
      },
      {
        question: 'What if I have multiple grandchildren?',
        answer: 'Perfect. All your family can interact with your avatar independently. Each person has their own conversations with you.',
      },
      {
        question: 'Can I update my avatar after creating it?',
        answer: 'Yes. Add new wisdom anytime. Update your knowledge. Your avatar learns and grows with you.',
      },
    ],
  },
  {
    category: 'Technical',
    questions: [
      {
        question: 'Is this a web app or mobile app?',
        answer: 'Web app. Access from any device, computer, tablet, phone. No installation needed. Just log in and interact.',
      },
      {
        question: 'What if I want to cancel?',
        answer: 'No problem. Cancel anytime. You can download all your data. Your family can keep the avatar accessible unless you choose otherwise.',
      },
    ],
  },
];

export const FAQ: React.FC = () => {
  return (
    <section id="faq" className="py-24 bg-gradient-to-br from-neutral via-white to-support">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-text-dark mb-4">
            Your Questions Answered
          </h2>
        </motion.div>

        <div className="space-y-12">
          {faqCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <h3 className="text-2xl font-bold font-heading text-primary mb-6">
                {category.category}
              </h3>
              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                <Accordion items={category.questions} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
