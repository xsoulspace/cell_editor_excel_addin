import { getExcelContext } from '@/modules/ExcelContext'
import { createStore } from 'vuex'
const state = {
  value: '',
  log: '',
  wrapText: false,
}

const getters = {
  getValue: (state: any) => {
    return state.value
  },
  getLog: (state: any) => {
    return state.log
  },
  getWrapText: (state: any) => {
    return state.wrapText
  },
}

const mutations = {
  setValue: function(state: any, value: any) {
    state.value = value
  },
  setLog: function(state: any, value: any) {
    state.log = value
  },
  setWrapText: function(state: any, value: any) {
    state.wrapText = value
  },
}

async function getExcelValue(event: any) {
  const pValue = Excel.run(context => {
    const activeCell = context.workbook.getSelectedRange()
    activeCell.load('values')
    return context.sync().then(() => {
      return activeCell.values
    })
  })
  return pValue
}
async function getExcelWrapText(event: any) {
  const context = await getExcelContext()
  const activeCell = context.workbook.getSelectedRange()
  activeCell.load(['format', 'wrapText'])
  await context.sync()
  const pValue = activeCell.format.wrapText

  return pValue
}

const actions = {
  async setECellWrapText({ commit }: { commit: any }, event: any) {
    commit('setWrapText', await getExcelWrapText(event))
  },
  async setECellValue({ commit }: { commit: any }, event: any) {
    commit('setValue', await getExcelValue(event))
  },
  async setLog({ commit }: { commit: any }, value: any) {
    commit('setLog', await value)
  },
}

export default createStore({
  state,
  mutations,
  actions,
  modules: {},
})
