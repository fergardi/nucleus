<template lang="pug">
  .info-card
    mu-card
      mu-card-header(:title='info.avatar.title', :subTitle='info.avatar.subtitle')
        mu-avatar(:src='info.avatar.image', slot='avatar')
      mu-card-media(:title='info.media.title', :subTitle='info.media.subtitle')
        img(:src='info.media.image')
      mu-card-title(:title='info.content.title', :subTitle='info.content.subtitle')
        mu-card-text {{ info.content.text }}
</template>

<script>
  export default {
    name: 'InfoCard',
    props: ['info']
  }
</script>

<style lang="stylus" scoped>
</style>