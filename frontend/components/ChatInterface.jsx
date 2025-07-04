import React, { useState, useEffect, useRef, memo } from "react";
import { motion } from "framer-motion";
import { Send, X, Mic, Image } from "lucide-react";
import { FixedSizeList as List } from 'react-window';

const ChatInterface = ({ 
  agentName = "Agent", 
  agentAvatar = "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=800&q=80",
  onClose, // Function to close the chat
  webhookUrl, // Receive webhookUrl as a prop
  initialMessage // Receive initialMessage as a prop
}) => {
  // Initialize messages state sem mensagem inicial
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Refs for audio elements
  const openAudioRef = useRef(null);
  const closeAudioRef = useRef(null);
  const sendAudioRef = useRef(null);
  const receiveAudioRef = useRef(null);

  // Function to play audio safely
  const playSound = (audioRef) => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  };

  // Play open sound on mount
  useEffect(() => {
    playSound(openAudioRef);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Convert file to base64
  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // Convert blob to base64
  function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  // Start audio recording
  const startRecording = async () => {
    setRecordedAudio(null);
    setAudioUrl(null);
    audioChunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new window.MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setRecordedAudio(audioBlob);
        setAudioUrl(URL.createObjectURL(audioBlob));

        // Auto-send after recording
        handleSendAudio(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Microphone permission denied or not supported.");
    }
  };

  // Stop audio recording
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Handle image selection
  const handleImageSelect = () => {
    fileInputRef.current?.click();
  };

  // Handle image change
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);

      // Auto-send after selecting
      handleSendImage(e.target.files[0]);
    }
  };

  // Send text message
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: "user",
      text: inputMessage,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");
    playSound(sendAudioRef); // Play send sound

    // Show typing indicator
    setIsTyping(true);
    setIsLoading(true);

    try {
      const payload = {
        messageType: "text",
        mensagem: inputMessage
      };

      const response = await sendToWebhook(payload);
      handleAgentResponse(response);
    } catch (error) {
      console.error("Error sending message:", error);

      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "agent",
          text: "Sorry, there was an error processing your message. Please try again.",
          timestamp: new Date(),
          isError: true
        }
      ]);
    } finally {
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  // Send audio message
  const handleSendAudio = async (audioBlob) => {
    if (!audioBlob) return;

    const audioUrlTemp = URL.createObjectURL(audioBlob);
    const newMessage = {
      id: Date.now(),
      sender: "user",
      isAudio: true,
      audioUrl: audioUrlTemp,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, newMessage]);
    playSound(sendAudioRef); // Play send sound

    // Libera a URL após um tempo para evitar vazamento de memória
    setTimeout(() => URL.revokeObjectURL(audioUrlTemp), 10000);

    // Show typing indicator
    setIsTyping(true);
    setIsLoading(true);

    try {
      const base64Audio = await blobToBase64(audioBlob);

      const payload = {
        messageType: "audioMessage",
        base64: base64Audio
      };

      const response = await sendToWebhook(payload);
      handleAgentResponse(response);
    } catch (error) {
      console.error("Error sending audio:", error);

      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "agent",
          text: "Sorry, there was an error processing your audio. Please try again.",
          timestamp: new Date(),
          isError: true
        }
      ]);
    } finally {
      setIsTyping(false);
      setIsLoading(false);
      setRecordedAudio(null);
      setAudioUrl(null);
    }
  };

  // Send image message
  const handleSendImage = async (imageFile) => {
    if (!imageFile) return;

    const imageUrlTemp = URL.createObjectURL(imageFile);
    const newMessage = {
      id: Date.now(),
      sender: "user",
      isImage: true,
      imageUrl: imageUrlTemp,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, newMessage]);
    playSound(sendAudioRef); // Play send sound

    // Libera a URL após um tempo para evitar vazamento de memória
    setTimeout(() => URL.revokeObjectURL(imageUrlTemp), 10000);

    // Show typing indicator
    setIsTyping(true);
    setIsLoading(true);

    try {
      const base64Image = await fileToBase64(imageFile);

      const payload = {
        messageType: "imageMessage",
        imageMessage: {
          jpegThumbnail: base64Image
        }
      };

      const response = await sendToWebhook(payload);
      handleAgentResponse(response);
    } catch (error) {
      console.error("Error sending image:", error);

      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "agent",
          text: "Sorry, there was an error processing your image. Please try again.",
          timestamp: new Date(),
          isError: true
        }
      ]);
    } finally {
      setIsTyping(false);
      setIsLoading(false);
      setImageFile(null);

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Send to webhook using the provided webhookUrl prop
  const sendToWebhook = async (payload) => {
    if (!webhookUrl) {
      console.error("Webhook URL is not defined for this agent.");
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "agent",
          text: "Erro de configuração: Webhook URL não definida.",
          timestamp: new Date(),
          isError: true
        }
      ]);
      return { error: true, message: "Webhook URL não definida." };
    }

    console.log(`[DEBUG] Sending to webhook: ${webhookUrl}`, payload);

    let res, text, json;
    try {
      res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      text = await res.text();
      json = text ? JSON.parse(text) : {};
      console.log("[DEBUG] Response JSON:", json);
      return json;
    } catch (e) {
      console.error("[ERRO] Falha ao enviar para o webhook ou resposta inválida:", e);
      return { error: true, message: "Erro ao conectar ao servidor. Verifique sua conexão ou tente novamente mais tarde." };
    }
  };

  // Function to handle agent response
  const handleAgentResponse = (response) => {
    const typingDelay = Math.floor(Math.random() * 1000) + 1000;

    setTimeout(() => {
      const newMessage = {
        id: Date.now(),
        sender: "agent",
        timestamp: new Date()
      };

      if (response && response.error) {
        newMessage.text = response.message || "Erro ao processar sua mensagem. Tente novamente mais tarde.";
        newMessage.isError = true;
      } else if (Array.isArray(response) && response.length > 0 && response[0].reply) {
        newMessage.text = response[0].reply;
      } else if (typeof response === "object" && response !== null && "reply" in response) {
        newMessage.text = response.reply;
      } else {
        newMessage.text = "Desculpe, houve um erro ao processar sua mensagem. Tente novamente mais tarde.";
        newMessage.isError = true;
        console.warn("Unexpected webhook response format:", response);
      }

      setMessages((prev) => [...prev, newMessage]);
      playSound(receiveAudioRef);
    }, typingDelay);
  };

  // Handle chat close
  const handleCloseChat = () => {
    playSound(closeAudioRef); // Play close sound
    // Wait a bit for the sound to play before calling onClose
    setTimeout(() => {
      if (onClose) {
        onClose();
      }
    }, 300); // Adjust delay if needed
  };

  // Handle key press (Enter to send)
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Format timestamp
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Componente de mensagem individual memoizado
  const MessageItem = memo(({ data, index, style }) => {
    const { messages, formatTime } = data;
    const message = messages[index];
    return (
      <div
        style={{ ...style, marginBottom: 10, marginTop: index === 0 ? 0 : 2 }}
        key={message.id}
        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
      >
        <div
          className={`max-w-[80vw] sm:max-w-[70%] p-3 sm:p-4 shadow-md text-base flex flex-col
            ${message.sender === "user"
              ? "bg-gradient-to-r from-[#6B8AFF] to-[#9442FE] text-white rounded-2xl rounded-br-none"
              : message.isError
                ? "bg-red-200 border border-red-400 text-red-900 rounded-2xl rounded-bl-none"
                : "bg-[#23272F] text-gray-100 rounded-2xl rounded-bl-none"
            }`}
        >
          {message.text && <p className="mb-1 whitespace-pre-line">{message.text}</p>}
          {message.isAudio && message.audioUrl && (
            <audio controls src={message.audioUrl} className="max-w-full"></audio>
          )}
          {message.isImage && message.imageUrl && (
            <img
              src={message.imageUrl}
              alt="Mensagem com imagem"
              className="max-w-full rounded"
              loading="lazy"
            />
          )}
          <div className={`text-xs mt-1 ${message.sender === "user" ? "text-white/80" : "text-gray-400"}`}>
            {formatTime(message.timestamp)}
          </div>
        </div>
      </div>
    );
  });

  // Modal centralizado
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        // Fecha o chat se clicar fora do bloco principal
        if (e.target === e.currentTarget) {
          handleCloseChat();
        }
      }}
    >
      <div className="w-full max-w-2xl h-[80vh] flex flex-col rounded-2xl shadow-2xl border border-gray-800 bg-[#181A20] relative">
        {/* Cabeçalho escuro com avatar, nome, status e ícones */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-[#23272F] rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 flex items-center justify-center">
              {typeof agentAvatar === 'string' ? (
                <img
                  src={agentAvatar}
                  alt={agentName ? `Avatar do agente ${agentName}` : 'Avatar do agente'}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              ) : (
                agentAvatar
              )}
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">{agentName || 'Assistente IA'}</h3>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                Online agora
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handleCloseChat} className="p-2 rounded-full hover:bg-[#23272F]/60 transition-colors" title="Fechar" aria-label="Fechar chat">
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
        {/* Mensagens */}
        <div className="flex-grow overflow-y-auto p-3 sm:p-6 space-y-3 sm:space-y-4 bg-[#181A20]" aria-live="polite">
          <List
            height={window.innerHeight * 0.6} // 60% da viewport
            itemCount={messages.length}
            itemSize={110} // altura média de cada mensagem (ajuste se necessário)
            width={"100%"}
            itemData={{ messages, formatTime }}
            overscanCount={5}
          >
            {MessageItem}
          </List>
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-[#23272F] rounded-2xl rounded-bl-none p-4 max-w-[70%] shadow-md">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "600ms" }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        {/* Input fixo */}
        <div className="p-4 border-t border-gray-800 bg-[#23272F] rounded-b-2xl flex items-center gap-2">
          <button
            onClick={handleImageSelect}
            disabled={isLoading || isRecording}
            className="p-2 rounded-full bg-[#181A20] text-gray-300 hover:bg-[#23272F]"
            aria-label="Enviar imagem"
          >
            <Image className="w-5 h-5" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
          </button>
          <button
            onClick={isRecording ? stopRecording : startRecording}
            disabled={isLoading}
            className={`p-2 rounded-full bg-[#181A20] text-gray-300 hover:bg-[#23272F] transition-colors ${isRecording ? 'animate-pulse bg-[#23272F]' : ''}`}
            title={isRecording ? 'Parar gravação' : 'Gravar áudio'}
            aria-label={isRecording ? 'Parar gravação de áudio' : 'Gravar áudio'}
          >
            <Mic className={`w-5 h-5 ${isRecording ? 'text-red-500' : ''}`} />
          </button>
          <div className="flex-grow">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              disabled={isLoading || isRecording}
              placeholder="Digite sua mensagem..."
              className="w-full px-4 py-2 bg-[#23272F] border border-[#23272F] rounded-full focus:outline-none focus:ring-2 focus:ring-[#6B8AFF]/50 focus:border-[#6B8AFF] text-gray-100"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading || isRecording}
            className={`p-2 rounded-full bg-gradient-to-r from-[#6B8AFF] to-[#9442FE] text-white ml-2 ${(!inputMessage.trim() || isLoading || isRecording) ? 'opacity-50' : ''}`}
            aria-label="Enviar mensagem"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;

