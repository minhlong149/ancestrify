import React, { useState } from 'react';

import { Editor } from './components/Editor.jsx';
import { FamilyTree } from './components/FamilyTree.jsx';

import familyTreeJson from './familyTree.json';

function App() {
  const [json, setJson] = useState(familyTreeJson);
  return (
    <>
      <Editor value={json} setValue={setJson} />
      <FamilyTree familyTreeJson={json} updateEditor={setJson} />
    </>
  );
}

export default App;
