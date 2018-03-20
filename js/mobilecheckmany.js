$(function (){
  var isMobile = window.matchMedia("only screen and (max-width: 760px)");
  if (isMobile.matches) {
    $('.day div.checkbox').off()
    $('.day div.checkbox').on('click', function(){
      // sets a custom property so we don't assign checked as we open the menu
      if (event.target.type == 'checkbox' && event.target.touched == true)
      {$(event.target).prop('checked', true)}
      else $(event.target).prop('checked', false)

      $('#myModal').css("display", "inline-block")
      $('.mobile-menu').show()})

      $('#mobile-form').submit(function(event){
        setAllTimesChosen(event.target.start.value, event.target.end.value, event.target.startDay.value, event.target.endDay.value)
        event.preventDefault()
        $('#myModal').fadeOut()
      })

      $('.close').on('click', function(){
        $('#myModal').fadeOut()
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
          $(id).prop('touched', true)
        }
        for (let i = 12; i <= endingTime + .5; i = i + .5){
          let halfHour = ''
          let hour = i
          if (i % 1 == .5) halfHour = '30'
          if (i > 12.6) hour = i - 12
          let id = "#" + day + Math.floor(hour) + halfHour + 'pm'
          $(id).prop('checked', true)
          $(id).prop('touched', true)
        }
      }
      else if (amStart) {
        for (let i = initialTime; i <= endingTime; i = i + .5){
          let halfHour = ''
          if (i % 1 == .5) halfHour = '30'
          let id = "#" + day + Math.floor(i) + halfHour + 'am'
          if (i < 1) id = "#" + day + '12' + halfHour + 'am'
          $(id).prop('checked', true)
          $(id).prop('touched', true)
        }
      }
      else {
        for (let i = initialTime; i <= endingTime; i = i + .5){
          let halfHour = ''
          if (i % 1 == .5) halfHour = '30'
          if (i > 12.6) hour = i - 12
          let id = "#" + day + Math.floor(i) + halfHour + 'pm'
          $(id).prop('checked', true)
          $(id).prop('touched', true)
        }
      }
  }
})
