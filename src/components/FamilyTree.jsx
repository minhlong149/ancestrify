import React, { useEffect, useRef, useState } from 'react';

import FTMS from '../services/familyTree.js';

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
      }
      return;
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
  };

  return (
    <div>
      <form ref={inputFormRef} onSubmit={addMember}>
        <InputForm members={members} />
      </form>
      <ul>
        {members.map((member) => (
          <li key={member.id}>
            <Member member={member} />
            <UpdateMembers
              member={member}
              handleUpdate={updateInputForm}
              handleRemove={removeMember}
            />
            <ul>
              {member.childOf && (
                <li>
                  Child of family <Family familyId={member.childOf} />
                  <ul>
                    <Parents parents={familyTree.parentsOfMember(member)} />
                    <Siblings siblings={familyTree.siblingsOfMember(member)} />
                  </ul>
                </li>
              )}
              {member.parentOf && (
                <li>
                  Parent of family <Family familyId={member.parentOf} />
                  <ul>
                    <Spouses spouses={familyTree.spousesOfMember(member)} />
                    <Children children={familyTree.childrenOfMember(member)} />
                  </ul>
                </li>
              )}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Member({ member }) {
  const filter = [`span[mid="${member.id}"]`];

  if (member.parentOf) {
    filter.push(`span[pfid="${member.parentOf}"]`);
    // filter.push(`span[cfid="${member.parentOf}"]`);
  }

  if (member.childOf) {
    // filter.push(`span[pfid="${member.childOf}"]`);
    // filter.push(`span[cfid="${member.childOf}"]`);
  }

  const highlightOn = () => {
    const spans = document.querySelectorAll(filter.join(','));
    spans.forEach((span) => {
      const randomColor = stringToColour(span.getAttribute('mid'));
      span.style.backgroundColor = randomColor;
    });
  };

  const highlightOff = () => {
    const spans = document.querySelectorAll(filter.join(','));
    spans.forEach(({ style }) => (style.backgroundColor = 'transparent'));
  };

  return (
    <span
      mid={member.id}
      pfid={member.parentOf}
      cfid={member.childOf}
      onMouseEnter={highlightOn}
      onMouseLeave={highlightOff}
    >
      {member.name}
      {member.birthday && `, ${member.birthday.substring(0, 4)}`}
    </span>
  );
}

function Family({ familyId }) {
  const filter = [`span[fid="${familyId}"]`];

  const highlightOn = () => {
    const spans = document.querySelectorAll(filter.join(','));
    spans.forEach((span) => {
      const randomColor = stringToColour(span.getAttribute('fid'));
      span.style.backgroundColor = randomColor;
    });
  };

  const highlightOff = () => {
    const spans = document.querySelectorAll(filter.join(','));
    spans.forEach(({ style }) => (style.backgroundColor = 'transparent'));
  };

  return (
    <span fid={familyId} onMouseEnter={highlightOn} onMouseLeave={highlightOff}>
      {familyId}
    </span>
  );
}

function Parents({ parents }) {
  return parents.length > 0 ? (
    <li>
      Parents are{' '}
      {parents.map((parent) => (
        <Member member={parent} key={parent.id} />
      ))}
    </li>
  ) : (
    <></>
  );
}

function Siblings({ siblings }) {
  return siblings.length > 0 ? (
    <li>
      Siblings are{' '}
      {siblings.map((sibling) => (
        <Member member={sibling} key={sibling.id} />
      ))}
    </li>
  ) : (
    <></>
  );
}

function Spouses({ spouses }) {
  return spouses.length > 0 ? (
    <li>
      Spouses are{' '}
      {spouses.map((spouse) => (
        <Member member={spouse} key={spouse.id} />
      ))}
    </li>
  ) : (
    <></>
  );
}

function Children({ children }) {
  return children.length > 0 ? (
    <li>
      Children are{' '}
      {children.map((child) => (
        <Member member={child} key={child.id} />
      ))}
    </li>
  ) : (
    <></>
  );
}

const stringToColour = (string) => {
  const hue = string.split('').reduce((acc, char, i) => {
    acc = (acc << i) - acc + char.charCodeAt(0);
    return acc & acc;
  }, string.length);

  return `hsl(${hue % 360}, 100%, 90%)`;
};

function InputForm({ members }) {
  return (
    <>
      <div>
        <label htmlFor='name'>Enter your name: </label>
        <input type='text' name='name' id='name' required />
      </div>

      <div>
        <label htmlFor='birthday'>Enter your birthday: </label>
        <input type='date' name='birthday' id='birthday' />
      </div>

      {members.length > 0 && (
        <>
          <div>
            <label htmlFor='member'>Select a family member: </label>
            <select name='member' id='member' required>
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor='relation'>Select a relation:</label>
            <select name='relation' id='relation' required>
              <option value='parent'>Parent</option>
              <option value='child'>Child</option>
              <option value='spouse'>Spouse</option>
              <option value='sibling'>Sibling</option>
            </select>
          </div>
          <div></div>
        </>
      )}
      <div>
        <input type='submit' value='Add a family member' id='addMember' />
      </div>
    </>
  );
}

function UpdateMembers({ member, handleUpdate, handleRemove }) {
  return (
    <>
      <button onClick={() => handleUpdate(member, 'parent')}>Add parent</button>
      <button onClick={() => handleUpdate(member, 'child')}>Add child</button>
      <button onClick={() => handleUpdate(member, 'spouse')}>Add spouse</button>
      <button onClick={() => handleUpdate(member, 'sibling')}>Add sibling</button>
      <button onClick={() => handleRemove(member.id)}>Remove</button>
    </>
  );
}
