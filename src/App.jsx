import React, { useState } from 'react';

import { Editor } from './components/Editor.jsx';
import { FamilyTree } from './components/FamilyTree.jsx';

import familyTreeJson from './familyTree.json';
import './App.css';

function App() {
  const [json, setJson] = useState(familyTreeJson);
  return (
    <div className='App'>
      <Editor value={json} setValue={setJson} />
      <FamilyTree familyTreeJson={json} updateEditor={setJson} />
    </div>
  );
}

export default App;
