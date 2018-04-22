# US Airports

**Introduction:**

This map was created to display all of the airports in the United States and whether or not those airports have control towers.

**Projection:**

This map is in the _Albers Equal Area_ projection to preserve the area of the US states while also minimizing distortion for the continental US states. This projection is similar to the Lamberts projection because they both use conic shapes to wrap around a spheroid of the Earth before unwrapping the developable map surface from the cone. The difference is that the Albers projection preserves area while the Lamberts projection preserves shape. As a result, the Albers projection this airport map is in can be seen preserving most of the continental US states' areas while distorting some of the high and low latitude states' shapes, such as Alaska and Hawaii. [Map-projections.net](https://map-projections.net/compare.php?p1=albers-equal-area-conic&p2=lambert-conformal-conic) demonstrates these differences with an interactive projection comparison.

**Major Functions:**

This map can assist pilots that wish to see what airports they are nearby to and which ones will have control towers that can communicate with their airplanes. By clicking on the airplane icons, the name of the airport appears in a pop-up. The US states are also shown in a choropleth style by the number of airports contained within each state. The map is also designed to automatically return the user back to the view of the United States when they navigate too far outside the bounds of the US. Considering there is no base map displayed when a different projection other than web Mercator is selected, the auto-return to bounds function is helpful to keep the viewer's focus on the United States while also not getting "lost" in blank space when navigating too far from the US.

**Libraries:**

- Leaflet
- Leaflet-ajax
- Leaflet.latlng-graticule
- Proj4Leaflet
- Proj4JS
- RBush
- Labelgun
- JQuery
- Chroma

**Data Sources:**

- US airports: [USGS](https://catalog.data.gov/dataset/usgs-small-scale-dataset-airports-of-the-united-states-201207-shapefile)
- US state boundaries: [Mike Bostock of D3](https://bost.ocks.org/mike/).

**Credits:**

[Brian G. Katz](http://ceoas.oregonstate.edu/profile/katz/) | Spring 2018 | [Oregon State University](https://www.oregonstate.edu) | [College of Earth, Ocean, and Atmospheric Sciences](https://www.ceoas.oregonstate.edu)

**Acknowledgements:**

This web map was developed during a geovisual analytics course (GEOG 4/572) taught by [Bo Zhao](https://ceoas.oregonstate.edu/profile/zhao/), assistant professor and head of the [cartography & geovisualization group](http://geoviz.ceoas.oregonstate.edu/) at Oregon State University. The airplane favicon was obtained from [Pixabay](https://pixabay.com/en/plane-air-transport-travel-flight-310501/).