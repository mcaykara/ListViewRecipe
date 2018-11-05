const extend = require('js-base/core/extend');
const LviDateDesign = require('library/LviDate');

const LviDate = extend(LviDateDesign)(
  function(_super, props, pageName) {
    _super(this, props || {});
    this.pageName = pageName;
  }
);

module.exports = LviDate;
