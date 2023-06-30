varying vec2 vUv;
varying float vNoise;
uniform sampler2D uImage;

void main()	{
  vec2 newUv = vUv;

  vec4 oceanView = texture2D(uImage, newUv);

	// gl_FragColor = vec4(finalColor,1.);
	gl_FragColor = vec4(vUv,0.,1.);
	gl_FragColor = oceanView;
  // gl_FragColor = vec4(vNoise,0.,0.,1.);
}