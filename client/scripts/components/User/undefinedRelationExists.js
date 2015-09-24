export function undefinedRelationExists(type, itemsNeedingDisclosures, relations) {
  // See if there are any items needing disclosures without a declaration (relation)
  let undeclaredRelation = itemsNeedingDisclosures.find(item => {
    let existingRelation = relations.find(relation => {
      if (type === 'PROJECT') {
        return relation.projectId === item.id;
      }
      else {
        return relation.finEntityId === item.id;
      }
    });

    return !existingRelation;
  });

  return undeclaredRelation !== undefined;
}
