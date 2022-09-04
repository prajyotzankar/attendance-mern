const RandomPasswordGenerator = () => {
  const keys = {
    upperCase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowerCase: "abcdefghijklmnopqrstuvwxyz",
    number: "0123456789",
    symbol: "!@#$%^&*()_+<>?",
  };

  const getKey = [
    function upperCase() {
      return keys.upperCase[Math.floor(Math.random() * keys.upperCase.length)];
    },
    function lowerCase() {
      return keys.lowerCase[Math.floor(Math.random() * keys.lowerCase.length)];
    },
    function number() {
      return keys.number[Math.floor(Math.random() * keys.number.length)];
    },
    function symbol() {
      return keys.symbol[Math.floor(Math.random() * keys.symbol.length)];
    },
  ];

  let password = "";
  let reqPasswordLength = 15;
  const regex = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])(?=\S*?[!@#$%^&*()_+<>?]).{10,20})\S$/;
  while (!regex.test(password)) {
    password = "";
    reqPasswordLength = Math.floor(Math.random() * 6 + 15);
    while (reqPasswordLength > password.length) {
      let keyToAdd = getKey[Math.floor(Math.random() * getKey.length)];
      password += keyToAdd();
    }
  }

  return password;
};

export default RandomPasswordGenerator;
