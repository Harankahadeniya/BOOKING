document.addEventListener("DOMContentLoaded", function () {
    // Room Booking Form Elements
    const roomTypeSelect = document.getElementById("roomType");
    const numberOfRoomsInput = document.getElementById("numberOfRooms");
    const numberOfAdultsInput = document.getElementById("numberOfAdults");
    const numberOfChildrenInput = document.getElementById("numberOfChildren");
    const durationOfStayInput = document.getElementById("durationOfStay");
    const extraRequirementsTextarea = document.getElementById("extraRequirements");
    const promoCodeInput = document.getElementById("promoCode");
  
    // Adventure Booking Form Elements
    const adventureTypeSelect = document.getElementById("adventureType");
    const numberOfParticipantsInput = document.getElementById("numberOfParticipants");
    const needGuideCheckbox = document.getElementById("needGuide");
  
    // Buttons
    const calculateCostBtn = document.getElementById("calculateCost");
    const bookNowBtn = document.getElementById("bookNow");
    const calculateAdventureCostBtn = document.getElementById("calculateAdventureCost");
    const bookAdventureBtn = document.getElementById("bookAdventure");
  
    // Display Divs
    const currentBookingDiv = document.getElementById("currentBooking");
    const overallBookingDiv = document.getElementById("overallBooking");
    const adventureBookingMessageDiv = document.getElementById("adventureBookingMessage");
  
    // Variables to store booking details
    let currentRoomBooking = {};
    let overallBooking = { rooms: [], adventures: [], totalCost: 0 };
  
    // Function to calculate room booking cost
    function calculateRoomBookingCost() {
      const roomType = roomTypeSelect.value;
      const numberOfRooms = Number(numberOfRoomsInput.value);
      const numberOfAdults = Number(numberOfAdultsInput.value);
      const numberOfChildren = Number(numberOfChildrenInput.value);
      const durationOfStay = Number(durationOfStayInput.value);
  
      // Calculation logic based on provided prices
      let roomCost = 0;
  
      switch (roomType) {
        case "single":
          roomCost = 25000;
          break;
        case "double":
          roomCost = 35000;
          break;
        case "triple":
          roomCost = 40000;
          break;
      }
  
      // Additional costs for extra beds and meals
      const extraBedCost = currentRoomBooking.extraBed ? 8000 : 0;
      const mealsCost = numberOfChildren * 5000;
  
      // Calculate total room cost
      const totalRoomCost = numberOfRooms * (roomCost + extraBedCost + mealsCost);
  
      // Update current room booking details
      currentRoomBooking = {
        roomType,
        numberOfRooms,
        numberOfAdults,
        numberOfChildren,
        durationOfStay,
        extraRequirements: extraRequirementsTextarea.value,
        promoCode: promoCodeInput.value,
        roomCost: totalRoomCost,
      };
  
      // Display current room booking details
      currentBookingDiv.innerHTML = `
        <p>Room Type: ${currentRoomBooking.roomType}</p>
        <p>Number of Rooms: ${currentRoomBooking.numberOfRooms}</p>
        <p>Number of Adults: ${currentRoomBooking.numberOfAdults}</p>
        <p>Number of Children: ${currentRoomBooking.numberOfChildren}</p>
        <p>Duration of Stay: ${currentRoomBooking.durationOfStay} nights</p>
        <p>Extra Requirements: ${currentRoomBooking.extraRequirements}</p>
        <p>Room Cost: ${currentRoomBooking.roomCost} LKR</p>
      `;
    }
  
    // Function to calculate adventure booking cost
    function calculateAdventureCost() {
      const adventureType = adventureTypeSelect.value;
      const numberOfParticipants = Number(numberOfParticipantsInput.value);
      const needGuide = needGuideCheckbox.checked;
  
      // Calculation logic based on provided prices
      let adventureCost = 0;
  
      switch (adventureType) {
        case "divingLocalAdult":
          adventureCost = 5000;
          break;
        case "divingLocalChild":
          adventureCost = 2000;
          break;
        case "divingForeignAdult":
          adventureCost = 10000;
          break;
        case "divingForeignChild":
          adventureCost = 5000;
          break;
      }
  
      // Additional cost for a guide
      const guideCost = needGuide ? (numberOfParticipants === 1 ? 1000 : 500) : 0;
  
      // Calculate total adventure cost
      const totalAdventureCost = numberOfParticipants * (adventureCost + guideCost);
  
      // Update current adventure booking details
      currentAdventureBooking = {
        adventureType,
        numberOfParticipants,
        needGuide,
        adventureCost: totalAdventureCost,
      };
  
      // Display current adventure booking details
      currentBookingDiv.innerHTML = `
        <p>Adventure Type: ${currentAdventureBooking.adventureType}</p>
        <p>Number of Participants: ${currentAdventureBooking.numberOfParticipants}</p>
        <p>Need Guide: ${currentAdventureBooking.needGuide ? 'Yes' : 'No'}</p>
        <p>Adventure Cost: ${currentAdventureBooking.adventureCost} LKR</p>
      `;
    }
  
    // Function to handle "Book Now" button click
    function bookNow() {
      // Add the current room booking to the overall booking
      overallBooking.rooms.push(currentRoomBooking);
  
      // Update overall booking cost
      overallBooking.totalCost += currentRoomBooking.roomCost;
  
      // Reset current room booking
      currentRoomBooking = {};
  
      // Display overall booking details
      overallBookingDiv.innerHTML = `
        <p>Overall Booking:</p>
        <!-- Display overall booking details here -->
        <p>Total Cost: ${overallBooking.totalCost} LKR</p>
      `;
  
      // Clear current booking display
      currentBookingDiv.innerHTML = "";
    }
  
    // Function to handle "Book Adventure" button click
    function bookAdventure() {
      // Add the current adventure booking to the overall booking
      overallBooking.adventures.push(currentAdventureBooking);
  
      // Update overall booking cost
      overallBooking.totalCost += currentAdventureBooking.adventureCost;
  
      // Reset current adventure booking
      currentAdventureBooking = {};
  
      // Display a thank you message for adventure booking
      adventureBookingMessageDiv.innerHTML = `<p>Thank you for booking the adventure!</p>`;
  
      // Display overall booking details
      overallBookingDiv.innerHTML = `
        <p>Overall Booking:</p>
        <!-- Display overall booking details here -->
        <p>Total Cost: ${overallBooking.totalCost} LKR</p>
      `;
  
      // Clear current booking display
      currentBookingDiv.innerHTML = "";
    }
  
    // Event listeners for form elements
    roomTypeSelect.addEventListener("change", calculateRoomBookingCost);
    numberOfRoomsInput.addEventListener("input", calculateRoomBookingCost);
    numberOfAdultsInput.addEventListener("input", calculateRoomBookingCost);
    numberOfChildrenInput.addEventListener("input", calculateRoomBookingCost);
    durationOfStayInput.addEventListener("input", calculateRoomBookingCost);
    promoCodeInput.addEventListener("input", calculateRoomBookingCost);
  
    adventureTypeSelect.addEventListener("change", calculateAdventureCost);
    numberOfParticipantsInput.addEventListener("input", calculateAdventureCost);
  
       // Event listeners for buttons
       calculateCostBtn.addEventListener("click", calculateRoomBookingCost);
       bookNowBtn.addEventListener("click", bookNow);
       calculateAdventureCostBtn.addEventListener("click", calculateAdventureCost);
       bookAdventureBtn.addEventListener("click", bookAdventure);
   });
   