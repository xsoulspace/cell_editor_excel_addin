<template>
<div>
<nav class="nav">

  <div class="tabs is-centered is-boxed">
    <ul>
      <li :class="{'is-active':isEditorEnabled}" @click="isEditorEnabled = true"><a>WYSIWYG</a></li>
      <li :class="{'is-active':!isEditorEnabled}" @click="isEditorEnabled = false"><a>Поле ввода</a></li>
      <li @click="isSettingsActive = true">
        <a>
          <span class="icon is-small"><i class="fas fa-sliders-h" aria-hidden="true"></i></span>
          <span></span>
        </a>
      </li>
    </ul>
  </div>
</nav>

<div class="is-fullsize">
  <p v-show="isLogExists">{{computedlog}}</p>
  <editor v-if="isEditorEnabled" v-model="cellText"></editor>
  <textarea class="textearea" v-show="!isEditorEnabled" name="text" rows="1" v-model="cellText" placeholder="Some cell text.."> </textarea>
</div>
<div :class="{'is-active':isSettingsActive}" class="modal">
  <div @click="isSettingsActive = false" class="modal-background"></div>
  <div @click.stop class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Настройки</p>
      <button @click="isSettingsActive = false" class="delete" aria-label="close"></button>
    </header>
    <section class="modal-card-body">
      <div class="field">
        <label class="checkbox">
          <input v-model="wrapText" type="checkbox">
          Перенос строки
        </label>
      </div>
      <!-- <div class="field">
        <label class="checkbox">
          <input v-model="isEditorEnabled" type="checkbox">
          Использовать WYSIWYG(html) редактор 
        </label>
      </div> -->
    </section>
    <footer class="modal-card-foot">
      <button @click="modalApplyHandler" class="button is-success">Применить</button>
      <button @click="isSettingsActive = false" class="button">Отменить</button>
    </footer>
  </div>
  <!-- <button @click="isSettingsActive = false" class="modal-close is-large" aria-label="close"></!--> -->
</div>
</div>

</template>

<script>
import Vue from "vue";
import Editor from "./Editor";
export default {
  name: "app",
  components: {
    Editor
  },
  data() {
    return {
      isSettingsActive: false,
      isEditorEnabled: true
    };
  },
  mounted: function(){
    const self = this;
    Excel.run(context => {
      context.workbook.onSelectionChanged.add(self.loadExcelValues)
      return context.sync()
    })
  },
  computed: {
    wrapText: {
      set: function(value){
        this.$store.commit('setWrapText',value);
      },
      get: function(){
        return this.$store.getters['getWrapText'];;
      }  
    },
    isLogExists: function(){
      var value;
      this.computedlog != "" ? value=true : value=false
      return value
    },
    computedlog: {
      set: function(value){
        this.$store.dispatch('setLog',value);
      },
      get: function(){
        return this.$store.getters['getLog'];
      }
    },
    cellText: {
      set: function(value){
        //https://www.npmjs.com/package/quill-delta-to-html
        this.saveExcelValues(value);
      },
      get: function(){
        const text = this.$store.getters['getValue'];
        return text
      }
    }
  },
  methods: {
    modalApplyHandler: function(){
      this.saveExcelCellFormat();
      this.isSettingsActive = false;
    },
    loadExcelValues: function(event){
      var self = this;
      return Excel.run(context=>{
        self.$store.dispatch('setECellValue', event);
        self.$store.dispatch('setECellWrapText', event);
        return context.sync()
      })
      
    },
    saveExcelCellFormat: function(){
      var self = this;
      Excel.run(async context => {
        let activeCell = context.workbook.getSelectedRange();
        activeCell.format.wrapText = self.wrapText;
        return context.sync()
      })
    },
    saveExcelValues: function(value){
      var self = this;
      Excel.run(async context => {
        let activeCell = context.workbook.getSelectedRange();
        activeCell.values = [[value]];
        activeCell.format.wrapText = self.wrapText;
        return context.sync()
      })
    },
    log:function(value){
      this.computedlog = value
    }
  }
};
</script>

<style lang="scss">

.nav {
  margin-top: 2px;
  margin-right: auto;
  height: 5vh;
}
.nav > .settings {
  position: absolute;
  left: 10px
}

.is-fullsize {
  margin: 10px;
  padding-top: 10px;
  box-sizing: border-box;
}
.is-fullsize>textarea {
  box-sizing: border-box;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 13px;
  margin: 0px;
  position: relative;
  height: 86vh;
  width: 97%;
  border: 1px solid #ccc;
  line-height: 1.42;
  overflow-y: auto;
  padding: 12px 15px;
  tab-size: 4;
  -moz-tab-size: 4;
  text-align: left;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
