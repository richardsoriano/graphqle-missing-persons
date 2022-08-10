const Subscription = {
  count: {
    subscribe(parent, args, { pubsub }, info) {
      let count = 0

      setInterval(() => {
        count++
        pubsub.publish("count", {
          count,
        })
      }, 1000)
      return pubsub.asyncIterator("count") // this is the name of the channel
    },
  },

  message: {
    subscribe(parent, { missingPersonId }, { db, pubsub }, info) {
      const missingPersonExists = db.missing_persons.some(
        (missing_person) => missing_person.id === missingPersonId
      )

      if (!missingPersonExists) {
        throw new Error("Missing Person does not exist")
      }

      return pubsub.asyncIterator("message")
    },
  },
}
//  ? },
// comment: {
//     subscribe(parent, { postId }, { db, pubsub}, info) {
//         const post = db.posts.find((post) => post.id === postId && post.published)
//         if (!post) {
//             throw new Error('Post not found')
//         }
//         return pubsub.asyncIterator(`comment ${postId}`) // comment 44. Keep same pattern
//     }
// },
// post: {
//     subscribe(parent, args, { db, pubsub }, info) {
//     return pubsub.asyncIterator('post')
//     }
// }
// }

export { Subscription as default }
