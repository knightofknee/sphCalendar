// first, the menu will appear when a box is checked on mobile devices
//(can go off of screen size for now, but see if jquery can recognize device touches)

// menu takes in start time/date and end time/date, then all boxes are selected

//don't break current functionality. since it all turns on the property, should be okay
//only worry is messing with the click when we initiate

$(function (){
  $('.day div.checkbox').on('click', function(){
    $('#mobile-menu').show(300)
  })

  $('#mobile-menu-submit-button').on('click', function(){
    //needs to update all the times, in a few loops. did not require days to be included so do time only to start
    let amStart = true
    let pmEnd = true
    let initialTime = 2.5
    let endingTime = 5
    let day = 'mon'
    if (amStart && pmEnd) {
      for (let i = initialTime; i < 12; i = i + .5){
        let halfHour = ''
        if (i % 1 == .5) halfHour = '30'
        $("#" + day + Math.floor(i) + halfHour + 'am').find(':checkbox').prop('checked', true)
      }
      for (let i = 12; i < endingTime + .5; i = i + .5){
        let halfHour = ''
        if (i % 1 == .5) halfHour = '30'
        $(".time").eq(day + Math.floor(i) + halfHour + 'pm').find(':checkbox').prop('checked', true)
      }
    }
    else if (amStart) {
      for (let i = initialTime; i < endingTime; i = i + .5){
        let halfHour = ''
        if (i % 1 == .5) halfHour = '30'
        $(".time").eq(day + Math.floor(i) + halfHour + 'am').find(':checkbox').prop('checked', true)
      }
    }
    else {
      for (let i = initialTime; i < endingTime; i = i + .5){
        let halfHour = ''
        if (i % 1 == .5) halfHour = '30'
        $(".time").eq(day + Math.floor(i) + halfHour + 'pm').find(':checkbox').prop('checked', true)
      }
    }
  })
})