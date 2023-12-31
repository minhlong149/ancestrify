import React, { useEffect, useRef, useState } from 'react';

import { FamilyDiagram } from './FamilyDiagram.jsx';
import { InputForm } from './InputForm.jsx';
import { MemberList } from './MemberList.jsx';

import FTMS from '../services/familyTree.js';
import './FamilyTree.css';

export function FamilyTree({ familyTreeJson, updateEditor }) {
  const inputFormRef = useRef(null);

  const familyTree = new FTMS(familyTreeJson);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    setMembers(familyTree.getMembers());
  }, [familyTreeJson]);

  const removeMember = (memberId) => {
    familyTree.removeMember(memberId);
    syncJsonEditor();
  };

  const syncJsonEditor = () => {
    setMembers(familyTree.getMembers());
    updateEditor(familyTree.getMembers());
  };

  const updateInputForm = (member, relation) => {
    const inputForm = inputFormRef.current.elements;
    inputForm.member.value = member.id;
    inputForm.relation.value = relation;
    inputForm.addMember.click();
  };

  const addMember = (e) => {
    e.preventDefault();

    const inputForm = inputFormRef.current.elements;

    const member = {
      name: inputForm.name.value,
      birthday: inputForm.birthday.value,
    };

    if (members.length === 0) {
      if (familyTree.addFirstMember(member)) {
        syncJsonEditor();
        inputForm.name.value = '';
        return;
      }
    }

    const memberIdRelatedWith = inputForm.member.value;
    switch (inputForm.relation.value) {
      case 'parent':
        if (familyTree.addParent(member, memberIdRelatedWith)) {
          syncJsonEditor();
        }
        break;

      case 'child':
        if (familyTree.addChild(member, memberIdRelatedWith)) {
          syncJsonEditor();
        }
        break;

      case 'spouse':
        if (familyTree.addSpouse(member, memberIdRelatedWith)) {
          syncJsonEditor();
        }
        break;

      case 'sibling':
        if (familyTree.addSibling(member, memberIdRelatedWith)) {
          syncJsonEditor();
        }
        break;

      default:
        break;
    }

    inputForm.name.value = '';
  };

  return (
    <div className='family-tree'>
      <FamilyDiagram
        members={members}
        familyTree={familyTree}
        updateInputForm={updateInputForm}
        removeMember={removeMember}
      />

      <div className='input-form-container'>
        <h2>Add a new member</h2>
        <form ref={inputFormRef} onSubmit={addMember} className='input-form'>
          <InputForm members={members} />
        </form>
      </div>

      <MemberList
        members={members}
        familyTree={familyTree}
        updateInputForm={updateInputForm}
        removeMember={removeMember}
      />
    </div>
  );
}
