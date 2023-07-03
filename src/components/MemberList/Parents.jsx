import React from 'react';
import { Member } from './Member';

export function Parents({ parents }) {
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
