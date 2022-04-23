import React, { useEffect, useState } from 'react';

const useDocument = () => {
  const [myDocument, setMyDocument] = useState<any>(null);

  useEffect(() => {
    setMyDocument(document);
  }, []);

  return myDocument;
};

export default useDocument;
