import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { useState, useContext, useEffect, useRef } from "react";
import axios from "axios";
import { formatCurrency } from "../../../utils/currency.jsx";
import { Context } from "../../Context.jsx";
import ModalBox from "../modalbox/Modalbox.jsx";
import { v4 as uuidv4 } from 'uuid';

function TypingDots() {
  return (
    <div className="flex space-x-1 py-1 px-2">
      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
    </div>
  );
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isWelcomeSent, setIsWelcomeSent] = useState(false);
  const [isYesNoQuestion, setIsYesNoQuestion] = useState(false);

  const chatEndRef = useRef(null);
  const { onAddToCart } = useContext(Context);

  const [sessionId] = useState(() => {
  const newId = uuidv4();
  localStorage.setItem('chatbot_sessionId', newId);
  return newId;
});

  const [hiddenSuggestionIds, setHiddenSuggestionIds] = useState([]);

  const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isBotTyping]);

  const toggleChatbox = () => setIsOpen(!isOpen);

  const appendBotMessage = async (response) => {
  await delay(800);

  const botMessage = {
    type: "text",
    text: response.reply,
    sender: "bot",
    timestamp: new Date(),
  };

  const newMessages = [botMessage];

  if (response.products?.length > 0) {
    newMessages.push({
      type: "product-suggestion",
      id: uuidv4(),
      products: response.products,
      timestamp: new Date(),
    });

    setChatHistory((prev) => [...prev, ...newMessages]);
    
    setIsBotTyping(true);

    setTimeout(() => {
      setIsBotTyping(false);
      setChatHistory(prev => [
        ...prev,
        {
          type: "text",
          text: "Bạn cần mình tư vấn thêm hay muốn tìm sản phẩm khác thì hãy nói cho mình biết nhé!",
          sender: "bot",
          timestamp: new Date(),
        }
      ]);
    }, 1200);

    return;
  }
  setIsYesNoQuestion(response.isYesNoQuestion || false);

  setChatHistory((prev) => [...prev, ...newMessages]);
   setIsBotTyping(false);
};

