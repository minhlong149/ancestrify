import { v4 as uuidv4 } from 'uuid';

export default class FamilyTree {
  constructor(members = []) {
    this.members = members;
  }

  static relation = {
    parent: 'PARENT',
    child: 'CHILD',
  };

  static MAX_SPOUSE = 2;

  addFirstMember(member) {
    return this.members.length > 0
      ? false
      : this.#addMember(member, '', FamilyTree.relation.parent);
  }

  #addMember(member, familyId, familyRole) {
    switch (familyRole) {
      case FamilyTree.relation.parent:
        if (this.parentsOfFamily(familyId).length >= FamilyTree.MAX_SPOUSE) {
          return false;
        }

        this.members.push({
          id: uuidv4(),
          name: member.name,
          birthday: member.birthday,
          parentOf: familyId,
          childOf: '',
        });
        console.log(member.name, 'added');
        return true;

      case FamilyTree.relation.child:
        this.members.push({
          id: uuidv4(),
          name: member.name,
          birthday: member.birthday,
          parentOf: '',
          childOf: familyId,
        });
        console.log(member.name, 'added');
        return true;

      default:
        return false;
    }
  }

  addParent(parent, childId) {
    const childIndex = this.getMemberIndex(childId);
    const childFamilyId = this.members[childIndex].childOf;
    if (childIndex === -1 || this.parentsOfFamily(childFamilyId).length >= FamilyTree.MAX_SPOUSE) {
      console.log(
        this.members[childIndex].name,
        ' cannot add parent, ',
        this.parentsOfFamily(childFamilyId).length,
      );
      return false;
    }

    const familyId = this.members[childIndex].childOf || uuidv4();
    if (this.#addMember(parent, familyId, FamilyTree.relation.parent)) {
      this.members[childIndex].childOf = familyId;
      return true;
    }
    console.log(this.members[childIndex].name, ' cannot add parent');

    return false;
  }

  addChild(child, parentId) {
    const parentIndex = this.getMemberIndex(parentId);
    if (parentIndex === -1) {
      return false;
    }

    const familyId = this.members[parentIndex].parentOf || uuidv4();
    if (this.#addMember(child, familyId, FamilyTree.relation.child)) {
      this.members[parentIndex].parentOf = familyId;
      return true;
    }
    return false;
  }

  addSpouse(spouse, memberId) {
    const memberIndex = this.getMemberIndex(memberId);
    if (memberIndex === -1 || this.members[memberIndex].parentOf !== '') {
      return false;
    }

    const familyId = uuidv4();
    if (this.#addMember(spouse, familyId, FamilyTree.relation.parent)) {
      this.members[memberIndex].parentOf = familyId;
      return true;
    }

    return false;
  }

  addSibling(sibling, memberId) {
    const memberIndex = this.getMemberIndex(memberId);
    if (memberIndex === -1 || this.members[memberIndex].childOf === '') {
      return false;
    }

    const familyId = this.members[memberIndex].childOf || uuidv4();
    if (this.#addMember(sibling, familyId, FamilyTree.relation.child)) {
      this.members[memberIndex].childOf = familyId;
      return true;
    }

    return false;
  }

  print() {
    this.members.forEach((member) => {
      if (member.childOf != '') {
        const parents = this.parentsOfFamily(member.childOf);
        const siblings = this.childrenOfFamily(member.childOf).filter(
          (sibling) => sibling.id !== member.id,
        );
        console.log(
          `${member.name} is child of family ${member.childOf}, their parents are ${parents
            .map((parent) => parent.name)
            .join(', ')}, their siblings are ${siblings.map((sibling) => sibling.name).join(', ')}`,
        );
      }

      if (member.parentOf != '') {
        const spouses = this.parentsOfFamily(member.parentOf).filter(
          (spouse) => spouse.id !== member.id,
        );
        const children = this.childrenOfFamily(member.parentOf);
        console.log(
          `${member.name} is parent of family ${member.parentOf}, their spouses are ${spouses
            .map((spouse) => spouse.name)
            .join(', ')}, their children are ${children.map((child) => child.name).join(', ')}`,
        );
      }
    });
  }

  parentsOfFamily(familyId) {
    return this.members.filter((member) => member.parentOf === familyId && member.parentOf !== '');
  }

  childrenOfFamily(familyId) {
    return this.members.filter((member) => member.childOf === familyId && member.childOf !== '');
  }

  getMemberIndex(memberId) {
    return this.members.findIndex((member) => member.id === memberId);
  }
}
