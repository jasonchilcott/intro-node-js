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

const showUserProfile = (userId, cb) => {
  api.getUserById(userId, user => {
    const profile = 
      
        console.log(user.name)
      
    cb(user)
  })
}


module.exports = {
  showPostsForCurrentUser,
  showUserProfile
}