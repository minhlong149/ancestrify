import React from 'react';
import { Member } from './Member';

export function Siblings({ siblings }) {
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
