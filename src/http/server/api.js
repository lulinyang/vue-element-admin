import extendsApi from './extendsApi'

class AllServiceApi extends extendsApi {
  constructor() {
    super()
  }

  getTopicList(params) {
    return this.sendPost('/api/Topic/TopicList', params);
  }

}

export default new AllServiceApi()