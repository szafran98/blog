<template>
  <div id="home-container" class="home" v-cloak>
    <PopularTags class="home__popular-tags" v-cloak />
    <div class="home__posts posts" style="">
      <h1 class="posts__header content-subhead">
        Recent posts <template v-if="tagName">on {{ tagName }}</template>
      </h1>
      <template v-for="post in posts" :key="post.id" v-cloak>
        <PostTrailer class="posts__post-trailer" :postData="post" />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  inject,
  getCurrentInstance,
  watch,
} from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import PostTrailer from '@/components/PostTrailer/index.vue';
import PopularTags from '@/components/PopularTags.vue';
import { usePosts } from '@/composable/usePosts';

export default defineComponent({
  name: 'Home',
  components: {
    //Post,
    PostTrailer,
    PopularTags,
  },
  props: {
    tagName: String || null,
  },
  setup: async function () {
    //const store = useStore()

    const { posts, getPosts, getPostsByTag } = usePosts();
    const isLogged = inject('isLogged');

    const route = useRoute();

    onMounted(() => {
      //Prism.highlightAll();
    });

    console.log(posts.value);

    watch(
      () => route.name,
      (name) => {
        console.log(name);
        if (name === 'PostsOnTag') {
          const tagName = String(route.params.tagName);
          getPostsByTag(tagName);
        } else if (name === 'Home') {
          getPosts();
        }
      },
    );

    return {
      posts,
      isLogged,
    };
  },
});
</script>

<style scoped lang="scss">
[v-cloak] {
  display: none;
}

.home {
  margin-top: 4em;
  margin-left: 1.5em;
  margin-right: 1.5em;
}

.posts {
  //margin-left: 1em;
  //margin-right: 1em;
}

.posts__header {
  text-transform: uppercase;
  color: #aaa;
  border-bottom: 1px solid #eee;
  padding: 0.4em 0;
  font-size: 80%;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-align: left;
  margin-bottom: 1rem;
}

@include respond-to(medium) {
  .posts {
    width: 680px;
  }
}

@include respond-to(large) {
  .home {
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
    //margin: auto;
  }

  .home__popular-tags {
    position: sticky;
    top: 75px;
    margin-left: 5%;
  }

  .posts {
    max-width: 680px;
  }
}

/*@media (min-width: 72em) {
  #home-container {
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;

    .posts {
      flex: 3 0 0;
      max-width: 680px;
    }
  }
}

@media (max-width: 72em) {
  #home-container {
    display: block;

    .posts {
      max-width: 100%;
    }

    #popular-tags {
    }
  }
}

@media (max-width: 50em) {
  #home-container {
    .posts {
      margin-left: 1em;
      margin-right: 1em;
    }
  }
}

@media (max-width: 32em) {
  #home-container {
    .posts {
      margin-left: 1em;
      margin-right: 1em;
    }

    #popular-tags {
    }
  }
}

.content-subhead {
  text-transform: uppercase;
  color: #aaa;
  border-bottom: 1px solid #eee;
  padding: 0.4em 0;
  font-size: 80%;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-align: left;
  //width: 680px;
  //margin: auto;
  margin-bottom: 1rem;
}

.sidebar {
  background: rgb(61, 79, 93);
  color: #fff;
}

@media (min-width: 10em) {
  .content {
    //padding: 2em 3em 0;
    //margin-left: 20%;

    .post {
      //width: 680px;
      //margin: auto;
      //margin-top: 200px;
    }
  }
}


.brand-title {
  text-transform: uppercase;
  margin: 0;
}

.brand-tagline {
  font-weight: 300;
  color: rgb(176, 202, 219);
  margin: 0;
}

pre {
  border: 0;
  border-radius: 0;
}*/
</style>
