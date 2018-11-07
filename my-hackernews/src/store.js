import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    topStories: [],
    newStories: []
  },

  getters: {
    getTopStories: state => {
      return state.topStories
    },
    getNewStories: state => {
      return state.newStories
    },
  },

  mutations: {
    APPEND_TOP_STORY: (state, article) => {
      state.topStories.push(article)
    },
    UPDATE_TOP_STORY: (state, article_with_id) => {
      if (state.topStories[article_with_id.id] != article_with_id.result) {
        state.topStories.splice(article_with_id.id, 1, article_with_id.result);
      }
    },
    APPEND_NEW_STORY: (state, article) => {
      state.newStories.push(article)
    },
    UPDATE_NEW_STORY: (state, article_with_id) => {
      if (state.newStories[article_with_id.id] != article_with_id.result) {
        state.newStories.splice(article_with_id.id, 1, article_with_id.result);
      }
    },
  },

  actions: {
    fetch_top_stories: (context) => {
      axios.get('https://hacker-news.firebaseio.com/v0/topstories.json')
        .then(resp => {
          let results = resp.data.slice(0, 25)
          results.forEach(element => {
            axios.get('https://hacker-news.firebaseio.com/v0/item/' + element + '.json')
              .then((result) => {
                context.commit('APPEND_TOP_STORY', result)
              })
              .catch((err) => {
                console.log(err)
              })
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetch_new_stories: (context) => {
      axios.get('https://hacker-news.firebaseio.com/v0/newstories.json')
        .then(resp => {
          let results = resp.data.slice(0, 20)
          results.forEach(element => {
            axios.get('https://hacker-news.firebaseio.com/v0/item/' + element + '.json')
              .then((result) => {
                context.commit('APPEND_NEW_STORY', result)
              })
              .catch((err) => {
                console.log(err)
              })
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    update_new_stories: (context) => {
      axios.get('https://hacker-news.firebaseio.com/v0/newstories.json')
        .then(resp => {
          let results = resp.data.slice(0, 20)
          results.forEach((element, id) => {
            axios.get('https://hacker-news.firebaseio.com/v0/item/' + element + '.json')
              .then((result) => {
                context.commit('UPDATE_NEW_STORY', {result: result, id: id})
              })
              .catch((err) => {
                console.log(err)
              })
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    update_top_stories: (context) => {
      axios.get('https://hacker-news.firebaseio.com/v0/topstories.json')
        .then(resp => {
          let results = resp.data.slice(0, 25)
          results.forEach((element,id) => {
            axios.get('https://hacker-news.firebaseio.com/v0/item/' + element + '.json')
              .then((result) => {
                context.commit('UPDATE_TOP_STORY', {result: result, id: id})
              })
              .catch((err) => {
                console.log(err)
              })
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
  }
})
