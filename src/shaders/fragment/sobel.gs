uniform sampler2D tDiffuse;
uniform vec2 offset3x3[9];
uniform vec2 offset5x5[25];
uniform vec2 offset7x7[49];
uniform vec3 param;

varying vec2 texCoords;

void main() {
  float sobelX[9];
  sobelX[0] = 1.0; sobelX[1] = 0.0; sobelX[2] = -1.0;
  sobelX[3] = 2.0; sobelX[4] = 0.0; sobelX[5] = -2.0;
  sobelX[6] = 1.0; sobelX[7] = 0.0; sobelX[8] = -1.0;

  float sobelY[9];
  sobelY[0] = 1.0; sobelY[1] = 2.0; sobelY[2] =  1.0;
  sobelY[3] = 0.0; sobelY[4] = 0.0; sobelY[5] =  0.0;
  sobelY[6] = -1.0; sobelY[7] = -2.0; sobelY[8] = -1.0;

  vec4 texelX = vec4(0.0, 0.0, 0.0, 1.0);
  vec4 texelY = vec4(0.0, 0.0, 0.0, 1.0);

  for (int i = 0; i < 9; i++)
  {
    vec4 otherTexel = texture2D(tDiffuse, texCoords + offset3x3[i]);
    float average = (otherTexel.x + otherTexel.y + otherTexel.z) / 3.0;
    texelX += vec4(average, average, average, 1.0)  * sobelX[i];
    texelY += vec4(average, average, average, 1.0)  * sobelY[i];
  }

  vec4 sobelTexel = sqrt(texelX * texelX + texelY * texelY);
  gl_FragColor.a = sobelTexel.a;
  gl_FragColor.rgb =  (sobelTexel.rgb + param.x) * param.y;
}
