import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  // NOTE user is the Auth0 profile
  user: {},
  // NOTE account is the API profile
  account: {},
  // NOTE activeProfile is anybody's public profile
  activeProfile: null,

  blogs: [],

  activeBlog: null,

  activeBlogs: [],

  myBlogs: []

})
