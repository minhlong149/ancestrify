import React from 'react';

import { stringToColour } from '../../services/helper.js';

export function Family({ familyId }) {
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
