"use strict";
 
/*Tests if the filter object is valid and needs to be applied*/
const isValidFilter = (filter) => {
 return (filter.text || filter.minIntensity || filter.orderAlpha || filter.orderReverseAlpha) ? true : false;
};

/* Constructs a filtering function based on a filter object */
const constructFilterFnFromFilterObj = (filterObj) => {
     return (capsule) => {
         let condition = true;
         if (filterObj.text) {
             condition &= (capsule.name.indexOf(filterObj.text) > -1)
         }

         if (filterObj.minIntensity) {
             condition &= (capsule.intensity >= filterObj.minIntensity);
         }

         return condition;
     };
 };

 /* Constructs an ordering function based on a filter object */
 const constructOrderFnFromFilterObj = (filterObj) => {
     const noOrdering = (!filterObj.orderAlpha && !filterObj.orderReverseAlpha)
                            || (filterObj.orderAlpha && filterObj.orderReverseAlpha);
     if (noOrdering) {
         return () => {
            return 0;
         };
     }

     if (filterObj.orderAlpha) {
         return (capsuleA, capsuleB) => {
             return capsuleA.name.localeCompare(capsuleB.name);
         };
     }

     if (filterObj.orderReverseAlpha) {
         return (capsuleA, capsuleB) => {
             return capsuleB.name.localeCompare(capsuleA.name);
         };
     }     
 };

 const capsulesFilter = (capsules, filter, order) => {
     let filterFn = filter;
     let orderFn = order;

     // If a filter is an object - transforming it into functions (filtering and ordering)
     if (filterFn !== null && filterFn !== undefined && typeof filter === "object") {
         if (!isValidFilter(filter)) {
             return capsules;
         }

         filterFn = constructFilterFnFromFilterObj(filter);
         orderFn = constructOrderFnFromFilterObj(filter);
     }

     // If there is still no filtering function => no filtering needed;
     if (!filterFn) {
         filterFn = () => {
             return true;
         };
     }

     // If tehre is still no ordering function => no ordering needed;
     if (!orderFn) {
         orderFn = () => {
             return 0;
         };
     }

     return capsules.filter(filterFn).sort(orderFn);
 };
 window.capsulesFilter = capsulesFilter;