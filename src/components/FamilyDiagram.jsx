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
    <div>
      <div>
        <label>Choose a family member:</label>
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
                <div className="sibling-member">
                  <Member member={relative.member} />
                </div>
                <div className="sibling-spouse">
                  {relative.spouses.map((spouse) => (
                    <Member member={spouse} key={spouse.id} />
                  ))}
                </div>
              </div>

              <div className='sibling-children'>
                {relative.children.map((child) => (
                  <Member member={child} key={child.id} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="parents">
          <div className='parent-a'>
            <Member member={family.parents[0]} />
          </div>
          <div className='parent-b'>
            <Member member={family.parents[1]} />
          </div>
        </div>

        <div className='sibling-b'>
          {family?.relatives[1]?.map((relative) => (
            <div key={relative.member.id} className='sibling-container'>
              <div className="sibling-parents">
                <div className='sibling-member'>
                  <Member member={relative.member} />
                </div>
                <div className='sibling-spouse'>
                  {relative.spouse.map((spouse) => (
                    <Member member={spouse} key={spouse.id} />
                  ))}
                </div>
              </div>

              {relative.children.map((child) => (
                <Member member={child} key={child.id} />
              ))}
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