const detectActionFromMessage = (message) => {
  const lower = message.toLowerCase();

  if (lower.includes("sữa rửa mặt") || lower.includes("rửa mặt")) {
    return "recommend_product_skinType";
  }

  if (lower.includes("son") || lower.includes("môi")) {
    return "recommend_product_son";
  }

  if (lower.includes("kem chống nắng")) {
    return "recommend_product_sunscreen";
  }

  if (lower.includes("kem dưỡng") || lower.includes("kem")) {
    return "recommend_product_cream";
  }

  // fallback nếu không rõ
  return undefined;
};

  const sendMessage = async ({ message, action }) => {
    setIsBotTyping(true);
    try {
      const response = await axios.post("http://localhost:5001/chatbot", {
        message,
        action,
        sessionId,
      }, {
        headers: { "Content-Type": "application/json" },
      });

      await appendBotMessage(response.data);
    } catch (error) {
      setChatHistory((prev) => [...prev, {
        type: "text",
        text: "Lỗi, vui lòng thử lại!",
        sender: "bot",
        timestamp: new Date(),
      }]);
      setIsBotTyping(false);
    } 
  };

  useEffect(() => {
    if (isOpen && chatHistory.length === 0 && !isWelcomeSent) {
      setIsWelcomeSent(true);
      sendMessage({ message: "__welcome__" });
    }
  }, [isOpen, chatHistory.length, isWelcomeSent]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    const userMessage = {
      type: "text",
      text: message,
      sender: "user",
      timestamp: new Date()
    };
    const action = detectActionFromMessage(message);
    setChatHistory((prev) => [...prev, userMessage]);
    setMessage("");
    await sendMessage({ message, action });
  };

  const handleSendMessageDirect = async (quickMessage) => {
    const userMessage = {
      type: "text",
      text: quickMessage,
      sender: "user",
      timestamp: new Date(),
    };
    setChatHistory((prev) => [...prev, userMessage]);
    setIsYesNoQuestion(false);
    await sendMessage({ message: quickMessage });
  };

  const hideSuggestion = (id) => {
    setHiddenSuggestionIds((prev) => [...prev, id]);
  };

  const showAllSuggestions = () => {
    setHiddenSuggestionIds([]);
  };

  return (
    <div className="fixed z-[9999] bottom-6 right-5">
      {!isOpen && (
        <button
          onClick={toggleChatbox}
          className="w-16 h-16 rounded-full bg-pink-500 flex items-center justify-center shadow-xl hover:bg-pink-600"
        >
          <ChatBubbleLeftRightIcon className="h-7 w-7 text-white" />
        </button>
      )}

      {isOpen && (
        <div className="w-96 h-[550px] bg-white px-2 rounded-2xl shadow-xl border flex flex-col">
          <div className="flex-1 overflow-y-auto mt-2 overscroll-contain bg-gray-100 rounded-md p-3 space-y-4">
            {chatHistory.map((msg, idx) => {
              if (msg.type === 'text') {
                return (
                  <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`px-3 py-2 rounded-2xl max-w-[75%] text-sm shadow
                      ${msg.sender === 'user' ? 'bg-pink-400 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                      <div>{msg.text}</div>
                      <div className="text-[10px] text-gray-800 text-right">{msg.timestamp.toLocaleTimeString()}</div>
                    </div>
                  </div>
                );
              }

              if (msg.type === 'product-suggestion' && !hiddenSuggestionIds.includes(msg.id)) {
                return (
                  <div key={msg.id} className="bg-white border rounded-xl px-2 py-3 shadow-sm space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold text-sm text-gray-700">Sản phẩm gợi ý</h4>
                      <button
                        onClick={() => hideSuggestion(msg.id)}
                        className="text-xs text-pink-600 hover:underline"
                      >
                        Ẩn
                      </button>
                    </div>
                    {msg.products.map(product => (
                      <div
                        key={product.masp}
                        className="flex items-center gap-2 bg-white border rounded-lg py-2 px-1 select-none transition"
                      >
                        <img
                          src={`http://localhost:5001/uploads/${product.masp}/${product.hinhanh}`}
                          alt={product.tensp}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1 space-y-1">
                          <p className="font-medium text-sm text-gray-900">{product.tensp}</p>
                          <p className="text-xs text-gray-500 line-clamp-2">{product.ttct}</p>
                          <p className="font-semibold text-rose-600 text-sm">{formatCurrency(product.gia_range)}</p>
                        </div>
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className="bg-pink-400 text-white px-3 py-1.5 rounded-lg text-xs hover:bg-pink-500 transition"
                        >
                          Xem
                        </button>
                      </div>
                    ))}
                  </div>
                );
              }

              return null;
            })}

            {isBotTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-200 rounded-2xl px-3 py-2 max-w-[75%] rounded-bl-none">
                  <TypingDots />
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {hiddenSuggestionIds.length > 0 && (
            <button
              onClick={showAllSuggestions}
              className="text-xs text-blue-500 py-1 hover:underline"
            >
              Hiện lại các gợi ý đã ẩn
            </button>
          )}

          <div className="p-2 bg-white flex items-center justify-center">
            {isYesNoQuestion ? (
              <div className="flex gap-4 justify-center">
  <button
    onClick={() => handleSendMessageDirect("Có")}
    className="bg-pink-400 text-white font-semibold text-sm px-5 py-2 rounded-full shadow hover:bg-pink-500 hover:scale-105 transition-transform"
  >
    Có
  </button>
  <button
    onClick={() => handleSendMessageDirect("Không")}
    className="bg-gray-400 text-white font-semibold text-sm px-5 py-2 rounded-full shadow hover:bg-gray-500 hover:scale-105 transition-transform"
  >
    Không
  </button>
</div>

            ) : (
              <>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Nhập câu hỏi..."
                  className="flex-1 p-2 text-sm border rounded-l-xl focus:outline-none"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-pink-500 text-white px-3 py-2 rounded-r-xl hover:bg-pink-600"
                >
                  Gửi
                </button>
              </>
            )}
          </div>

          <button
            onClick={toggleChatbox}
            className="text-xs text-gray-400 py-2 hover:text-gray-600"
          >
            Đóng
          </button>

          <ModalBox
            isOpen={!!selectedProduct}
            onClose={() => setSelectedProduct(null)}
            product={selectedProduct}
          />
        </div>
      )}
    </div>
  );
}
