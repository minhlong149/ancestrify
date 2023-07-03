import React from 'react';
import { Member } from './Member';

export function Children({ children }) {
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
