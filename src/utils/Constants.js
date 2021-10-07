const Constants = {
  timeSlot: { start: '0:00 AM', end: '0:00 AM' },
  awaitTime: 600,
  binsNeededLimit: 2,
  orderIdLimit: 20,
  binPositionLimit: 4,
  outOfStockLimit: 2,
  criticalStockLimit: 3,
  defaultCriticalValue: 0,
  DAY_MAX: 864000,
  MINUTES_MS: 60000,
  SECONDS_MS: 1000,
  paddedZeros: '00',
  timerUpperLimit: '>24',
  emptyPosition: 'Position missing',
  emptyDepartment: 'Department missing',
  emptyItemName: 'Item name missing',
  emptyOrderId: 'Order id missing',
  emptyEmail: 'Email missing',
  emptySku: 'item sku empty',
};

export default Constants;
