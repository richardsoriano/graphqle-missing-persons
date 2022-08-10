const Witness = {
  messages(parent, args, { db }, info) {
    return db.messages.filter((message) => {
      return message.witness === parent.id
    })
  },
}

export { Witness as default }
