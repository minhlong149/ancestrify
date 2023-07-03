import React from 'react';

import { stringToColour } from '../../services/helper.js';

export function Member({ member }) {
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
