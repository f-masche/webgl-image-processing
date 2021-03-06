uniform sampler2D tDiffuse;
uniform vec2 offset3x3[9];
uniform vec2 offset5x5[25];
uniform vec2 offset7x7[49];

varying vec2 texCoords;

void main() {
  vec4 texel = vec4(0.0, 0.0, 0.0, 1.0);

  for (int i = 0; i < 9; i++)
  {
    texel += texture2D(tDiffuse, texCoords + offset3x3[i]);
  }

  gl_FragColor = texel/9.0;
}
