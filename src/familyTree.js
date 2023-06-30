import * as crypto from 'crypto';

const MAX_SPOUSE = 2;

export const familyTree = [];

export const relation = {
  parent: 'PARENT',
  child: 'CHILD',
};

export const addMember = (member, familyId, familyRole) => {
  switch (familyRole) {
    case relation.parent:
      if (parentsOfFamily(familyId).length >= MAX_SPOUSE) {
        return false;
      }

      familyTree.push({
        id: crypto.randomUUID(),
        name: member.name,
        birthday: member.birthday,
        parentOf: familyId,
        childOf: '',
      });
      return true;

    case relation.child:
      familyTree.push({
        id: crypto.randomUUID(),
        name: member.name,
        birthday: member.birthday,
        parentOf: '',
        childOf: familyId,
      });
      return true;

    default:
      return false;
  }
};

export const printFamilyTree = () => {
  familyTree.forEach((member) => {
    if (member.childOf != '') {
      const parents = parentsOfFamily(member.childOf);
      const siblings = childrenOfFamily(member.childOf).filter(
        (sibling) => sibling.id !== member.id,
      );
      console.log(
        `${member.name} is child of family ${member.childOf}, their parents are ${parents
          .map((parent) => parent.name)
          .join(', ')}, their siblings are ${siblings.map((sibling) => sibling.name).join(', ')}`,
      );
    }

    if (member.parentOf != '') {
      const spouses = parentsOfFamily(member.parentOf).filter((spouse) => spouse.id !== member.id);
      const children = childrenOfFamily(member.parentOf);
      console.log(
        `${member.name} is parent of family ${member.parentOf}, their spouses are ${spouses
          .map((spouse) => spouse.name)
          .join(', ')}, their children are ${children.map((child) => child.name).join(', ')}`,
      );
    }
  });
};

const parentsOfFamily = (family) => familyTree.filter((member) => member.parentOf === family);

const childrenOfFamily = (family) => familyTree.filter((member) => member.childOf === family);
