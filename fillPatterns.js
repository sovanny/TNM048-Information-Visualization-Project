export {generateFillGraphics, clearFillGraphics, generatePatternLegends};
import {dataSetSecondary, dataSet, colorScale, colorScaleSecondary} from './mapSetup.js';

function clearFillGraphics(){
  let defs = $('#fill-defs');
  defs.empty();
}
function generateFillGraphics(countryId, animationType){

    let freedomIndexPrimary = dataSet.get(countryId) || -1;
    let freedomIndexSecondary = dataSetSecondary.get(countryId) || -1;

    freedomIndexPrimary = Math.round(freedomIndexPrimary);
    freedomIndexSecondary = Math.round(freedomIndexSecondary);

    let baseColor = colorScale(freedomIndexPrimary);
    let secondaryColor = colorScaleSecondary(freedomIndexSecondary);

    if(freedomIndexPrimary == -1){
      baseColor = "#EAEAEA"; //make grey if no data
    }
    if(freedomIndexSecondary == -1){
      secondaryColor = "#EAEAEA";
    }

    //return 'url(#blinkPattern)';
    if(animationType == 1) return createShinyStripe(baseColor, secondaryColor, freedomIndexPrimary, freedomIndexSecondary);
    else if (animationType == 2) return createShinyStripe2(baseColor, secondaryColor, freedomIndexPrimary, freedomIndexSecondary);
    else if (animationType == 3) return createShinyStripe3(baseColor, secondaryColor, freedomIndexPrimary, freedomIndexSecondary);
    else if (animationType == 4) return createShinyStripe4(baseColor, secondaryColor, freedomIndexPrimary, freedomIndexSecondary);
    else if (animationType == 5) return createCirclePattern1(baseColor, secondaryColor, freedomIndexPrimary, freedomIndexSecondary);
    else if (animationType == 6) return createCirclePattern2(baseColor, secondaryColor, freedomIndexPrimary, freedomIndexSecondary);
    else if (animationType == 7) return createBlinkingPattern(baseColor, secondaryColor, freedomIndexPrimary, freedomIndexSecondary);
    else if (animationType == 8) return createGradient(baseColor, secondaryColor, freedomIndexPrimary, freedomIndexSecondary);
    else if (animationType == 9) return createGradient2(baseColor, secondaryColor, freedomIndexPrimary, freedomIndexSecondary);
    else return 'url(#firegradient)';
}
function generatePatternLegends(secondColorIndex, animationType){

  let baseColor = colorScale(5);
  let secondaryColor = colorScaleSecondary(secondColorIndex);

  //return 'url(#circlePattern)';
  if(animationType == 1) return createShinyStripe(baseColor, secondaryColor, 5, secondColorIndex);
  else if (animationType == 2) return createShinyStripe2(baseColor, secondaryColor, 5, secondColorIndex);
  else if (animationType == 3) return createShinyStripe3(baseColor, secondaryColor, 5, secondColorIndex);
  else if (animationType == 4) return createShinyStripe4(baseColor, secondaryColor, 5, secondColorIndex);
  else if (animationType == 5) return createCirclePattern1(baseColor, secondaryColor, 5, secondColorIndex);
  else if (animationType == 6) return createCirclePattern2(baseColor, secondaryColor, 5, secondColorIndex);
  else if (animationType == 7) return createBlinkingPattern(baseColor, secondaryColor, 5, secondColorIndex);
  else if (animationType == 8) return createGradient(baseColor, secondaryColor, 5, secondColorIndex);
  else if (animationType == 9) return createGradient2(baseColor, secondaryColor, 5, secondColorIndex);
  else return 'url(#firegradient)';
}

