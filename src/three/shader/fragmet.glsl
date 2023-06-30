varying vec2 vUv;
varying float vNoise;
uniform sampler2D oceanTexture;

void main()	{

  vec3 color1 = vec3(1.,0.,0.);
  vec3 color2 = vec3(1.,1.,1.);
  vec3 finalColor = mix(color1,color2, 0.5*(vNoise+1.));

	vec2 newUV = vUv;

  newUV = vec2(newUV.x+0.1*sin(newUV.y*10.),newUV.y);

  vec4 oceanView = texture2D(oceanTexture, newUV);

	// gl_FragColor = vec4(finalColor,1.);
	gl_FragColor = vec4(vUv,0.,1.);
	// gl_FragColor = oceanView+vec4(vNoise);
  // gl_FragColor = vec4(vNoise);
}