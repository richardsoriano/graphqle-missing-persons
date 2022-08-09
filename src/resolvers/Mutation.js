import uuidv4 from "uuid/v4"

const Mutation = {
  createGuardian(parent, args, { db }, info) {
    const emailTaken = db.guardians.some(
      (guardian) => guardian.email === args.data.email
    )
    if (emailTaken) {
      throw new Error("Email is taken")
    }
    const guardian = {
      id: uuidv4(),
      ...args.data,
    }
    db.guardians.push(guardian)
    return guardian
  },
  createMissingPerson(parent, args, { db }, info) {
    const guardianExists = db.guardians.some(
      (guardian) => guardian.id === args.data.guardian
    )
    if (!guardianExists) {
      throw new Error("Guardian does not exist")
    }
    const missing_person = {
      id: uuidv4(),
      ...args.data,
    }
    db.missing_persons.push(missing_person)
    return missing_person
  },

  createWitness(parent, args, { db }, info) {
    const witness = {
      id: uuidv4(),
      ...args.data,
    }
    db.witnesses.push(witness)
    return witness
  },

  createMessage(parent, args, { db, pubsub }, info) {
    const witnessExists = db.witnesses.some(
      (witness) => witness.id === args.data.witness
    )
    const missingPersonExists = db.missing_persons.some(
      (missing_person) => missing_person.id === args.data.missing_person
    )
    if (!witnessExists || !missingPersonExists) {
      throw new Error("Witness does not exist or missing person")
    }

    const message = {
      id: uuidv4(),
      ...args.data,
    }
    db.messages.push(message)
    // pubsub.publish(message ${args.data.missing_person}`, { message: message })
    pubsub.publish("message", { message })
    return message
  },
  updateMissingPerson(parent, args, { db }, info) {
    const { id, data } = args

    const missing_person = db.missing_persons.find(
      (missing_person) => missing_person.id === id
    )
    if (!missing_person) {
      throw new Error("Missing Person not found")
    }

    if (typeof data.first_name === "string") {
      missing_person.first_name = data.first_name
    }
    if (typeof data.last_name === "string") {
      missing_person.last_name = data.last_name
    }
    if (typeof data.city === "string") {
      missing_person.city = data.city
    }
    if (typeof data.age === "number") {
      missing_person.age = data.age
    }
    if (typeof data.found === "boolean") {
      missing_person.found = data.found
    }
    if (typeof data.email === "string") {
      const emailTaken = db.missing_persons.some(
        (missing_person) => missing_person.email === data.email
      )
      if (emailTaken) {
        throw new Error("Email taken")
      }
    }
    return missing_person
  },
  updateGuardian(parent, args, { db }, info) {
    const { id, data } = args

    const guardian = db.guardians.find((guardian) => guardian.id === id)
    if (!guardian) {
      throw new Error("Guardian does not exist.")
    }
    if (typeof data.first_name === "string") {
      guardian.first_name = data.first_name
    }
    if (typeof data.last_name === "string") {
      guardian.last_name = data.last_name
    }
    if (typeof data.city === "string") {
      guardian.city = data.city
    }
    if (typeof data.email === "string") {
      const emailTaken = db.guardians.some(
        (guardian) => guardian.email === data.email
      )
      if (emailTaken) {
        throw new Error("email is taken")
      }
      guardian.email = data.email
    }
    return guardian
  },
  updateWitness(parent, args, { db }, info) {
    const { id, data } = args

    const witness = db.witnesses.find((witness) => witness.id === id)
    if (!witness) {
      throw new Error("Witness not found")
    }
    if (typeof data.name === "string") {
      witness.name = data.name
    }
    if (typeof data.city === "string") {
      witness.name = data.city
    }
    return witness
  },
  updateMessage(parent, args, { db }, info) {
    const { id, data } = args
    const message = db.messages.find((message) => message.id === id)

    if (!message) {
      throw new Error("Message does not exist")
    }
    if (typeof data.title === "string") {
      message.title = data.title
    }
    if (typeof data.body === "string") {
      message.body = data.body
    }

    return message
  },
  deleteMessage(parent, args, { db }, info) {
    const messageIndex = db.messages.findIndex(
      (message) => message.id === args.id
    )
    if (messageIndex === -1) {
      throw new Error("Message not found")
    }
    const [deletedMessage] = db.messages.splice(messageIndex, 1)

    return deletedMessage
  },
  deleteWitness(parent, args, { db }, info) {
    const witnessIndex = db.witnesses.findIndex(
      (witness) => witness.id === args.id
    )
    if (witnessIndex === -1) {
      throw new Error("Witness Not Found")
    }
    const [deletedWitness] = db.witnesses.splice(witnessIndex, 1)

    const foundMessages = db.messages.filter(
      (message) => message.witness !== args.id
    )
    return deletedWitness
  },
  deleteMissingPerson(parent, args, { db }, info) {
    const missingPersonIndex = db.missing_persons.findIndex(
      (missing_person) => missing_person.id === args.id
    )
    if (missingPersonIndex === -1) {
      throw new Error("Missing Person not found")
    }
    const [deletedMissingPerson] = db.missing_persons.splice(
      missingPersonIndex,
      1
    )
    const foundMessages = db.messages.filter(
      (message) => message.missing_person !== args.id
    )

    return deletedMissingPerson
  },
  deleteGuardian(parent, args, { db }, info) {
    // if guardian exists using findIndex else throw an error
    // splice it out. set that to deletedGuardian
    // return deletedGuardian
    const guardianIndex = db.guardians.findIndex(
      (guardian) => guardian.id === args.id
    )
    if (guardianIndex === -1) {
      throw new Error("Guardian not found")
    }
    const deletedGuardian = db.guardians.splice(guardianIndex, 1)
    return deletedGuardian[0]
  },
  // const emailTaken = db.guardians.some(
  //   (guardian) => guardian.email === args.email
  // )
  // if (emailTaken) {
  //   throw new Error("Email is taken")
  // }
  // const guardian = {
  //   id: uuidv4(),
  //   first_name: args.first_name,
  //   last_name: args.last_name,
  //   city: args.city,
  //   age: args.age,
  // }
  // db.guardians.push(guardian)
  // return guardian
  //   },
  //   createUser(parent, args, { db }, info) {
  //     const emailTaken = db.users.some((user) => user.email === args.data.email)
  //     if (emailTaken) {
  //       throw new Error("Email taken")
  //     }
  //     const user = {
  //       id: uuidv4(),
  //       ...args.data,
  //     }
  //     db.users.push(user)
  //     return user
  //   },
  //   deleteUser(parent, args, { db }, info) {
  //     const userIndex = db.users.findIndex((user) => user.id === args.id)
  //     if (userIndex === -1) {
  //       throw new Error("No User found")
  //     }
  //     const deletedUsers = db.users.splice(userIndex, 1)
  //     db.posts = db.posts.filter((post) => {
  //       const match = post.author === args.id
  //       if (match) {
  //         comments = db.comments.filter((comment) => comment.post !== post.id)
  //       }
  //       return !match
  //     })
  //     db.comments = db.comments.filter((comment) => comment.author !== args.id)
  //     return deletedUsers[0]
  //   },
  //   updateUser(parent, args, { db }, info) {
  //     const { id, data } = args
  //     const user = db.users.find((user) => user.id === id)
  //     if (!user) {
  //       throw new Error("User not found")
  //     }
  //     if (typeof data.email === "string") {
  //       const emailTaken = db.users.some((user) => user.email === data.email)
  //       if (emailTaken) {
  //         throw new Error("email has been taken")
  //       }
  //     }
  //     user.email = data.email
  //     if (typeof data.name === "string") {
  //       user.name = data.name
  //     }
  //     if (typeof data.age !== "undefined") {
  //       user.age = data.age
  //     }
  //     return user
  //   },
  //   createPost(parent, args, { db, pubsub }, info) {
  //     const userExists = db.users.some((user) => user.id === args.data.author)
  //     if (!userExists) {
  //       throw new Error("User not found")
  //     }
  //     const post = {
  //       id: uuidv4(),
  //       ...args.data,
  //     }
  //     db.posts.push(post)
  //     if (args.data.published) {
  //       pubsub.publish("post", {
  //         post: {
  //           mutation: "CREATED",
  //           data: post,
  //         },
  //       })
  //     }
  //     return post
  //   },
  //   deletePost(parent, args, { db, pubsub }, info) {
  //     const postExists = db.posts.findIndex((post) => post.id === args.id)
  //     if (postExists === -1) {
  //       throw new Error("No post exists")
  //     }
  //     const [post] = db.posts.splice(postExists, 1)
  //     db.comments = db.comments.filter((comment) => comment.post !== args.id)
  //     if (post.published) {
  //       pubsub.publish("post", {
  //         post: {
  //           mutation: "DELETED",
  //           data: post,
  //         },
  //       })
  //     }
  //     return post
  //   },
  //   updatePost(parent, args, { db, pubsub }, info) {
  //     const { id, data } = args
  //     const post = db.posts.find((post) => post.id === id)
  //     const originalPost = { ...post }
  //     if (!post) {
  //       throw new Error("Post not found")
  //     }
  //     if (typeof data.title === "string") {
  //       post.title = data.title
  //     }
  //     if (typeof data.body === "string") {
  //       post.body = data.body
  //     }
  //     if (typeof data.published === "boolean") {
  //       post.published = data.published
  //       if (originalPost.published && !post.published) {
  //         // deleted
  //         pubsub.publish("post", {
  //           post: {
  //             mutation: "DELETED",
  //             data: originalPost,
  //           },
  //         })
  //       } else if (!originalPost.published && post.published) {
  //         // created
  //         pubsub.publish("post", {
  //           post: {
  //             mutation: "CREATED",
  //             data: post,
  //           },
  //         })
  //       }
  //     } else if (post.published) {
  //       // updated
  //       pubsub.publish("post", {
  //         post: {
  //           mutation: "UPDATED",
  //           data: post,
  //         },
  //       })
  //     }
  //     return post
  //   },
  //   createComment(parent, args, { db, pubsub }, info) {
  //     const userExists = db.users.some((user) => user.id === args.data.author)
  //     const postExists = db.posts.some(
  //       (post) => post.id === args.data.post && post.published
  //     )
  //     if (!userExists || !postExists) {
  //       throw new Error("Unable to find a user and post")
  //     }
  //     const comment = {
  //       id: uuidv4(),
  //       ...args.data,
  //     }
  //     db.comments.push(comment)
  //     pubsub.publish(`comment ${args.data.post}`, {
  //       comment: {
  //         mutation: "CREATED",
  //         data: comment,
  //       },
  //     })
  //     return comment
  //   },
  //   deleteComment(parent, args, { db, pubsub }, info) {
  //     const commentIndex = db.comments.findIndex(
  //       (comment) => comment.id === args.id
  //     )
  //     if (commentIndex === -1) {
  //       console.log("Comment doesnt not exists", args.id)
  //       throw new Error("Comment does not exist")
  //     }
  //     const [deletedComment] = db.comments.splice(commentIndex, 1)
  //     pubsub.publish(`comment ${deletedComment.post}`, {
  //       comment: {
  //         mutation: "DELETED",
  //         data: deletedComment,
  //       },
  //     })
  //     return deletedComment
  //   },
  //   updateComment(parent, args, { db, pubsub }, info) {
  //     const { id, data } = args
  //     const comment = db.comments.find((comment) => comment.id === id)
  //     if (!comment) {
  //       throw new Error("Comment not found")
  //     }
  //     if (typeof data.text === "string") {
  //       comment.text = data.text
  //     }
  //     pubsub.publish(`comment ${comment.post}`, {
  //       comment: {
  //         mutation: "UPDATED",
  //         data: comment,
  //       },
  //     })
  //     return comment
  //   },
}

export { Mutation as default }
