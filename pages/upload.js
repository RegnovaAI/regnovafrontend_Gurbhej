
'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedAudits, setSelectedAudits] = useState([]);
  const [uploading, setUploading] = useState(false);

  const auditOptions = [
    'SOC 1', 'SOC 2', 'SOX', 'PCI-DSS', 'HIPAA', 'GDPR', 'FedRAMP', 'ISO 27001'
  ];

  const handleAuditToggle = (audit) => {
    setSelectedAudits((prev) =>
      prev.includes(audit)
        ? prev.filter((a) => a !== audit)
        : [...prev, audit]
    );
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && selectedAudits.length > 0) {
      setSelectedFile(file);
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("audits", selectedAudits.join(","));

      try {
        const response = await fetch("https://regnovaai-backend.onrender.com/upload/", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        alert("✅ Upload complete. Audit Types: " + data.audits.join(", "));
        console.log("Raw LLM Output:", data.raw_response);
      } catch (error) {
        console.error("❌ Upload failed:", error);
        alert("❌ Upload failed.");
      } finally {
        setUploading(false);
      }
    } else {
      alert("Please select at least one audit framework before uploading.");
    }
  }, [selectedAudits]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Select Audits</h2>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {auditOptions.map((audit) => (
          <label key={audit} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedAudits.includes(audit)}
              onChange={() => handleAuditToggle(audit)}
            />
            <span>{audit}</span>
          </label>
        ))}
      </div>

      <div
        {...getRootProps()}
        className="border-dashed border-2 border-gray-400 p-10 text-center cursor-pointer"
      >
        <input {...getInputProps()} />
        {uploading
          ? "Uploading..."
          : selectedFile
          ? `Selected File: ${selectedFile.name}`
          : "Drag and drop a file here or click to select"}
      </div>
    </div>
  );
}
