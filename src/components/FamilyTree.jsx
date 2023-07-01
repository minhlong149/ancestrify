import React from 'react';

import FTMS from '../services/familyTree.js';

export function FamilyTree({ familyTreeJson }) {
  const familyTree = new FTMS(familyTreeJson);
  return <p>{familyTree.traverse((member) => member.name).join(', ')}</p>;
}
