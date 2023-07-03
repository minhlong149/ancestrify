import React from 'react';
import { Member } from './Member';

export function Spouses({ spouses }) {
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
