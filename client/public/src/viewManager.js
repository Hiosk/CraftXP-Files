import { table } from "../appApi.js"

export default class ViewManager {
  constructor() { 
    this.tbody = $('#tbody')
    this.newFileBtn = document.getElementById('newFileBtn')
    this.fileElem = document.getElementById('fileElem')
    this.progressModal = $('#progressModal')
    this.progressBar = document.getElementById('progressBar')
    this.output = document.getElementById('output')

    this.formatter = new Intl.DateTimeFormat('pt', {
      locale: 'pt-br',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })

    this.modalInstance = {}
  }

  configureModal() {
    this.modalInstance = this.progressModal
  }

  openModal() {
    this.modalInstance.modal('show')
  }

  closeModal() {
    this.modalInstance.modal('hide')
  }

  updateStatus(size) {
    this.output.innerHTML = `Uploading in <b>${Math.floor(size)}%</b>`
    this.progressBar.value = size
  }

  configureOnFileChange(fn) {
    this.fileElem.onchange = (e) => fn(e.target.files)
  }

  configureFileBtnClick() {
    this.newFileBtn.onclick = () => this.fileElem.click()
  }
  
  getIcon(file) {
    return file.match(/\.mp4/i) ? 'movie'
      : file.match(/\.jp|png/i) ? 'image' : 'content_copy'
  }

  makeIcon(file) {
    const icon = this.getIcon(file)
    const colors = {
      image: 'yellow600',
      movie: 'red600',
      file: ''
    }

    return `
      <i class="material-icons ${colors[icon]} left">${icon}</i>
    `
  } 

  updateCurrentFiles(files) {
    console.log(table)
    for (var item of files) {
      table.row.add([
        this.makeIcon(item.file) + item.file,
        item.owner,
        item.size,
        this.formatter.format(new Date(item.lastModified)),
        this.formatter.format(new Date(item.lastModified)),
        `<svg class='deletar' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2 table-cancel"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>`
      ]
      ).draw().node();;
    }
  }
}