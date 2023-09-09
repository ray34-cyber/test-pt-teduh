function encodeBaju(batasHargaJual, hargaJualIdeal, hargaDitawar) {
  const encoding = {
    T: 0,
    E: 1,
    D: 2,
    U: 3,
    H: 4,
    A: 5,
    S: 6,
    Y: 7,
    I: 8,
    K: 9,
  };

  const hargaJualminimum =
    parseInt(
      batasHargaJual
        .toString()
        .split("")
        .map((huruf) => encoding[huruf])
        .join("")
    ) * 1000;

  const hargajualmaximum =
    parseInt(
      hargaJualIdeal
        .toString()
        .split("")
        .map((huruf) => encoding[huruf])
        .join("")
    ) * 1000;

  if (hargaJualminimum > hargajualmaximum) {
    return false;
  }

  if (hargaDitawar > hargajualmaximum) {
    return false;
  }

  if (hargaDitawar < hargaJualminimum) {
    return "REJECT, belum balik modal nih!";
  } else if (
    hargaDitawar >= hargaJualminimum &&
    hargaDitawar < hargajualmaximum
  ) {
    return "ACCEPT, terima kasih sudah berbelanja";
  } else if (hargaDitawar == hargajualmaximum) {
    return "GOOD, customer terbaik gak pake nawar";
  }
}

console.log(encodeBaju("AT", "YH", 70000)); // “ACCEPT, terima kasih sudah berbelanja”
console.log(encodeBaju("ESH", "DTT", 150000)); // “REJECT, belum balik modal nih!”
console.log(encodeBaju("DET", "DHT", 250000)); //GOOD, customer terbaik gak pake nawar”
