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
        return true;

      case FamilyTree.relation.child:
        this.members.push({
          id: uuidv4(),
          name: member.name,
          birthday: member.birthday,
          parentOf: '',
          childOf: familyId,
        });
        return true;

      default:
        return false;
    }
  }

  addParent(parent, childId) {
    const childIndex = this.getMemberIndex(childId);
    const childFamilyId = this.members[childIndex].childOf;
    if (childIndex === -1 || this.parentsOfFamily(childFamilyId).length >= FamilyTree.MAX_SPOUSE) {
      return false;
    }

    const familyId = this.members[childIndex].childOf || uuidv4();
    if (this.#addMember(parent, familyId, FamilyTree.relation.parent)) {
      this.members[childIndex].childOf = familyId;
      return true;
    }
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

  parentsOfMember(member) {
    return this.parentsOfFamily(member.childOf);
  }

  siblingsOfMember(member) {
    return this.childrenOfFamily(member.childOf).filter((sibling) => sibling.id !== member.id);
  }

  spousesOfMember(member) {
    return this.parentsOfFamily(member.parentOf).filter((spouse) => spouse.id !== member.id);
  }

  childrenOfMember(member) {
    return this.childrenOfFamily(member.parentOf);
  }

  traverse(callbackFn) {
    let results = [];
    for (const member of this.members) {
      if (member.childOf === '') {
        this.traverseMember(member, results, callbackFn);
        return results;
      }
    }
  }

  removeMember(memberId) {
    const memberIndex = this.getMemberIndex(memberId);

    const children = this.childrenOfFamily(this.members[memberIndex].parentOf);

    const parents = this.parentsOfFamily(this.members[memberIndex].childOf);

    const spouses = this.parentsOfFamily(this.members[memberIndex].parentOf).filter(
      (spouse) => spouse.id !== memberId,
    );

    const siblings = this.childrenOfFamily(this.members[memberIndex].childOf).filter(
      (sibling) => sibling.id !== memberId,
    );

    if (parents.length === 0 && siblings.length === 1) {
      siblings[0].childOf = '';
    }

    if (children.length === 0 && spouses.length === 1) {
      spouses[0].parentOf = '';
    }

    if (spouses.length === 0 && children.length === 1) {
      children[0].childOf = '';
    }

    if (siblings.length === 0 && parents.length === 1) {
      parents[0].parentOf = '';
    }

    this.members.splice(memberIndex, 1);
  }

  traverseMember(member, results, callbackFn) {
    results.push(callbackFn(member));

    const spouses = this.parentsOfFamily(member.parentOf).filter(
      (spouse) => spouse.id !== member.id,
    );
    spouses.forEach((spouse) => this.traverseSpouse(spouse, results, callbackFn));

    const children = this.childrenOfFamily(member.parentOf);
    children.forEach((child) => this.traverseMember(child, results, callbackFn));
  }

  traverseSpouse(member, results, callbackFn) {
    results.push(callbackFn(member));

    const parents = this.parentsOfFamily(member.childOf);
    parents.forEach((parent) => this.traverseSpouse(parent, results, callbackFn));

    const siblings = this.childrenOfFamily(member.childOf).filter(
      (sibling) => sibling.id !== member.id,
    );
    siblings.forEach((sibling) => this.traverseMember(sibling, results, callbackFn));
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
