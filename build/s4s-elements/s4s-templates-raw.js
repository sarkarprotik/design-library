window.s4s = window.s4s || {}
window.s4s.templates = (function(window, document) {
  return {
    formField: `
      <label class="form-field" element="formField">
        <span class="label" element="label"></span>
      </label>
      <span class="message" element="message"></span>
    `,
    comboBox: `
      <label id="" role="combobox" aria-expanded="false" aria-owns="" aria-haspopup="listbox" class="form-field" element="formField">
        <span id="" class="label" element="label"></span>
        <input id="" type="text" name="" element="input">
      </label>
      <span class="message" element="message"></span>
      <ul id="" aria-labelledby="" role="listbox" element="listbox" hidden></ul>
    `,
    comboBoxListItem: `
      <li>
        <button element="button" tabindex="-1">
          <div>
            <span element="city-airport"></span>
            <span class="block-item" element="country"></span>
          </div>
          <strong element="airport-code"></strong>
        </button>
      </li>
    `,
    custom: {
      input: `
        <label class="form-field" element="formField">
          <span class="label" element="label"></span>
          <input id="" type="text" name="" element="input">
        </label>
        <div class="form-custom" element="custom" hidden></div>
      `,
      pax: `
        <div element="pax">
          <div class="pax-type">
            <span element="adults" data-min="1"></span>
            <div class="calculator">
              <button data-type="adults" data-inc="-1" tabindex="-1">-</button>
              <span element="adults-count">1</span>
              <button data-type="adults" data-inc="1" tabindex="-1">+</button>
            </div>
          </div>
          <div class="pax-type">
            <span element="children" data-min="0"></span>
            <div class="calculator">
              <button data-type="children" data-inc="-1" tabindex="-1">-</button>
              <span element="children-count">0</span>
              <button data-type="children" data-inc="1" tabindex="-1">+</button>
            </div>
          </div>
          <div class="pax-type">
            <span element="infants" data-min="0"></span>
            <div class="calculator">
              <button data-type="infants" data-inc="-1" tabindex="-1">-</button>
              <span element="infants-count">0</span>
              <button data-type="infants" data-inc="1" tabindex="-1">+</button>
            </div>
          </div>
        </div>
      `
    },
    datePicker: {
      input: `
        <label class="form-field" element="formField">
          <span class="label" element="label"></span>
          <input id="" type="text" name="" element="input">
        </label>
        <div class="form-calendar" element="calendar" hidden></div>
      `,
      tablesWrap: `
        <div class="table-calendar" element="outbound-wrap">
          <table element="outbound"></table>
        </div>
        <div class="table-calendar" element="inbound-wrap">
          <table element="inbound"></table>
        </div>
      `,
      table: `
        <thead>
          <tr>
            <th colspan="7" element="type"></th>
          </tr>
          <tr>
            <th><button class="btn-prev" element="prev-month" tabindex="-1"></button></th>
            <th class="month-header" colspan="5" element="month-name"></th>
            <th><button class="btn-next" element="next-month" tabindex="-1"></button></th>
          </tr>
          <tr>
            <th>M</th>
            <th>T</th>
            <th>O</th>
            <th>T</th>
            <th>F</th>
            <th>L</th>
            <th>S</th>
          </tr>
        </thead>
        <tbody element="body"></tbody>
      `,
      week: `
        <tr>
          <td><button tabindex="-1"></button></td>
          <td><button tabindex="-1"></button></td>
          <td><button tabindex="-1"></button></td>
          <td><button tabindex="-1"></button></td>
          <td><button tabindex="-1"></button></td>
          <td><button tabindex="-1"></button></td>
          <td><button tabindex="-1"></button></td>
        </tr>
      `
    },
    modal: `
      <div class="flysas modal open" role="dialog" aria-modal="true" element="modal">
        <div class="modal-content">
          <h1 class="h2 modal-title" element="heading"></h1>
          <button type="button" class="btn btn-lg btn-close" data-close="true" aria-label="Close Modal" element="close">
            <s4s-icon name="in--close"></s4s-icon>
          </button>
          <div class="slot-content" element="content"></div>
        </div>
      </div>
    `,
    card: `
      <a href="" class="card banner banner-hero" element="card">
        <div class="sas-image sas-image-fill" element="image-wrap">
          <img src="" role="presentation" element="image">
        </div>
        <div class="content slot-content" element="content">
          <h1 element="heading"></h1>
          <h2 element="subheading"></h2>
          <button class="btn-md" element="button"></button>
        </div>
      </a>
    `,
    demo: `
      <form class="sas-form-grid" onsubmit="return false">
        <fieldset>
          <legend>Demo test</legend>
          <s4s-input id="img-src" label="Img src test" element="imgInput"></s4s-input>
        </fieldset>
        <fieldset>
          <button type="submit" element="button">Skicka</button>
        </fieldset>
      </form>
    `,
    accordion: `
      <div class="flysas-accordion" element="accordion">
        <div class="accordion-btn" element="toggler">
          <button class="btn btn-toggle" aria-expanded="false" element="button">
            <span element="label"></span>
            <s4s-icon name="cl--arrow-up"></s4s-icon>
          </button>
        </div>
        <div class="accordion-content slot-content" element="content"><s4s-icon name="cl--arrow-up"></s4s-icon></div>
      </div>
    `,
    toggle: {
      wrap: `
        <div class="flysas-toggles toggles">
          <div class="toggle-btns" element="toggle-buttons"></div>
        </div>
      `,
      button: `
        <button class="btn btn-md" aria-pressed="true"><span element="button-text"></span></button>
      `
    },
    cep: `
      <s4s-toggle options='[{"id":"oneway","name":"Enkel resa"},{"id":"roundtrip","name":"Tur retur","selected":true}]'></s4s-toggle>
      <form class="sas-form-flex" element="form">
        <s4s-combobox label="Från*" market="se-sv" element="from"></s4s-combobox>
        <s4s-combobox label="Till*" market="se-sv" element="to"></s4s-combobox>
        <s4s-datepicker
          label="Avresedatum*"
          outbound-label="Avresa"
          inbound-label="Hemresa"
          monthNames="Jan,Feb,Mar,Apr,Maj,Juni,Juli,Aug,Sep,Okt,Nov,Dec"
          date-delimiter="till"
          market="se-sv"
          element="datepicker">
        </s4s-datepicker>
        <s4s-custom-pax
          class="focused"
          label="Resenärer*"
          adults-label="Vuxna"
          children-label="Barn (2-11 år)"
          infants-label="Spädbarn (0-23 månader)"
          passenger-label="passagerare"
          market="se-sv"
          element="pax">
        </s4s-custom-pax>
        <button class="btn-lg" element="button">Sök</button>
      </form>
    `
  }
})(window, document)
