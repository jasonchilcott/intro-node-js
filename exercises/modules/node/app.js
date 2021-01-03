const api = require('./api')


const showPostsForCurrentUser = (userId, cb) => {
  api.getPostsForUser(userId, posts => {
    const postTemplates = posts.map(post => {
      console.log(
        post.title,
        post.body,
        post.createdBy,
      )
    })
    cb(postTemplates)
  })
}

window.App.showUserProfile = (userId, cb) => {
  window.App.getUserById(userId, user => {
    const profile = `
      <div>
        ${user.name}
      </div>
    `
    cb(user)
  })
}