function createGradient(baseColor, secondaryColor, freedomIndexPrimary, freedomIndexSecondary){

    if( freedomIndexSecondary == -1) return baseColor;
    let mapSvg = ($('.map')[0]);
    let svgNS = mapSvg.namespaceURI;
    let grad  = document.createElementNS(svgNS,'linearGradient');
    let id = 'gradient-' + freedomIndexPrimary + '-' + freedomIndexSecondary;

    //kolla, om id finns, skapa inte nya element!
    grad.setAttribute('id',id);
    grad.setAttribute('gradientTransform', 'rotate(90)');  

    let stops = [
        {offset:'0%', 'stop-color': baseColor},
        {offset:'50%','stop-color': secondaryColor}
      ]
    for (var i=0;i<stops.length;i++){
      let attrs = stops[i];
      let stop = document.createElementNS(svgNS,'stop');
      for (var attr in attrs){
        if (attrs.hasOwnProperty(attr)) stop.setAttribute(attr,attrs[attr]);
      }
      grad.appendChild(stop);
    }

    let animAttrs = {   attributeName: 'x1', dur: '2000ms' /*'1000ms'*/, 
                        from: '100%', to: '0%', repeatCount: 'indefinite' }; 

    let anim = document.createElementNS(svgNS,'animate');
    for (var attr in animAttrs){
        if (animAttrs.hasOwnProperty(attr)) anim.setAttribute(attr,animAttrs[attr]);
      }
    grad.appendChild(anim);
    

    let defs = mapSvg.querySelector('defs') ||
                 mapSvg.insertBefore( document.createElementNS(svgNS,'defs'), svg.firstChild);

    defs.appendChild(grad);
    return 'url(#' + id + ')'; 
  }
  function createGradient2(baseColor, secondaryColor, freedomIndexPrimary, freedomIndexSecondary){

    if( freedomIndexSecondary == -1) return baseColor;
    let mapSvg = ($('.map')[0]);
    let svgNS = mapSvg.namespaceURI;
    let grad  = document.createElementNS(svgNS,'linearGradient');
    let id = 'gradient-' + freedomIndexPrimary + '-' + freedomIndexSecondary;

    //kolla, om id finns, skapa inte nya element!
    grad.setAttribute('id',id);
    grad.setAttribute('gradientTransform', 'rotate(90)');  

    let stops = [
        {offset:'0%', 'stop-color': baseColor},
        {offset:'50%','stop-color': 'plum'}
      ]
    for (var i=0;i<stops.length;i++){
      let attrs = stops[i];
      let stop = document.createElementNS(svgNS,'stop');
      for (var attr in attrs){
        if (attrs.hasOwnProperty(attr)) stop.setAttribute(attr,attrs[attr]);
      }
      grad.appendChild(stop);
    }

    let animAttrs = {   attributeName: 'x1', dur: '2000ms' /*'1000ms'*/, 
                        from:  '0%', to: (100 - freedomIndexSecondary*10) + '%', repeatCount: 'indefinite' }; 

    let anim = document.createElementNS(svgNS,'animate');
    for (var attr in animAttrs){
        if (animAttrs.hasOwnProperty(attr)) anim.setAttribute(attr,animAttrs[attr]);
      }
    grad.appendChild(anim);
    

    let defs = mapSvg.querySelector('defs') ||
                 mapSvg.insertBefore( document.createElementNS(svgNS,'defs'), svg.firstChild);

    defs.appendChild(grad);
    return 'url(#' + id + ')'; 
  }

function createShinyStripe(baseColor, secondaryColor, freedomIndexPrimary, freedomIndexSecondary){
  if( freedomIndexSecondary == -1) return baseColor;
  let mapSvg = ($('.map')[0]);
    let svgNS = mapSvg.namespaceURI;
    let pattern  = document.createElementNS(svgNS,'pattern');
    let id = 'stripes-' + freedomIndexPrimary + '-' + freedomIndexSecondary;

    let dim = 7.5;

    pattern.setAttribute('id', id);
    pattern.setAttribute('patternUnits', 'userSpaceOnUse');
    pattern.setAttribute('width', dim);
    pattern.setAttribute('height', dim);
    
    let rect  = document.createElementNS(svgNS,'rect');
    rect.setAttribute('width', dim*4);
    rect.setAttribute('height', dim*4);
    rect.setAttribute('style','fill: ' + baseColor);

    pattern.appendChild(rect);   

    let line = document.createElementNS(svgNS,'line');
    line.setAttribute('y2', dim);
    line.setAttribute('stroke', secondaryColor);
    line.setAttribute('stroke-width', 3);
    pattern.appendChild(line);

    let animTrans  = document.createElementNS(svgNS,'animateTransform');
    animTrans.setAttribute('attributeName', 'patternTransform');
    animTrans.setAttribute('type', 'translate');
    animTrans.setAttribute('from', '0 0');
    animTrans.setAttribute('to', freedomIndexSecondary*10 + ' ' + freedomIndexSecondary*10);
    animTrans.setAttribute('dur', '5s');
    animTrans.setAttribute('repeatCount', 'indefinite');

    pattern.appendChild(animTrans);

    animTrans  = document.createElementNS(svgNS,'animateTransform');
    animTrans.setAttribute('attributeName', 'patternTransform');
    animTrans.setAttribute('type', 'rotate');
    animTrans.setAttribute('from', '45');
    animTrans.setAttribute('to', '45');
    animTrans.setAttribute('additive', 'sum');
    pattern.appendChild(animTrans);

    let defs = mapSvg.querySelector('defs') ||
                 mapSvg.insertBefore( document.createElementNS(svgNS,'defs'), svg.firstChild);

    defs.appendChild(pattern);    
  
  return 'url(#' + id +')';
}


