import React, { useState, useRef, useEffect, useCallback, memo, useMemo } from 'react';

// Type definitions
interface QnA {
  question: string;
  answer: string;
}

interface CSSClasses {
  gradient: string;
  headerText: string;
  mainBG: string;
  questionBtn: string;
  answerBubble: string;
  userMsg: string;
  backBtn: string;
  emailBtn: string;
}

// Memoized constants to prevent recreation
// const SUPPORT_EMAIL: string = 'freebiodatagenerator@gmail.com';
// const EMAIL_SUBJECT: string = encodeURIComponent('Need help with marriage biodata');
// const EMAIL_BODY: string = encodeURIComponent(
//   'Hello,\n\nI want to create my marriage biodata with your help. Can you assist?\n\nThanks!'
// );

const PREDEFINED_QNAS: readonly QnA[] = [
  {
    question: 'How do I create my biodata?',
    answer: 'You can start by clicking "Get Started" and filling your personal details step by step.',
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
] as const;

const ChatbotFloatingButton: React.FC = memo(() => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<QnA | null>(null);
  const chatboxRef = useRef<HTMLDivElement>(null);

  // Memoized email handler
// const openEmail = (): void => {
//   console.log(SUPPORT_EMAIL,EMAIL_BODY,EMAIL_SUBJECT)
//   window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${EMAIL_SUBJECT}&body=${EMAIL_BODY}`;
// };

//   const openEmail = () => {
//   window.location.href = 'mailto:freebiodatagenerator@gmail.com';
// };

  // Memoized toggle handler
  const toggleChat = useCallback((): void => {
    setIsOpen((prev: boolean) => !prev);
  }, []);

  // Memoized handlers for better performance
  const handleQuestionClick = useCallback((qna: QnA): void => {
    setCurrentQuestion(qna);
  }, []);

  const handleBackClick = useCallback((): void => {
    setCurrentQuestion(null);
  }, []);

  const handleCloseClick = useCallback((): void => {
    setIsOpen(false);
  }, []);

  // Memoized outside click handler
  const handleClickOutside = useCallback((event: MouseEvent): void => {
    const target = event.target as HTMLElement;
    if (
      chatboxRef.current &&
      !chatboxRef.current.contains(target) &&
      !target.closest('#chatbot-button')
    ) {
      setIsOpen(false);
    }
  }, []);

  // Effect for outside click handling
  useEffect((): (() => void) => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      setCurrentQuestion(null); // Reset question when opening
    }

    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  // Memoized CSS classes
  const cssClasses = useMemo<CSSClasses>(() => ({
    gradient: 'bg-gradient-to-br from-[#f59e0b] via-[#b91c1c] to-[#d97706]',
    headerText: 'text-white',
    mainBG: 'bg-white',
    questionBtn: 'bg-[#fffbea] hover:bg-[#fde68a] text-[#b91c1c]',
    answerBubble: 'bg-[#fffbea] text-[#b91c1c]',
    userMsg: 'bg-[#fde68a] text-[#b91c1c]',
    backBtn: 'bg-[#fef3c7] hover:bg-[#f59e0b] text-[#b91c1c] border border-[#f59e0b]',
    emailBtn: 'bg-gradient-to-br from-[#f59e0b] via-[#b91c1c] to-[#d97706] text-white'
  }), []);

  // Memoized button aria-label
  const buttonAriaLabel = useMemo<string>(() => 
    isOpen ? 'Close chat' : 'Open chat', [isOpen]
  );

  return (
    <>
      {/* Chat Popup */}
      {isOpen && (
        <div
          ref={chatboxRef}
          className={`fixed bottom-20 right-6 z-50 w-80 max-w-xs rounded-xl shadow-2xl flex flex-col border border-[#f59e0b] ${cssClasses.mainBG}`}
          style={{ boxShadow: '0 4px 24px rgba(185,28,28,0.16)' }}
          aria-label="Chatbot popup"
          role="dialog"
          aria-modal="true"
        >
          {/* Header */}
          <div className={`px-4 py-3 flex justify-between items-center rounded-t-xl ${cssClasses.gradient} ${cssClasses.headerText}`}>
            <span className="font-semibold tracking-wide">Help Center</span>
            <button
              onClick={handleCloseClick}
              aria-label="Close chat"
              className="text-white hover:scale-110 transition"
              type="button"
            >
              &#x2715;
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-4 py-3" style={{ maxHeight: 320 }}>
            {!currentQuestion ? (
              <>
                <div className="font-semibold text-[#b91c1c] mb-3 text-lg">FAQs</div>
                <div className="space-y-2" role="list">
                  {PREDEFINED_QNAS.map((qna: QnA) => (
                    <button
                      key={qna.question}
                      onClick={(): void => handleQuestionClick(qna)}
                      className={`w-full py-2 px-3 rounded-lg font-medium text-left transition ${cssClasses.questionBtn}`}
                      type="button"
                      role="listitem"
                    >
                      {qna.question}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-5">
                <div className={`rounded-t-lg px-3 py-2 self-end max-w-[85%] ${cssClasses.userMsg}`}>
                  {currentQuestion.question}
                </div>
                <div className={`rounded-lg px-3 py-2 self-start max-w-[92%] ${cssClasses.answerBubble}`}>
                  {currentQuestion.answer}
                </div>
                <button
                  className={`px-4 py-2 mt-1 mb-2 rounded-full text-sm font-semibold self-start transition ${cssClasses.backBtn}`}
                  onClick={handleBackClick}
                  type="button"
                >
                  &#8592; Back to FAQs
                </button>
              </div>
            )}

            {/* Email section */}
            {/* {currentQuestion && (
              <div className="mt-3 pt-3 border-t border-[#fde68a] text-center">
                <div className="mb-2 text-[#b91c1c] font-medium">
                  Still need help? Email us!
                </div>
                
                <button
                  onClick={openEmail}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition ${cssClasses.emailBtn}`}
                  style={{ backgroundImage: 'linear-gradient(90deg,#f59e0b,#b91c1c,#d97706)' }}
                  type="button"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <polyline points="3 7 12 13 21 7" />
                  </svg>
                  Email Us
                </button>
              </div>
            )} */}
          </div>
        </div>
      )}

      {/* Floating Chatbot Button */}
      <button
        id="chatbot-button"
        onClick={toggleChat}
        aria-label={buttonAriaLabel}
        title={buttonAriaLabel}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-[#f59e0b] via-[#b91c1c] to-[#d97706] text-white p-4 rounded-full shadow-xl flex items-center justify-center transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
        type="button"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>
    </>
  );
});

ChatbotFloatingButton.displayName = 'ChatbotFloatingButton';

export default ChatbotFloatingButton;
