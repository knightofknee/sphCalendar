// first, the menu will appear when a box is checked on mobile devices
//(can go off of screen size for now, but see if jquery can recognize device touches)

// menu takes in start time/date and end time/date, then all boxes are selected

//don't break current functionality. since it all turns on the property, should be okay
//only worry is messing with the click when we initiate

$(function (){
  var isMobile = window.matchMedia("only screen and (max-width: 760px)");
  console.log('har', isMobile.matches)
  if (isMobile.matches) {
    $('.day div.checkbox').off()
    $('.time :checkbox').off()  //extra, searching for what is still on
    $('.day div.checkbox').on('click', function(){
      $('#myModal').css("display", "inline-block")
      $('.mobile-menu').show()})

      $('#mobile-form').submit(function(event){
        setAllTimesChosen(event.target.start.value, event.target.end.value, event.target.startDay.value, event.target.endDay.value)
        event.preventDefault()
        console.log('start: ', event.target.start.value)
      })

      $('.close').on('click', function(){
        $('#myModal').css("display", "none")
      })
  }
  function setAllTimesChosen(startTime, endTime, startDay, endDay){
    let dayArray = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
    let firstIndex = dayArray.indexOf(startDay)
    let lastIndex = dayArray.indexOf(endDay)
    let end = '23:30'
    let start = startTime
    let day = ''
    for (let i = firstIndex; i <= lastIndex; i++) {
      if (i == lastIndex) end = endTime
      day = dayArray[i]
      setTimesChosenOneDay(start, end, day)
      start = '00:00'
    }
  }
  function setTimesChosenOneDay(start, end, day){
    // needs to update all the times, in a few loops. did not require days to be included so do time only to start
      let amStart = false
      let pmEnd = false
      if (Number(start.slice(0, 2)) < 12) {
        amStart = true
      }
      if (Number(end.slice(0, 2)) >= 12) {
        pmEnd = true
      }
      let initialTime = Number(start.slice(0,2))
      if (start.slice(3,2) == '30') {
        initialTime = initialTime + .5
      }
      let endingTime = Number(end.slice(0,2))
      if (start.slice(3,2) == '30') {
        endingTime = endingTime + .5
      }
      if (amStart && pmEnd) {
        for (let i = initialTime; i < 12; i = i + .5){
          let halfHour = ''
          if (i % 1 == .5) halfHour = '30'
          let id = "#" + day + Math.floor(i) + halfHour + 'am'
          if (i < 1) id = "#" + day + '12' + halfHour + 'am'
          $(id).prop('checked', true)
        }
        for (let i = 12; i <= endingTime + .5; i = i + .5){
          let halfHour = ''
          let hour = i
          if (i % 1 == .5) halfHour = '30'
          if (i > 12.6) hour = i - 12
          let id = "#" + day + Math.floor(hour) + halfHour + 'pm'
          $(id).prop('checked', true)
        }
      }
      else if (amStart) {
        for (let i = initialTime; i <= endingTime; i = i + .5){
          let halfHour = ''
          if (i % 1 == .5) halfHour = '30'
          let id = "#" + day + Math.floor(i) + halfHour + 'am'
          if (i < 1) id = "#" + day + '12' + halfHour + 'am'
          $(id).prop('checked', true)
        }
      }
      else {
        for (let i = initialTime; i <= endingTime; i = i + .5){
          let halfHour = ''
          if (i % 1 == .5) halfHour = '30'
          if (i > 12.6) hour = i - 12
          let id = "#" + day + Math.floor(i) + halfHour + 'pm'
          $(id).prop('checked', true)
        }
      }
  }
  // $('.day div.checkbox').on('click', function(){
  //   $('#mobile-menu').show(300)
  // })

  // $('#mobile-menu-submit-button').on('click', function(){
  //   //needs to update all the times, in a few loops. did not require days to be included so do time only to start
  //   let amStart = true
  //   let pmEnd = true
  //   let initialTime = 2.5
  //   let endingTime = 5
  //   let day = 'mon'
  //   if (amStart && pmEnd) {
  //     for (let i = initialTime; i < 12; i = i + .5){
  //       let halfHour = ''
  //       if (i % 1 == .5) halfHour = '30'
  //       $("#" + day + Math.floor(i) + halfHour + 'am').find(':checkbox').prop('checked', true)
  //     }
  //     for (let i = 12; i < endingTime + .5; i = i + .5){
  //       let halfHour = ''
  //       if (i % 1 == .5) halfHour = '30'
  //       $(".time").eq(day + Math.floor(i) + halfHour + 'pm').find(':checkbox').prop('checked', true)
  //     }
  //   }
  //   else if (amStart) {
  //     for (let i = initialTime; i < endingTime; i = i + .5){
  //       let halfHour = ''
  //       if (i % 1 == .5) halfHour = '30'
  //       $(".time").eq(day + Math.floor(i) + halfHour + 'am').find(':checkbox').prop('checked', true)
  //     }
  //   }
  //   else {
  //     for (let i = initialTime; i < endingTime; i = i + .5){
  //       let halfHour = ''
  //       if (i % 1 == .5) halfHour = '30'
  //       $(".time").eq(day + Math.floor(i) + halfHour + 'pm').find(':checkbox').prop('checked', true)
  //     }
  //   }
  // })
})