function createShinyStripe2(baseColor, secondaryColor, freedomIndexPrimary, freedomIndexSecondary){
  if( freedomIndexSecondary == -1) return baseColor;
  let mapSvg = ($('.map')[0]);
    let svgNS = mapSvg.namespaceURI;
    let pattern  = document.createElementNS(svgNS,'pattern');
    let id = 'stripes-' + freedomIndexPrimary + '-' + freedomIndexSecondary;

    let dim = 7.5;

    pattern.setAttribute('id', id);
    pattern.setAttribute('patternUnits', 'userSpaceOnUse');
    pattern.setAttribute('width', dim);
    pattern.setAttribute('height', dim);
    
    let rect  = document.createElementNS(svgNS,'rect');
    rect.setAttribute('width', dim*4);
    rect.setAttribute('height', dim*4);
    rect.setAttribute('style','fill: ' + baseColor);

    pattern.appendChild(rect);   

    let line = document.createElementNS(svgNS,'line');
    line.setAttribute('y2', dim);
    line.setAttribute('stroke', secondaryColor);
    line.setAttribute('stroke-width', freedomIndexSecondary/2);
    pattern.appendChild(line);

    let animTrans  = document.createElementNS(svgNS,'animateTransform');
    animTrans.setAttribute('attributeName', 'patternTransform');
    animTrans.setAttribute('type', 'translate');
    animTrans.setAttribute('from', '0 0');
    animTrans.setAttribute('to', 50 + ' ' + 50);
    animTrans.setAttribute('dur', '5s');
    animTrans.setAttribute('repeatCount', 'indefinite');

    pattern.appendChild(animTrans);

    animTrans  = document.createElementNS(svgNS,'animateTransform');
    animTrans.setAttribute('attributeName', 'patternTransform');
    animTrans.setAttribute('type', 'rotate');
    animTrans.setAttribute('from', '45');
    animTrans.setAttribute('to', '45');
    animTrans.setAttribute('additive', 'sum');
    pattern.appendChild(animTrans);

    let defs = mapSvg.querySelector('defs') ||
                 mapSvg.insertBefore( document.createElementNS(svgNS,'defs'), svg.firstChild);

    defs.appendChild(pattern);    
  
  return 'url(#' + id +')';
}

function createShinyStripe3(baseColor, secondaryColor, freedomIndexPrimary, freedomIndexSecondary){
  if( freedomIndexSecondary == -1) return baseColor;
  let mapSvg = ($('.map')[0]);
    let svgNS = mapSvg.namespaceURI;
    let pattern  = document.createElementNS(svgNS,'pattern');
    let id = 'stripes-' + freedomIndexPrimary + '-' + freedomIndexSecondary;

    let dim = 7.5;

    pattern.setAttribute('id', id);
    pattern.setAttribute('patternUnits', 'userSpaceOnUse');
    pattern.setAttribute('width', dim);
    pattern.setAttribute('height', dim);
    
    let rect  = document.createElementNS(svgNS,'rect');
    rect.setAttribute('width', dim*4);
    rect.setAttribute('height', dim*4);
    rect.setAttribute('style','fill: ' + baseColor);

    pattern.appendChild(rect);   

    let line = document.createElementNS(svgNS,'line');
    line.setAttribute('y2', dim);
    line.setAttribute('stroke', 'plum');
    line.setAttribute('stroke-width', 3);
    pattern.appendChild(line);

    let animTrans  = document.createElementNS(svgNS,'animateTransform');
    animTrans.setAttribute('attributeName', 'patternTransform');
    animTrans.setAttribute('type', 'translate');
    animTrans.setAttribute('from', '0 0');
    animTrans.setAttribute('to', freedomIndexSecondary*10 + ' ' + freedomIndexSecondary*10);
    animTrans.setAttribute('dur', '5s');
    animTrans.setAttribute('repeatCount', 'indefinite');

    pattern.appendChild(animTrans);

    animTrans  = document.createElementNS(svgNS,'animateTransform');
    animTrans.setAttribute('attributeName', 'patternTransform');
    animTrans.setAttribute('type', 'rotate');
    animTrans.setAttribute('from', '45');
    animTrans.setAttribute('to', '45');
    animTrans.setAttribute('additive', 'sum');
    pattern.appendChild(animTrans);

    let defs = mapSvg.querySelector('defs') ||
                 mapSvg.insertBefore( document.createElementNS(svgNS,'defs'), svg.firstChild);

    defs.appendChild(pattern);    
  
  return 'url(#' + id +')';
}


