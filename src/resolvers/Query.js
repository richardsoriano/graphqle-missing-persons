import db from "../db"

const Query = {
  missing_persons(parents, args, { db }, info) {
    if (!args.query) {
      return db.missing_persons
    } else {
      return db.missing_persons.filter((missing_person) => {
        console.log("missing_person", missing_person)
        const isFirstNameMatch = missing_person.first_name
          .toLowerCase()
          .includes(args.query.toLowerCase())
        const isLastNameMatch = missing_person.last_name
          .toLowerCase()
          .includes(args.query.toLowerCase())
        const isCityMatch = missing_person.city
          .toLowerCase()
          .includes(args.query.toLowerCase())
        return isFirstNameMatch || isLastNameMatch || isCityMatch
      })
    }
  },

  witnesses(parent, args, { db }, info) {
    return db.witnesses
  },
  messages(parent, args, { db }, info) {
    return db.messages
  },
  guardians(parent, args, { db }, info) {
    return db.guardians
  },
}

export { Query as default }
