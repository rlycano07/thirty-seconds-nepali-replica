$(function () {
  // Retrieve the selected history from localStorage, or initialize an empty array if not present
  var selectedHistory = JSON.parse(localStorage.getItem('selectedHistory')) || [];

  // Function to retrieve data from a given JSON file
  function fetchData(file, callback) {
    $.getJSON(file, function (data) {
      callback(data);
    });
  }

  // Function to get the remaining available items based on category and title
  function getRemainingItems(data) {
    var remainingItems = [];
    data.forEach(function (item, index) {
      var isAlreadySelected = selectedHistory.some(function (historyItem) {
        return historyItem.title === item.title && historyItem.category === item.category;
      });
      if (!isAlreadySelected) {
        remainingItems.push({ index: index, item: item }); // Store both the index and item
      }
    });
    return remainingItems;
  }

  // Function to check if there are enough unique items
  function checkEnoughItems(remainingItems) {
    if (remainingItems.length < 1) {
      alert('Maximum reached: Not enough unique items left to select.');
      return false;
    }
    return true;
  }

  // Function to get 1 random unique item
  function getRandomItem(remainingItems) {
    var randomIndex = Math.floor(Math.random() * remainingItems.length);
    var selectedItem = remainingItems[randomIndex];
    // Return the selected item directly
    return selectedItem;
  }

  // Function to update selected history and store it in localStorage
  function updateSelectedHistory(randomItem) {
    selectedHistory.push({ title: randomItem.item.title, category: randomItem.item.category });
    localStorage.setItem('selectedHistory', JSON.stringify(selectedHistory));
  }

  // Function to generate the HTML structure for the selected items
  function generateItemsHTML(randomItem) {
    var firstList = '';
    firstList += '<li>' + randomItem.item.title + ' (' + randomItem.item.category + ')</li>';

    return firstList;
  }

  // Function to display the selected history
  function displayHistory() {
    var historyList = '';
    selectedHistory.forEach(function (historyItem) {
      historyList += '<li>' + historyItem.title + ' (' + historyItem.category + ')</li>';
    });
    $('#history').html('<h3>Selected History</h3><ul>' + historyList + '</ul>');
  }

  // Event listener for the "show-next" button
  $("#show-next").on('click', function () {
    var files = ["./data/celebrity.json", "./data/food.json", "./data/movie.json", "./data/place.json", "./data/song.json"];
    var randomItems = [];
    var filesLoaded = 0;

    // Fetch data from all JSON files
    files.forEach(function (file) {
      fetchData(file, function (data) {
        var remainingItems = getRemainingItems(data);

        // Check if there are enough unique items to select
        if (!checkEnoughItems(remainingItems)) {
          return; // Stop execution if not enough items
        }

        // Get 1 random item from the remaining available items
        var randomItem = getRandomItem(remainingItems);
        randomItems.push(randomItem); // Collect random items

        // Update the selected history and store it in localStorage
        updateSelectedHistory(randomItem);

        filesLoaded++;

        // When all files have been loaded, generate and display the items
        if (filesLoaded === files.length) {
          var output = randomItems.map(function (item) {
            return generateItemsHTML(item);
          }).join('');
          $('#card-list-1').html(output);

          // Display the updated history
          // displayHistory();
        }
      });
    });
  });

  // Initialize the display of the history when the page loads
  // displayHistory(); // Display the history when the page is loaded
});
