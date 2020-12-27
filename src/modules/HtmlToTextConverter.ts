export class HtmlToTextCoverter {
  static toText({ html }: { html: string }) {
    const temp = document.createElement('div')
    temp.innerHTML = html

    const text = temp.textContent || temp.innerText || ''
    temp.remove()
    return text
  }
  static toHtml({ text }: { text: string }) {
    const temp = document.createElement('div')
    temp.textContent = text

    const html = temp.innerHTML || ''
    temp.remove()

    return html
  }
}
