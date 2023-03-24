function hoverValues(
  activeRegion,
  dropLine,
  label,
  xScale,
  yScale,
  marriageData,
  raceToggled,
  edToggled
) {
  activeRegion.on('mouseover', function () {
    dropLine.attr('visibility', '');
    label.attr('visibility', '');
  });

  activeRegion.on('mouseout', function () {
    dropLine.attr('visibility', 'hidden');
    label.attr('visibility', 'hidden');
  });

  let bisect = d3.bisector((d) => d.year).left;

  activeRegion.on('mousemove', function (evt) {
    // Get mouse location
    let location = d3.pointer(evt);
    let x = location[0];
    // Use "invert" on a scale to go from pixels back to data
    let xYear = xScale.invert(x);
    // We use the bisector to find the index of the element that's closest to our xYear
    let index = bisect(marriageData, xYear);
    // We can then get d, the data point that's closest
    let d = marriageData[index];
    // From there, it's just a matter of updating positions using our scales like we've done for a while now
    let xPos = xScale(d.year);
    let yPos = yScale(0.1);

    dropLine.attr('x1', xPos).attr('x2', xPos);
    // valueMarker.attr("cx",xPos).attr("cy",yPos);

    let txt = '';
    if (edToggled) {
      var BA = Math.round((1 - d.BAp_2534) * 100);
      var SC = Math.round((1 - d.SC_2534) * 100);
      var HS = Math.round((1 - d.HS_2534) * 100);
      txt = BA + ', ' + SC + ', ' + HS;
    } else if (raceToggled) {
      var white = Math.round((1 - d.White_2534) * 100);
      var hisp = Math.round((1 - d.Hisp_2534) * 100);
      var black = Math.round((1 - d.Black_2534) * 100);
      txt = white + ', ' + hisp + ', ' + black;
    }

    // We started with the following line, which has lots of overlaps
    label
      .attr('x', xPos - 50)
      .attr('y', yPos)
      .text(txt);
  });
}
