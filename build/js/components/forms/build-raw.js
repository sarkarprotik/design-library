"use strict";

window.flysasLibrary = window.flysasLibrary || {};

flysasLibrary.forms = flysasLibrary.forms || function (window, document) {
  function getParents(elem, className) {
    if (!elem) {
      return;
    }

    if (elem.classList.contains(className)) {
      return elem;
    }

    while (elem.parentElement) {
      elem = elem.parentElement;

      if (elem.classList && elem.classList.contains(className)) {
        return elem;
      }
    }

    return;
  }

  function flysasForm(formElem, callback) {
    var isInitialized;

    function listBox(comboBoxElem) {
      var inputElem = comboBoxElem.querySelector("input");
      var listBoxElem = comboBoxElem.querySelector(".input-listbox");
      var formFieldCol = getParents(inputElem, "col-form-field");
      var sasInput = getParents(inputElem, "sas-input");
      var listBoxSrc = listBoxElem.getAttribute("data-items-source");
      var listBoxData = listBoxSrc && flysasLibrary.pageData ? flysasLibrary.pageData[listBoxSrc] || [] : [];
      var listBoxPreselect = listBoxElem.getAttribute("data-preselect");
      var listItemElems;
      var searchValue;
      var selectedItem;
      var itemIndex = 0;
      var selectedClassName = "chosen";
      comboBoxElem.setAttribute("aria-expanded", false);

      function selectFilterItem() {
        itemIndex = 0;
        var dataItem = (selectedItem || {}).dataItem;

        if (dataItem) {
          inputElem.value = dataItem.value2 || dataItem.value1;
          inputElem.setAttribute("aria-activedescendant", "");

          if (callback) {
            callback(inputElem, dataItem);
          }

          if (sasInput) {
            sasInput.classList.add("focused");
          }
        } else if (sasInput) {
          sasInput.classList.remove("focused");
        }

        toggleFilter(false);
      }

      function stepInFilter() {
        if (!listItemElems || listItemElems.length === 0) {
          itemIndex = 0;
          inputElem.setAttribute("aria-activedescendant", "");
          return;
        }

        if (itemIndex < 0) {
          itemIndex = listItemElems.length - 1;
        } else if (itemIndex >= listItemElems.length) {
          itemIndex = 0;
        }

        for (var i = 0; i < listItemElems.length; i++) {
          listItemElems[i].classList.remove(selectedClassName);
        }

        if (itemIndex > -1) {
          listItemElems[itemIndex].classList.add(selectedClassName);
          inputElem.setAttribute("aria-activedescendant", listItemElems[itemIndex].id);
          selectedItem = listItemElems[itemIndex];
        }
      }

      function clearFilter() {
        while (listBoxElem.hasChildNodes()) {
          listBoxElem.removeChild(listBoxElem.lastChild);
        }

        listItemElems = undefined;
        toggleFilter(false);
      }

      function toggleFilter(isVisible) {
        comboBoxElem.setAttribute("aria-expanded", isVisible);
      }

      function filterData(event) {
        if (listBoxElem && listBoxElem.scrollTo) {
          listBoxElem.scrollTo(0, 0);
        }

        if (event.keyCode === 37 || event.keyCode === 39 || event.keyCode === 91) {
          return true;
        } else if (event.keyCode === 40) {
          itemIndex++;
          stepInFilter();
        } else if (event.keyCode === 38) {
          itemIndex--;
          stepInFilter();
        } else if (event.keyCode === 10 || event.keyCode === 13 || event.keyCode === 9) {
          selectFilterItem();
          inputElem.blur();
          clearTimeout(blurTimer);
          return false;
        } else {
          searchValue = inputElem.value.trim();
          clearFilter();
          var hits = [];

          for (var i = 0; i < listBoxData.length; i++) {
            var item = listBoxData[i];

            if (item.value1 && new RegExp(searchValue, "gi").test(item.value1)) {
              hits.push(item);
            } else if (item.value2 && new RegExp(searchValue, "gi").test(item.value2)) {
              hits.push(item);
            }
          }

          for (var i = 0; i < hits.length; i++) {
            var item = hits[i];
            var li = document.createElement("li");
            li.id = listBoxElem.id + "-item-" + i;
            li.className = "city-listbox-item" + (i === 0 ? " " + selectedClassName : "");

            if (item.value1 && item.value1 !== item.value2) {
              var span1 = document.createElement("span");
              span1.className = "value-1";
              span1.insertAdjacentHTML("beforeend", item.value1);
              li.appendChild(span1);
            }

            if (item.value2) {
              var span2 = document.createElement("span");
              span2.className = "value-2";
              span2.insertAdjacentHTML("beforeend", item.value2);
              li.appendChild(span2);
            }

            li.dataItem = item;
            listBoxElem.appendChild(li);
          }

          listItemElems = listBoxElem.querySelectorAll("li");
          toggleFilter(hits.length > 0);

          if (hits.length > 0 && searchValue) {
            selectedItem = listItemElems[0];
          }
        }
      }

      inputElem.addEventListener("keydown", function (event) {
        if (event.keyCode === 10 || event.keyCode === 13) {
          event.preventDefault();
        }

        return true;
      });
      inputElem.addEventListener("keyup", function (event) {
        if (event.keyCode !== 9) {
          filterData(event);
        }
      });
      var blurTimer = null;
      inputElem.addEventListener("blur", function (event) {
        blurTimer = setTimeout(function () {
          selectFilterItem();
        }, 250);
      });
      inputElem.addEventListener("focus", function (event) {
        if (this.getAttribute("readonly") === "") {
          return;
        }

        this.value = "";
        filterData({
          keyCode: 0
        });
      });
      listBoxElem.addEventListener("click", function (event) {
        clearTimeout(blurTimer);
        selectedItem = getParents(event.target, "city-listbox-item");
        selectFilterItem();
      });

      if (listBoxData) {
        if (listBoxPreselect) {
          for (var i = 0; i < listBoxData.length; i++) {
            var item = listBoxData[i];
            var itemText = item.value2 || item.value1 || "";
            var itemCode = item.value3 || "";

            if (itemText.replace(/\s/gi, "").toLowerCase() === listBoxPreselect.toLowerCase() || itemCode.toLowerCase() === listBoxPreselect.toLowerCase()) {
              selectedItem = {
                dataItem: item
              };
              break;
            }
          }
        }

        if (!selectedItem) {
          selectedItem = {
            dataItem: listBoxData[0]
          };
        }

        selectFilterItem();
      }

      return {
        filterData: filterData
      };
    }

    function init() {
      if (!formElem || isInitialized) {
        return;
      }

      callback = formElem.callback || callback;
      var activeTimer;

      function setActive(isActive) {
        clearTimeout(activeTimer);
        activeTimer = setTimeout(function () {
          formElem.classList.toggle("active", isActive);
          activeTimer = null;
        }, 100);
      }

      function setFocused(formFieldCol, isFocused) {
        var formFieldElem = formFieldCol.querySelector("label");
        formFieldCol.classList.toggle("focused", isFocused);
        setActive(isFocused);
      }

      var inputs = formElem.querySelectorAll(".col-form-field input, .col-form-field select, .sas-input input, .sas-input select, .sas-input textarea");

      function validate(event) {
        this.value = this.value.trim();
        var value = this.value || "";
        var validationRegExp = this.getAttribute("data-validation");
        var sasInput = getParents(this, "sas-input");
        var messageElem = sasInput.querySelector(".message");
        var hasInvalidValue = validationRegExp && !new RegExp(validationRegExp, "gi").test(value);
        var hasMessage = value === "" && messageElem && messageElem.innerText !== "";

        if (!hasMessage && validationRegExp) {
          hasMessage = validationRegExp && hasInvalidValue;
        }

        if (this.listBox) {
          setActive(false);
          return;
        }

        if (value === "" && !isReadonly) {
          setFocused(sasInput, false);
        } else {
          setActive(false);
        }

        if (hasMessage) {
          sasInput.classList.add("invalid");
          return false;
        }

        return true;
      }

      for (var i = 0; i < inputs.length; i++) {
        var inputBehavior = inputs[i].getAttribute("data-behavior");
        var inputElem = inputs[i];
        var containerElem = getParents(inputElem, "form-field");
        var isComboboxElem = containerElem && containerElem.classList.contains("form-combobox");
        var isReadonly = inputElem.hasAttribute("readonly");
        inputElem.validate = validate;
        inputElem.addEventListener("blur", validate);
        inputElem.addEventListener("focus", function (event) {
          event.stopPropagation();
          var parentInput = getParents(this, "sas-input");
          parentInput.classList.remove("invalid");
          setFocused(parentInput, true);
        });

        if (isComboboxElem) {
          inputElem.listBox = new listBox(containerElem, callback);
        }
      }

      isInitialized = inputs.length > 0;
    }

    init();
  }

  function init() {
    for (var i = 0; i < document.querySelectorAll("form").length; i++) {
      var formElem = document.querySelectorAll("form")[i];
      new flysasForm(formElem, function (elem, data) {
        console.log(elem);
        console.log(data);
      });
    }
  }

  init();
  return {
    init: init
  };
}(window, document);