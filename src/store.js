import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)

const state ={
  value: "",
  log: "",
  wrapText: false,
}

const getters = {
  getValue: (state)=>{
    return state.value
  },
  getLog: (state)=>{
    return state.log
  },
  getWrapText: (state)=>{
    return state.wrapText
  }
}

const mutations = {
  setValue: function(state, value){
    state.value = value
  },
  setLog: function(state, value){
    state.log = value
  },
  setWrapText: function(state, value){
    state.wrapText = value
  }
}

async function getExcelValue(event){
  const pValue = Excel.run(context => {
    const activeCell = context.workbook.getSelectedRange();
    activeCell.load("values");
    return context.sync().then(()=>{
      return activeCell.values;
    })
  })
  return pValue;
}
async function getExcelWrapText(event){
  const pValue = Excel.run(context => {
    const activeCell = context.workbook.getSelectedRange();
    activeCell.load("format","wrapText");
    return context.sync().then(()=>{
      return activeCell.format.wrapText;
    })
  })
  return pValue;
}

const actions = {
  async setECellWrapText ({commit}, event){
    commit('setWrapText', await getExcelWrapText(event))
  },  
  async setECellValue ({commit}, event){
    commit('setValue', await getExcelValue(event))
  },
  async setLog ({commit}, value){
    commit('setLog', await value)
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})