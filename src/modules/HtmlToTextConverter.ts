interface ReplaceRule {
  regExp: RegExp
  replaceTo: string
}

export class HtmlToTextCoverter {
  /**
   * @source https://stackoverflow.com/a/14216406/9908821
   * @param param0
   */
  static getIsHtmlValid({ html }: { html: string }) {
    const temp = document.createElement('div')
    temp.innerHTML = html
    const isHtmlValid = temp.innerHTML === html
    temp.remove()
    return isHtmlValid
  }
  /**
   * @source https://stackoverflow.com/a/20071776/9908821
   * @param param0
   */
  private static _toTextManually({ html }: { html: string }) {
    const isHtml = this.getIsHtmlValid({ html })
    if (!isHtml) return html
    const rules: ReplaceRule[] = [
      { replaceTo: '', regExp: /<style([\s\S]*?)<\/style>/gi },
      { replaceTo: '', regExp: /<script([\s\S]*?)<\/script>/gi },
      { replaceTo: '\n', regExp: /<\/div>/gi },
      { replaceTo: '\n', regExp: /<\/li>/gi },
      { replaceTo: '  *  ', regExp: /<li>/gi },
      { replaceTo: '\n', regExp: /<\/ul>/gi },
      { replaceTo: '\n', regExp: /<\/p>/gi },
      // eslint-disable-next-line
      { replaceTo: '\n', regExp: /<br\s*[\/]?>/gi },
      { replaceTo: '', regExp: /<[^>]+>/gi },
    ]
    let text = html.slice()
    for (const rule of rules) {
      text = text.replaceAll(rule.regExp, rule.replaceTo)
    }
    return text
  }
  static toText(arg: { html: string }) {
    return this._toTextManually(arg)
  }

  private static _toTextByDom({ html }: { html: string }) {
    const isHtml = this.getIsHtmlValid({ html })
    if (!isHtml) return html

    const temp = document.createElement('div')
    temp.innerHTML = html
    const text = temp.textContent || temp.innerText || ''
    temp.remove()
    return text
  }
  static toHtmlManually({ text }: { text: string }) {
    const formattedHtml =
      '<p>' +
      text.replaceAll(/\n([ \t]*\n)+/g, '</p><p>').replace('\n', '<br />') +
      '</p>'
    return formattedHtml
  }
  static toHtml({ text }: { text: string }) {
    const isHtml = this.getIsHtmlValid({ html: text })
    if (isHtml) return text

    const temp = document.createElement('div')

    const html = temp.innerHTML || ''
    temp.remove()

    return html
  }
}
