import { useState, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";

const LanguageSelector = () => {
  const { authUser, setAuthUser } = useAuthContext();
  const [language, setLanguage] = useState(authUser?.language || "en");
  const [loading, setLoading] = useState(false);

  // Sync local state with authUser language changes
  useEffect(() => {
    if (authUser?.language) {
      setLanguage(authUser.language);
    }
  }, [authUser?.language]);

  const handleChange = async (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    setLoading(true);
    
    try {
      const res = await fetch(`/api/users/language`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language: newLang }),
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

  return (
    <div className="mb-2">
      <label className="block text-xs mb-1">Preferred Language:</label>
      <select
        className="border text-sm rounded-lg bg-gray-700 border-gray-600 text-white h-8 w-full"
        value={language}
        onChange={handleChange}
        disabled={loading}
      >
        <option value="en">🇺🇸 English</option>
        <option value="es">🇪🇸 Spanish</option>
        <option value="fr">🇫🇷 French</option>
        <option value="de">🇩🇪 German</option>
        <option value="zh">🇨🇳 Chinese</option>
        <option value="hi">🇮🇳 Hindi</option>
        <option value="ar">🇸🇦 Arabic</option>
        <option value="ru">🇷🇺 Russian</option>
        <option value="pt">🇵🇹 Portuguese</option>
        <option value="ja">🇯🇵 Japanese</option>
      </select>
      {loading && (
        <div className="text-xs text-gray-400 mt-1">
          Updating language...
        </div>
      )}
    </div>
  );
};
export default LanguageSelector;
