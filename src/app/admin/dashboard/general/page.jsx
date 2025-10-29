"use client";
import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

export default function GeneralPage() {
  const [newsList, setNewsList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editNews, setEditNews] = useState(null);
  const [titleValue, setTitleValue] = useState("");
  const [contentValue, setContentValue] = useState("");

  // 🟢 Fetch News on Mount
  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const res = await fetch("/api/dashboard/news");
    const data = await res.json();
    setNewsList(data);
  };

  // 🟢 Add or Update News
  const handleSave = async () => {
    if (!titleValue.trim() || !contentValue.trim()) return;

    if (editNews) {
      await fetch("/api/dashboard/news", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editNews._id, title: titleValue, content: contentValue }),
      });
    } else {
      await fetch("/api/dashboard/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: titleValue, content: contentValue }),
      });
    }

    setTitleValue("");
    setContentValue("");
    setEditNews(null);
    setShowModal(false);
    fetchNews();
  };

  // 🟡 Edit News
  const handleEdit = (news) => {
    setEditNews(news);
    setTitleValue(news.title);
    setContentValue(news.content);
    setShowModal(true);
  };

  // 🔴 Delete News
  const handleDelete = async (id) => {
    await fetch("/api/dashboard/news", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchNews();
  };

  return (
    <div className="flex flex-col w-full h-full p-6 text-text-primary">
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">News Management</h2>
          <button
            onClick={() => {
              setTitleValue("");
              setContentValue("");
              setEditNews(null);
              setShowModal(true);
            }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            <FaPlus /> Add News
          </button>
        </div>

        {/* News List */}
        <div className="space-y-3">
          {newsList.length === 0 ? (
            <p className="text-gray-500 italic">No news added yet.</p>
          ) : (
            newsList.map((news) => (
              <div
                key={news._id}
                className="flex justify-between items-start bg-gray-800/80 rounded-lg px-4 py-3 text-sm text-white"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-base">{news.title}</h3>
                  <p className="text-gray-300 text-sm">{news.content}</p>
                </div>
                <div className="flex gap-3 ml-4">
                  <button onClick={() => handleEdit(news)} className="hover:text-yellow-400 transition">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(news._id)} className="hover:text-red-500 transition">
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-gray-900 p-6 rounded-2xl w-[90%] max-w-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              {editNews ? "Edit News" : "Add News"}
            </h2>
            <input
              type="text"
              placeholder="Enter news title..."
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-800 text-white mb-3 outline-none"
            />
            <textarea
              placeholder="Enter news content..."
              value={contentValue}
              onChange={(e) => setContentValue(e.target.value)}
              rows={4}
              className="w-full p-3 rounded-md bg-gray-800 text-white mb-4 outline-none resize-none"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}