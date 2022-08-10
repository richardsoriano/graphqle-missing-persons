const MissingPerson = {
  guardians(parent, args, { db }, info) {
    return db.guardians.filter((guardian) => {
      return guardian.id === parent.guardian
    })
  },
}

export { MissingPerson as default }
