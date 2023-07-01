import React from 'react';

import FTMS from '../services/familyTree.js';

export function FamilyTree({ familyTreeJson }) {
  const familyTree = new FTMS(familyTreeJson);
  const members = familyTree.traverse((member) => member);
  return (
    <ul>
      {members.map((member) => (
        <li key={member.id}>
          <Member member={member} />
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

  const spans = document.querySelectorAll(filter.join(','));

  const highlightOn = () =>
    spans.forEach((span) => {
      const randomColor = stringToColour(span.getAttribute('mid'));
      span.style.backgroundColor = randomColor;
    });

  const highlightOff = () => spans.forEach(({ style }) => (style.backgroundColor = 'transparent'));

  return (
    <span
      mid={member.id}
      pfid={member.parentOf}
      cfid={member.childOf}
      onMouseEnter={highlightOn}
      onMouseLeave={highlightOff}
    >
      {member.name}, {member.birthday.substring(0, 4)}{' '}
    </span>
  );
}

function Family({ familyId }) {
  const filter = [`span[fid="${familyId}"]`];
  const spans = document.querySelectorAll(filter.join(','));

  const highlightOn = () =>
    spans.forEach((span) => {
      const randomColor = stringToColour(span.getAttribute('fid'));
      span.style.backgroundColor = randomColor;
    });

  const highlightOff = () => spans.forEach(({ style }) => (style.backgroundColor = 'transparent'));

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
  // hash string to a random number
  const hue = string.split('').reduce((acc, char, i) => {
    acc = (acc << i) - acc + char.charCodeAt(0);
    return acc & acc;
  }, string.length);

  return `hsl(${hue % 360}, 100%, 90%)`;
};
