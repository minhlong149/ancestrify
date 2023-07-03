import React from 'react';

export function UpdateMembers({ member, handleUpdate, handleRemove }) {
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
