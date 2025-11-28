import React, { useState } from "react";
import { Upload, Eye, Download } from "lucide-react"; // added Download icon

const resultsData = [
  { className: "6th", students: 40 },
  { className: "7th", students: 35 },
  { className: "8th", students: 42 },
  { className: "9th", students: 38 },
];

const Results2 = () => {
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [previewFile, setPreviewFile] = useState(null);

  // ✅ handle file upload
  const handleFileUpload = (className, event) => {
    const file = event.target.files[0]; // only first file
    if (file) {
      setUploadedFiles((prev) => ({ ...prev, [className]: file }));
    }
  };

  // ✅ handle file download
  const handleFileDownload = (file) => {
    const url = URL.createObjectURL(file); // create temporary link for file
    const link = document.createElement("a");
    link.href = url;
    link.download = file.name; // file will download with original name
    link.click();
    URL.revokeObjectURL(url); // cleanup memory
  };

  return (
    <div className="min-h-screen lg:ml-62 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#1C398E]">Results</h1>
      </div>
      {/* Four Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border-t-4 border-blue-900 shadow-md rounded-xl p-4">
          <h2 className="text-[#1C398E] text-sm">Total Classes</h2>
          <p className="text-xl font-semibold text-[#1C398E]">4</p>
        </div>
        <div className="bg-white border-t-4 border-blue-900 shadow-md rounded-xl p-4">
          <h2 className="text-gray-600 text-sm">Total Students</h2>
          <p className="text-xl font-semibold text-[#1C398E]">155</p>
        </div>
        <div className="bg-white border-t-4 border-orange-600 shadow-md rounded-xl p-4">
          <h2 className="text-[#FB5600] text-sm">Passed</h2>
          <p className="text-xl font-semibold text-[#FB5600]">142</p>
        </div>
        <div className="bg-white border-t-4 border-orange-600 shadow-md rounded-xl p-4">
          <h2 className="text-[#FB5600] text-sm">Failed</h2>
          <p className="text-xl font-semibold text-[#FB5600]">13</p>
        </div>
      </div>
      {/* Table */}
      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-3 px-4 border-b">Class</th>
              <th className="py-3 px-4 border-b">Students</th>
              <th className="py-3 px-4 border-b">Results Upload</th>
            </tr>
          </thead>
          <tbody>
            {resultsData.map((item, index) => {
              const uploaded = uploadedFiles[item.className];
              return (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition duration-150"
                >
                  <td className="py-3 px-4 border-b">{item.className}</td>
                  <td className="py-3 px-4 border-b">{item.students}</td>
                  <td className="py-3 px-4 border-b">
                    {!uploaded ? (
                      // Upload Button
                      <label className="flex items-center gap-2 cursor-pointer bg-[#1C398E] text-white py-1.5 px-3 rounded-lg shadow hover:bg-[#162f72] transition">
                        <Upload size={15} />
                        <span className="text-sm">Upload</span>
                        <input
                          type="file"
                          className="hidden"
                          onChange={(e) =>
                            handleFileUpload(item.className, e)
                          }
                        />
                      </label>
                    ) : (
                      // Uploaded State
                      <div className="flex items-center gap-3">
                        <span className="text-green-600 text-sm font-medium">
                          ✅ Uploaded
                        </span>
                        <button
                          onClick={() => setPreviewFile(uploaded)}
                          className="text-[#1C398E] hover:text-[#162f72]"
                        >
                          <Eye size={18} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Preview Modal */}
      {previewFile && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full">
            <h2 className="text-lg font-bold text-[#1C398E] mb-4">
              Uploaded File Preview
            </h2>
            <p className="mb-2">
              <span className="font-semibold">File Name:</span>{" "}
              {previewFile.name}
            </p>
            <p className="mb-2">
              <span className="font-semibold">File Size:</span>{" "}
              {(previewFile.size / 1024).toFixed(2)} KB
            </p>
            <p className="mb-4">
              <span className="font-semibold">Type:</span>{" "}
              {previewFile.type}
            </p>
            <div className="flex justify-between">
              <button
                onClick={() => setPreviewFile(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-600 transition"
              >
                Close
              </button>
              <button
                onClick={() => handleFileDownload(previewFile)}
                className="bg-[#1C398E] text-white px-4 py-2 rounded-lg shadow flex items-center gap-2 hover:bg-[#162f72] transition"
              >
                <Download size={16} />
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Results2;
