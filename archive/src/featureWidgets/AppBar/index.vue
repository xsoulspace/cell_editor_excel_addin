<template lang="pug">
div.header 
    div.tabs(
        is-centered is-boxed
        )
    
        div.tabs_tab.button(
            :class="{'is-active': isEditorEnabled }"
            @click="isEditorEnabled = true"
            ) WYSIWYG
            
        
        div.tabs_tab.button(
            :class="{ 'is-active': !isEditorEnabled }"
            @click="isEditorEnabled = false"
            ) Ввод
    

        div.tabs_tab.button(
            @click="isSettingsActive = true"
            ) Настройки
            span.icon
            i.fas.fa-sliders-h

        div.tabs_tab.button Info    
            span.icon.is-small
            i.fas.fa-sliders-h
</template>
<script>
export default {}
</script>
