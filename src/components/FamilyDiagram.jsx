import React, { useEffect, useState } from 'react';

import { Member } from './MemberList/Member.jsx';

import './FamilyDiagram.css';

export function FamilyDiagram({ members, familyTree }) {
  const [memberId, setMemberId] = useState('');
  const family = familyTree.getFamilyOfMember(memberId);

  useEffect(() => setMemberId(members[0]?.id), [members]);

  useEffect(() => {
    console.log(family);
  }, [memberId]);

  if (!family) return null;

  return (
    <div className='family-diagram'>
      <div className='member-selection'>
        <label>Choose a family member: </label>
        <select onChange={(e) => setMemberId(e.target.value)}>
          {members.map((member, index) => (
            <option key={member.id} value={member.id}>
              {member.name}
            </option>
          ))}
        </select>
      </div>

      <div className='container'>
        <div className='grandparent-a'>
          {family?.grandparents[0]?.map((member) => (
            <Member member={member} key={member.id} />
          ))}
        </div>

        <div className='grandparent-b'>
          {family?.grandparents[1]?.map((member) => (
            <Member member={member} key={member.id} />
          ))}
        </div>

        <div className='sibling-a'>
          {family?.relatives[0]?.map((relative) => (
            <div key={relative.member.id} className='sibling-container'>
              <div className='sibling-parents'>
                <div className='sibling-member'>
                  <Member member={relative.member} />
                </div>

                {relative.spouses.length > 0 && (
                  <div className='sibling-spouse'>
                    {relative.spouses.map((spouse) => (
                      <Member member={spouse} key={spouse.id} />
                    ))}
                  </div>
                )}
              </div>

              {relative.children.length > 0 && (
                <div className='sibling-children'>
                  {relative.children.map((child) => (
                    <Member member={child} key={child.id} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className='parents'>
          <Member member={family.parents[0]} />
          <Member member={family.parents[1]} />
        </div>

        <div className='sibling-b'>
          {family?.relatives[1]?.map((relative) => (
            <div key={relative.member.id} className='sibling-container'>
              <div className='sibling-parents'>
                <div className='sibling-member'>
                  <Member member={relative.member} />
                </div>

                {relative.spouses.length > 0 && (
                  <div className='sibling-spouse'>
                    {relative.spouses.map((spouse) => (
                      <Member member={spouse} key={spouse.id} />
                    ))}
                  </div>
                )}
              </div>

              {relative.children.length > 0 && (
                <div className='sibling-children'>
                  {relative.children.map((child) => (
                    <Member member={child} key={child.id} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className='child'>
          {family?.children?.map((member) => (
            <Member member={member} key={member.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
