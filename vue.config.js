module.exports = {
  productionSourceMap: false,
  publicPath:
    process.env.NODE_ENV === 'production' ? '/cell_editor_excel_addin/' : '/',
}
