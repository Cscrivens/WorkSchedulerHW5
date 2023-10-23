$(function () {
  // Function to display the current date in the header
  function displayCurrentDate() {
    var currentDate = dayjs().format("dddd, MMMM D, YYYY");
    $("#currentDay").text(currentDate);
  }

  // Function to update time block colors based on current time
  function updateTimeBlockColors() {
    var currentHour = dayjs().hour();

    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);

      if (blockHour < currentHour) {
        $(this).addClass("past").removeClass("present future");
      } else if (blockHour === currentHour) {
        $(this).addClass("present").removeClass("past future");
      } else {
        $(this).addClass("future").removeClass("past present");
      }
    });
  }

  // Function to load events from local storage
  function loadEvents() {
    $(".time-block").each(function () {
      var blockHour = $(this).attr("id");
      var event = localStorage.getItem(blockHour);

      if (event) {
        $(this).find(".description").val(event);
      }
    });
  }

  // Event listener for the save button
  $(".saveBtn").on("click", function () {
    var blockHour = $(this).parent().attr("id");
    var eventText = $(this).siblings(".description").val();

    if (eventText) {
      localStorage.setItem(blockHour, eventText);
      $(this).text("Saved!");
      setTimeout(function () {
        $(this).text("Save");
      }, 60); // Reset the button text after 1.5 seconds
    } else {
      localStorage.removeItem(blockHour);
    }
  });


  // Initial setup
  displayCurrentDate();
  updateTimeBlockColors();
  loadEvents();

  // Update time block colors every minute to handle transitions
  setInterval(updateTimeBlockColors, 60000);
});
