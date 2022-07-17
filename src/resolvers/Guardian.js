const Guardian = {
  missing_persons(parent, args, { db }, info) {
    return db.missing_persons.filter((missing_person) => {
      return missing_person.guardian === parent.id
    })
  },
}

export { Guardian as default }
