export const PICKING_EVENT_CONSTANTS = {
  CLAIM_IN_WAREHOUSE: {
    'code': 'REB',
    'title': 'Reclama',
    'description': 'Reclama en la Bodega',
    'color' : 'bg-alert-claim'
  },
  NO_CARRIER: {
    'code': 'FTA',
    'title': 'Sin transporte',
    'description': 'Falta la transportadora',
    'color' : 'bg-alert-error'
  },
  NO_FREIHT: {
    'code': 'NFT',
    'title': 'Sin flete',
    'description': 'Falta el flete',
    'color' : 'bg-alert-error'
  },
  NO_STOCK: {
    'code': 'SSK',
    'title': 'Sin stock',
    'description': 'No hay suficiente porducto.',
    'color' : 'bg-alert-error'
  },
  NO_CITY: {
    'code': 'NCT',
    'title': 'Error Ciudad',
    'description': 'Ciudad incorrecta.',
    'color' : 'bg-alert-error'
  },
  NO_VALID_PARTNER: {
    'code': 'NVP',
    'title': 'Contacto inválido',
    'description': 'Contacto inválido',
    'color' : 'bg-alert-error'
  },
  CANCELED: {
    'code': 'CLD',
    'title': 'Cancelado',
    'description': 'Transferencia cancelada.',
    'color' : 'bg-alert-canceled'
  },
  NO_VALID_ADDRESS: {
    'code': 'NVA',
    'title': 'Error dirección',
    'description': 'Error en la dirección.',
    'color' : 'bg-alert-error'
  },
  DELIVERED_TO_WAREHOUSE: {
    'code': 'DTW',
    'title': 'Entregado a bodega',
    'description': 'Orden entregada a la bodega.',
    'color' : 'bg-alert-delivered-1'
  },
  PACKED: {
    'code': 'PKD',
    'title': 'Empacado',
    'description': 'Producto empacado.',
    'color' : 'bg-alert-packed'
  },
  DISPATCHED: {
    'code': 'DPC',
    'title': 'En transito',
    'description': 'Producto despachado.',
    'color' : 'bg-alert-dispatched'
  },
  DELIVERED: {
    'code': 'DLD',
    'title': 'Entregado',
    'description': 'Transferencia completada.',
    'color' : 'bg-alert-delivered-2'
  },
  BLU_FAIL: {
    'code': 'FEB',
    'title': 'Falla Entrega',
    'description': 'Falla entrega bodega.',
    'color' : 'bg-alert-canceled'
  },
  NO_CREDIT: {
    'code': 'SCD',
    'title': 'Sin crédito',
    'description': 'Credito disponible insuciciente.',
    'color' : 'bg-alert-error'
  },
}

export function getEventByCode(code) {
  switch (code) {
    case PICKING_EVENT_CONSTANTS.CLAIM_IN_WAREHOUSE.code:
      return PICKING_EVENT_CONSTANTS.CLAIM_IN_WAREHOUSE
    case PICKING_EVENT_CONSTANTS.NO_CARRIER.code:
      return PICKING_EVENT_CONSTANTS.NO_CARRIER
    case PICKING_EVENT_CONSTANTS.NO_STOCK.code:
      return PICKING_EVENT_CONSTANTS.NO_STOCK
    case PICKING_EVENT_CONSTANTS.NO_VALID_PARTNER.code:
      return PICKING_EVENT_CONSTANTS.NO_VALID_PARTNER
    case PICKING_EVENT_CONSTANTS.CANCELED.code:
      return PICKING_EVENT_CONSTANTS.CANCELED
    case PICKING_EVENT_CONSTANTS.NO_VALID_ADDRESS.code:
      return PICKING_EVENT_CONSTANTS.NO_VALID_ADDRESS
    case PICKING_EVENT_CONSTANTS.DELIVERED_TO_WAREHOUSE.code:
      return PICKING_EVENT_CONSTANTS.DELIVERED_TO_WAREHOUSE
    case PICKING_EVENT_CONSTANTS.PACKED.code:
      return PICKING_EVENT_CONSTANTS.PACKED
    case PICKING_EVENT_CONSTANTS.DISPATCHED.code:
      return PICKING_EVENT_CONSTANTS.DISPATCHED
    case PICKING_EVENT_CONSTANTS.DELIVERED.code:
      return PICKING_EVENT_CONSTANTS.DELIVERED
    case PICKING_EVENT_CONSTANTS.BLU_FAIL.code:
      return PICKING_EVENT_CONSTANTS.BLU_FAIL
    case PICKING_EVENT_CONSTANTS.NO_FREIHT.code:
      return PICKING_EVENT_CONSTANTS.NO_FREIHT
    case PICKING_EVENT_CONSTANTS.NO_CREDIT.code:
      return PICKING_EVENT_CONSTANTS.NO_CREDIT
    case PICKING_EVENT_CONSTANTS.NO_CITY.code:
      return PICKING_EVENT_CONSTANTS.NO_CITY
    default: return null
  }


}