function createShinyStripe4(baseColor, secondaryColor, freedomIndexPrimary, freedomIndexSecondary){
  if( freedomIndexSecondary == -1) return baseColor;
  let mapSvg = ($('.map')[0]);
    let svgNS = mapSvg.namespaceURI;
    let pattern  = document.createElementNS(svgNS,'pattern');
    let id = 'stripes-' + freedomIndexPrimary + '-' + freedomIndexSecondary;

    let dim = 7.5;

    pattern.setAttribute('id', id);
    pattern.setAttribute('patternUnits', 'userSpaceOnUse');
    pattern.setAttribute('width', dim);
    pattern.setAttribute('height', dim);
    
    let rect  = document.createElementNS(svgNS,'rect');
    rect.setAttribute('width', dim*4);
    rect.setAttribute('height', dim*4);
    rect.setAttribute('style','fill: ' + baseColor);

    pattern.appendChild(rect);   

    let line = document.createElementNS(svgNS,'line');
    line.setAttribute('y2', dim);
    line.setAttribute('stroke', 'plum');
    line.setAttribute('stroke-width', freedomIndexSecondary);
    pattern.appendChild(line);

    let animTrans  = document.createElementNS(svgNS,'animateTransform');
    animTrans.setAttribute('attributeName', 'patternTransform');
    animTrans.setAttribute('type', 'translate');
    animTrans.setAttribute('from', '0 0');
    animTrans.setAttribute('to', 50 + ' ' + 50);
    animTrans.setAttribute('dur', '5s');
    animTrans.setAttribute('repeatCount', 'indefinite');

    pattern.appendChild(animTrans);

    animTrans  = document.createElementNS(svgNS,'animateTransform');
    animTrans.setAttribute('attributeName', 'patternTransform');
    animTrans.setAttribute('type', 'rotate');
    animTrans.setAttribute('from', '45');
    animTrans.setAttribute('to', '45');
    animTrans.setAttribute('additive', 'sum');
    pattern.appendChild(animTrans);

    let defs = mapSvg.querySelector('defs') ||
                 mapSvg.insertBefore( document.createElementNS(svgNS,'defs'), svg.firstChild);

    defs.appendChild(pattern);    
  
  return 'url(#' + id +')';
}


function createCirclePattern1(baseColor, secondaryColor, freedomIndexPrimary, freedomIndexSecondary){
  if( freedomIndexSecondary == -1) return baseColor;
  let mapSvg = ($('.map')[0]);
    let svgNS = mapSvg.namespaceURI;
    let pattern  = document.createElementNS(svgNS,'pattern');
    let id = 'circles-' + freedomIndexPrimary + '-' + freedomIndexSecondary;

    let dim = 5;

    pattern.setAttribute('id', id);
    pattern.setAttribute('patternUnits', 'userSpaceOnUse');
    pattern.setAttribute('width', dim);
    pattern.setAttribute('height', dim);

    let rect  = document.createElementNS(svgNS,'rect');
    rect.setAttribute('width', dim*4);
    rect.setAttribute('height', dim*4);
    rect.setAttribute('style','fill: ' + baseColor);

    pattern.appendChild(rect);

    let circle  = document.createElementNS(svgNS,'circle');
    circle.setAttribute('cx', 2);
    circle.setAttribute('cy', 2);
    circle.setAttribute('r', 1);
    circle.setAttribute('style', 'stroke: none; fill: ' + secondaryColor);

    pattern.appendChild(circle);

    let animate  = document.createElementNS(svgNS,'animate');
    animate.setAttribute('attributeName', 'r');
    animate.setAttribute('calcmode', 'spline');
    animate.setAttribute('keySplines', '0.3 0 0.7 1; 0.3 0 0.7 1');
    animate.setAttribute('values', '0;7;0');
    animate.setAttribute('keyTimes', '0;0.4;1.0');
    animate.setAttribute('dur', '7s');
    animate.setAttribute('repeatCount', 'indefinite');

    circle.appendChild(animate);


    let defs = mapSvg.querySelector('defs') ||
                 mapSvg.insertBefore( document.createElementNS(svgNS,'defs'), svg.firstChild);

    defs.appendChild(pattern);   
  return 'url(#' + id + ')'; 
}

