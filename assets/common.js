(function() {

  /**
   * To call in a demo
   */
  window.INITIALIZE_THREEJS_DEMO = function(renderer, scene, camera, controls, options = {}) {
    const onBeforeRender = options.onBeforeRender || function(deltaTime, elapsedTime){};
    const onResizeRenderer = options.onResizeRenderer || function(){
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize( window.innerWidth, window.innerHeight );
    };

    // add stats
    let stats;
    if(typeof Stats !== 'undefined') {
      stats = new Stats();
      document.body.appendChild(stats.dom);
    }

    // window resize listener
    window.addEventListener('resize', function() {
      onResizeRenderer();
      renderer.render( scene, camera );
    }, false);

    // render loop
    let deltaTime = 0, lastTime = 0, elapsedTime = 0;
    renderer.setAnimationLoop(function(time) {
      deltaTime = time - lastTime;
      lastTime = time;

      if(window.document.hasFocus()) {
        elapsedTime += deltaTime;

        if(controls) {
          controls.update();
        }

        onBeforeRender(deltaTime, elapsedTime);

        renderer.render( scene, camera );
      }

      if(stats) {
        stats.update();
      }
    });
  };

})();
