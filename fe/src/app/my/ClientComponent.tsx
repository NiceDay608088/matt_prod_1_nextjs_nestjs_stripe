"use client";

import React, { useState, useEffect } from "react";

const ClientComponent = () => {
  const [clientData, setClientData] = useState<string | null>(null);

  useEffect(() => {
    // Simulate client-side data fetching
    const fetchClientData = async () => {
      const data = "This is client-side rendered data.";
      setClientData(data);
    };

    fetchClientData();
  }, []);

  return (
    <div>
      <h2>Client-Side Rendered Content:</h2>
      <p>{clientData || "Loading client-side content..."}</p>
    </div>
  );
};

export default ClientComponent;
