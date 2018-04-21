###Grading Rubric:

Control tower icons. **(3 points)**

Choropleth map based on the number of airports within each state. **(3 points)**

This web map of airports needs to include:

- An appropriate projection - describe that projection in the `readme.md` page; **(7 points)**
- Graticules - change the default color, font, and build your own version of intervals; **(5 points)**
- Dynamic labels of the state name - use a font different from the font of the legend; **(6 points)**
- Some interactive elements, like a clickable marker; **(3 points)**
- Legend; **(5 points)**

Your interactive web map should be accessible from a url link, which should be `http://[your_github_username].github.io/[your_repository_name]/index.html`; **(6 points)**

Put the javascript code into a separate javascript file `main.js` under the `js` folder, and put the css code into a separate css file `main.css` under the `css` folder. If you will use any images or videos, please put those in the `img` folder. The geojson data should remain in the `assets` folder. Please make sure the project repository structure is similar to the file structure below. **(4 points)**

```
[your_repository_name]
    │index.html
    │readme.md
    ├─assets
    │      airports.geojson
    │      us-states.geojson
    ├─css
    │      main.css
    ├─img
    │      xxx.jpg
    └─js
            main.js
```

Write up a project description in the `readme.md` file. **(8 points)**

**Project Name:** Airports in the United States

**Introduction:** This map was created to display all of the airports in the United States and whether or not those airports have control towers.

**Projection:** Alber's Equal Area

**Major Functions:** This map can assist pilots that wish to see what airports they are nearby to and which ones will have control towers that can communicate with their airplanes. A video of an airplane taking off was included for an extra eye-catching effect, and users of this web map can pause or play the video using the buttons on the right side of the screen.

**Libraries:**

**Data Sources:** The dataset containing the list of airports in the United States was obtained from USGS, here: https://catalog.data.gov/dataset/usgs-small-scale-dataset-airports-of-the-united-states-201207-shapefile. The dataset containing the state boundaries of the United States was obtained from Mike Bostock of D3, here: https://bost.ocks.org/mike/

**Credits:** This map was created with Leaflet, data from USGS and D3, and CartoDB.

**Acknowledgements:** I'd like to thank professor Bo Zhao at Oregon State University for his web mapping expertise and guidance. I highly recommend his GEOG 371 Web Mapping and GEOG 572 Geovisual Analytics courses.