/**
 * 1) Crea una Google Sheet nueva (en blanco).
 * 2) Extensiones → Apps Script
 * 3) Borra lo que haya y pega TODO este archivo
 * 4) Guardar → Implementar → Nueva implementación
 *    - Tipo: Aplicación web
 *    - Ejecutar como: Yo
 *    - Quién tiene acceso: Cualquier persona
 * 5) Copiar la URL que termina en /exec y pégamela en el chat
 */

var SHEET_NAME = 'reservas'

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  var sheet = ss.getSheetByName(SHEET_NAME)
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME)
    sheet.appendRow(['id', 'gift_id', 'reserved_by', 'created_at'])
  }
  return sheet
}

function doGet() {
  var sheet = getSheet_()
  var values = sheet.getDataRange().getValues()
  var rows = []
  for (var i = 1; i < values.length; i++) {
    if (!values[i][0]) continue
    rows.push({
      id: String(values[i][0]),
      gift_id: String(values[i][1]),
      reserved_by: String(values[i][2]),
      created_at: String(values[i][3]),
    })
  }
  return json_(rows)
}

function doPost(e) {
  var body = {}
  try {
    body = JSON.parse((e && e.postData && e.postData.contents) || '{}')
  } catch (err) {
    return json_({ error: 'JSON inválido' }, 400)
  }

  var action = body.action || 'reserve'
  var sheet = getSheet_()

  if (action === 'reserve') {
    var id = Utilities.getUuid()
    var created = new Date().toISOString()
    sheet.appendRow([id, body.gift_id, body.reserved_by, created])
    return json_({
      id: id,
      gift_id: body.gift_id,
      reserved_by: body.reserved_by,
      created_at: created,
    })
  }

  if (action === 'release') {
    var data = sheet.getDataRange().getValues()
    for (var i = data.length - 1; i >= 1; i--) {
      if (String(data[i][0]) === String(body.id)) {
        sheet.deleteRow(i + 1)
      }
    }
    return json_({ ok: true })
  }

  return json_({ error: 'Acción desconocida' }, 400)
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  )
}
