import React, { useState, useEffect } from "react";
import { getFileUrlFromServer } from "@API/fileService";

/**
 * Get file path
 * @param {*string} hash file hash
 * @param {*json} params
 * @returns {*string} filePath
 */
export default function useFilePath(hash, params) {
  const [loading, setLoading] = useState(false);
  const [filePath, setFilePath] = useState(null);

  async function getFilePath(hash, params) {
    setLoading(true);
    const response = await getFileUrlFromServer(hash, params);
    if (response.status === 200) {
      setFilePath(response?.data?.url);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (hash) {
      getFilePath(hash, params);
    }
  }, [hash, params]);

  return { filePath, loading };
}
