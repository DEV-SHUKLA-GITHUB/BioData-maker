import React, { useState, useRef, useEffect } from 'react';

const SUPPORT_EMAIL = 'freebiodatagenerator@gmail.com'; // Replace with your email!
const EMAIL_SUBJECT = encodeURIComponent('Need help with marriage biodata');
const EMAIL_BODY = encodeURIComponent(
  'Hello,\n\nI want to create my marriage biodata with your help. Can you assist?\n\nThanks!'
);

type QnA = {
  question: string;
  answer: string;
};

const PREDEFINED_QNAS: QnA[] = [
  {
    question: 'How do I create my biodata?',
    answer:
      'You can start by clicking "Get Started" and filling your personal details step by step.',
  },
  {
    question: 'Are your templates free?',
    answer: 'Yes, we offer free professional templates for creating your biodata.',
  },
  {
    question: 'Can I download my biodata?',
    answer: 'Absolutely! After completing your biodata, you can download it as a PDF.',
  },
  {
    question: 'Is my data safe?',
    answer: 'We take privacy seriously. Your data is securely stored and never shared.',
  },
];

const ChatbotFloatingButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<QnA | null>(null);
  const chatboxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        chatboxRef.current &&
        !chatboxRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest('#chatbot-button')
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) setCurrentQuestion(null);
  }, [isOpen]);

  const openEmail = () => {
    window.open(
      `mailto:${SUPPORT_EMAIL}?subject=${EMAIL_SUBJECT}&body=${EMAIL_BODY}`,
      '_blank'
    );
  };

  // Class names for palette
  const gradient = 'bg-gradient-to-br from-[#f59e0b] via-[#b91c1c] to-[#d97706]';
  const headerText = 'text-white';
  const mainBG = 'bg-white';
  const questionBtn = 'bg-[#fffbea] hover:bg-[#fde68a] text-[#b91c1c]';
  const answerBubble = 'bg-[#fffbea] text-[#b91c1c]';
  const userMsg = 'bg-[#fde68a] text-[#b91c1c]';
  const backBtn =
    'bg-[#fef3c7] hover:bg-[#f59e0b] text-[#b91c1c] border border-[#f59e0b]';
  const emailBtn = `${gradient} text-white`;

  return (
    <>
      {/* Chat Popup */}
      {isOpen && (
        <div
          ref={chatboxRef}
          className={`fixed bottom-20 right-6 z-50 w-80 max-w-xs rounded-xl shadow-2xl flex flex-col border border-[#f59e0b] ${mainBG}`}
          style={{ boxShadow: '0 4px 24px rgba(185,28,28,0.16)' }}
          aria-label="Chatbot popup"
        >
          {/* Header */}
          <div
            className={`px-4 py-3 flex justify-between items-center rounded-t-xl ${gradient} ${headerText}`}
          >
            <span className="font-semibold tracking-wide">Help Center</span>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="text-white hover:scale-110 transition"
            >
              &#x2715;
            </button>
          </div>

          {/* FAQ/Answer UI */}
          <div className="flex-1 overflow-y-auto px-4 py-3" style={{ maxHeight: 320 }}>
            {!currentQuestion ? (
              <>
                <div className="font-semibold text-[#b91c1c] mb-3 text-lg">FAQs</div>
                <div className="space-y-2">
                  {PREDEFINED_QNAS.map((qna) => (
                    <button
                      key={qna.question}
                      onClick={() => setCurrentQuestion(qna)}
                      className={`w-full py-2 px-3 rounded-lg font-medium text-left transition ${questionBtn}`}
                    >
                      {qna.question}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-5">
                <div className={`rounded-t-lg px-3 py-2 self-end max-w-[85%] ${userMsg}`}>
                  {currentQuestion.question}
                </div>
                <div className={`rounded-lg px-3 py-2 self-start max-w-[92%] ${answerBubble}`}>
                  {currentQuestion.answer}
                </div>
                <button
                  className={`px-4 py-2 mt-1 mb-2 rounded-full text-sm font-semibold self-start transition ${backBtn}`}
                  onClick={() => setCurrentQuestion(null)}
                >
                  &#8592; Back to FAQs
                </button>
              </div>
            )}
            {/* Email prompt */}
            {currentQuestion && (
              <div className="mt-3 pt-3 border-t border-[#fde68a] text-center">
                <div className="mb-2 text-[#b91c1c] font-medium">
                  Still need help? Email us!
                </div>
                <button
                  onClick={openEmail}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition ${emailBtn}`}
                  style={{ backgroundImage: 'linear-gradient(90deg,#f59e0b,#b91c1c,#d97706)' }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <polyline points="3 7 12 13 21 7" />
                  </svg>
                  Email Us
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Chatbot Button */}
      <button
        id="chatbot-button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label="Open chat"
        title={isOpen ? 'Close chat' : 'Open chat'}
        className={`
          fixed bottom-6 right-6 z-50
          bg-gradient-to-br from-[#f59e0b] via-[#b91c1c] to-[#d97706]
          text-white p-4 rounded-full
          shadow-xl flex items-center justify-center
          transition hover:scale-105
          focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2
        `}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>
    </>
  );
};

export default ChatbotFloatingButton;
