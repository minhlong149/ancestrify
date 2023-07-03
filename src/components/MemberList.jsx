import React from 'react';
import { Children } from './MemberList/Children.jsx';
import { Family } from './MemberList/Family.jsx';
import { Member } from './MemberList/Member.jsx';
import { Parents } from './MemberList/Parents.jsx';
import { Siblings } from './MemberList/Siblings.jsx';
import { Spouses } from './MemberList/Spouses.jsx';
import { UpdateMembers } from './MemberList/UpdateMembers.jsx';

export function MemberList({ familyTree, members, updateInputForm, removeMember }) {
  return (
    <ul>
      {members.map((member) => (
        <li key={member.id}>
          <Member member={member} />
          <UpdateMembers
            member={member}
            handleUpdate={updateInputForm}
            handleRemove={removeMember}
          />
          <ul>
            {member.childOf && (
              <li>
                Child of family <Family familyId={member.childOf} />
                <ul>
                  <Parents parents={familyTree.parentsOfMember(member)} />
                  <Siblings siblings={familyTree.siblingsOfMember(member)} />
                </ul>
              </li>
            )}
            {member.parentOf && (
              <li>
                Parent of family <Family familyId={member.parentOf} />
                <ul>
                  <Spouses spouses={familyTree.spousesOfMember(member)} />
                  <Children children={familyTree.childrenOfMember(member)} />
                </ul>
              </li>
            )}
          </ul>
        </li>
      ))}
    </ul>
  );
}
