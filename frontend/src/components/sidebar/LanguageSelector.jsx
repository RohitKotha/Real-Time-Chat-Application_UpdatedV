import { useState, useEffect, useRef } from "react";
import { useAuthContext } from "../../context/AuthContext";

const LanguageSelector = () => {
  const { authUser, setAuthUser } = useAuthContext();
  const [language, setLanguage] = useState(authUser?.language || "en");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // All Indian languages with their native names and flags
  const languages = [
    { code: "en", name: "English", native: "English", flag: "🇺🇸" },
    { code: "hi", name: "Hindi", native: "हिन्दी", flag: "🇮🇳" },
    { code: "bn", name: "Bengali", native: "বাংলা", flag: "🇮🇳" },
    { code: "te", name: "Telugu", native: "తెలుగు", flag: "🇮🇳" },
    { code: "mr", name: "Marathi", native: "मराठी", flag: "🇮🇳" },
    { code: "ta", name: "Tamil", native: "தமிழ்", flag: "🇮🇳" },
    { code: "gu", name: "Gujarati", native: "ગુજરાતી", flag: "🇮🇳" },
    { code: "kn", name: "Kannada", native: "ಕನ್ನಡ", flag: "🇮🇳" },
    { code: "ml", name: "Malayalam", native: "മലയാളം", flag: "🇮🇳" },
    { code: "or", name: "Odia", native: "ଓଡ଼ିଆ", flag: "🇮🇳" },
    { code: "pa", name: "Punjabi", native: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
    { code: "as", name: "Assamese", native: "অসমীয়া", flag: "🇮🇳" },
    { code: "ks", name: "Kashmiri", native: "کٲشُر", flag: "🇮🇳" },
    { code: "sd", name: "Sindhi", native: "سنڌي", flag: "🇮🇳" },
    { code: "ur", name: "Urdu", native: "اردو", flag: "🇮🇳" },
    { code: "ne", name: "Nepali", native: "नेपाली", flag: "🇮🇳" },
    { code: "sa", name: "Sanskrit", native: "संस्कृतम्", flag: "🇮🇳" },
    { code: "mai", name: "Maithili", native: "मैथिली", flag: "🇮🇳" },
    { code: "bho", name: "Bhojpuri", native: "भोजपुरी", flag: "🇮🇳" },
    { code: "kok", name: "Konkani", native: "कोंकणी", flag: "🇮🇳" },
    { code: "mni", name: "Manipuri", native: "মৈতৈলোন্", flag: "🇮🇳" },
    { code: "sat", name: "Santali", native: "ᱥᱟᱱᱛᱟᱲᱤ", flag: "🇮🇳" },
    { code: "doi", name: "Dogri", native: "डोगरी", flag: "🇮🇳" },
    // Other popular languages
    { code: "es", name: "Spanish", native: "Español", flag: "🇪🇸" },
    { code: "fr", name: "French", native: "Français", flag: "🇫🇷" },
    { code: "de", name: "German", native: "Deutsch", flag: "🇩🇪" },
    { code: "zh", name: "Chinese", native: "中文", flag: "🇨🇳" },
    { code: "ar", name: "Arabic", native: "العربية", flag: "🇸🇦" },
    { code: "ru", name: "Russian", native: "Русский", flag: "🇷🇺" },
    { code: "pt", name: "Portuguese", native: "Português", flag: "🇵🇹" },
    { code: "ja", name: "Japanese", native: "日本語", flag: "🇯🇵" },
  ];

  // Sync local state with authUser language changes
  useEffect(() => {
    if (authUser?.language) {
      setLanguage(authUser.language);
    }
  }, [authUser?.language]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLanguageSelect = async (langCode) => {
    setLanguage(langCode);
    setIsOpen(false);
    setLoading(true);
    
    try {
      const res = await fetch(`/api/users/language`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language: langCode }),
      });
      
      const data = await res.json();
      
      if (data.language) {
        // Update both context and localStorage
        const updatedUser = { ...authUser, language: data.language };
        setAuthUser(updatedUser);
        localStorage.setItem("chat-user", JSON.stringify(updatedUser));
      }
    } catch (err) {
      console.error("Error updating language:", err);
      // Revert to previous language on error
      setLanguage(authUser?.language || "en");
    } finally {
      setLoading(false);
    }
  };

  const selectedLang = languages.find(lang => lang.code === language) || languages[0];

  return (
    <div className="mb-3 relative" ref={dropdownRef}>
      <label className="block text-sm font-medium mb-2 text-white/90">
        Preferred Language
      </label>
      
      {/* Custom Dropdown Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={loading}
        className="w-full px-3 py-2 text-left bg-white/10 backdrop-blur-md border border-white/20 rounded-lg hover:bg-white/15 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400/50 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">{selectedLang.flag}</span>
            <div>
              <div className="text-white font-medium text-sm">{selectedLang.name}</div>
              <div className="text-white/70 text-xs">{selectedLang.native}</div>
            </div>
          </div>
          <svg
            className={`w-4 h-4 text-white/70 transition-transform duration-300 ${
              isOpen ? "transform rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto dropdown-enter">
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
                className={`w-full px-3 py-2 text-left hover:bg-gray-700 transition-all duration-200 flex items-center gap-2 ${
                  lang.code === language ? "bg-blue-600 text-white" : "text-gray-200"
                }`}
              >
                <span className="text-base">{lang.flag}</span>
                <div>
                  <div className={`font-medium text-sm ${lang.code === language ? "text-white" : "text-gray-200"}`}>
                    {lang.name}
                  </div>
                  <div className={`text-xs ${lang.code === language ? "text-blue-100" : "text-gray-400"}`}>
                    {lang.native}
                  </div>
                </div>
                {lang.code === language && (
                  <svg className="w-4 h-4 text-white ml-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Loading indicator */}
      {loading && (
        <div className="absolute top-full left-0 right-0 mt-1 text-xs text-blue-300/80 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            Updating language...
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
