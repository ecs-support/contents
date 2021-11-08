(() => {
  function toRegExp() {
    return new RegExp(text, "g");
  }

  function toSpan(text, className) {
    return '<span class="' + className + '">' + text + "</span>";
  }

 const input = "N";
 const text = document.querySelector("#table-ref");
const content = text.textContent;


    text.textContent = content;
    let string = e.target.value;

    if (string.length > 0) {
      text.innerHTML = text.textContent.replace(
        toRegExp(string),
        toSpan(string, "highlight")
      );
    }
  
})();
