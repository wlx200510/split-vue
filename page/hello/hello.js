/**
 * @file hello.js
 * @author wlx200510@126.com
 * @since 2018/12/16 19:23:15
 */



  import {mapState} from 'vuex';
  import cTitle from 'components/title';

  export default {
    data () {
      return {
        title: 'Hello Vue!',
        content: ''
      }
    },
    methods: {
      async getContent () {
        const response = await fetch('/api/hello');
        this.content = await response.text();
      }
    },
    mounted () {
      this.$store.commit('message', '欢迎使用 vue！');
      this.getContent();
    },

    components: {cTitle}
  }

