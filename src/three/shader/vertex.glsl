varying vec2 vUv;
void main() {
  vUv = uv;
  vec3 newPosition = position;

  newPosition.y += 0.5*sin(newPosition.x*20.)
  gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
}