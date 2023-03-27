function hoverValues(
  activeRegion,
  activeArea,
  dropLine,
  label,
  xScale,
  yScale,
  marriageData,
  raceToggled,
  edToggled
) {
  let label1 = activeArea
    .append('text')
    .attr('id', 'label')
    .attr('visibility', 'hidden');
  let label2 = activeArea
    .append('text')
    .attr('id', 'label')
    .attr('visibility', 'hidden');
  let label3 = activeArea
    .append('text')
    .attr('id', 'label')
    .attr('visibility', 'hidden');

  activeRegion.on('mouseover', function () {
    dropLine.attr('visibility', '');
    label1.attr('visibility', '');
    label3.attr('visibility', '');
    label2.attr('visibility', '');
  });

  activeRegion.on('mouseout', function () {
    dropLine.attr('visibility', 'hidden');
    label1.attr('visibility', 'hidden');
    label2.attr('visibility', 'hidden');
    label3.attr('visibility', 'hidden');
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

    let txt1 = '';
    let txt2 = '';
    let txt3 = '';

    if (edToggled) {
      var BA = Math.round((1 - d.BAp_2534) * 100);
      var SC = Math.round((1 - d.SC_2534) * 100);
      var HS = Math.round((1 - d.HS_2534) * 100);
      txt1 = HS + '%';
      txt2 = SC + '%';
      txt3 = BA + '%';

      label1
        .attr('x', xPos - 40)
        .attr('y', yScale(0.25))
        .style('fill', '#0000FF')
        .text(txt1);
      label2
        .attr('x', xPos - 40)
        .attr('y', yScale(0.15))
        .style('fill', '#89CFF0')
        .text(txt2);
      label3
        .attr('x', xPos - 40)
        .attr('y', yScale(0.05))
        .style('fill', '#7393B3')
        .text(txt3);
    } else if (raceToggled) {
      var white = Math.round((1 - d.White_2534) * 100);
      var hisp = Math.round((1 - d.Hisp_2534) * 100);
      var black = Math.round((1 - d.Black_2534) * 100);
      txt1 = hisp + '%';
      txt2 = white + '%';
      txt3 = black + '%';

      label1
        .attr('x', xPos - 40)
        .attr('y', yScale(0.25))
        .style('fill', '#BF40BF')
        .text(txt1);
      label2
        .attr('x', xPos - 40)
        .attr('y', yScale(0.15))
        .style('fill', '#9F2B68')
        .text(txt2);
      label3
        .attr('x', xPos - 40)
        .attr('y', yScale(0.05))
        .style('fill', '#d20035')
        .text(txt3);
    }


  });
}
