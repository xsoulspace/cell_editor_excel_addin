export const getExcelContext = async (): Promise<Excel.RequestContext> => {
  const excelContext = Excel.run(async context => context)
  return excelContext
}
