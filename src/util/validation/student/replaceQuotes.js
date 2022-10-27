const replaceQuotes = (title, answer) => {
  title = title.replace(/\"/g, "'");
  answer = answer.replace(/\"/g, "'");

  return { title, answer };
};

export default replaceQuotes;