function createCirclePattern2(baseColor, secondaryColor, freedomIndexPrimary, freedomIndexSecondary){
  if( freedomIndexSecondary == -1) return baseColor;
  let mapSvg = ($('.map')[0]);
    let svgNS = mapSvg.namespaceURI;
    let pattern  = document.createElementNS(svgNS,'pattern');
    let id = 'circles-' + freedomIndexPrimary + '-' + freedomIndexSecondary;

    let dim = 5;

    pattern.setAttribute('id', id);
    pattern.setAttribute('patternUnits', 'userSpaceOnUse');
    pattern.setAttribute('width', dim);
    pattern.setAttribute('height', dim);

    let rect  = document.createElementNS(svgNS,'rect');
    rect.setAttribute('width', dim*4);
    rect.setAttribute('height', dim*4);
    rect.setAttribute('style','fill: ' + baseColor);

    pattern.appendChild(rect);

    let circle  = document.createElementNS(svgNS,'circle');
    circle.setAttribute('cx', 2);
    circle.setAttribute('cy', 2);
    circle.setAttribute('r', 1);
    circle.setAttribute('style', 'stroke: none; fill: skyblue');

    pattern.appendChild(circle);

    let animate  = document.createElementNS(svgNS,'animate');
    animate.setAttribute('attributeName', 'r');
    //animate.setAttribute('calcmode', 'spline');
    //animate.setAttribute('keySplines', '0.3 0 0.7 1;0.3 0 0.7 1');
    animate.setAttribute('values', '1;5;1');
    animate.setAttribute('keyTimes', '0;0.5;1');
    animate.setAttribute('dur', 10/freedomIndexSecondary + 's');
    animate.setAttribute('repeatCount', 'indefinite');

    circle.appendChild(animate);


    let defs = mapSvg.querySelector('defs') ||
                 mapSvg.insertBefore( document.createElementNS(svgNS,'defs'), svg.firstChild);

    defs.appendChild(pattern);   
  return 'url(#' + id + ')'; 
}

function createBlinkingPattern(baseColor, secondaryColor, freedomIndexPrimary, freedomIndexSecondary){
  if( freedomIndexSecondary == -1) return baseColor;
  let mapSvg = ($('.map')[0]);
    let svgNS = mapSvg.namespaceURI;
    let pattern  = document.createElementNS(svgNS,'pattern');
    let id = 'blinking-' + freedomIndexPrimary + '-' + freedomIndexSecondary;

    let dim = 5;

    pattern.setAttribute('id', id);
    pattern.setAttribute('patternUnits', 'userSpaceOnUse');
    pattern.setAttribute('width', dim);
    pattern.setAttribute('height', dim);


    let rectangle  = document.createElementNS(svgNS,'rect');
    rectangle.setAttribute('width', dim*4);
    rectangle.setAttribute('height', dim*4);
    rectangle.setAttribute('style', 'fill: '+ baseColor);

    pattern.appendChild(rectangle);

    let rectangle2  = document.createElementNS(svgNS,'rect');
    rectangle2.setAttribute('width', dim*4);
    rectangle2.setAttribute('height', dim*4);
    rectangle2.setAttribute('style', 'fill: purple');

    pattern.appendChild(rectangle2);

    let animate  = document.createElementNS(svgNS,'animate');

    animate.setAttribute('attributeName', 'opacity');
    animate.setAttribute('from', '0');
    animate.setAttribute('to', '1');
    animate.setAttribute('dur', 10/freedomIndexSecondary + 's');
    animate.setAttribute('repeatCount', 'indefinite');

    rectangle2.appendChild(animate);
   // rectangle2.appendChild(animate2);


    let defs = mapSvg.querySelector('defs') ||
                 mapSvg.insertBefore( document.createElementNS(svgNS,'defs'), svg.firstChild);

    defs.appendChild(pattern);   
  return 'url(#' + id + ')'; 
}