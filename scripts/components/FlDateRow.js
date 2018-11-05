const extend = require('js-base/core/extend');
const FlDateRowDesign = require('library/FlDateRow');

const FlDateRow = extend(FlDateRowDesign)(
  function(_super, props, pageName) {
    _super(this, props || {});
    this.pageName = pageName;

    var selected = false;
    Object.defineProperty(this, "selected", {
      configurable: false,
      enumerable: true,
      get: function() {
        return selected;
      },
      set: function(value) {
        selected = value;
        this.flMain.dispatch({
          type: "updateUserStyle",
          userStyle: {
            backgroundColor: selected ? "#FFF1B6" : "#F2F2F2"
          }
        });
      }
    });
  }
);

module.exports = FlDateRow;
