# GifTastic

This GIF generator leverages the [Giphy](https://giphy.com/) API to retrieve images - both still and animated - based on the search terms entered by the user.

The project can be accessed [here](https://melton3413.github.io/GifTastic/)

The landing page allows users to add new search terms which are saved as buttons on top of the page.
When a button is pressed, an API call is made to Giphy to pull back images that match the name of the button.
Still Images that are tagged "marvel", and are not rated R or PG-13, are then added to the page.
Clicking on the still images animates them; clicking them again stops the animation.

## Technologies/Libraries Used
* HTML
* CSS
* JavaScript/jQuery/AJAX
* Bootstrap