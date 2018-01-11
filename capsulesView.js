 /**
  * Helper function generating a capsule view.
  * In angular - directive, in React.js - component.
  * Can be splitted into 2 different functions (one for name, another one for intensity)
  * But is not needed for a simple task like this one.
  */
 const generateCapsuleView = (capsule) => {
     const nameElement = "<span class=\"name\">" + capsule.name + "</span>";
     // const intensityElement = "<span class=\"intensity\">Intensity: " + capsule.intensity + "</span>";
     const intensityClass = (capsule.intensity > 0 && capsule.intensity < 9) ? capsule.intensity : "max";
     
     let intensityElement = "<div class=\"intensity intensity-" + intensityClass + "\">";
     intensityElement += "<span>Intensity: " + capsule.intensity + "</span>";
     
     for (let i = 0; i < capsule.intensity; i++) {
        intensityElement += "<div class=\"bar\"></div>";
     }
     intensityElement += "</div>";
     
     return nameElement + "<br/>" + intensityElement;
 };

 // Stores capsules that should be shown
 let visibleCapsules = mock.capsules;
 // Stores a filter that is currently applied
 let filter = null;

 /**
  * Updates a current filter and rerenders the document
  */
 const updateFilter = (field, value) => {
     if (!filter) {
         filter = {};
     }
     
     switch (field) {
         case "text": {
             filter.text = value || null;
             break;
         }
             
         case "minIntensity": {
             filter.minIntensity = value || null;
             break;
         }
             
         case "order": {
             filter.orderAlpha = false;
             filter.orderReverseAlpha = false;
             filter[value] = true;
             break;
         }
     }
     
     visibleCapsules = capsulesFilter(mock.capsules, filter);
     render();
 };

 /*
  * Function that renders eerything we want to show
  */
 const render = () => {
    const resultsNode = document.getElementById("visible_capsules");
    resultsNode.innerHTML = "";

    visibleCapsules.map((capsule) => {
      const node = document.createElement("div");
      node.innerHTML = generateCapsuleView(capsule);
      node.className = "capsule";
      node.id = "capsule_" + capsule.id;

      resultsNode.appendChild(node);
    });
};

 window.onload = () => {
     const nameFilter = document.getElementById("text_filter");
     const intensityFilter = document.getElementById("intensity_filter");
     const orderFilter = document.getElementById("order_fitler");
     
     nameFilter.addEventListener("input", (e) => {
         updateFilter("text", e.target.value);
     });
     
     intensityFilter.addEventListener("input", (e) => {
        updateFilter("minIntensity", e.target.value);
     });
     
     orderFilter.addEventListener("change", (e) => {
        updateFilter("order", e.target.value);
     });
    
     render();
 };