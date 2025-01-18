var image = ee.Image(imageCollection
    .filterDate('2000-01-01', '2000-01-30')
    .filterBounds(geometry)
    .sort('CLOUD_COVERAGE_ASSESSMENT')
    .select(['B8', 'B4', 'B3', 'B2'])
    .first());
    
    print("A sentinel:",image);
    var trueColour = {
      bands : ['B4','B3','B2'],
      min : 0,
      max : 3000
    };
    var falseColour = {
      bands : ['B8','B4','B3'],
      min : 0,
      max : 3000
    };
    
    Map.centerObject(geometry, 12);
    Map.addLayer(image, trueColour, 'true-color-image')
    Map.addLayer(image, falseColour, 'false-color-image')
    
    var clip2 = image.clip(geometry);
    Map.addLayer( clip2, trueColour, 'clip-true-color-image');
    
    Export.image.toDrive({
      image: clip2,
      scale: 20,
      folder:'GIS',
      description: 'sukorambi',
      region: geometry
    });
    
