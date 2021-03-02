// vuex.d.ts
import { ComponentCustomProperties } from 'vue'
import { Store } from '@/store'

declare module '@vue/runtime-core' {
  // declare your own store states
  interface State {
    //count: number
    posts: any[]
    userData: any
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
