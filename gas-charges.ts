// TARIFFS

const nonProtected_2023 = new Map([
  [0.25, 200],
  [0.6, 300],
  [1, 400],
  [1.5, 600],
  [2, 800],
  [3, 1100],
  [4, 2000],
  [Infinity, 3100]
])

const protected_2020 = new Map([
  [0.5, 121],
  [1, 300],
  [2, 553],
  [3, 738],
  [4, 1107],
  [Infinity, 1460]
])

const GCV = 980
const HM3 = 10.380

const calcMmbtu = (hm3: number) => (hm3 * GCV) / 281.7385;
const calcWgst = (charges: number) => (charges * 0.17 /* 17% gst */) + charges

function main(hm3: number, tariff: Map<number, number>) {
  let totalBill = 0
  let prev = [0, 0];

  for (let [key, val] of tariff) {
    if (hm3 < key) {
      let rem = hm3 - prev[0]
      totalBill += calcMmbtu(rem) * val

      hm3 -= rem

      totalBill += calcMmbtu(hm3) * prev[1]

      break;
    }

    prev = [key, val];
  }

  console.log(`\nApproximate Gas charges are: ${totalBill}\n\nWith GST: ${calcWgst(totalBill)}\n`)
}

main(HM3, nonProtected_2023);