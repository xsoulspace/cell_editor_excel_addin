<template lang="pug">
div
  SheetsWidget
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { featureWidgets } from '@/router/featureWidgetsRouter'
const { SheetsWidget } = featureWidgets.widgets

@Options({
  components: { SheetsWidget },
})
export default class Home extends Vue {}
</script>
