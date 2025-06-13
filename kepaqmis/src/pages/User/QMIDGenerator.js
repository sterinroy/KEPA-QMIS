const QMIDGenerator = () => {
  const year = new Date().getFullYear();
  const storageKey = `kepa_id_counter_${year}`;
  let count = parseInt(localStorage.getItem(storageKey)) || 0;

  if (count >= 26 * 9999) {
    throw new Error("QMID limit for the year reached");
  }

  count += 1;
  localStorage.setItem(storageKey, count);

  const seriesLetter = String.fromCharCode(65 + Math.floor((count - 1) / 9999));
  const number = ((count - 1) % 9999) + 1;
  const paddedNumber = number.toString().padStart(4, '0');

  return `${seriesLetter}1${paddedNumber}/${year}/KEPA`;
};

export default QMIDGenerator;
