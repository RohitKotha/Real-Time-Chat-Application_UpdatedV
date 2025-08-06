import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";

const LanguageSelector = () => {
  const { authUser, setAuthUser } = useAuthContext();
  const [language, setLanguage] = useState(authUser?.language || "en");
  const [loading, setLoading] = useState(false);

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
        setAuthUser({ ...authUser, language: data.language });
      }
    } catch (err) {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-2">
      <label className="block text-xs mb-1">Preferred Language:</label>
      <select
        className="border text-sm rounded-lg bg-gray-700 border-gray-600 text-white h-8"
        value={language}
        onChange={handleChange}
        disabled={loading}
      >
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
        <option value="zh">Chinese</option>
        <option value="hi">Hindi</option>
        <option value="ar">Arabic</option>
        <option value="ru">Russian</option>
        <option value="pt">Portuguese</option>
        <option value="ja">Japanese</option>
      </select>
    </div>
  );
};
export default LanguageSelector;
