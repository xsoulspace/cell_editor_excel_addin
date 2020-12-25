<template lang="pug">
div.header 
  .tabs
    .tabs__tab(
      :class="{'is-active': isEditorEnabled }"
      @click="isEditorEnabled = true"
      @mouseover="changeIsSearchActive = true"
      @mouseleave="changeIsSearchActive = false"
    ) 
      div.button.--has-accent
        span.icon
          i.fas.fa-sliders-h WYSIWYG     
    
    div.tabs__tab(
      :class="{ 'is-active': !isEditorEnabled }"
      @click="isEditorEnabled = false"
    )
      div.button.--has-accent
        span.icon
          i.fas.fa-sliders-h Ввод

    div.tabs__tab(
      @click="isSettingsActive = true"
    )
      div.button.--has-accent 
        span.icon.is-small
          i.fas.fa-sliders-h Настройки

    div.tabs__tab
      div.button.--has-accent
        span.icon 
          i.fas.fa-sliders-h info
</template>

<script lang="ts">
export default {}
</script>
