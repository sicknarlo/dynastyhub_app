export default (someArray) => {
  if (someArray.length < 5) return someArray;

  // Copy the values, rather than operating on references to existing values
  var values = someArray.concat();

  // Then sort
  values.sort( function(a, b) {
    return a.pick - b.pick;
  });

  /* Then find a generous IQR. This is generous because if (values.length / 4)
    * is not an int, then really you should average the two elements on either
    * side to find q1.
    */
  var q1 = values[Math.floor((values.length / 4))].pick;
  // Likewise for q3.
  var q3 = values[Math.ceil((values.length * (3 / 4)))].pick;
  var iqr = q3 - q1;

  // Then find min and max values
  var maxValue = q3 + iqr * 1.5;
  var minValue = q1 - iqr * 1.5;

  // Then filter anything beyond or beneath these values.
  var filteredValues = values.filter(function(x) {
    return (x.pick <= maxValue) && (x.pick >= minValue);
  });

  // Then return
  return filteredValues;
  }
