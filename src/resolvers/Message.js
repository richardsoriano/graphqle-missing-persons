const Message = {
  witness(parent, args, { db }, info) {
    return db.witnesses.find((witness) => witness.id === parent.witness)
  },
  missing_person(parent, args, { db }, info) {
    return db.missing_persons.find(
      (missing_person) => missing_person.id === parent.missing_person
    )
  },
}

export { Message as default }
