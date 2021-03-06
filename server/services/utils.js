function dateToYMD(date) {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return (dateString = year + "-" + month + "-" + day);
}

function getDateRange(from = Date(), to = Date()) {
  from = new Date(from);
  to = new Date(to);
  fromYMD = dateToYMD(from) + " 00:00:00";
  toYMD = dateToYMD(to) + " 23:59:59";
  return [fromYMD, toYMD];
}

function isNicknameValid(nickname) {
  if (nickname.length < 3 || nickname.length > 15) return null;
  res = nickname.match(/^[0-9a-z]+$/);
  return res;
}

module.exports = {
  getDateRange,
  dateToYMD,
  isNicknameValid,
};
