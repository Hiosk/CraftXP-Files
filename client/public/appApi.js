import AppController from "./src/appController.js";
import ConnectionManager from "./src/connectionManager.js";
import DragAndDropManager from "./src/dragAndDropManager.js";
import ViewManager from "./src/viewManager.js";

const API_URL = 'https://localhost:3000'

const appController = new AppController({
  viewManager: new ViewManager(),
  //dragAndDropManager: new DragAndDropManager(),
  connectionManager: new ConnectionManager({
    apiUrl: API_URL
  })
})
export let table;
try {
  table = iniciarTabela()
  await appController.initialize()
} catch (error) {
  console.log(error)
}

function iniciarTabela() {
  var table = $("#file-search").DataTable({
    dom: "<'dt--top-section'<'row'<'col-12 col-sm-6 d-flex justify-content-sm-start justify-content-center'l><'col-12 col-sm-6 d-flex justify-content-sm-end justify-content-center mt-sm-0 mt-3'f>>>" +
      "<'table-responsive'tr>" +
      "<'dt--bottom-section d-sm-flex justify-content-sm-between text-center'<'dt--pages-count  mb-sm-0 mb-3'i><'dt--pagination'p>>",
    oLanguage: {
      oPaginate: {
        sPrevious: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>',
        sNext: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>',
      },
      sInfo: "Mostrando _PAGE_ de _PAGES_ paginas",
      sSearch: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',
      sSearchPlaceholder: "Buscar...",
      sLengthMenu: "Resultados :  _MENU_",
    },
    stripeClasses: [],
    lengthMenu: [5, 10, 20, 50],
    pageLength: 5,
  });
  // Event listener to the two range filtering inputs to redraw on input
  $("#min, #max").keyup(function () {
    table.draw();
  });
  return table;
}