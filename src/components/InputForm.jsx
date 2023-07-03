import React from 'react';

export function InputForm({ members }) {
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
