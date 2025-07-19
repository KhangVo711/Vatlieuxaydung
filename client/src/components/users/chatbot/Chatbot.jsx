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
      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
    </div>
  );
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showSuggestButton, setShowSuggestButton] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);

  const chatEndRef = useRef(null);

  const [sessionId] = useState(() => {
    return localStorage.getItem('chatbot_sessionId') || (() => {
      const newId = uuidv4();
      localStorage.setItem('chatbot_sessionId', newId);
      return newId;
    })();
  });

  const { onAddToCart } = useContext(Context);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isBotTyping]);

  const toggleChatbox = () => setIsOpen(!isOpen);

  const appendBotMessage = async (response) => {
    await delay(1200);
    const botMessage = {
      text: response.data.reply,
      sender: "bot",
      timestamp: new Date(),
    };
    setChatHistory((prev) => [...prev, botMessage]);
    setProducts(response.data.products || []);
    setShowSuggestButton(
      response.data.showSuggestionButton && !response.data.needMoreInfo
    );
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

      await appendBotMessage(response);

    } catch (error) {
      setChatHistory((prev) => [...prev, {
        text: "Lỗi, vui lòng thử lại!",
        sender: "bot",
        timestamp: new Date()
      }]);
    } finally {
      setIsBotTyping(false);
    }
  };

  useEffect(() => {
    if (isOpen && chatHistory.length === 0) {
      sendMessage({ message: "__welcome__" });
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { text: message, sender: "user", timestamp: new Date() };
    setChatHistory((prev) => [...prev, userMessage]);
    setMessage("");
    await sendMessage({ message });
  };

  const handleSuggestProductsClick = async () => {
    await sendMessage({ action: "suggest_products" });
    setShowSuggestButton(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  return (
    <div className="fixed z-[9999] bottom-6 right-5">
      {!isOpen && (
        <button
          onClick={toggleChatbox}
          className="w-16 h-16 rounded-full bg-pink-500 flex items-center justify-center shadow-xl hover:bg-pink-600 transition"
        >
          <ChatBubbleLeftRightIcon className="h-7 w-7 text-white" />
        </button>
      )}

      {isOpen && (
        <div className="w-96 h-[500px] bg-white px-2 rounded-2xl shadow-xl border flex flex-col">
          <div className="flex-1 overflow-y-auto mt-2 bg-gray-100 rounded-md p-3 overscroll-contain space-y-4" onWheel={(e) => e.stopPropagation()}>
            {chatHistory.map((msg, index) => (
              <div
                ref={chatEndRef}
                key={index}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-3 py-2 rounded-2xl max-w-[75%] text-sm shadow ${
                    msg.sender === "user"
                      ? "bg-pink-500 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                  <div className="text-[10px] text-gray-700 text-right">
                    {msg.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}

            {isBotTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-200 rounded-2xl px-3 py-2 max-w-[75%] rounded-bl-none">
                  <TypingDots />
                </div>
              </div>
            )}

            {showSuggestButton && products.length === 0 && (
              <div className="text-center">
                <button
                  onClick={handleSuggestProductsClick}
                  className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs hover:bg-emerald-600"
                >
                  Xem gợi ý sản phẩm
                </button>
              </div>
            )}

            {products.length > 0 && (
              <div className="mt-3 bg-white rounded-lg border p-2">
                <h4 className="font-semibold text-sm mb-2 text-gray-700">Sản phẩm gợi ý:</h4>
                {products.map(product => (
                 <div
  key={product.masp}
  className="flex items-center gap-3 mb-3 bg-white rounded-lg shadow-sm border p-2"
>
  <img
    src={`http://localhost:5001/uploads/${product.masp}/${product.hinhanh}`}
    alt={product.tensp}
    className="w-16 h-16 object-cover rounded-md border"
  />

  <div className="flex-1">
    <p className="font-semibold text-sm text-gray-800">{product.tensp}</p>
    <p className="text-xs text-gray-500 line-clamp-2">{product.ttct}</p>
    <p className="font-bold text-rose-600 text-sm mt-1">
      {formatCurrency(product.gia_range)}
    </p>
  </div>

  <button
    onClick={() => setSelectedProduct(product)}
    className="bg-blue-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-blue-600"
  >
    Xem
  </button>
</div>

                ))}
              </div>
            )}
          </div>

          <div className="p-2 bg-white flex items-center">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Nhập câu hỏi..."
              className="flex-1 p-2 text-sm border rounded-l-xl focus:outline-none"
            />
            <button
              onClick={handleSendMessage}
              className="bg-pink-500 text-white px-3 py-2 rounded-r-xl hover:bg-pink-600"
            >
              Gửi
            </button>
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
