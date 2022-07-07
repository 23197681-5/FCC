function getValueByIndex(index) {
  switch (index) {
    case 0:
      return 0.01;
    case 1:
      return 0.05;
    case 2:
      return 0.1;
    case 3:
      return 0.25;

    case 4:
      return 1;

    case 5:
      return 5;
    case 6:
      return 10;
    case 7:
      return 20;

    case 8:
      return 100;

    // default:
    // code block
  }
}

function checkCashRegister(price, cash, cid) {
  let index = 8;
  let value = cash - price;
  let change = [
    ['PENNY', 0], // 0
    ['NICKEL', 0], // 1
    ['DIME', 0], // 2
    ['QUARTER', 0], // 3
    ['ONE', 0], // 4
    ['FIVE', 0], // 5
    ['TEN', 0], // 6
    ['TWENTY', 0], // 7
    ['ONE HUNDRED', 0],
  ];
  var totalSum = 0;
  let status;
  if (
    cash - price ==
    cid[0][1] +
      cid[1][1] +
      cid[2][1] +
      cid[3][1] +
      cid[4][1] +
      cid[5][1] +
      cid[6][1] +
      cid[7][1] +
      cid[8][1]
  ) {
    status = 'CLOSED';
    return { status: status, change: cid };
  }
  for (let i = 0; i < 8; i++) {
    if (getValueByIndex(i) > value) {
      break;
    }
    totalSum += cid[i][1];
    totalSum = Math.abs(Number(totalSum).toFixed(2));
    j = i;
  }
  if (totalSum < value) {
    return { status: 'INSUFFICIENT_FUNDS', change: [] };
  }
  status = 'OPEN';
  while (index >= 0 && value != 0.0) {
    while (cid[index][1] - getValueByIndex(index) >= 0 && value - getValueByIndex(index) >= 0) {
      value -= getValueByIndex(index);
      cid[index][1] -= getValueByIndex(index);
      value = Number(value).toFixed(2);
      change[index][1] += getValueByIndex(index);
    }
    index--;
  }

  // return change;
  if (value > 0) {
    return { status: 'INSUFFICIENT_FUNDS', change: [] };
  }
  for (let i = 0; i < change.length; i++) {
    change[i][1] = Math.abs(Number(change[i][1]).toFixed(2));
    if (change[i] && change[i][1] == 0) {
      change.splice(i, 1);
      // if (i > 0) {
      i--;
      // }
    } // 2nd parameter means remove one item only
  }
  return { status: status, change: change.reverse() };
}

describe('Test cash', () => {
  it('Should return the correct money change', async () => {
    const result = checkCashRegister(3.26, 100, [
      ['PENNY', 1.01],
      ['NICKEL', 2.05],
      ['DIME', 3.1],
      ['QUARTER', 4.25],
      ['ONE', 90],
      ['FIVE', 55],
      ['TEN', 20],
      ['TWENTY', 60],
      ['ONE HUNDRED', 100],
    ]);
    expect(result).toStrictEqual({
      status: 'OPEN',
      change: [
        ['TWENTY', 60],
        ['TEN', 20],
        ['FIVE', 15],
        ['ONE', 1],
        ['QUARTER', 0.5],
        ['DIME', 0.2],
        ['PENNY', 0.04],
      ],
    });
  });
});
