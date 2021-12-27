module.exports = () => ({
  comments: {
    enableUsers: false,
    badWords: false,
    relatedContentTypes: {
      adventures: {
        uuid: 'application::adventure.adventure',
        contentManager: true,
        __contentType: '',
        key: 'title',
        value: 'id',
      }
    }
  },
})
