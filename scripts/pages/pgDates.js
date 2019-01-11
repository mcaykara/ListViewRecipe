const extend = require('js-base/core/extend');
const addChild = require('@smartface/contx/lib/smartface/action/addChild');
const PgDatesDesign = require('ui/ui_pgDates');
const LviDate = require('components/LviDate');

var dates = [{
  date: "8 August",
  timeslots: [{
    part: "Morning",
    time: "08:00 - 12:00"
  }, {
    part: "Noon",
    time: "12:00 - 14:00"
  }, {
    part: "Afternoon",
    time: "14:30 - 18:00"
  }]
}, {
  date: "9 August",
  timeslots: [{
    part: "Morning",
    time: "08:00 - 12:00"
  }, {
    part: "Noon",
    time: "12:00 - 14:00"
  }, {
    part: "Afternoon",
    time: "14:30 - 18:00"
  }]
}, {
  date: "10 August",
  timeslots: [{
    part: "Morning",
    time: "08:00 - 12:00"
  }, {
    part: "Noon",
    time: "12:00 - 14:00"
  }, {
    part: "Afternoon",
    time: "14:30 - 18:00"
  }]
}, {
  date: "11 August",
  timeslots: [{
    part: "Morning",
    time: "08:00 - 12:00"
  }, {
    part: "Noon",
    time: "12:00 - 14:00"
  }, {
    part: "Afternoon",
    time: "14:30 - 18:00"
  }]
}, {
  date: "12 August",
  timeslots: [{
    part: "Morning",
    time: "08:00 - 12:00"
  }, {
    part: "Noon",
    time: "12:00 - 14:00"
  }, {
    part: "Afternoon",
    time: "14:30 - 18:00"
  }]
}, {
  date: "13 August",
  timeslots: [{
    part: "Morning",
    time: "08:00 - 12:00"
  }, {
    part: "Noon",
    time: "12:00 - 14:00"
  }, {
    part: "Afternoon",
    time: "14:30 - 18:00"
  }]
}, {
  date: "14 August",
  timeslots: [{
    part: "Morning",
    time: "08:00 - 12:00"
  }, {
    part: "Noon",
    time: "12:00 - 14:00"
  }, {
    part: "Afternoon",
    time: "14:30 - 18:00"
  }]
}];

const pgDates = extend(PgDatesDesign)(
  function(_super) {
    _super(this);
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
  });

function onShow(superOnShow) {
  superOnShow();
}

function onLoad(superOnLoad) {
  superOnLoad();
  initListView(this.lvDates);
  this.headerBar.leftItemEnabled = false;
}

function initListView(listView) {
  var itemIndex = 0;
  var selectedItem = null;

  listView.rowHeight = 180;
  listView.itemCount = dates.length;

  listView.onRowBind = function(listViewItem, index) {
    var currentDate = dates[index];
    var timeslots = currentDate.timeslots;
    listViewItem.lblDate.text = currentDate.date;
    timeslots.forEach((timeslot, i) => {
      var row = listViewItem[`flDateRow${i}`];
      row.lblHeader.text = timeslot.part;
      row.lblTime.text = timeslot.time;
      row.onTouchEnded = function() {
        // Need to get listViewItem by index
        var lvItem = listView.listViewItemByIndex(index);
        var row = lvItem[`flDateRow${i}`];

        // Only one timeslot can be selected
        if (selectedItem && !row.selected)
          return;

        row.selected = !row.selected;
        selectedItem = row.selected && {
          listViewItemIndex: index,
          rowIndex: i
        };
      };

      // Make sure other timeslots are non selected
      if (selectedItem) {
        row.selected = selectedItem.listViewItemIndex === index &&
          selectedItem.rowIndex === i;
      }
    });
  };

  listView.onRowCreate = function() {
    var myListViewItem = new LviDate();
    this.dispatch(addChild("item" + (++itemIndex), myListViewItem));
    return myListViewItem;
  };

  listView.onPullRefresh = function() {
    listView.stopRefresh();
  };
}

module.exports = pgDates;
